import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/mockData';
import { supabaseService } from '../services/supabaseService';

export default function BookModal({ isOpen, onClose, defaultServiceId, onAddLead, onAddNotification }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    serviceRequired: defaultServiceId ? (SERVICES_LIST.find(s => s.id === defaultServiceId)?.title || 'Physical & Digital Marketing') : 'Physical & Digital Marketing',
    requirement: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Thank you for contacting AS Groups. Our team will contact you shortly.');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.businessName || 'Consultation Request',
      service: formData.serviceRequired,
      message: formData.requirement
    };

    try {
      const enqResult = await supabaseService.createEnquiry(payload);
      if (enqResult && enqResult.message) {
        setSuccessMessage(enqResult.message);
      }
    } catch (err) {
      console.warn('FastAPI / Supabase endpoint offline, using local client intake.', err);
    }

    const newLead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      client_name: formData.name,
      company: formData.businessName || 'Consultation Request',
      email: formData.email,
      phone: formData.phone,
      service_name: formData.serviceRequired,
      status: 'New',
      notes: formData.requirement,
      date: new Date().toISOString().split('T')[0]
    };

    if (onAddLead) onAddLead(newLead);

    if (onAddNotification) {
      onAddNotification({
        id: `NT-${Math.floor(800 + Math.random() * 100)}`,
        channel: 'Email & WhatsApp',
        recipient: `${formData.phone} (${formData.name})`,
        template: 'Consultation Acknowledgment',
        status: 'Delivered',
        timestamp: new Date().toLocaleString(),
        message: `Thank you for contacting AS Groups. Our team will contact you shortly.`
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
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
      <div className="animate-fade-in" style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '520px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Header bar */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '24px', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Calendar size={14} /> FREE CONSULTATION
          </div>
          <h3 style={{ fontSize: '1.4rem', marginTop: '6px', fontWeight: 800 }}>LET'S DISCUSS YOUR BUSINESS</h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '4px' }}>
            Tell us a little about your business and what you would like to achieve.
          </p>
        </div>

        {/* Form Body or Success State */}
        <div style={{ padding: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', background: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px', fontWeight: 800 }}>Consultation Requested!</h3>
              <p style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '20px', lineHeight: 1.6, fontWeight: 600 }}>
                {successMessage}
              </p>
              <button onClick={handleReset} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div className="grid-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Company / Business Name</label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div className="grid-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Service Required *</label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  >
                    {SERVICES_LIST.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Preferred Meeting Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredMeetingDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, preferredMeetingDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Your Message / Requirement *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe your goals or challenges..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary" 
                  style={{ flex: 2, justifyContent: 'center', fontWeight: 800, opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> REQUEST CONSULTATION
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
