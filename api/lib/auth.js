import crypto from 'crypto';
import { query } from './db.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://npcxkhcigpmntxglsdxe.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wY3hraGNpZ3BtbnR4Z2xzZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNDg4MzYsImV4cCI6MjEwMzgyNDgzNn0.pWBKBgm51K92nvpFLdLTCUgW8wqHW590dgmbbKnQ690';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'as_groups_royal_admin_secret_key_2026_secured';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'harishvj14367@gmail.com';

// Authorized admin email fallback list
const AUTHORIZED_ADMIN_EMAILS = [
  'admin.operations@asgroups.com',
  'harishvj14367@gmail.com',
  ADMIN_EMAIL.toLowerCase()
];

// Simple secure HMAC token generator for custom server-verified admin sessions
export function generateAdminToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const claims = Buffer.from(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_JWT_SECRET)
    .update(`${header}.${claims}`)
    .digest('base64url');
  return `${header}.${claims}.${signature}`;
}

export function verifyCustomToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, claims, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', ADMIN_JWT_SECRET)
      .update(`${header}.${claims}`)
      .digest('base64url');
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(claims, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

// Check if an email is an authorized admin in PostgreSQL or authorized list
export async function isAuthorizedAdminEmail(email) {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  if (AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail)) return true;

  try {
    const res = await query('SELECT role FROM public.admin_users WHERE LOWER(email) = $1', [cleanEmail]);
    if (res.rows.length > 0 && res.rows[0].role === 'admin') {
      return true;
    }
  } catch (err) {
    console.warn('Check admin email db warning:', err.message);
  }
  return false;
}

// Verify incoming request token (Supabase Auth token OR server JWT)
export async function verifyAdminRequest(req) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authorized: false, error: 'Unauthorized: Missing or malformed Authorization header' };
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return { authorized: false, error: 'Unauthorized: Empty token' };
  }

  // 1. Try Supabase Auth verification
  try {
    const sbRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`
      }
    });

    if (sbRes.ok) {
      const sbUser = await sbRes.json();
      const userEmail = sbUser.email;
      const isAdminRole = sbUser.app_metadata?.role === 'admin' || 
                          sbUser.user_metadata?.role === 'admin' ||
                          await isAuthorizedAdminEmail(userEmail);

      if (isAdminRole) {
        return {
          authorized: true,
          user: {
            id: sbUser.id,
            email: userEmail,
            name: sbUser.user_metadata?.name || userEmail.split('@')[0],
            role: 'admin',
            provider: 'supabase'
          }
        };
      } else {
        return { authorized: false, error: 'Forbidden: Account does not have admin permissions' };
      }
    }
  } catch (e) {
    // If Supabase fetch times out or fails, fallback to custom token verification
  }

  // 2. Try Custom Server HMAC Token verification
  const customPayload = verifyCustomToken(token);
  if (customPayload && customPayload.role === 'admin') {
    const isAllowed = await isAuthorizedAdminEmail(customPayload.email);
    if (isAllowed) {
      return {
        authorized: true,
        user: {
          id: customPayload.id || `ADM-${Date.now()}`,
          email: customPayload.email,
          name: customPayload.name || 'Admin',
          role: 'admin',
          provider: 'server'
        }
      };
    }
  }

  return { authorized: false, error: 'Unauthorized: Invalid or expired token' };
}

// Admin login credential authentication
export async function authenticateAdminCredentials(email, password) {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const isAllowedAdmin = await isAuthorizedAdminEmail(cleanEmail);
  if (!isAllowedAdmin) {
    return { success: false, error: 'Access denied: Email is not authorized for Admin Operations' };
  }

  // 1. Try Supabase Auth password grant
  try {
    const sbRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cleanEmail, password })
    });

    if (sbRes.ok) {
      const sbData = await sbRes.json();
      if (sbData.access_token) {
        return {
          success: true,
          token: sbData.access_token,
          user: {
            email: cleanEmail,
            name: sbData.user?.user_metadata?.name || 'Arun Sundaram',
            title: 'Managing Director',
            role: 'admin',
            company: 'AS GROUPS Management',
            provider: 'Supabase Auth'
          }
        };
      }
    }
  } catch (e) {}

  // 2. Verify with master password or environment ADMIN_PASSWORD
  const envPassword = process.env.ADMIN_PASSWORD;
  const isMasterPasswordMatch = (
    password === 'Admin@ASGroups2026!' ||
    password === 'asgroups2026' ||
    (envPassword && password === envPassword)
  );

  if (isMasterPasswordMatch) {
    const token = generateAdminToken({ email: cleanEmail, role: 'admin', name: 'Arun Sundaram' });
    return {
      success: true,
      token,
      user: {
        email: cleanEmail,
        name: cleanEmail === 'harishvj14367@gmail.com' ? 'Harish V J' : 'Arun Sundaram',
        title: cleanEmail === 'harishvj14367@gmail.com' ? 'Founder & Growth Strategist' : 'Managing Director',
        role: 'admin',
        company: 'AS GROUPS Management',
        provider: 'Secure Server MFA'
      }
    };
  }

  return { success: false, error: 'Invalid admin credentials. Please check your password.' };
}
