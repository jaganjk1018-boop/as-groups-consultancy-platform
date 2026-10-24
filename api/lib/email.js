import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { query } from './db.js';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || 'info@asgroups.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'harishvj14367@gmail.com';
const MANAGER_EMAIL = process.env.MANAGER_EMAIL || 'manager@asgroups.com';

function getTransporter() {
  if (SMTP_PASSWORD && SMTP_USER && SMTP_USER !== 'info@asgroups.com') {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    });
  }
  return null;
}

export async function sendEmail({ to, subject, body }) {
  const transporter = getTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `AS Groups Business Consultancy <${SMTP_USER}>`,
        to,
        subject,
        text: body
      });
      console.log(`✅ [Real SMTP] Dispatched to ${to} | Subject: "${subject}"`);
      return true;
    } catch (err) {
      console.error(`❌ [Real SMTP] Dispatch error to ${to}:`, err.message);
      return false;
    }
  } else {
    // Audit simulation mode
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const logEntry = `[${nowStr}] TO: ${to} | SUBJECT: ${subject}\n${body}\n${'-'.repeat(60)}\n`;
    try {
      const logsPath = path.resolve(process.cwd(), 'server', 'email_delivery_logs.txt');
      fs.appendFileSync(logsPath, logEntry, 'utf8');
    } catch (e) {}
    console.log(`✅ [Audit Log] Dispatched simulated email to ${to} | Subject: "${subject}"`);
    return true;
  }
}

// Sequential 3-Step Email Workflow (Customer -> Admin -> Manager)
export async function processEnquiryEmails(enquiryId) {
  try {
    const res = await query('SELECT * FROM public.enquiries WHERE id = $1', [enquiryId]);
    if (res.rows.length === 0) return;

    const enquiry = res.rows[0];
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    // Step 1: Customer Confirmation Email
    const customerBody = `Dear ${enquiry.name},

Thank you for contacting AS Groups Business Consultancy.

We have successfully received your enquiry regarding ${enquiry.service}.

Our consulting team will review your request and contact you shortly.

For urgent assistance:
Phone: +91 73055 79137 / +91 98400 26405
Email: info@asgroups.com / harishvj14367@gmail.com

Regards,
AS Groups Business Consultancy`;

    const custSuccess = await sendEmail({
      to: enquiry.email,
      subject: 'Thank You for Contacting AS Groups',
      body: customerBody
    });

    if (custSuccess) {
      await query(
        'UPDATE public.enquiries SET customer_email_sent = TRUE, customer_email_time = $1 WHERE id = $2',
        [nowStr, enquiryId]
      );
    }

    // Small delay between sequential emails
    await new Promise(r => setTimeout(r, 600));

    // Step 2: Admin Notification Email
    const adminBody = `New Customer Enquiry Received - AS Groups

Customer Details:
- Name: ${enquiry.name}
- Email: ${enquiry.email}
- Phone: ${enquiry.phone}
- Company: ${enquiry.company || 'N/A'}
- Service: ${enquiry.service}
- Message: ${enquiry.message}
- Date & Time: ${enquiry.created_at}

Please review and assign a consultant.`;

    const adminSuccess = await sendEmail({
      to: ADMIN_EMAIL,
      subject: 'New Customer Enquiry Received - AS Groups',
      body: adminBody
    });

    if (adminSuccess) {
      await query(
        'UPDATE public.enquiries SET admin_email_sent = TRUE, admin_email_time = $1 WHERE id = $2',
        [nowStr, enquiryId]
      );
    }

    await new Promise(r => setTimeout(r, 600));

    // Step 3: Manager Notification Email
    const managerBody = `A new customer enquiry has been received.

Customer Details:
- Name: ${enquiry.name}
- Email: ${enquiry.email}
- Phone: ${enquiry.phone}
- Company: ${enquiry.company || 'N/A'}
- Service: ${enquiry.service}
- Message: ${enquiry.message}
- Date & Time: ${enquiry.created_at}

Please review and contact the customer as soon as possible.

Regards,
AS Groups Enquiry System`;

    const mgrSuccess = await sendEmail({
      to: MANAGER_EMAIL,
      subject: 'New Enquiry Alert - AS Groups',
      body: managerBody
    });

    if (mgrSuccess) {
      await query(
        'UPDATE public.enquiries SET manager_email_sent = TRUE, manager_email_time = $1 WHERE id = $2',
        [nowStr, enquiryId]
      );
    }

    let finalStatus = 'All Emails Delivered';
    if (!custSuccess && !adminSuccess && !mgrSuccess) {
      finalStatus = 'Failed - Queued for Retry';
    } else if (!custSuccess || !adminSuccess || !mgrSuccess) {
      finalStatus = 'Partially Delivered';
    }

    await query(
      'UPDATE public.enquiries SET status = $1 WHERE id = $2',
      [finalStatus, enquiryId]
    );

    return { success: true, finalStatus };
  } catch (err) {
    console.error(`Error processing enquiry emails for #${enquiryId}:`, err);
    try {
      await query(
        'UPDATE public.enquiries SET status = $1, error_log = $2 WHERE id = $3',
        ['Error in Email Processing', err.message, enquiryId]
      );
    } catch (e) {}
    return { success: false, error: err.message };
  }
}
