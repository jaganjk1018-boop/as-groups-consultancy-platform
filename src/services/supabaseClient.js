// Supabase Client Config & Initialization

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhYnN0cmFjdCI6ImFzZ3JvdXBzLWFub24ta2V5LTIwMjYifQ...';

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  isConfigured: Boolean(
    import.meta.env?.VITE_SUPABASE_URL && 
    !import.meta.env.VITE_SUPABASE_URL.includes('your-supabase-project-url') &&
    !import.meta.env.VITE_SUPABASE_URL.includes('xyzcompany')
  )
};

// Supabase REST Helper
export async function supabaseQuery(table, options = {}) {
  const { method = 'GET', body, headers = {} } = options;
  const url = `${SUPABASE_URL}/rest/v1/${table}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
    return await res.json();
  } catch (err) {
    console.warn(`Supabase REST query to ${table} failed, using local/REST fallback.`, err);
    return null;
  }
}
