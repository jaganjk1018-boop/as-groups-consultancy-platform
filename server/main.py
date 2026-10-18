import os
import asyncio
import smtplib
import logging
import sqlite3
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional, List
from fastapi import FastAPI, BackgroundTasks, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("ASGroupsEnquirySystem")

# Load configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:Jagan1018%40jk@db.npcxkhcigpmntxglsdxe.supabase.co:5432/postgres"
)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "info@asgroups.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "harishvj14367@gmail.com")
MANAGER_EMAIL = os.getenv("MANAGER_EMAIL", "manager@asgroups.com")
LOCAL_DB_PATH = os.path.join(os.path.dirname(__file__), "enquiries.db")

app = FastAPI(
    title="AS Groups Supabase PostgreSQL Customer Enquiry API",
    description="FastAPI Backend connected directly to live Supabase PostgreSQL",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Connection Handler (Supabase Postgres with SQLite Fallback)
def get_postgres_conn():
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn, "postgres"
    except Exception as e:
        logger.warning(f"Unable to connect to Supabase PostgreSQL, using local SQLite: {str(e)}")
        conn = sqlite3.connect(LOCAL_DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn, "sqlite"

def init_db():
    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    
    if mode == "postgres":
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS enquiries (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            company TEXT,
            service TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
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

        CREATE TABLE IF NOT EXISTS user_logins (
            id SERIAL PRIMARY KEY,
            user_name TEXT NOT NULL,
            email TEXT NOT NULL,
            role TEXT NOT NULL,
            company TEXT,
            provider TEXT DEFAULT 'password',
            login_time TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'Success'
        );

        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT NOT NULL,
            company TEXT,
            title TEXT
        );
        """)
    else:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            company TEXT,
            service TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL,
            customer_email_sent INTEGER DEFAULT 0,
            admin_email_sent INTEGER DEFAULT 0,
            manager_email_sent INTEGER DEFAULT 0,
            customer_email_time TEXT,
            admin_email_time TEXT,
            manager_email_time TEXT,
            status TEXT DEFAULT 'Pending',
            retry_count INTEGER DEFAULT 0,
            error_log TEXT
        );

        CREATE TABLE IF NOT EXISTS user_logins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name TEXT NOT NULL,
            email TEXT NOT NULL,
            role TEXT NOT NULL,
            company TEXT,
            provider TEXT DEFAULT 'password',
            login_time TEXT NOT NULL,
            status TEXT DEFAULT 'Success'
        );
        """)
    
    conn.commit()
    conn.close()

init_db()

# Pydantic Schemas
class EnquiryRequest(BaseModel):
    name: str
    email: str
    phone: str
    company: Optional[str] = "N/A"
    service: str
    message: str

class LoginRequest(BaseModel):
    email: str
    name: Optional[str] = "User"
    role: Optional[str] = "client"
    company: Optional[str] = "Enterprise Corp"
    title: Optional[str] = "Client User"
    provider: Optional[str] = "Password"

# Email Sender Helper
def send_real_or_mock_email(to_email: str, subject: str, body: str) -> bool:
    logger.info(f"Dispatching email to {to_email} | Subject: '{subject}'")
    
    if SMTP_PASSWORD and SMTP_USER and SMTP_USER != "info@asgroups.com":
        try:
            msg = MIMEMultipart()
            msg["From"] = f"AS Groups Business Consultancy <{SMTP_USER}>"
            msg["To"] = to_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))

            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
            logger.info(f"✅ Real SMTP Email sent to {to_email}")
            return True
        except Exception as e:
            logger.error(f"❌ Real SMTP dispatch failed to {to_email}: {str(e)}")
            return False
    else:
        log_entry = f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] TO: {to_email} | SUBJECT: {subject}\n{body}\n{'-'*60}\n"
        log_file = os.path.join(os.path.dirname(__file__), "email_delivery_logs.txt")
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(log_entry)
        logger.info(f"✅ Simulated Email dispatched to {to_email} (Saved to audit log)")
        return True

# Sequential 3-Step Email Workflow
async def process_email_workflow(enquiry_id: int):
    await asyncio.sleep(2)

    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    
    if mode == "postgres":
        cursor.execute("SELECT * FROM enquiries WHERE id = %s", (enquiry_id,))
    else:
        cursor.execute("SELECT * FROM enquiries WHERE id = ?", (enquiry_id,))
        
    row = cursor.fetchone()
    if not row:
        conn.close()
        return

    enquiry = dict(row)
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Step 1: Customer Email
    cust_body = f"""Dear {enquiry['name']},

Thank you for contacting AS Groups Business Consultancy.

We have successfully received your enquiry regarding {enquiry['service']}.

Our consulting team will review your request and contact you shortly.

For urgent assistance:
Phone: +91 73055 79137 / +91 98400 26405
Email: info@asgroups.com / harishvj14367@gmail.com

Regards,
AS Groups Business Consultancy"""

    cust_success = send_real_or_mock_email(enquiry['email'], "Thank You for Contacting AS Groups", cust_body)

    if cust_success:
        if mode == "postgres":
            cursor.execute("UPDATE enquiries SET customer_email_sent = TRUE, customer_email_time = %s WHERE id = %s", (now_str, enquiry_id))
        else:
            cursor.execute("UPDATE enquiries SET customer_email_sent = 1, customer_email_time = ? WHERE id = ?", (now_str, enquiry_id))
        conn.commit()

    await asyncio.sleep(2)

    # Step 2: Admin Email
    admin_body = f"""New Customer Enquiry Received - AS Groups

Customer Details:
- Name: {enquiry['name']}
- Email: {enquiry['email']}
- Phone: {enquiry['phone']}
- Company: {enquiry['company']}
- Service: {enquiry['service']}
- Message: {enquiry['message']}
- Date & Time: {enquiry['created_at']}

Please review and assign a consultant."""

    admin_success = send_real_or_mock_email(ADMIN_EMAIL, "New Customer Enquiry Received", admin_body)

    if admin_success:
        if mode == "postgres":
            cursor.execute("UPDATE enquiries SET admin_email_sent = TRUE, admin_email_time = %s WHERE id = %s", (now_str, enquiry_id))
        else:
            cursor.execute("UPDATE enquiries SET admin_email_sent = 1, admin_email_time = ? WHERE id = ?", (now_str, enquiry_id))
        conn.commit()

    await asyncio.sleep(2)

    # Step 3: Manager Email
    manager_body = f"""A new customer enquiry has been received.

Customer Details:
- Name: {enquiry['name']}
- Email: {enquiry['email']}
- Phone: {enquiry['phone']}
- Company: {enquiry['company']}
- Service: {enquiry['service']}
- Message: {enquiry['message']}
- Date & Time: {enquiry['created_at']}

Please review and contact the customer as soon as possible.

Regards,
AS Groups Enquiry System"""

    mgr_success = send_real_or_mock_email(MANAGER_EMAIL, "New Enquiry Alert - AS Groups", manager_body)

    if mgr_success:
        if mode == "postgres":
            cursor.execute("UPDATE enquiries SET manager_email_sent = TRUE, manager_email_time = %s WHERE id = %s", (now_str, enquiry_id))
        else:
            cursor.execute("UPDATE enquiries SET manager_email_sent = 1, manager_email_time = ? WHERE id = ?", (now_str, enquiry_id))
        conn.commit()

    if cust_success and admin_success and mgr_success:
        final_status = "All Emails Delivered"
    elif cust_success or admin_success or mgr_success:
        final_status = "Partially Delivered"
    else:
        final_status = "Failed - Queued for Retry"

    if mode == "postgres":
        cursor.execute("UPDATE enquiries SET status = %s WHERE id = %s", (final_status, enquiry_id))
    else:
        cursor.execute("UPDATE enquiries SET status = ? WHERE id = ?", (final_status, enquiry_id))

    conn.commit()
    conn.close()

# API Endpoints
@app.get("/")
def read_root():
    return {
        "message": "AS Groups Supabase PostgreSQL FastAPI Service Running",
        "database": "postgresql://db.npcxkhcigpmntxglsdxe.supabase.co:5432/postgres"
    }

@app.post("/api/auth/login")
def record_auth_login(payload: LoginRequest):
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    
    if mode == "postgres":
        cursor.execute("""
        INSERT INTO user_logins (user_name, email, role, company, provider, status)
        VALUES (%s, %s, %s, %s, %s, 'Success')
        RETURNING id;
        """, (payload.name or payload.email, payload.email, payload.role or "client", payload.company or "N/A", payload.provider or "Password"))
        login_id = cursor.fetchone()['id']
    else:
        cursor.execute("""
        INSERT INTO user_logins (user_name, email, role, company, provider, login_time, status)
        VALUES (?, ?, ?, ?, ?, ?, 'Success')
        """, (payload.name or payload.email, payload.email, payload.role or "client", payload.company or "N/A", payload.provider or "Password", now_str))
        login_id = cursor.lastrowid
        
    conn.commit()
    conn.close()

    return {
        "success": True,
        "login_id": login_id,
        "message": "Login event recorded in database",
        "timestamp": now_str
    }

@app.get("/api/auth/logins")
def get_auth_logins():
    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_logins ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/enquiries", status_code=201)
def create_enquiry(payload: EnquiryRequest, background_tasks: BackgroundTasks):
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    
    lead_id = f"LD-{int(datetime.now().timestamp()) % 10000}"
    today_str = datetime.now().strftime("%Y-%m-%d")

    if mode == "postgres":
        cursor.execute("""
        INSERT INTO enquiries (name, email, phone, company, service, message, status)
        VALUES (%s, %s, %s, %s, %s, %s, 'Processing')
        RETURNING id;
        """, (payload.name, payload.email, payload.phone, payload.company or "N/A", payload.service, payload.message))
        enquiry_id = cursor.fetchone()['id']

        try:
            cursor.execute("""
            INSERT INTO leads (id, client_name, company, email, phone, service_name, status, date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING;
            """, (lead_id, payload.name, payload.company or "N/A", payload.email, payload.phone, payload.service, "New", today_str))
        except Exception as err:
            logger.warning(f"Lead insertion note: {str(err)}")
    else:
        cursor.execute("""
        INSERT INTO enquiries (name, email, phone, company, service, message, created_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Processing')
        """, (payload.name, payload.email, payload.phone, payload.company or "N/A", payload.service, payload.message, now_str))
        enquiry_id = cursor.lastrowid

        try:
            cursor.execute("""
            INSERT INTO leads (id, client_name, company, email, phone, service_name, status, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (lead_id, payload.name, payload.company or "N/A", payload.email, payload.phone, payload.service, "New", today_str))
        except Exception as err:
            logger.warning(f"Lead insertion note: {str(err)}")

    conn.commit()
    conn.close()

    background_tasks.add_task(process_email_workflow, enquiry_id)

    return {
        "success": True,
        "enquiry_id": enquiry_id,
        "message": "Thank you for contacting AS Groups. Our team will contact you shortly.",
        "created_at": now_str,
        "database_provider": "Supabase PostgreSQL"
    }

@app.get("/api/enquiries")
def get_enquiries():
    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    
    if mode == "postgres":
        cursor.execute("SELECT * FROM enquiries ORDER BY id DESC")
    else:
        cursor.execute("SELECT * FROM enquiries ORDER BY id DESC")
        
    rows = cursor.fetchall()
    conn.close()
    
    enquiries = []
    for r in rows:
        d = dict(r)
        d['customer_email_sent'] = bool(d['customer_email_sent'])
        d['admin_email_sent'] = bool(d['admin_email_sent'])
        d['manager_email_sent'] = bool(d['manager_email_sent'])
        if 'created_at' in d and isinstance(d['created_at'], datetime):
            d['created_at'] = d['created_at'].strftime("%Y-%m-%d %H:%M:%S")
        enquiries.append(d)
        
    return enquiries

@app.post("/api/enquiries/{enquiry_id}/retry")
def retry_failed_emails(enquiry_id: int, background_tasks: BackgroundTasks):
    conn, mode = get_postgres_conn()
    cursor = conn.cursor()
    
    if mode == "postgres":
        cursor.execute("SELECT id FROM enquiries WHERE id = %s", (enquiry_id,))
    else:
        cursor.execute("SELECT id FROM enquiries WHERE id = ?", (enquiry_id,))
        
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Enquiry not found")

    if mode == "postgres":
        cursor.execute("UPDATE enquiries SET retry_count = retry_count + 1, status = 'Retrying' WHERE id = %s", (enquiry_id,))
    else:
        cursor.execute("UPDATE enquiries SET retry_count = retry_count + 1, status = 'Retrying' WHERE id = ?", (enquiry_id,))
        
    conn.commit()
    conn.close()

    background_tasks.add_task(process_email_workflow, enquiry_id)
    return {"message": f"Retry initiated for enquiry #{enquiry_id}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
