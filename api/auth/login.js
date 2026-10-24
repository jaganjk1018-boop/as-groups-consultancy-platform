import { authenticateAdminCredentials, generateAdminToken } from '../lib/auth.js';
import { query, initDb } from '../lib/db.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await initDb();
    const body = req.body || {};
    const { email, password, role } = body;

    // Handle Admin Login
    if (role === 'admin' || req.url?.includes('admin')) {
      const authResult = await authenticateAdminCredentials(email, password);
      if (!authResult.success) {
        return res.status(401).json(authResult);
      }
      return res.status(200).json(authResult);
    }

    // Handle Client Login
    const clientEmail = email || 'client@company.com';
    const clientName = body.name || clientEmail.split('@')[0];
    const clientToken = generateAdminToken({ email: clientEmail, role: 'client', name: clientName });

    return res.status(200).json({
      success: true,
      token: clientToken,
      user: {
        email: clientEmail,
        name: clientName,
        role: 'client',
        company: body.company || 'Enterprise Client',
        provider: body.provider || 'Password'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Server authentication error' });
  }
}
