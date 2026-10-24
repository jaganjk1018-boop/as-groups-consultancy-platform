import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Download, 
  ExternalLink, 
  Send,
  Building2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function ClientDashboard({ 
  appointments, 
  projects, 
  reports, 
  onOpenBookModal 
}) {
  const [activeTab, setActiveTab] = useState('projects');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Capt. K. V. Raman (Consultant)', text: 'Hello Anita, we have finalized Phase 2 of your EU Tariff classification blueprint. Please review the report in your Report Hub.', time: 'Yesterday 14:30' },
    { id: 2, sender: 'You (Client)', text: 'Thank you Captain! We reviewed the HS codes. Can we schedule a quick call tomorrow?', time: 'Yesterday 16:10' },
    { id: 3, sender: 'Capt. K. V. Raman (Consultant)', text: 'Absolutely! I have added the video meeting link in your Appointments tab for 10:00 AM.', time: 'Today 09:15' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: 'You (Client)', text: newMessageText, time: 'Just now' }
    ]);
    setNewMessageText('');
  };

  return (
    <div style={{ padding: '40px 0', background: 'var(--bg-main)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Client Profile Header */}
        <div style={{ background: 'linear-gradient(135deg, #0B2D68 0%, #174A96 100%)', color: 'white', padding: '28px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', boxShadow: '0 8px 24px rgba(11,45,104,0.18)', border: '1px solid rgba(201, 160, 68, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#C9A044', color: '#0B2D68', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800 }}>
                SC
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 800 }}>SilkRoute Exim Global</h2>
                  <span className="badge" style={{ background: '#C9A044', color: '#0B2D68', fontWeight: 800 }}>Active Client Page</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#F5F6F8', marginTop: '4px' }}>
                  Account Manager: <strong>Capt. K. V. Raman</strong> | Tier: Enterprise Advisory
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onOpenBookModal} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                <Calendar size={16} /> Request New Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #E5E7EB', paddingBottom: '2px' }}>
          {[
            { id: 'projects', label: 'Active Projects', icon: TrendingUp, count: projects.length },
            { id: 'appointments', label: 'Appointment History', icon: Calendar, count: appointments.length },
            { id: 'reports', label: 'Report Hub', icon: FileText, count: reports.length },
            { id: 'messages', label: 'Consultant Communication', icon: MessageSquare, count: messages.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '12px 18px',
                  fontWeight: isSelected ? 800 : 500,
                  fontSize: '0.95rem',
                  color: isSelected ? '#0B2D68' : '#6B7280',
                  borderBottom: isSelected ? '3px solid #C9A044' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={isSelected ? '#0B2D68' : '#6B7280'} />
                <span>{tab.label}</span>
                <span className="badge" style={{ background: isSelected ? '#C9A044' : '#E5E7EB', color: '#0B2D68', fontSize: '0.7rem', fontWeight: 700 }}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Active Projects & Milestones */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.map(prj => (
              <div key={prj.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid #E5E7EB', borderTop: '3px solid #C9A044', boxShadow: '0 4px 16px rgba(11, 45, 104, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <span className="badge" style={{ background: 'rgba(11, 45, 104, 0.08)', color: '#0B2D68', border: '1px solid rgba(11, 45, 104, 0.2)', marginBottom: '6px' }}>{prj.service}</span>
                    <h3 style={{ fontSize: '1.3rem', color: '#0B2D68', fontWeight: 800 }}>{prj.title}</h3>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Lead Consultant: <strong>{prj.leadConsultant}</strong></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${prj.status === 'On Track' ? 'badge-emerald' : 'badge-amber'}`}>{prj.status}</span>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>Target: {prj.targetDate}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#0B2D68' }}>
                    <span>Project Completion</span>
                    <span>{prj.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#E5E7EB', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${prj.progress}%`, height: '100%', background: 'linear-gradient(90deg, #0B2D68, #174A96)', borderRadius: '5px' }}></div>
                  </div>
                </div>

                {/* Milestones list */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#0B2D68', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Phase Milestones</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    {prj.milestones.map((m, idx) => (
                      <div key={idx} style={{ background: '#F5F6F8', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontWeight: 700, color: m.status === 'Completed' ? '#059669' : m.status === 'In Progress' ? '#0B2D68' : '#6B7280' }}>
                          <CheckCircle2 size={15} color={m.status === 'Completed' ? '#059669' : m.status === 'In Progress' ? '#C9A044' : '#6B7280'} /> {m.status}
                        </div>
                        <div style={{ color: '#172033' }}>{m.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Appointment History */}
        {activeTab === 'appointments' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid #E5E7EB', borderTop: '3px solid #C9A044', boxShadow: '0 4px 16px rgba(11, 45, 104, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0B2D68', fontWeight: 800 }}>Scheduled & Past Consultation Meetings</h3>
              <button onClick={onOpenBookModal} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <Calendar size={15} /> Request New Consultation
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#F5F6F8', borderBottom: '2px solid #E5E7EB', color: '#0B2D68' }}>
                    <th style={{ padding: '12px', fontWeight: 700 }}>ID</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>Service Line</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>Assigned Consultant</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>Date & Time</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>Action / Link</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(apt => (
                    <tr key={apt.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#0B2D68' }}>{apt.id}</td>
                      <td style={{ padding: '12px' }}>{apt.service_name}</td>
                      <td style={{ padding: '12px' }}>{apt.consultant_name}</td>
                      <td style={{ padding: '12px' }}>{apt.date} • {apt.time}</td>
                      <td style={{ padding: '12px' }}>
                        <span className={`badge ${apt.status === 'Scheduled' ? 'badge-blue' : 'badge-emerald'}`}>{apt.status}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {apt.meeting_link.startsWith('http') ? (
                          <a href={apt.meeting_link} target="_blank" rel="noopener noreferrer" style={{ color: '#0B2D68', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                            <ExternalLink size={14} color="#C9A044" /> Join Meeting
                          </a>
                        ) : (
                          <span style={{ color: '#6B7280' }}>{apt.meeting_link}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Report Hub */}
        {activeTab === 'reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {reports.map(rep => (
              <div key={rep.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid #E5E7EB', borderTop: '3px solid #C9A044', boxShadow: '0 4px 16px rgba(11, 45, 104, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="badge" style={{ background: 'rgba(11, 45, 104, 0.08)', color: '#0B2D68', border: '1px solid rgba(11, 45, 104, 0.2)' }}>{rep.service}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{rep.date}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#0B2D68', fontWeight: 800, marginBottom: '8px' }}>{rep.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '16px', lineHeight: 1.5 }}>{rep.summary}</p>
                <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '16px' }}>Author: {rep.author} • Size: {rep.fileSize}</div>
                <button
                  onClick={() => alert(`Simulated secure download for document: ${rep.title}`)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Download size={16} /> Download Consulting Report (PDF)
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Messaging */}
        {activeTab === 'messages' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid #E5E7EB', borderTop: '3px solid #C9A044', display: 'flex', flexDirection: 'column', height: '500px', boxShadow: '0 4px 16px rgba(11, 45, 104, 0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#0B2D68', fontWeight: 800, marginBottom: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
              Direct Chat Stream with Capt. K. V. Raman (Lead Trade Consultant)
            </h3>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '8px', marginBottom: '16px' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender.includes('Client') ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    background: msg.sender.includes('Client') ? '#0B2D68' : '#F5F6F8',
                    color: msg.sender.includes('Client') ? 'white' : '#172033',
                    border: msg.sender.includes('Client') ? '1px solid rgba(201, 160, 68, 0.4)' : '1px solid #E5E7EB',
                    padding: '12px 16px',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '4px', fontWeight: 700, color: msg.sender.includes('Client') ? '#C9A044' : '#0B2D68' }}>{msg.sender} • {msg.time}</div>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{msg.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Type your message to consultant..."
                value={newMessageText}
                onChange={e => setNewMessageText(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
              <button type="submit" className="btn-primary">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
