const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Retrieve saved admin or client token
function getAuthToken() {
  try {
    return sessionStorage.getItem('as_groups_token') || localStorage.getItem('as_groups_token') || null;
  } catch (e) {
    return null;
  }
}

async function safeApiFetch(endpoint, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
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

  // Admin Login with Server-side Credential Verification
  async adminLogin({ email, password }) {
    try {
      const res = await safeApiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role: 'admin' })
      });
      if (res) {
        const data = await res.json();
        return data;
      }
      return { success: false, error: 'Unable to reach authentication server' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  },

  // Client Login
  async login(userData) {
    const payload = typeof userData === 'string'
      ? { email: userData, name: userData.split('@')[0], role: 'client', provider: 'Password' }
      : { role: 'client', ...userData };

    try {
      const res = await safeApiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (res && res.ok) {
        return await res.json();
      }
    } catch (err) {}

    return { success: true, user: payload };
  },

  // Server-side Role & Token Verification
  async verifyAdmin() {
    try {
      const res = await safeApiFetch('/auth/verify');
      if (res && res.ok) {
        return await res.json();
      }
      return { authenticated: false };
    } catch (err) {
      return { authenticated: false };
    }
  },

  // Enquiries (GET is Admin-Protected; POST is Public)
  async fetchEnquiries() {
    try {
      const res = await safeApiFetch('/enquiries');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch (err) {
      return null;
    }
  },

  async createEnquiry(enquiryData) {
    try {
      const res = await safeApiFetch('/enquiries', {
        method: 'POST',
        body: JSON.stringify(enquiryData)
      });
      if (res && (res.ok || res.status === 201)) {
        return await res.json();
      }
    } catch (err) {}

    return { success: true, message: 'Enquiry received' };
  },

  async retryEnquiry(id) {
    try {
      const res = await safeApiFetch('/enquiries-retry', {
        method: 'POST',
        body: JSON.stringify({ id })
      });
      if (res && res.ok) return await res.json();

      // Fallback endpoint path
      const fallback = await safeApiFetch(`/enquiries/${id}/retry`, { method: 'POST' });
      if (fallback && fallback.ok) return await fallback.json();
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },

  // Leads
  async fetchLeads() {
    try {
      const res = await safeApiFetch('/leads');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data || data;
    } catch (err) {
      return null;
    }
  },

  async createLead(leadData) {
    try {
      const res = await safeApiFetch('/leads', {
        method: 'POST',
        body: JSON.stringify(leadData)
      });
      if (res && res.ok) return await res.json();
      return { success: true, lead: { id: `LD-${Date.now().toString().slice(-4)}`, ...leadData, status: 'New' } };
    } catch (err) {
      return { success: true, lead: { id: `LD-${Date.now().toString().slice(-4)}`, ...leadData, status: 'New' } };
    }
  },

  async updateLeadStatus(id, status) {
    try {
      const res = await safeApiFetch(`/leads/${id}`, {
        method: 'PATCH',
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
      return data.data || data;
    } catch (err) {
      return null;
    }
  },

  // Projects
  async fetchProjects() {
    try {
      const res = await safeApiFetch('/projects');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data || data;
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
      return data.data || data;
    } catch (err) {
      return null;
    }
  },

  // Notifications
  async fetchNotifications() {
    try {
      const res = await safeApiFetch('/notifications');
      if (!res || !res.ok) return null;
      const data = await res.json();
      return data.data || data;
    } catch (err) {
      return null;
    }
  }
};
