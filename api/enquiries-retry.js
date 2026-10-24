import { query } from './lib/db.js';
import { verifyAdminRequest } from './lib/auth.js';
import { processEnquiryEmails } from './lib/email.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Admin Verification
  const authResult = await verifyAdminRequest(req);
  if (!authResult.authorized) {
    return res.status(401).json({ success: false, error: authResult.error || 'Unauthorized: Admin access required' });
  }

  try {
    const body = req.body || {};
    const enquiryId = body.id || body.enquiry_id || req.query?.id;

    if (!enquiryId) {
      return res.status(400).json({ success: false, error: 'Enquiry ID is required' });
    }

    await query(
      'UPDATE public.enquiries SET retry_count = retry_count + 1, status = $1 WHERE id = $2',
      ['Retrying Email Workflow', enquiryId]
    );

    // Run emails
    processEnquiryEmails(enquiryId).catch(err => {
      console.error('Email retry error:', err);
    });

    return res.status(200).json({
      success: true,
      message: `Email dispatch workflow re-initiated for enquiry #${enquiryId}`
    });
  } catch (err) {
    console.error('Retry error:', err);
    return res.status(500).json({ success: false, error: 'Retry execution failed' });
  }
}
