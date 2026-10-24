import { supabaseQuery, supabaseConfig } from './supabaseClient';
import { api } from './api';

export const supabaseService = {
  // Config Status
  getStatus() {
    return {
      provider: 'Supabase PostgreSQL',
      url: supabaseConfig.url,
      isLive: supabaseConfig.isConfigured
    };
  },

  // Record User Login Event in Database (Supabase + Local Backends)
  async recordLogin(userData) {
    if (!userData) return null;
    const loginPayload = {
      user_name: userData.name || userData.email || 'User',
      email: userData.email || '',
      role: userData.role || 'client',
      company: userData.company || 'Enterprise Prospect',
      provider: userData.provider || 'Password',
      status: 'Success'
    };

    let supabaseResult = null;
    try {
      const res = await supabaseQuery('user_logins', {
        method: 'POST',
        body: loginPayload
      });
      if (Array.isArray(res) && res.length > 0) supabaseResult = res[0];
      else if (res && !res.error && !res.code) supabaseResult = res;
    } catch (e) {
      console.warn('Supabase cloud login recording warning', e);
    }

    const localResult = await api.login(loginPayload);
    return supabaseResult || localResult;
  },

  // Fetch Login History Audit Records
  async getLoginHistory() {
    const data = await supabaseQuery('user_logins?select=*&order=id.desc');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    try {
      const res = await fetch('http://localhost:5000/api/auth/logins');
      const json = await res.json();
      return json.data || json;
    } catch (err) {
      return [];
    }
  },

  // Fetch Enquiries from Supabase / Backend API (Admin Protected)
  async getEnquiries() {
    const serverData = await api.fetchEnquiries();
    if (Array.isArray(serverData)) return serverData;
    const data = await supabaseQuery('enquiries?select=*&order=id.desc');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    return [];
  },

  // Insert Customer Enquiry into Database & Trigger Sequential Email Workflow
  async createEnquiry(enquiryData) {
    // 1. Primary: Send to secure server API which inserts into Postgres and dispatches emails
    const localResult = await api.createEnquiry(enquiryData);

    // 2. Secondary backup: Supabase REST
    try {
      const payload = {
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        company: enquiryData.company || enquiryData.businessName || 'Business Prospect',
        service: enquiryData.service || enquiryData.serviceRequired || 'Consulting Service',
        message: enquiryData.message || enquiryData.requirement || ''
      };
      await supabaseQuery('enquiries', { method: 'POST', body: payload });
    } catch (e) {}

    return localResult;
  },

  // Fetch Leads from Supabase / SQLite
  async getLeads() {
    const serverLeads = await api.fetchLeads();
    if (Array.isArray(serverLeads) && serverLeads.length > 0) return serverLeads;
    const data = await supabaseQuery('leads?select=*&order=date.desc');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    return await api.fetchLeads();
  },

  // Insert Lead into Dual Database Engine (Supabase + Local SQLite)
  async createLead(leadData) {
    // Sanitize lead payload for Supabase REST (strip extra properties like notes)
    const cleanLeadPayload = {
      id: leadData.id || `LD-${Date.now()}`,
      client_name: leadData.client_name || leadData.name || 'Prospect Client',
      company: leadData.company || leadData.businessName || 'Business Prospect',
      email: leadData.email || '',
      phone: leadData.phone || '',
      service_name: leadData.service_name || leadData.service || 'Consulting',
      status: leadData.status || 'New',
      date: leadData.date || new Date().toISOString().split('T')[0]
    };

    let supabaseResult = null;
    try {
      const res = await supabaseQuery('leads', {
        method: 'POST',
        body: cleanLeadPayload
      });
      if (Array.isArray(res) && res.length > 0) {
        supabaseResult = res[0];
      } else if (res && !res.error && !res.code) {
        supabaseResult = res;
      }
    } catch (e) {
      console.warn('Supabase cloud insert warning, persisting to SQLite database server.', e);
    }

    // Always persist into local database (server/as_groups.db)
    const localResult = await api.createLead(cleanLeadPayload);

    return supabaseResult || localResult?.lead || cleanLeadPayload;
  },

  // Update Lead Status in Database
  async updateLeadStatus(id, status) {
    try {
      await supabaseQuery(`leads?id=eq.${id}`, {
        method: 'PATCH',
        body: { status }
      });
    } catch (e) {}

    return await api.updateLeadStatus(id, status);
  },

  // Fetch Appointments from Supabase / SQLite
  async getAppointments() {
    const data = await supabaseQuery('appointments?select=*&order=date.asc');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    return await api.fetchAppointments();
  },

  // Fetch Projects from Supabase / SQLite
  async getProjects() {
    const data = await supabaseQuery('projects?select=*');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    return await api.fetchProjects();
  },

  // Fetch Reports from Supabase / SQLite
  async getReports() {
    const data = await supabaseQuery('reports?select=*&order=date.desc');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    return await api.fetchReports();
  },

  // Fetch Notifications from Supabase / SQLite
  async getNotifications() {
    const data = await supabaseQuery('notifications?select=*&order=timestamp.desc');
    if (Array.isArray(data) && data.length > 0 && !data.error && !data.code) return data;
    return await api.fetchNotifications();
  }
};
