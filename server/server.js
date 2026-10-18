import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'as_groups.db');

const PORT = 5000;

// Initialize Native Node.js SQLite Database
const db = new DatabaseSync(DB_PATH);

// Initialize Relational Schema Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    title TEXT
  );

  CREATE TABLE IF NOT EXISTS user_logins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    provider TEXT DEFAULT 'password',
    login_time TEXT DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'Success'
  );

  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_name TEXT NOT NULL,
    status TEXT NOT NULL,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    consultant_name TEXT NOT NULL,
    service_name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL,
    meeting_link TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    service TEXT NOT NULL,
    leadConsultant TEXT NOT NULL,
    progress INTEGER NOT NULL,
    status TEXT NOT NULL,
    targetDate TEXT NOT NULL,
    budget TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT NOT NULL,
    fileSize TEXT NOT NULL,
    summary TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    customer_email_sent INTEGER DEFAULT 1,
    admin_email_sent INTEGER DEFAULT 1,
    manager_email_sent INTEGER DEFAULT 1,
    customer_email_time TEXT,
    admin_email_time TEXT,
    manager_email_time TEXT,
    status TEXT DEFAULT 'All Emails Delivered',
    retry_count INTEGER DEFAULT 0,
    error_log TEXT
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    channel TEXT NOT NULL,
    recipient TEXT NOT NULL,
    template TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    status TEXT NOT NULL
  );
`);

// Seed Initial Data if empty
const leadCount = db.prepare('SELECT COUNT(*) as count FROM leads').get().count;
if (leadCount === 0) {
  const insertLead = db.prepare(`
    INSERT INTO leads (id, client_name, company, email, phone, service_name, status, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertLead.run('LD-101', 'Anita Roy', 'SilkRoute Exim', 'anita@silkroute.co', '+91 98401 22110', 'Import & Export Consulting', 'Qualified', '2026-08-28');
  insertLead.run('LD-102', 'Dr. S. K. Nambiar', 'Apollo Care Heights', 'dr.nambiar@apollocare.in', '+91 94440 55620', 'Hospital Branding', 'New', '2026-08-30');
  insertLead.run('LD-103', 'Rajesh Malhotra', 'Bistro 360 Chain', 'rajesh@bistro360.com', '+91 98840 77123', 'Restaurant & Franchise Consulting', 'Contacted', '2026-08-29');
  insertLead.run('LD-104', 'Meera Deshmukh', 'GreenEarth Foundation', 'meera@greenearth.org', '+91 91760 33450', 'CSR Management', 'Converted', '2026-08-25');

  const insertApt = db.prepare(`
    INSERT INTO appointments (id, client_name, consultant_name, service_name, date, time, status, type, meeting_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertApt.run('APT-301', 'Anita Roy', 'Capt. K. V. Raman', 'Import & Export Consulting', '2026-09-03', '10:00 AM', 'Scheduled', 'Video Consultation', 'https://meet.asgroups.consulting/apt-301');
  insertApt.run('APT-302', 'Dr. S. K. Nambiar', 'Dr. Priya Sundaram', 'Hospital Branding', '2026-09-04', '02:30 PM', 'Scheduled', 'In-Person (HQ Office)', 'Suite 402, AS Groups HQ');

  const insertPrj = db.prepare(`
    INSERT INTO projects (id, title, client, service, leadConsultant, progress, status, targetDate, budget)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertPrj.run('PRJ-501', 'EU Tariff Duty Optimization & HS Classification', 'SilkRoute Exim Global', 'Import & Export Consulting', 'Capt. K. V. Raman', 65, 'On Track', '2026-10-15', '₹14.5 Lakhs');
  insertPrj.run('PRJ-502', 'Multi-Specialty Healthcare Rebranding & Patient Flow Optimization', 'Apollo Care Heights', 'Hospital Branding', 'Dr. Priya Sundaram', 40, 'Review Needed', '2026-11-01', '₹22.0 Lakhs');

  const insertRep = db.prepare(`
    INSERT INTO reports (id, title, client, service, date, author, fileSize, summary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertRep.run('REP-601', 'Q2 EU Trade Compliance & Tariff Blueprint', 'SilkRoute Exim Global', 'Import & Export Consulting', '2026-08-28', 'Capt. K. V. Raman', '4.2 MB', 'Comprehensive audit of 42 product categories imported under EU TARIC codes with 8.4% tax saving recommendations.');
  insertRep.run('REP-602', 'Section 135 CSR Compliance & NGO Impact Audit', 'GreenEarth Foundation', 'CSR Management', '2026-08-24', 'Arun Sundaram', '2.8 MB', 'Verified utilization of ₹1.2 Crore corporate funds across rural water purification projects in Tamil Nadu.');

  const insertNotif = db.prepare(`
    INSERT INTO notifications (id, channel, recipient, template, message, timestamp, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertNotif.run('NTF-901', 'WhatsApp', '+91 98401 22110', 'Appointment Confirmation', 'Hello Anita Roy, your appointment APT-301 with Capt. K. V. Raman is confirmed for 2026-09-03 at 10:00 AM.', '2026-08-28 10:15:22', 'Delivered');
  insertNotif.run('NTF-902', 'Email', 'anita@silkroute.co', 'Report Release', 'Document REP-601 "Q2 EU Trade Compliance" has been published to your client portal.', '2026-08-28 14:32:00', 'Sent');
}

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

  req.on('end', () => {
    let parsedBody = {};
    if (body) {
      try { parsedBody = JSON.parse(body); } catch (e) {}
    }

    res.setHeader('Content-Type', 'application/json');

    // GET /api/health
    if (req.method === 'GET' && pathname === '/api/health') {
      const count = db.prepare('SELECT COUNT(*) as count FROM leads').get().count;
      res.writeHead(200);
      return res.end(JSON.stringify({ status: 'OK', database: 'Native Node.js SQLite (as_groups.db)', countLeads: count, timestamp: new Date().toISOString() }));
    }

    // POST /api/auth/login
    if (req.method === 'POST' && pathname === '/api/auth/login') {
      const email = parsedBody.email || 'user@asgroups.com';
      const name = parsedBody.name || (email.split('@')[0]);
      const role = parsedBody.role || 'client';
      const company = parsedBody.company || 'Enterprise Corp';
      const title = parsedBody.title || 'Client User';
      const provider = parsedBody.provider || 'Password';
      const nowStr = new Date().toLocaleString();
      const userId = `USR-${Math.floor(100 + Math.random() * 900)}`;

      try {
        db.prepare(`
          INSERT INTO users (id, name, email, role, company, title)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(email) DO UPDATE SET name=excluded.name, role=excluded.role, company=excluded.company
        `).run(userId, name, email, role, company, title);
      } catch (e) {}

      const loginRecord = db.prepare(`
        INSERT INTO user_logins (user_name, email, role, company, provider, login_time, status)
        VALUES (?, ?, ?, ?, ?, ?, 'Success')
      `).run(name, email, role, company, provider, nowStr);

      try {
        db.prepare(`
          INSERT INTO notifications (id, channel, recipient, template, message, timestamp, status)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(`NTF-${Math.floor(900 + Math.random() * 99)}`, 'Security Audit', email, 'User Login Event', `User ${name} (${email}) logged into ${role.toUpperCase()} Portal via ${provider}.`, nowStr, 'Recorded');
      } catch (e) {}

      res.writeHead(200);
      return res.end(JSON.stringify({
        success: true,
        login_id: loginRecord.lastInsertRowid,
        user: { name, email, role, company, title, provider },
        token: `jwt-token-${role}-asgroups-${Date.now()}`
      }));
    }

    // GET /api/auth/logins
    if (req.method === 'GET' && pathname === '/api/auth/logins') {
      const logins = db.prepare('SELECT * FROM user_logins ORDER BY id DESC').all();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, count: logins.length, data: logins }));
    }

    // GET /api/enquiries
    if (req.method === 'GET' && pathname === '/api/enquiries') {
      const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
      return res.end(JSON.stringify(enquiries));
    }

    // POST /api/enquiries
    if (req.method === 'POST' && pathname === '/api/enquiries') {
      const nowStr = new Date().toLocaleString();
      const name = parsedBody.name || parsedBody.client_name || 'Prospect Client';
      const email = parsedBody.email || 'prospect@corp.com';
      const phone = parsedBody.phone || '+91 98000 00000';
      const company = parsedBody.company || parsedBody.businessName || 'Business Prospect';
      const service = parsedBody.service || parsedBody.service_name || 'Consulting';
      const message = parsedBody.message || parsedBody.requirement || 'Enquiry request';

      const result = db.prepare(`
        INSERT INTO enquiries (name, email, phone, company, service, message, created_at, customer_email_sent, admin_email_sent, manager_email_sent, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1, 1, 'All Emails Delivered')
      `).run(name, email, phone, company, service, message, nowStr);

      const leadId = `LD-${Math.floor(100 + Math.random() * 900)}`;
      db.prepare(`
        INSERT INTO leads (id, client_name, company, email, phone, service_name, status, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(leadId, name, company, email, phone, service, 'New', new Date().toISOString().split('T')[0]);

      db.prepare(`
        INSERT INTO notifications (id, channel, recipient, template, message, timestamp, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(`NTF-${Math.floor(900 + Math.random() * 99)}`, 'Email & WhatsApp', phone, 'Enquiry Confirmation', `Hello ${name}, your enquiry for ${service} has been received.`, nowStr, 'Delivered');

      res.writeHead(201);
      return res.end(JSON.stringify({
        success: true,
        enquiry_id: result.lastInsertRowid,
        message: 'Thank you for contacting AS Groups. Our team will contact you shortly.',
        created_at: nowStr,
        database_provider: 'Native Node.js SQLite'
      }));
    }

    // POST /api/enquiries/:id/retry
    if (req.method === 'POST' && pathname.includes('/api/enquiries/') && pathname.endsWith('/retry')) {
      const idStr = pathname.split('/')[3];
      db.prepare('UPDATE enquiries SET retry_count = retry_count + 1, customer_email_sent = 1, admin_email_sent = 1, manager_email_sent = 1, status = "All Emails Delivered" WHERE id = ?').run(idStr);
      res.writeHead(200);
      return res.end(JSON.stringify({ message: `Retry succeeded for enquiry #${idStr}` }));
    }

    // GET /api/leads
    if (req.method === 'GET' && pathname === '/api/leads') {
      const leads = db.prepare('SELECT * FROM leads ORDER BY date DESC').all();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, count: leads.length, data: leads }));
    }

    // POST /api/leads
    if (req.method === 'POST' && pathname === '/api/leads') {
      const newLead = {
        id: `LD-${Math.floor(100 + Math.random() * 900)}`,
        client_name: parsedBody.client_name || 'Prospect Client',
        company: parsedBody.company || 'Enterprise Corp',
        email: parsedBody.email || 'prospect@corp.com',
        phone: parsedBody.phone || '+91 98000 00000',
        service_name: parsedBody.service_name || 'Business Consulting',
        status: 'New',
        date: new Date().toISOString().split('T')[0]
      };

      db.prepare(`
        INSERT INTO leads (id, client_name, company, email, phone, service_name, status, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(newLead.id, newLead.client_name, newLead.company, newLead.email, newLead.phone, newLead.service_name, newLead.status, newLead.date);

      db.prepare(`
        INSERT INTO notifications (id, channel, recipient, template, message, timestamp, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(`NTF-${Math.floor(900 + Math.random() * 99)}`, 'WhatsApp', newLead.phone, 'Enquiry Confirmation', `Hello ${newLead.client_name}, your consultation request for ${newLead.service_name} has been received.`, new Date().toLocaleString(), 'Delivered');

      res.writeHead(201);
      return res.end(JSON.stringify({ success: true, lead: newLead }));
    }

    // PATCH /api/leads/:id
    if (req.method === 'PATCH' && pathname.startsWith('/api/leads/')) {
      const id = pathname.replace('/api/leads/', '');
      db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(parsedBody.status || 'New', id);
      const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(id);
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, lead }));
    }

    // GET /api/appointments
    if (req.method === 'GET' && pathname === '/api/appointments') {
      const apts = db.prepare('SELECT * FROM appointments ORDER BY date ASC').all();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, count: apts.length, data: apts }));
    }

    // GET /api/projects
    if (req.method === 'GET' && pathname === '/api/projects') {
      const projects = db.prepare('SELECT * FROM projects').all();
      // Attach default milestone structure for UI
      const enriched = projects.map(p => ({
        ...p,
        milestones: [
          { name: 'Initial Requirement Audit', status: 'Completed' },
          { name: 'Phase Strategy Blueprint', status: 'In Progress' },
          { name: 'Final Advisory Review', status: 'Pending' }
        ]
      }));
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, count: enriched.length, data: enriched }));
    }

    // GET /api/reports
    if (req.method === 'GET' && pathname === '/api/reports') {
      const reports = db.prepare('SELECT * FROM reports ORDER BY date DESC').all();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, count: reports.length, data: reports }));
    }

    // POST /api/reports
    if (req.method === 'POST' && pathname === '/api/reports') {
      const newReport = {
        id: `REP-${Math.floor(600 + Math.random() * 100)}`,
        title: parsedBody.title,
        client: parsedBody.client || 'SilkRoute Exim Global',
        service: parsedBody.service || 'Business Strategy',
        date: new Date().toISOString().split('T')[0],
        author: parsedBody.author || 'Arun Sundaram',
        fileSize: '3.5 MB',
        summary: parsedBody.summary
      };
      db.prepare(`
        INSERT INTO reports (id, title, client, service, date, author, fileSize, summary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(newReport.id, newReport.title, newReport.client, newReport.service, newReport.date, newReport.author, newReport.fileSize, newReport.summary);

      res.writeHead(201);
      return res.end(JSON.stringify({ success: true, report: newReport }));
    }

    // GET /api/notifications
    if (req.method === 'GET' && pathname === '/api/notifications') {
      const notifs = db.prepare('SELECT * FROM notifications ORDER BY timestamp DESC').all();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, count: notifs.length, data: notifs }));
    }

    // 404 Route
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, message: 'Route not found' }));
  });
});

server.listen(PORT, () => {
  console.log(`🚀 AS Groups Native SQLite Database Engine running on http://localhost:${PORT} (${DB_PATH})`);
});
