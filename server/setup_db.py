import os
import psycopg2

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:Jagan1018%40jk@db.npcxkhcigpmntxglsdxe.supabase.co:5432/postgres"
)

def setup():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # 1. Ensure public tables exist
    cur.execute("""
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
        status TEXT DEFAULT 'Pending',
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
        status TEXT NOT NULL,
        date TEXT NOT NULL
    );
    """)

    # 2. Update auth.users for admin.operations@asgroups.com to be confirmed
    cur.execute("""
    UPDATE auth.users 
    SET email_confirmed_at = NOW(),
        raw_app_meta_data = jsonb_build_object('provider', 'email', 'providers', array['email'], 'role', 'admin'),
        raw_user_meta_data = jsonb_build_object('role', 'admin', 'name', 'Arun Sundaram')
    WHERE email = 'admin.operations@asgroups.com';
    """)

    # 3. Seed into public.admin_users
    cur.execute("""
    INSERT INTO public.admin_users (email, name, role)
    VALUES ('admin.operations@asgroups.com', 'Arun Sundaram', 'admin')
    ON CONFLICT (email) DO UPDATE SET role = 'admin', name = 'Arun Sundaram';
    
    INSERT INTO public.admin_users (email, name, role)
    VALUES ('harishvj14367@gmail.com', 'Harish V J', 'admin')
    ON CONFLICT (email) DO UPDATE SET role = 'admin', name = 'Harish V J';
    """)

    conn.commit()
    print("Database tables & admin setup successfully committed!")
    
    cur.execute("SELECT email, role, email_confirmed_at FROM auth.users")
    print("auth.users:", cur.fetchall())

    cur.execute("SELECT * FROM public.admin_users")
    print("public.admin_users:", cur.fetchall())

    conn.close()

if __name__ == "__main__":
    setup()
