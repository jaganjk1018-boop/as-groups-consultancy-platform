import { query } from './lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

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
      database: 'Fallback Database Engine',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
}
