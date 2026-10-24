import { query, initDb } from './lib/db.js';
import { verifyAdminRequest } from './lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  await initDb();

  // GET /api/leads -> PROTECTED (Admin Only)
  if (req.method === 'GET') {
    const authResult = await verifyAdminRequest(req);
    if (!authResult.authorized) {
      return res.status(401).json({
        success: false,
        error: authResult.error || 'Unauthorized: Admin privileges required to view leads'
      });
    }

    try {
      const result = await query('SELECT * FROM public.leads ORDER BY date DESC');
      return res.status(200).json({
        success: true,
        count: result.rows.length,
        data: result.rows
      });
    } catch (err) {
      console.error('Error fetching leads:', err);
      return res.status(500).json({ success: false, error: 'Database error fetching leads' });
    }
  }

  // POST /api/leads -> Lead creation (public or booking modal)
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const newLead = {
        id: body.id || `LD-${Date.now().toString().slice(-4)}`,
        client_name: body.client_name || body.name || 'Prospect Client',
        company: body.company || body.businessName || 'Business Prospect',
        email: body.email || '',
        phone: body.phone || '',
        service_name: body.service_name || body.service || 'Business Consulting',
        status: body.status || 'New',
        date: body.date || new Date().toISOString().split('T')[0]
      };

      await query(`
        INSERT INTO public.leads (id, client_name, company, email, phone, service_name, status, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET 
          client_name = EXCLUDED.client_name,
          status = EXCLUDED.status,
          date = EXCLUDED.date
      `, [newLead.id, newLead.client_name, newLead.company, newLead.email, newLead.phone, newLead.service_name, newLead.status, newLead.date]);

      return res.status(201).json({ success: true, lead: newLead });
    } catch (err) {
      console.error('Error creating lead:', err);
      return res.status(500).json({ success: false, error: 'Failed to record lead' });
    }
  }

  // PATCH /api/leads -> Update status (Admin Only)
  if (req.method === 'PATCH') {
    const authResult = await verifyAdminRequest(req);
    if (!authResult.authorized) {
      return res.status(401).json({
        success: false,
        error: authResult.error || 'Unauthorized: Admin privileges required to update lead status'
      });
    }

    try {
      const body = req.body || {};
      const leadId = req.query?.id || body.id;
      const newStatus = body.status || 'New';

      if (!leadId) {
        return res.status(400).json({ success: false, error: 'Lead ID is required' });
      }

      await query('UPDATE public.leads SET status = $1 WHERE id = $2', [newStatus, leadId]);
      const updated = await query('SELECT * FROM public.leads WHERE id = $1', [leadId]);

      return res.status(200).json({
        success: true,
        lead: updated.rows[0]
      });
    } catch (err) {
      console.error('Error updating lead status:', err);
      return res.status(500).json({ success: false, error: 'Failed to update lead status' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
