import { query, initDb } from './lib/db.js';
import { verifyAdminRequest } from './lib/auth.js';
import { processEnquiryEmails } from './lib/email.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  await initDb();

  // GET /api/enquiries -> PROTECTED (Admin Only)
  if (req.method === 'GET') {
    const authResult = await verifyAdminRequest(req);
    if (!authResult.authorized) {
      return res.status(401).json({
        success: false,
        error: authResult.error || 'Unauthorized: Admin authentication required to view customer enquiries'
      });
    }

    try {
      // Query enquiries and join/correlate with lead status if available
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

      // Format records cleanly
      const enquiries = result.rows.map(row => ({
        ...row,
        customer_email_sent: Boolean(row.customer_email_sent),
        admin_email_sent: Boolean(row.admin_email_sent),
        manager_email_sent: Boolean(row.manager_email_sent),
        created_at: row.created_at ? new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 19) : new Date().toISOString()
      }));

      return res.status(200).json(enquiries);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
      return res.status(500).json({ success: false, error: 'Database query error' });
    }
  }

  // POST /api/enquiries -> PUBLIC (Accessible to all visitors without login)
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const name = (body.name || body.client_name || '').trim();
      const email = (body.email || '').trim();
      const phone = (body.phone || '').trim();
      const company = (body.company || body.businessName || 'Business Prospect').trim();
      const service = (body.service || body.service_name || 'Business Consulting').trim();
      const message = (body.message || body.requirement || '').trim();

      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and phone number are required to submit an enquiry.'
        });
      }

      // 1. Insert into public.enquiries
      const insertEnquiryRes = await query(`
        INSERT INTO public.enquiries (name, email, phone, company, service, message, status)
        VALUES ($1, $2, $3, $4, $5, $6, 'Processing')
        RETURNING id, created_at
      `, [name, email, phone, company, service, message]);

      const newEnquiry = insertEnquiryRes.rows[0];
      const enquiryId = newEnquiry.id;

      // 2. Insert or update corresponding lead in public.leads for tracking
      const leadId = `LD-${Date.now().toString().slice(-4)}`;
      const todayStr = new Date().toISOString().split('T')[0];

      try {
        await query(`
          INSERT INTO public.leads (id, client_name, company, email, phone, service_name, status, date)
          VALUES ($1, $2, $3, $4, $5, $6, 'New', $7)
          ON CONFLICT (id) DO NOTHING
        `, [leadId, name, company, email, phone, service, todayStr]);
      } catch (leadErr) {
        console.warn('Lead insertion note:', leadErr.message);
      }

      // 3. Dispatch sequential 3-step email notifications in background
      processEnquiryEmails(enquiryId).catch(err => {
        console.error('Email workflow background error:', err);
      });

      return res.status(201).json({
        success: true,
        enquiry_id: enquiryId,
        message: 'Thank you for contacting AS Groups. Our consulting team has received your enquiry and will contact you shortly.',
        created_at: newEnquiry.created_at,
        database_provider: 'Supabase PostgreSQL'
      });
    } catch (err) {
      console.error('Enquiry creation error:', err);
      return res.status(500).json({ success: false, error: 'Failed to record customer enquiry' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
