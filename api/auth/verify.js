import { verifyAdminRequest } from '../lib/auth.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const authResult = await verifyAdminRequest(req);
    if (!authResult.authorized) {
      return res.status(401).json({
        authenticated: false,
        error: authResult.error || 'Unauthorized'
      });
    }

    return res.status(200).json({
      authenticated: true,
      role: 'admin',
      user: authResult.user
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ authenticated: false, error: 'Internal verification error' });
  }
}
