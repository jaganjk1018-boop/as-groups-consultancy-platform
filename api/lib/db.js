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

let pool = null;
let sqliteDb = null;

function getSqliteDb() {
  if (!sqliteDb) {
    try {
      const dbPath = path.resolve(process.cwd(), 'server', 'as_groups.db');
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
    } catch (e) {}
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
      connectionTimeoutMillis: 10000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });

    pool.on('error', (err) => {
      // Supabase drops idle connections; suppress uncaught exception and re-create client on next query
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
    if (pgErr) throw pgErr;
    throw new Error('Database connection failed and SQLite fallback unavailable');
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
    console.error('SQLite fallback query error:', sqlErr.message);
    if (pgErr) throw pgErr;
    throw sqlErr;
  }
}

export async function query(text, params = []) {
  if (Date.now() < pgOfflineUntil) {
    return querySqliteFallback(text, params);
  }

  try {
    const p = getPool();
    return await p.query(text, params);
  } catch (pgErr) {
    if (pgErr.code === 'ENOTFOUND' || pgErr.message?.includes('ENOTFOUND')) {
      pgOfflineUntil = Date.now() + 30000; // 30 second cooldown
    }
    return querySqliteFallback(text, params, pgErr);
  }
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
