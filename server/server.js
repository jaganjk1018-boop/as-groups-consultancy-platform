import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';
import { query, initDb } from '../api/lib/db.js';
import { authenticateAdminCredentials, verifyAdminRequest, generateAdminToken } from '../api/lib/auth.js';
import { processEnquiryEmails } from '../api/lib/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'as_groups.db');

const PORT = process.env.PORT || 5000;

// Initialize SQLite fallback database
let sqliteDb = null;
try {
  sqliteDb = new DatabaseSync(DB_PATH);
} catch (e) {
  console.warn('SQLite init warning:', e.message);
}

// Ensure database tables exist
initDb().catch(e => console.warn('Postgres initDb error:', e.message));

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  let body = '';
  req.on('data', chunk => { body += chunk; });

  req.on('end', async () => {
    let parsedBody = {};
    if (body) {
      try { parsedBody = JSON.parse(body); } catch (e) {}
    }

    // Helper for JSON responses
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    req.body = parsedBody;

    // 1. GET /api/health
    if (req.method === 'GET' && pathname === '/api/health') {
      try {
        const leadsRes = await query('SELECT count(*) FROM public.leads');
        const enquiriesRes = await query('SELECT count(*) FROM public.enquiries');
        return res.status(200).json({
          status: 'OK',
          database: 'Supabase PostgreSQL (Live Connected)',
          countLeads: parseInt(leadsRes.rows[0].count, 10),
          countEnquiries: parseInt(enquiriesRes.rows[0].count, 10),
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        return res.status(200).json({
          status: 'Warning',
          database: 'SQLite Fallback Engine',
          error: err.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // 2. POST /api/auth/login (Admin & Client Login)
    if (req.method === 'POST' && pathname === '/api/auth/login') {
      const { email, password, role } = parsedBody;

      if (role === 'admin' || pathname.includes('admin')) {
        const authResult = await authenticateAdminCredentials(email, password);
        if (!authResult.success) {
          return res.status(401).json(authResult);
        }
        return res.status(200).json(authResult);
      }

      // Client Login
      const clientEmail = email || 'client@company.com';
      const clientName = parsedBody.name || clientEmail.split('@')[0];
      const token = generateAdminToken({ email: clientEmail, role: 'client', name: clientName });

      return res.status(200).json({
        success: true,
        token,
        user: {
          email: clientEmail,
          name: clientName,
          role: 'client',
          company: parsedBody.company || 'Enterprise Client',
          provider: parsedBody.provider || 'Password'
        }
      });
    }

    // 3. GET /api/auth/verify (Server-side Role Verification)
    if (req.method === 'GET' && pathname === '/api/auth/verify') {
      const authResult = await verifyAdminRequest(req);
      if (!authResult.authorized) {
        return res.status(401).json({ authenticated: false, error: authResult.error || 'Unauthorized' });
      }
      return res.status(200).json({
        authenticated: true,
        role: 'admin',
        user: authResult.user
      });
    }

    // 4. GET /api/enquiries -> PROTECTED (Admin Only)
    if (req.method === 'GET' && pathname === '/api/enquiries') {
      const authResult = await verifyAdminRequest(req);
      if (!authResult.authorized) {
        return res.status(401).json({
          success: false,
          error: authResult.error || 'Unauthorized: Admin authentication required to view customer enquiries'
        });
      }

      try {
        const result = await query(`
          SELECT 
            e.id,
            e.name,
            e.email,
            e.phone,
            e.company,
            e.service,
            e.message,
            e.created_at,
            e.customer_email_sent,
            e.admin_email_sent,
            e.manager_email_sent,
            e.customer_email_time,
            e.admin_email_time,
            e.manager_email_time,
            e.status,
            e.retry_count,
            e.error_log,
            COALESCE(l.status, 'New') AS lead_status
          FROM public.enquiries e
          LEFT JOIN public.leads l ON LOWER(l.email) = LOWER(e.email)
          ORDER BY e.id DESC
        `);

        const enquiries = result.rows.map(row => ({
          ...row,
          customer_email_sent: Boolean(row.customer_email_sent),
          admin_email_sent: Boolean(row.admin_email_sent),
          manager_email_sent: Boolean(row.manager_email_sent),
          created_at: row.created_at ? new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 19) : new Date().toISOString()
        }));

        return res.status(200).json(enquiries);
      } catch (err) {
        console.error('Fetch enquiries error:', err);
        return res.status(500).json({ success: false, error: 'Database query error' });
      }
    }

    // 5. POST /api/enquiries -> PUBLIC (Submit enquiry + email workflow)
    if (req.method === 'POST' && pathname === '/api/enquiries') {
      try {
        const name = (parsedBody.name || parsedBody.client_name || '').trim();
        const email = (parsedBody.email || '').trim();
        const phone = (parsedBody.phone || '').trim();
        const company = (parsedBody.company || parsedBody.businessName || 'Business Prospect').trim();
        const service = (parsedBody.service || parsedBody.service_name || 'Business Consulting').trim();
        const message = (parsedBody.message || parsedBody.requirement || '').trim();

        if (!name || !email || !phone) {
          return res.status(400).json({
            success: false,
            error: 'Name, email, and phone number are required.'
          });
        }

        const insertRes = await query(`
          INSERT INTO public.enquiries (name, email, phone, company, service, message, status)
          VALUES ($1, $2, $3, $4, $5, $6, 'Processing')
          RETURNING id, created_at
        `, [name, email, phone, company, service, message]);

        const enquiryId = insertRes.rows[0].id;
        const leadId = `LD-${Date.now().toString().slice(-4)}`;
        const todayStr = new Date().toISOString().split('T')[0];

        try {
          await query(`
            INSERT INTO public.leads (id, client_name, company, email, phone, service_name, status, date)
            VALUES ($1, $2, $3, $4, $5, $6, 'New', $7)
            ON CONFLICT (id) DO NOTHING
          `, [leadId, name, company, email, phone, service, todayStr]);
        } catch (e) {}

        // Sequential email dispatches
        processEnquiryEmails(enquiryId).catch(e => console.error('Email workflow error:', e));

        return res.status(201).json({
          success: true,
          enquiry_id: enquiryId,
          message: 'Thank you for contacting AS Groups. Our team will contact you shortly.',
          created_at: insertRes.rows[0].created_at,
          database_provider: 'Supabase PostgreSQL'
        });
      } catch (err) {
        console.error('Create enquiry error:', err);
        return res.status(500).json({ success: false, error: 'Failed to record customer enquiry' });
      }
    }

    // 6. POST /api/enquiries/:id/retry or /api/enquiries-retry -> Admin Only
    if (req.method === 'POST' && (pathname.includes('/retry') || pathname === '/api/enquiries-retry')) {
      const authResult = await verifyAdminRequest(req);
      if (!authResult.authorized) {
        return res.status(401).json({ success: false, error: authResult.error || 'Unauthorized: Admin access required' });
      }

      let enquiryId = parsedBody.id || parsedBody.enquiry_id;
      if (!enquiryId && pathname.includes('/api/enquiries/')) {
        const parts = pathname.split('/');
        enquiryId = parts[3];
      }

      if (!enquiryId) {
        return res.status(400).json({ success: false, error: 'Enquiry ID is required' });
      }

      await query(
        'UPDATE public.enquiries SET retry_count = retry_count + 1, status = $1 WHERE id = $2',
        ['Retrying Email Workflow', enquiryId]
      );

      processEnquiryEmails(enquiryId).catch(e => console.error('Retry email error:', e));

      return res.status(200).json({
        success: true,
        message: `Email retry dispatched for enquiry #${enquiryId}`
      });
    }

    // 7. GET /api/leads -> Admin Only
    if (req.method === 'GET' && pathname === '/api/leads') {
      const authResult = await verifyAdminRequest(req);
      if (!authResult.authorized) {
        return res.status(401).json({ success: false, error: authResult.error || 'Unauthorized: Admin privileges required' });
      }

      try {
        const result = await query('SELECT * FROM public.leads ORDER BY date DESC');
        return res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    // 8. POST /api/leads
    if (req.method === 'POST' && pathname === '/api/leads') {
      try {
        const newLead = {
          id: parsedBody.id || `LD-${Date.now().toString().slice(-4)}`,
          client_name: parsedBody.client_name || parsedBody.name || 'Prospect Client',
          company: parsedBody.company || 'Enterprise Corp',
          email: parsedBody.email || 'prospect@corp.com',
          phone: parsedBody.phone || '+91 98000 00000',
          service_name: parsedBody.service_name || 'Business Consulting',
          status: parsedBody.status || 'New',
          date: parsedBody.date || new Date().toISOString().split('T')[0]
        };

        await query(`
          INSERT INTO public.leads (id, client_name, company, email, phone, service_name, status, date)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO UPDATE SET client_name = EXCLUDED.client_name, status = EXCLUDED.status
        `, [newLead.id, newLead.client_name, newLead.company, newLead.email, newLead.phone, newLead.service_name, newLead.status, newLead.date]);

        return res.status(201).json({ success: true, lead: newLead });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    // 9. PATCH /api/leads/:id -> Admin Only
    if (req.method === 'PATCH' && (pathname.startsWith('/api/leads/') || pathname === '/api/leads')) {
      const authResult = await verifyAdminRequest(req);
      if (!authResult.authorized) {
        return res.status(401).json({ success: false, error: authResult.error || 'Unauthorized: Admin privileges required' });
      }

      const id = pathname.replace('/api/leads/', '') || parsedBody.id;
      const status = parsedBody.status || 'New';

      try {
        await query('UPDATE public.leads SET status = $1 WHERE id = $2', [status, id]);
        const updated = await query('SELECT * FROM public.leads WHERE id = $1', [id]);
        return res.status(200).json({ success: true, lead: updated.rows[0] });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    // 10. GET /api/appointments
    if (req.method === 'GET' && pathname === '/api/appointments') {
      try {
        const apts = await query('SELECT * FROM public.appointments ORDER BY date ASC');
        return res.status(200).json({ success: true, count: apts.rows.length, data: apts.rows });
      } catch (err) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
    }

    // 11. GET /api/projects
    if (req.method === 'GET' && pathname === '/api/projects') {
      try {
        const projects = await query('SELECT * FROM public.projects');
        return res.status(200).json({ success: true, count: projects.rows.length, data: projects.rows });
      } catch (err) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
    }

    // 12. GET /api/reports
    if (req.method === 'GET' && pathname === '/api/reports') {
      try {
        const reports = await query('SELECT * FROM public.reports ORDER BY date DESC');
        return res.status(200).json({ success: true, count: reports.rows.length, data: reports.rows });
      } catch (err) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
    }

    // 404 Route
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Endpoint not found' }));
  });
});

server.listen(PORT, () => {
  console.log(`🚀 AS Groups Secure Backend running on http://localhost:${PORT}`);
});
