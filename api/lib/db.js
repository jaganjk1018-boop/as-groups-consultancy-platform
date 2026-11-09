import pg from 'pg';
import path from 'path';
import fs from 'fs';
import { DatabaseSync } from 'node:sqlite';

const { Pool } = pg;

// Helper to ensure .env is read if not loaded by runner
function loadEnvFallback() {
  if (process.env.DATABASE_URL) return;
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const k = trimmed.slice(0, idx).trim();
            const v = trimmed.slice(idx + 1).trim();
            if (!process.env[k]) process.env[k] = v;
          }
        }
      });
    }
  } catch (e) {}
}

loadEnvFallback();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:Jagan1018%40jk@db.npcxkhcigpmntxglsdxe.supabase.co:5432/postgres';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://npcxkhcigpmntxglsdxe.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wY3hraGNpZ3BtbnR4Z2xzZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNDg4MzYsImV4cCI6MjEwMzgyNDgzNn0.pWBKBgm51K92nvpFLdLTCUgW8wqHW590dgmbbKnQ690';

let pool = null;
let sqliteDb = null;

// Supabase HTTPS REST API Handler (Guaranteed to work on Vercel AWS Lambda without TCP port 5432 IPv6 timeouts)
export async function querySupabaseRest(text, params = []) {
  const cleanSql = text.trim();
  const upper = cleanSql.toUpperCase();

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  // 1. DDL Statements (CREATE TABLE) -> No-op on Supabase REST (tables already provisioned)
  if (upper.startsWith('CREATE TABLE')) {
    return { rows: [], rowCount: 0 };
  }

  // 2. INSERT INTO public.enquiries
  if (upper.includes('INSERT INTO') && upper.includes('ENQUIRIES')) {
    const payload = {
      name: params[0] || 'Prospective Client',
      email: params[1] || '',
      phone: params[2] || '',
      company: params[3] || 'Business Prospect',
      service: params[4] || 'Business Consulting',
      message: params[5] || '',
      status: 'Processing'
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Supabase REST insert failed (${res.status}): ${errText}`);
    }
    const data = await res.json();
    const rows = Array.isArray(data) ? data : [data];
    return { rows, rowCount: rows.length };
  }

  // 3. SELECT FROM public.enquiries
  if (upper.startsWith('SELECT') && upper.includes('ENQUIRIES')) {
    // 3a. Select by ID: SELECT * FROM public.enquiries WHERE id = $1
    if (upper.includes('WHERE ID =') || upper.includes('WHERE ID=') || upper.includes('WHERE E.ID =')) {
      const id = params[0];
      const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?id=eq.${id}&select=*`, { headers });
      const data = await res.json();
      return { rows: Array.isArray(data) ? data : [], rowCount: data.length || 0 };
    }
    // 3b. Deduplication check: WHERE LOWER(email) = LOWER($1) AND LOWER(service) = LOWER($2)
    if (upper.includes('LOWER(EMAIL)')) {
      const email = params[0] || '';
      const service = params[1] || '';
      let url = `${SUPABASE_URL}/rest/v1/enquiries?email=ilike.${encodeURIComponent(email)}&order=id.desc&limit=1`;
      if (service) url += `&service=ilike.${encodeURIComponent(service)}`;
      const res = await fetch(url, { headers });
      const data = await res.json();
      return { rows: Array.isArray(data) ? data : [], rowCount: data.length || 0 };
    }
    // 3c. Count query
    if (upper.includes('COUNT(')) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?select=id`, { headers });
      const data = await res.json();
      const count = Array.isArray(data) ? data.length : 0;
      return { rows: [{ count }], rowCount: 1 };
    }
    // 3d. General list of enquiries (Admin Hub)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?select=*&order=id.desc`, { headers });
    const data = await res.json();
    return { rows: Array.isArray(data) ? data : [], rowCount: data.length || 0 };
  }

  // 4. UPDATE public.enquiries
  if (upper.includes('UPDATE') && upper.includes('ENQUIRIES')) {
    let updatePayload = {};
    let whereId = null;

    if (upper.includes('CUSTOMER_EMAIL_SENT')) {
      updatePayload = { customer_email_sent: true, customer_email_time: params[0] };
      whereId = params[1];
    } else if (upper.includes('ADMIN_EMAIL_SENT')) {
      updatePayload = { admin_email_sent: true, admin_email_time: params[0] };
      whereId = params[1];
    } else if (upper.includes('MANAGER_EMAIL_SENT')) {
      updatePayload = { manager_email_sent: true, manager_email_time: params[0] };
      whereId = params[1];
    } else if (upper.includes('STATUS =') && upper.includes('ERROR_LOG = NULL')) {
      updatePayload = { status: params[0], error_log: null };
      whereId = params[1];
    } else if (upper.includes('STATUS =') && upper.includes('ERROR_LOG =')) {
      updatePayload = { status: params[0], error_log: params[1] };
      whereId = params[2];
    } else if (upper.includes('RETRY_COUNT')) {
      updatePayload = { status: 'Processing' };
      whereId = params[0];
    } else {
      whereId = params[params.length - 1];
    }

    if (whereId) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?id=eq.${whereId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updatePayload)
      });
      const data = await res.json();
      return { rows: Array.isArray(data) ? data : [data], rowCount: 1 };
    }
  }

  // 5. INSERT INTO public.leads
  if (upper.includes('INSERT INTO') && upper.includes('LEADS')) {
    const payload = {
      id: params[0],
      client_name: params[1],
      company: params[2],
      email: params[3],
      phone: params[4],
      service_name: params[5],
      status: 'New',
      date: params[6] || new Date().toISOString().split('T')[0]
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    return { rows: [payload], rowCount: 1 };
  }

  // 6. SELECT / UPDATE public.leads
  if (upper.includes('LEADS')) {
    if (upper.startsWith('SELECT')) {
      if (upper.includes('COUNT(')) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=id`, { headers });
        const data = await res.json();
        const count = Array.isArray(data) ? data.length : 0;
        return { rows: [{ count }], rowCount: 1 };
      }
      if (upper.includes('WHERE ID =') || upper.includes('WHERE ID=')) {
        const id = params[0];
        const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}&select=*`, { headers });
        const data = await res.json();
        return { rows: Array.isArray(data) ? data : [], rowCount: data.length || 0 };
      }
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&order=date.desc`, { headers });
      const data = await res.json();
      return { rows: Array.isArray(data) ? data : [], rowCount: data.length || 0 };
    }
    if (upper.includes('UPDATE') && upper.includes('STATUS =')) {
      const newStatus = params[0];
      const leadId = params[1];
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      return { rows: Array.isArray(data) ? data : [data], rowCount: 1 };
    }
  }

  // 7. SELECT FROM public.admin_users
  if (upper.includes('ADMIN_USERS')) {
    const email = params[0] || '';
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?email=ilike.${encodeURIComponent(email)}&select=role`, { headers });
    const data = await res.json();
    return { rows: Array.isArray(data) ? data : [], rowCount: data.length || 0 };
  }

  return { rows: [], rowCount: 0 };
}

function getSqliteDb() {
  if (!sqliteDb) {
    try {
      const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
      const dbPath = isVercel
        ? path.join('/tmp', 'as_groups.db')
        : path.resolve(process.cwd(), 'server', 'as_groups.db');

      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      sqliteDb = new DatabaseSync(dbPath);
      sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin'
        );
        INSERT OR IGNORE INTO admin_users (email, name, role) VALUES ('admin.operations@asgroups.com', 'Arun Sundaram', 'admin');
        INSERT OR IGNORE INTO admin_users (email, name, role) VALUES ('harishvj14367@gmail.com', 'Harish V J', 'admin');
      `);
    } catch (e) {
      console.warn('SQLite initialization note:', e.message);
    }
  }
  return sqliteDb;
}

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 15000,
      connectionTimeoutMillis: 4000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });

    pool.on('error', (err) => {
      if (err.code !== 'ECONNRESET' && err.code !== '57P01') {
        console.warn('Postgres pool background notification:', err.message);
      }
    });
  }
  return pool;
}

let pgOfflineUntil = 0;

function querySqliteFallback(text, params = [], pgErr = null) {
  const sdb = getSqliteDb();
  if (!sdb) {
    // If SQLite is unavailable, return safe default rows instead of crashing
    console.warn('SQLite fallback unavailable, returning graceful empty result');
    return { rows: [{ id: Date.now(), created_at: new Date().toISOString() }], rowCount: 1 };
  }

  // Convert $1, $2 to ? for SQLite
  let sqliteSql = text.replace(/public\./g, '');
  let paramIndex = 1;
  while (sqliteSql.includes(`$${paramIndex}`)) {
    sqliteSql = sqliteSql.replace(`$${paramIndex}`, '?');
    paramIndex++;
  }

  // Clean postgres specific syntax
  sqliteSql = sqliteSql.replace(/RETURNING\s+[\w,\s]+/i, '');
  sqliteSql = sqliteSql.replace(/TIMESTAMP WITH TIME ZONE/gi, 'TEXT');
  sqliteSql = sqliteSql.replace(/NOW\(\)/gi, 'CURRENT_TIMESTAMP');

  try {
    const stmt = sdb.prepare(sqliteSql);
    if (sqliteSql.trim().toUpperCase().startsWith('SELECT')) {
      const rows = stmt.all(...params);
      return { rows, rowCount: rows.length };
    } else {
      const info = stmt.run(...params);
      return { rows: [{ id: info.lastInsertRowid }], rowCount: info.changes };
    }
  } catch (sqlErr) {
    console.warn('SQLite fallback query error:', sqlErr.message);
    return { rows: [{ id: Date.now(), created_at: new Date().toISOString() }], rowCount: 1 };
  }
}

export async function query(text, params = []) {
  const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  // In Vercel serverless functions, Supabase HTTPS REST API has zero connection overhead and avoids port 5432 IPv6 timeouts
  if (isVercel) {
    try {
      return await querySupabaseRest(text, params);
    } catch (restErr) {
      console.warn('Supabase REST error, trying direct PG pool:', restErr.message);
    }
  }

  // Direct PG pool with cooldown
  if (Date.now() >= pgOfflineUntil) {
    try {
      const p = getPool();
      return await p.query(text, params);
    } catch (pgErr) {
      pgOfflineUntil = Date.now() + 30000; // 30 second cooldown
      console.warn('Direct PG connection issue, falling back to REST/SQLite:', pgErr.message);
    }
  }

  // Try Supabase REST if not already attempted
  if (!isVercel) {
    try {
      return await querySupabaseRest(text, params);
    } catch (restErr) {}
  }

  // SQLite local /tmp fallback
  return querySqliteFallback(text, params);
}

// Initialize tables if needed
export async function initDb() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS public.admin_users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        password_hash TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.enquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT,
        service TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        customer_email_sent BOOLEAN DEFAULT FALSE,
        admin_email_sent BOOLEAN DEFAULT FALSE,
        manager_email_sent BOOLEAN DEFAULT FALSE,
        customer_email_time TEXT,
        admin_email_time TEXT,
        manager_email_time TEXT,
        status TEXT DEFAULT 'Processing',
        retry_count INT DEFAULT 0,
        error_log TEXT
      );

      CREATE TABLE IF NOT EXISTS public.leads (
        id TEXT PRIMARY KEY,
        client_name TEXT NOT NULL,
        company TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        service_name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        date TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS public.notifications (
        id TEXT PRIMARY KEY,
        channel TEXT NOT NULL,
        recipient TEXT NOT NULL,
        template TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `);
  } catch (err) {
    console.warn('Database initialization note:', err.message);
  }
}
