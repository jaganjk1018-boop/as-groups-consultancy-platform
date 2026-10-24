const BASE_URL = 'http://localhost:5000/api';

async function runTestSuite() {
  console.log('🧪 Starting AS Groups End-to-End Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Health check
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    assert(res.ok && data.status === 'OK', `Health Check (Status: ${data.status}, DB: ${data.database})`);
  } catch (e) {
    assert(false, `Health Check failed: ${e.message}`);
  }

  // 2. Unauthorized access checks (Requirement 6 & 7)
  try {
    const res = await fetch(`${BASE_URL}/enquiries`);
    assert(res.status === 401, `Unauthorized GET /api/enquiries blocked (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Unauthorized GET /api/enquiries check error: ${e.message}`);
  }

  try {
    const res = await fetch(`${BASE_URL}/leads`);
    assert(res.status === 401, `Unauthorized GET /api/leads blocked (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Unauthorized GET /api/leads check error: ${e.message}`);
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/verify`);
    assert(res.status === 401, `Unauthorized GET /api/auth/verify blocked (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Unauthorized GET /api/auth/verify check error: ${e.message}`);
  }

  try {
    const res = await fetch(`${BASE_URL}/enquiries`, {
      headers: { 'Authorization': 'Bearer forged-invalid-token-12345' }
    });
    assert(res.status === 401, `Forged token access to /api/enquiries blocked (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Forged token check error: ${e.message}`);
  }

  // 3. Public Customer Enquiry Submission (Requirement 1, 8, 9)
  let testEnquiryId = null;
  const testCustomer = {
    name: 'Suresh Menon',
    email: 'suresh.menon@menonindustries.com',
    phone: '+91 98410 88234',
    company: 'Menon Global Industries',
    service: 'Physical & Digital Marketing Consulting',
    message: 'Seeking end-to-end corporate branding, international market penetration, and customer acquisition audit.'
  };

  try {
    const res = await fetch(`${BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCustomer)
    });
    const data = await res.json();
    assert(res.status === 201 && data.success, `Public enquiry submission succeeded (Enquiry #${data.enquiry_id})`);
    testEnquiryId = data.enquiry_id;
  } catch (e) {
    assert(false, `Public enquiry submission error: ${e.message}`);
  }

  // Wait a short moment for the background 3-step email notifications to process
  await new Promise(r => setTimeout(r, 2500));

  // 4. Admin Login with Incorrect Credentials
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'intruder@unknown.com', password: 'WrongPassword!', role: 'admin' })
    });
    assert(res.status === 401, `Unauthorized login attempt rejected (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Unauthorized login test error: ${e.message}`);
  }

  // 5. Admin Login with Authorized Credentials (Requirement 2 & 6)
  let adminToken = null;
  let adminUser = null;
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin.operations@asgroups.com',
        password: 'Admin@ASGroups2026!',
        role: 'admin'
      })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && !!data.token, `Authorized admin login succeeded for ${data.user?.email}`);
    adminToken = data.token;
    adminUser = data.user;
  } catch (e) {
    assert(false, `Admin login error: ${e.message}`);
  }

  // 6. Server Role Verification (Requirement 7)
  try {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const data = await res.json();
    assert(res.status === 200 && data.authenticated && data.role === 'admin', `Server-side admin role verification confirmed (Role: ${data.role})`);
  } catch (e) {
    assert(false, `Server role verification error: ${e.message}`);
  }

  // 7. Admin View Customer Enquiries, Contact Details, Dates, Services, Lead Status (Requirement 8 & 9)
  try {
    const res = await fetch(`${BASE_URL}/enquiries`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const data = await res.json();
    assert(res.status === 200 && Array.isArray(data) && data.length > 0, `Admin successfully fetched enquiries list (${data.length} records)`);

    const latest = data.find(e => e.id === testEnquiryId) || data[0];
    const hasContactDetails = Boolean(latest.name && latest.email && latest.phone);
    const hasService = Boolean(latest.service);
    const hasDate = Boolean(latest.created_at);
    const hasLeadStatus = Boolean(latest.lead_status !== undefined || latest.status !== undefined);
    const hasEmailStatuses = Boolean(latest.customer_email_sent !== undefined && latest.admin_email_sent !== undefined);

    assert(hasContactDetails, `Enquiry displays customer contact details (${latest.name}, ${latest.email}, ${latest.phone})`);
    assert(hasService, `Enquiry displays service requested ("${latest.service}")`);
    assert(hasDate, `Enquiry displays enquiry timestamp ("${latest.created_at}")`);
    assert(hasLeadStatus, `Enquiry displays lead status ("${latest.lead_status || latest.status}")`);
    assert(hasEmailStatuses, `Enquiry displays email dispatches (Customer: ${latest.customer_email_sent}, Admin: ${latest.admin_email_sent}, Manager: ${latest.manager_email_sent})`);
  } catch (e) {
    assert(false, `Admin enquiries view error: ${e.message}`);
  }

  // 8. Admin View Leads & Update Lead Status (Requirement 8)
  try {
    const res = await fetch(`${BASE_URL}/leads`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const data = await res.json();
    const leadsList = data.data || data;
    assert(res.status === 200 && Array.isArray(leadsList), `Admin successfully fetched leads list (${leadsList.length} leads)`);

    if (leadsList.length > 0) {
      const targetLead = leadsList[0];
      const patchRes = await fetch(`${BASE_URL}/leads/${targetLead.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Qualified' })
      });
      const patchData = await patchRes.json();
      assert(patchRes.status === 200 && patchData.success, `Admin updated lead status for #${targetLead.id} to "Qualified"`);
    }
  } catch (e) {
    assert(false, `Leads view/update error: ${e.message}`);
  }

  // 9. Admin Retry Email Dispatch (Requirement 9)
  if (testEnquiryId) {
    try {
      const res = await fetch(`${BASE_URL}/enquiries-retry`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: testEnquiryId })
      });
      const data = await res.json();
      assert(res.status === 200 && data.success, `Email retry successfully triggered for enquiry #${testEnquiryId}`);
    } catch (e) {
      assert(false, `Email retry test error: ${e.message}`);
    }
  }

  // 10. Logout Simulation
  adminToken = null;
  try {
    const res = await fetch(`${BASE_URL}/enquiries`);
    assert(res.status === 401, `Post-logout access to admin enquiries blocked (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Post-logout check error: ${e.message}`);
  }

  console.log(`\n========================================`);
  console.log(`📊 Test Suite Finished: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite();
