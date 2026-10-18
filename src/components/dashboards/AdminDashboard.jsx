import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Calendar, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download,
  Filter,
  Search,
  Check,
  AlertTriangle,
  RefreshCw,
  MailCheck,
  MailWarning
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/mockData';
import { supabaseService } from '../../services/supabaseService';
import { api } from '../../services/api';

export default function AdminDashboard({ 
  leads, 
  setLeads, 
  appointments, 
  setAppointments, 
  projects, 
  setProjects, 
  reports, 
  setReports, 
  notifications,
  onOpenBookModal 
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('enquiries');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Enquiries state
  const [fastApiEnquiries, setFastApiEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [retryingId, setRetryingId] = useState(null);

  // Fetch Enquiries from Supabase / Backend API
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const data = await supabaseService.getEnquiries();
      if (Array.isArray(data)) {
        setFastApiEnquiries(data);
      }
    } catch (err) {
      console.warn('Unable to connect to backend for live enquiries', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    const interval = setInterval(fetchEnquiries, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleRetryEmails = async (id) => {
    setRetryingId(id);
    try {
      await api.retryEnquiry(id);
      setTimeout(fetchEnquiries, 1000);
    } catch (err) {
      console.error('Retry failed', err);
    } finally {
      setRetryingId(null);
    }
  };

  // Report Generator Form state
  const [newReport, setNewReport] = useState({
    title: '',
    client: 'SilkRoute Exim Global',
    service: 'Import & Export Consulting',
    author: 'Arun Sundaram',
    summary: ''
  });

  // Admin Schedule Meeting Modal State
  const [isScheduleMeetingModalOpen, setIsScheduleMeetingModalOpen] = useState(false);
  const [newMeetingForm, setNewMeetingForm] = useState({
    client_name: '',
    consultant_name: 'Harish V J (Founder & Growth Strategist)',
    service_name: 'Import & Export Consulting',
    appointment_date: new Date().toISOString().split('T')[0],
    meeting_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '11:00 AM',
    next_meeting_date: new Date(Date.now() + 86400000 * 9).toISOString().split('T')[0],
    next_project_date: new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
    type: 'Video Consultation',
    meeting_link: 'https://meet.asgroups.consulting/session-live',
    status: 'Scheduled',
    notes: ''
  });

  const handleCreateMeetingSchedule = (e) => {
    e.preventDefault();
    if (!newMeetingForm.client_name) {
      alert('Please enter a client name.');
      return;
    }

    const createdMeeting = {
      id: `APT-${Math.floor(300 + Math.random() * 600)}`,
      client_name: newMeetingForm.client_name,
      consultant_name: newMeetingForm.consultant_name,
      service_name: newMeetingForm.service_name,
      appointment_date: newMeetingForm.appointment_date,
      meeting_date: newMeetingForm.meeting_date,
      time: newMeetingForm.time,
      next_meeting_date: newMeetingForm.next_meeting_date,
      next_project_date: newMeetingForm.next_project_date,
      type: newMeetingForm.type,
      meeting_link: newMeetingForm.meeting_link,
      status: newMeetingForm.status,
      notes: newMeetingForm.notes
    };

    setAppointments([createdMeeting, ...appointments]);
    setIsScheduleMeetingModalOpen(false);
    setNewMeetingForm({
      client_name: '',
      consultant_name: 'Harish V J (Founder & Growth Strategist)',
      service_name: 'Import & Export Consulting',
      appointment_date: new Date().toISOString().split('T')[0],
      meeting_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      time: '11:00 AM',
      next_meeting_date: new Date(Date.now() + 86400000 * 9).toISOString().split('T')[0],
      next_project_date: new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
      type: 'Video Consultation',
      meeting_link: 'https://meet.asgroups.consulting/session-live',
      status: 'Scheduled',
      notes: ''
    });
    alert(`Meeting scheduled successfully for ${createdMeeting.client_name} on ${createdMeeting.meeting_date}!`);
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    const createdRep = {
      id: `REP-${Math.floor(600 + Math.random() * 100)}`,
      title: newReport.title,
      client: newReport.client,
      service: newReport.service,
      date: new Date().toISOString().split('T')[0],
      author: newReport.author,
      fileSize: '3.8 MB',
      summary: newReport.summary
    };
    setReports([createdRep, ...reports]);
    setNewReport({ title: '', client: 'SilkRoute Exim Global', service: 'Import & Export Consulting', author: 'Arun Sundaram', summary: '' });
    alert(`Report "${createdRep.title}" generated and published to Client Page!`);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.service_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '40px 0', background: 'var(--bg-main)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', padding: '28px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={28} color="white" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.6rem', color: 'white' }}>AS Groups Admin Operations Center</h2>
                  <span className="badge badge-purple">FastAPI Customer Enquiry Engine</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#c7d2fe', marginTop: '4px' }}>
                  Enquiry System • Email Delivery Status • Customer, Admin & Manager Auto-Dispatches
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onOpenBookModal} className="btn-primary" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                <Plus size={16} /> Create Manual Lead / Booking
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px' }}>
          {[
            { id: 'enquiries', label: 'Customer Enquiries Hub', icon: MailCheck, count: fastApiEnquiries.length },
            { id: 'leads', label: 'Lead Management', icon: Users, count: leads.length },
            { id: 'appointments', label: 'Appointment Calendar', icon: Calendar, count: appointments.length },
            { id: 'projects', label: 'Project Roadmap', icon: TrendingUp, count: projects.length },
            { id: 'reports', label: 'Report Generator', icon: FileText, count: reports.length },
            { id: 'analytics', label: 'Analytics & BI', icon: BarChart3 },
            { id: 'notifications', label: 'Notification Logs', icon: MessageSquare, count: notifications.length }
          ].map(t => {
            const Icon = t.icon;
            const isSelected = activeAdminTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveAdminTab(t.id)}
                style={{
                  background: isSelected ? '#312e81' : 'white',
                  color: isSelected ? 'white' : '#475569',
                  border: isSelected ? '#312e81' : '1px solid #cbd5e1',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isSelected ? '0 4px 12px rgba(49, 46, 129, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
                {t.count !== undefined && <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{t.count}</span>}
              </button>
            );
          })}
        </div>

        {/* Tab 0: FastAPI Customer Enquiries & Email Delivery Hub */}
        {activeAdminTab === 'enquiries' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-900)', fontWeight: 800 }}>
                  Customer Enquiry Submissions & Email Delivery Hub
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '2px' }}>
                  Real-time database tracking for Customer, Admin, and Manager email dispatches.
                </p>
              </div>

              <button
                onClick={fetchEnquiries}
                disabled={loadingEnquiries}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 14px', gap: '6px' }}
              >
                <RefreshCw size={14} className={loadingEnquiries ? "animate-spin" : ""} /> Refresh Enquiries
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px' }}>#</th>
                    <th style={{ padding: '12px' }}>Customer Name</th>
                    <th style={{ padding: '12px' }}>Company</th>
                    <th style={{ padding: '12px' }}>Service Line</th>
                    <th style={{ padding: '12px' }}>Message Payload</th>
                    <th style={{ padding: '12px' }}>Submission Time</th>
                    <th style={{ padding: '12px' }}>Customer Email</th>
                    <th style={{ padding: '12px' }}>Admin Email</th>
                    <th style={{ padding: '12px' }}>Manager Email</th>
                    <th style={{ padding: '12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fastApiEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={10} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                        No enquiries submitted yet. Submit a contact enquiry on the public website to test auto-email dispatches!
                      </td>
                    </tr>
                  ) : (
                    fastApiEnquiries.map(enq => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', fontWeight: 700 }}>#{enq.id}</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary-900)' }}>
                          <div>{enq.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>📧 {enq.email}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>📱 {enq.phone}</div>
                        </td>
                        <td style={{ padding: '12px' }}>{enq.company || 'N/A'}</td>
                        <td style={{ padding: '12px' }}><span className="badge badge-blue">{enq.service}</span></td>
                        <td style={{ padding: '12px', fontSize: '0.8rem', color: '#334155', maxWidth: '220px' }}>{enq.message}</td>
                        <td style={{ padding: '12px', fontSize: '0.8rem', color: '#64748b' }}>{enq.created_at}</td>
                        
                        {/* Customer Email Status */}
                        <td style={{ padding: '12px' }}>
                          {enq.customer_email_sent ? (
                            <span className="badge badge-emerald"><Check size={12} /> Sent</span>
                          ) : (
                            <span className="badge badge-rose"><MailWarning size={12} /> Pending</span>
                          )}
                        </td>

                        {/* Admin Email Status */}
                        <td style={{ padding: '12px' }}>
                          {enq.admin_email_sent ? (
                            <span className="badge badge-emerald"><Check size={12} /> Sent</span>
                          ) : (
                            <span className="badge badge-rose"><MailWarning size={12} /> Pending</span>
                          )}
                        </td>

                        {/* Manager Email Status */}
                        <td style={{ padding: '12px' }}>
                          {enq.manager_email_sent ? (
                            <span className="badge badge-emerald"><Check size={12} /> Sent</span>
                          ) : (
                            <span className="badge badge-rose"><MailWarning size={12} /> Pending</span>
                          )}
                        </td>

                        {/* Retry Action */}
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => handleRetryEmails(enq.id)}
                            disabled={retryingId === enq.id}
                            className="btn-secondary"
                            style={{ padding: '6px 10px', fontSize: '0.75rem', gap: '4px' }}
                          >
                            <RefreshCw size={12} className={retryingId === enq.id ? "animate-spin" : ""} /> Retry
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 1: Lead Management */}
        {activeAdminTab === 'leads' && (
          <div>
            {/* Filter and Search Bar */}
            <div style={{ background: 'white', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
                <Search size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search leads by client name, company, or service line..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Filter size={16} color="#64748b" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Status:</span>
                {['All', 'New', 'Contacted', 'Qualified', 'Converted'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    style={{
                      background: statusFilter === st ? '#2563eb' : '#f1f5f9',
                      color: statusFilter === st ? 'white' : '#475569',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--primary-900)' }}>
                Enquiries & Lead Pipeline Tracker
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '12px' }}>ID</th>
                      <th style={{ padding: '12px' }}>Prospect Name</th>
                      <th style={{ padding: '12px' }}>Organization</th>
                      <th style={{ padding: '12px' }}>Service Line</th>
                      <th style={{ padding: '12px' }}>Contact</th>
                      <th style={{ padding: '12px' }}>Current Status</th>
                      <th style={{ padding: '12px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', fontWeight: 700 }}>{lead.id}</td>
                        <td style={{ padding: '12px', fontWeight: 600, color: 'var(--primary-900)' }}>{lead.client_name}</td>
                        <td style={{ padding: '12px' }}>{lead.company}</td>
                        <td style={{ padding: '12px' }}><span className="badge badge-blue">{lead.service_name}</span></td>
                        <td style={{ padding: '12px', fontSize: '0.8rem', color: '#64748b' }}>
                          <div>📧 {lead.email}</div>
                          <div>📱 {lead.phone}</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${lead.status === 'New' ? 'badge-rose' : lead.status === 'Converted' ? 'badge-emerald' : 'badge-amber'}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#f8fafc', cursor: 'pointer' }}
                          >
                            <option value="New">Mark New</option>
                            <option value="Contacted">Mark Contacted</option>
                            <option value="Qualified">Mark Qualified</option>
                            <option value="Converted">Mark Converted</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointment & Meeting Scheduling */}
        {activeAdminTab === 'appointments' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-900)', fontWeight: 800 }}>
                  Consultant Appointment Calendar & Meeting Scheduler
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '2px' }}>
                  Track appointment booking dates, scheduled meeting times, next follow-up meeting dates, and next project dates.
                </p>
              </div>

              <button onClick={() => setIsScheduleMeetingModalOpen(true)} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.86rem', gap: '8px' }}>
                <Calendar size={16} /> + Schedule New Meeting Date
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px' }}>Apt ID</th>
                    <th style={{ padding: '12px' }}>Client & Consultant</th>
                    <th style={{ padding: '12px' }}>Service Vertical</th>
                    <th style={{ padding: '12px' }}>Booking Date</th>
                    <th style={{ padding: '12px' }}>Scheduled Meeting Date</th>
                    <th style={{ padding: '12px' }}>Next Meeting Date</th>
                    <th style={{ padding: '12px' }}>Next Project Date</th>
                    <th style={{ padding: '12px' }}>Type & Link</th>
                    <th style={{ padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(apt => (
                    <tr key={apt.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#1e1b4b' }}>{apt.id}</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary-900)' }}>
                        <div>{apt.client_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600 }}>👨‍💼 {apt.consultant_name}</div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge badge-purple">{apt.service_name}</span>
                      </td>
                      
                      {/* Booking Date */}
                      <td style={{ padding: '12px', fontSize: '0.82rem', color: '#64748b' }}>
                        <div style={{ fontWeight: 600, color: '#334155' }}>📅 {apt.appointment_date || apt.date}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Booked</div>
                      </td>

                      {/* Scheduled Meeting Date & Time */}
                      <td style={{ padding: '12px', fontSize: '0.84rem' }}>
                        <div style={{ fontWeight: 800, color: '#1e40af', background: '#dbeafe', padding: '4px 8px', borderRadius: '6px', width: 'fit-content' }}>
                          📅 {apt.meeting_date || apt.date}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px', fontWeight: 600 }}>
                          ⏰ {apt.time}
                        </div>
                      </td>

                      {/* Next Meeting Date */}
                      <td style={{ padding: '12px', fontSize: '0.84rem' }}>
                        <div style={{ fontWeight: 800, color: '#d97706', background: '#fef3c7', padding: '4px 8px', borderRadius: '6px', width: 'fit-content' }}>
                          🗓️ {apt.next_meeting_date || 'Pending'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#78350f', marginTop: '2px' }}>Follow-Up Review</div>
                      </td>

                      {/* Next Project Date */}
                      <td style={{ padding: '12px', fontSize: '0.84rem' }}>
                        <div style={{ fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '4px 8px', borderRadius: '6px', width: 'fit-content' }}>
                          🚀 {apt.next_project_date || 'Pending'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#065f46', marginTop: '2px' }}>Kickoff / Milestone</div>
                      </td>

                      {/* Type & Meeting Location/Link */}
                      <td style={{ padding: '12px', fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: 700, color: '#334155' }}>{apt.type}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '160px', whiteSpace: 'nowrap' }}>
                          {apt.meeting_link}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px' }}>
                        <span className={`badge ${apt.status === 'Scheduled' ? 'badge-blue' : apt.status === 'Confirmed' ? 'badge-emerald' : 'badge-amber'}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Project Roadmap & Date Schedules */}
        {activeAdminTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-900)', fontWeight: 800 }}>
                    Active Client Project Schedules & Milestone Dates
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '2px' }}>
                    Track project start dates, next client meeting dates, next milestone dates, and target completion dates.
                  </p>
                </div>
              </div>
            </div>

            {projects.map(p => (
              <div key={p.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-purple">{p.service}</span>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-900)', marginTop: '6px', fontWeight: 800 }}>{p.title}</h3>
                    <div style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '2px' }}>
                      Client: <strong style={{ color: '#0f172a' }}>{p.client}</strong> | Lead Consultant: <strong style={{ color: '#2563eb' }}>{p.leadConsultant}</strong> | Budget: <strong style={{ color: '#059669' }}>{p.budget}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>{p.progress}% Completed</div>
                    <span className={`badge ${p.status === 'On Track' ? 'badge-emerald' : 'badge-amber'}`} style={{ marginTop: '4px' }}>
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ width: `${p.progress}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #3b82f6)' }}></div>
                </div>

                {/* Project Schedules Date Badges Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>🚀 Project Start Date</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{p.project_start_date || '2026-08-01'}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>📅 Next Client Review Meeting</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>{p.next_meeting_date || '2026-09-10'}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>🗓️ Next Milestone Date</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>{p.next_project_date || '2026-09-20'}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>🏁 Target Completion Date</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>{p.targetDate}</div>
                  </div>
                </div>

                {/* Milestones Breakdown */}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Project Phases & Scheduled Milestone Dates:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                    {p.milestones.map((m, mIdx) => (
                      <div key={mIdx} style={{ background: m.status === 'Completed' ? '#f0fdf4' : m.status === 'In Progress' ? '#eff6ff' : '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>{m.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>📅 Scheduled: <strong>{m.date || 'TBD'}</strong></div>
                        </div>
                        <span className={`badge ${m.status === 'Completed' ? 'badge-emerald' : m.status === 'In Progress' ? 'badge-blue' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Report Generator */}
        {activeAdminTab === 'reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Create Report Form */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-900)', marginBottom: '16px' }}>Publish New Consulting Report</h3>
              <form onSubmit={handleCreateReport} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Report Document Title *</label>
                  <input type="text" required placeholder="e.g. Q3 CSR Compliance Impact Audit" value={newReport.title} onChange={e => setNewReport({...newReport, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Select Client Account *</label>
                  <input type="text" required value={newReport.client} onChange={e => setNewReport({...newReport, client: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Consultancy Service Vertical</label>
                  <select value={newReport.service} onChange={e => setNewReport({...newReport, service: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    {SERVICES_LIST.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Executive Summary & Audit Findings *</label>
                  <textarea rows={4} required placeholder="Summary of key findings, compliance metrics, and action items..." value={newReport.summary} onChange={e => setNewReport({...newReport, summary: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Publish Report to Client Page
                </button>
              </form>
            </div>

            {/* List of Published Reports */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-900)', marginBottom: '16px' }}>Published Client Reports ({reports.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '420px', overflowY: 'auto' }}>
                {reports.map(r => (
                  <div key={r.id} style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>
                      <span>{r.client}</span>
                      <span>{r.date}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.95rem' }}>{r.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>{r.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Analytics & BI Dashboard */}
        {activeAdminTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>MONTHLY REVENUE BY VERTICAL</div>
              <h3 style={{ fontSize: '1.8rem', color: '#1e40af', marginTop: '4px', marginBottom: '16px' }}>₹68.5 Lakhs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Hospital Branding', pct: 32, val: '₹21.9L' },
                  { name: 'Import & Export Consulting', pct: 28, val: '₹19.1L' },
                  { name: 'CSR Management', pct: 22, val: '₹15.0L' },
                  { name: 'Restaurant & Franchise Consulting', pct: 18, val: '₹12.5L' }
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span>{item.name}</span>
                      <span style={{ fontWeight: 700 }}>{item.val} ({item.pct}%)</span>
                    </div>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.pct}%`, height: '100%', background: '#2563eb' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>LEAD CONVERSION FUNNEL RATE</div>
              <h3 style={{ fontSize: '1.8rem', color: '#059669', marginTop: '4px', marginBottom: '16px' }}>42.8% Qualified</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { stage: 'Total Website Enquiries', count: 184 },
                  { stage: 'Consultant Contacted', count: 142 },
                  { stage: 'Qualified Strategy Proposal', count: 79 },
                  { stage: 'Converted Retainer Clients', count: 48 }
                ].map((st, i) => (
                  <div key={i} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>{st.stage}</span>
                    <strong style={{ color: '#1e40af' }}>{st.count} leads</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: WhatsApp & Email Logs */}
        {activeAdminTab === 'notifications' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
              WhatsApp & Transactional Email Notification Audit Logs
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px' }}>ID</th>
                    <th style={{ padding: '12px' }}>Channel</th>
                    <th style={{ padding: '12px' }}>Recipient</th>
                    <th style={{ padding: '12px' }}>Template</th>
                    <th style={{ padding: '12px' }}>Message Payload</th>
                    <th style={{ padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map(n => (
                    <tr key={n.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{n.id}</td>
                      <td style={{ padding: '12px' }}>
                        <span className={`badge ${n.channel === 'WhatsApp' ? 'badge-emerald' : 'badge-blue'}`}>{n.channel}</span>
                      </td>
                      <td style={{ padding: '12px' }}>{n.recipient}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{n.template}</td>
                      <td style={{ padding: '12px', fontSize: '0.8rem', color: '#475569', maxWidth: '300px' }}>{n.message}</td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge badge-emerald"><Check size={12} /> {n.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin Schedule New Meeting & Date Modal */}
        {isScheduleMeetingModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '650px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Modal Header */}
              <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#c7d2fe', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    ADMIN OPERATIONS
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: 'white', fontWeight: 800 }}>Schedule New Meeting & Project Dates</h3>
                </div>
                <button
                  onClick={() => setIsScheduleMeetingModalOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Form Content */}
              <form onSubmit={handleCreateMeetingSchedule} style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Client Name & Consultant */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Client / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apollo Care Heights"
                      value={newMeetingForm.client_name}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, client_name: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Lead Consultant *</label>
                    <input
                      type="text"
                      required
                      value={newMeetingForm.consultant_name}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, consultant_name: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                {/* Service Vertical & Meeting Type */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Service Vertical *</label>
                    <select
                      value={newMeetingForm.service_name}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, service_name: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    >
                      {SERVICES_LIST.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Meeting Format *</label>
                    <select
                      value={newMeetingForm.type}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, type: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    >
                      <option value="Video Consultation">Video Consultation (Online)</option>
                      <option value="In-Person (Mambakkam HQ)">In-Person (Mambakkam HQ)</option>
                      <option value="Client Site Visit">Client Site Visit</option>
                    </select>
                  </div>
                </div>

                {/* DATES GRID */}
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', marginBottom: '4px' }}>📅 Scheduled Meeting Date *</label>
                    <input
                      type="date"
                      required
                      value={newMeetingForm.meeting_date}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, meeting_date: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', marginBottom: '4px' }}>⏰ Scheduled Meeting Time *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10:30 AM"
                      value={newMeetingForm.time}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, time: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#d97706', marginBottom: '4px' }}>🗓️ Next Follow-Up Meeting Date</label>
                    <input
                      type="date"
                      value={newMeetingForm.next_meeting_date}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, next_meeting_date: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>🚀 Next Project Kickoff Date</label>
                    <input
                      type="date"
                      value={newMeetingForm.next_project_date}
                      onChange={(e) => setNewMeetingForm({ ...newMeetingForm, next_project_date: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                {/* Meeting Link / Location */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Meeting Room Link or Office Location</label>
                  <input
                    type="text"
                    placeholder="https://meet.asgroups.consulting/..."
                    value={newMeetingForm.meeting_link}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, meeting_link: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Meeting Agenda / Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Discussion agenda, feasibility review..."
                    value={newMeetingForm.notes}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, notes: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', resize: 'vertical' }}
                  ></textarea>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="button" onClick={() => setIsScheduleMeetingModalOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center', background: '#312e81', fontWeight: 800 }}>
                    <Calendar size={16} /> Save Meeting & Date Schedule
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
