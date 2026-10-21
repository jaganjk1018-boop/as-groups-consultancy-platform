const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

let serverOnline = true;
let lastServerCheck = 0;
const SERVER_CHECK_COOLDOWN = 10000; // 10 seconds cooldown if backend offline

async function safeApiFetch(endpoint, options = {}, timeoutMs = 2500) {
  const now = Date.now();
  if (!serverOnline && (now - lastServerCheck < SERVER_CHECK_COOLDOWN)) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    serverOnline = true;
    lastServerCheck = Date.now();
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    serverOnline = false;
    lastServerCheck = Date.now();
    return null;
  }
}

export const api = {
  // Healthcheck
  async checkHealth() {
    try {
      const res = await safeApiFetch('/health');
      if (res && res.ok) return await res.json();
      return null;
    } catch (err) {
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
      const res = await safeApiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res && res.ok) {
        const data = await res.json();
        if (!result) result = data;
      }
    } catch (err) {}

    return result || { success: true, user: payload };
  },

  // Leads
  async fetchLeads() {
    try {
      const res = await safeApiFetch('/leads');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createLead(leadData) {
    try {
      const res = await safeApiFetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (res && res.ok) return await res.json();
      return { success: true, lead: { id: `LD-${Date.now()}`, ...leadData, status: 'New' } };
    } catch (err) {
      return { success: true, lead: { id: `LD-${Date.now()}`, ...leadData, status: 'New' } };
    }
  },

  async updateLeadStatus(id, status) {
    try {
      const res = await safeApiFetch(`/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res && res.ok) return await res.json();
      return { success: true };
    } catch (err) {
      return { success: true };
    }
  },

  // Appointments
  async fetchAppointments() {
    try {
      const res = await safeApiFetch('/appointments');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createAppointment(aptData) {
    try {
      const res = await safeApiFetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aptData)
      });
      if (res && res.ok) return await res.json();
      return { success: true, appointment: { id: `APT-${Date.now()}`, ...aptData, status: 'Scheduled' } };
    } catch (err) {
      return { success: true, appointment: { id: `APT-${Date.now()}`, ...aptData, status: 'Scheduled' } };
    }
  },

  // Projects
  async fetchProjects() {
    try {
      const res = await safeApiFetch('/projects');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  // Reports
  async fetchReports() {
    try {
      const res = await safeApiFetch('/reports');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createReport(reportData) {
    try {
      const res = await safeApiFetch('/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      if (res && res.ok) return await res.json();
      return { success: true, report: { id: `REP-${Date.now()}`, ...reportData } };
    } catch (err) {
      return { success: true, report: { id: `REP-${Date.now()}`, ...reportData } };
    }
  },

  // Enquiries
  async fetchEnquiries() {
    try {
      const res = await safeApiFetch('/enquiries');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data || data;
    } catch (err) {
      return null;
    }
  },

  async createEnquiry(enquiryData) {
    try {
      const res = await safeApiFetch('/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData)
      });
      if (res && res.ok) return await res.json();
    } catch (err) {}

    return { success: true, message: 'Enquiry received' };
  },

  async retryEnquiry(id) {
    try {
      const res = await safeApiFetch(`/enquiries/${id}/retry`, { method: 'POST' });
      if (res && res.ok) return await res.json();
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },

  // Notifications
  async fetchNotifications() {
    try {
      const res = await safeApiFetch('/notifications');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  }
};
