const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Healthcheck
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, using local fallback store.', err);
      return null;
    }
  },

  // Auth Login & Persistence
  async login(userData) {
    const payload = typeof userData === 'string'
      ? { email: userData, name: userData.split('@')[0], role: 'client', provider: 'Password' }
      : userData;

    let result = null;

    // 1. Send to FastAPI 8000
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) result = await res.json();
    } catch (err) {}

    // 2. Send to Node Server 5000
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!result) result = data;
    } catch (err) {}

    return result || { success: true, user: payload };
  },

  // Leads
  async fetchLeads() {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createLead(leadData) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, lead: { id: `LD-${Date.now()}`, ...leadData, status: 'New' } };
    }
  },

  async updateLeadStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Appointments
  async fetchAppointments() {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createAppointment(aptData) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aptData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, appointment: { id: `APT-${Date.now()}`, ...aptData, status: 'Scheduled' } };
    }
  },

  // Projects
  async fetchProjects() {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  // Reports
  async fetchReports() {
    try {
      const res = await fetch(`${API_BASE_URL}/reports`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createReport(reportData) {
    try {
      const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, report: { id: `REP-${Date.now()}`, ...reportData } };
    }
  },

  // Enquiries
  async fetchEnquiries() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/enquiries');
      if (res.ok) return await res.json();
    } catch (err) {}

    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`);
      const data = await res.json();
      return data.data || data;
    } catch (err) {
      return null;
    }
  },

  async createEnquiry(enquiryData) {
    let result = null;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData)
      });
      if (res.ok) result = await res.json();
    } catch (err) {}

    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData)
      });
      const data = await res.json();
      if (!result) result = data;
    } catch (err) {}

    return result || { success: true, message: 'Enquiry received' };
  },

  async retryEnquiry(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/enquiries/${id}/retry`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (err) {}

    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/${id}/retry`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { success: false };
    }
  },

  // Notifications
  async fetchNotifications() {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  }
};
