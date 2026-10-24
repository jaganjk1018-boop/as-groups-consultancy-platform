import React, { useState } from 'react';
import { CAREER_JOBS } from '../../data/mockData';
import { Briefcase, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function CareerSection() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', resume: '' });
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <div style={{ padding: '60px 0', background: 'var(--color-light-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Careers at AS Groups</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-navy)', marginBottom: '16px', fontWeight: 800 }}>
            Join Our Senior Consulting Practice
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)' }}>
            Shape the future of enterprise advisory across Corporate Strategy, CSR Compliance, Healthcare Branding, and Global Trade.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '50px' }}>
          {CAREER_JOBS.map(job => (
            <div key={job.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.05)', borderTop: '3px solid #C9A044' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>{job.department}</span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-navy)', marginBottom: '8px', fontWeight: 800 }}>{job.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)', lineHeight: 1.5, marginBottom: '16px' }}>{job.description}</p>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--color-secondary-gray)', marginBottom: '20px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} color="#0B2D68" /> {job.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} color="#C9A044" /> {job.experience}</span>
              </div>

              <button
                onClick={() => { setSelectedJob(job); setApplied(false); }}
                className="btn-primary"
                style={{ width: '100%', minHeight: '38px', padding: '8px 14px', justifyContent: 'center', fontSize: '0.84rem' }}
              >
                Apply for Position
              </button>
            </div>
          ))}
        </div>

        {/* Job Application Modal */}
        {selectedJob && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(7, 29, 66, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', maxWidth: '520px', width: '100%', padding: '32px', position: 'relative', border: '1px solid var(--color-border-gray)', boxShadow: '0 20px 50px rgba(11,45,104,0.25)' }}>
              {applied ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <CheckCircle2 size={48} color="#C9A044" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-navy)', fontWeight: 800 }}>Application Submitted!</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary-gray)', marginTop: '6px', marginBottom: '20px' }}>
                    Thank you <strong>{applicant.name}</strong>. Our Talent Acquisition team will review your application for <strong>{selectedJob.title}</strong>.
                  </p>
                  <button onClick={() => setSelectedJob(null)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-navy)', marginBottom: '4px', fontWeight: 800 }}>Apply: {selectedJob.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary-gray)', marginBottom: '20px' }}>{selectedJob.department} • {selectedJob.location}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: 'var(--color-dark-text)' }}>Full Name *</label>
                      <input type="text" required value={applicant.name} onChange={e => setApplicant({...applicant, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: 'var(--color-dark-text)' }}>Email Address *</label>
                      <input type="email" required value={applicant.email} onChange={e => setApplicant({...applicant, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: 'var(--color-dark-text)' }}>Phone Number *</label>
                      <input type="tel" required value={applicant.phone} onChange={e => setApplicant({...applicant, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px', color: 'var(--color-dark-text)' }}>LinkedIn Profile / Portfolio Link *</label>
                      <input type="url" required placeholder="https://linkedin.com/in/..." value={applicant.resume} onChange={e => setApplicant({...applicant, resume: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)' }} />
                    </div>
                  </div>

                  <div className="btn-pair-responsive" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="button" onClick={() => setSelectedJob(null)} className="btn-secondary" style={{ flex: 1, minHeight: '38px', padding: '8px 12px', fontSize: '0.84rem', justifyContent: 'center' }}>Cancel</button>
                    <button type="submit" className="btn-primary" style={{ flex: 2, minHeight: '38px', padding: '8px 14px', fontSize: '0.84rem', justifyContent: 'center' }}><Send size={15} /> Submit Application</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
