import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../../data/mockData';
import { supabaseService } from '../../services/supabaseService';

export default function ContactSection({ onAddLead, onAddNotification }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    serviceRequired: 'Physical & Digital Marketing',
    requirement: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Thank you for contacting AS Groups. Our team will contact you shortly.');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.businessName || 'Business Prospect',
      service: formData.serviceRequired,
      message: formData.requirement
    };

    try {
      // 1. Submit to Supabase Cloud + Local Database Engine
      const enqResult = await supabaseService.createEnquiry(payload);
      if (enqResult && enqResult.message) {
        setSuccessMessage(enqResult.message);
      }
    } catch (err) {
      console.warn('Enquiry database submission warning.', err);
    }

    // 2. Also register in client state / leads hub
    const newLead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      client_name: formData.name,
      company: formData.businessName || 'Business Prospect',
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
        template: 'Customer & Admin Auto Dispatch',
        status: 'Delivered',
        timestamp: new Date().toLocaleString(),
        message: `Thank you for contacting AS Groups. Our team will contact you shortly.`
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent(COMPANY_INFO.contact.whatsappMessage)}`;

  return (
    <div style={{ padding: '60px 0', background: 'var(--color-light-bg)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>CONTACT US</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)', color: 'var(--color-primary-navy)', marginBottom: '14px', fontWeight: 800, lineHeight: 1.2 }}>
            LET'S TALK ABOUT YOUR BUSINESS
          </h1>
          <p style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)', color: 'var(--color-secondary-gray)', lineHeight: 1.6 }}>
            Have a business idea? Looking to grow your existing business? Need help with marketing, branding or strategy? Tell us about your requirements and our team will get in touch with you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'start' }}>
          
          {/* Left Contact Details & WhatsApp Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="p-5 sm:p-8 rounded-2xl" style={{ background: 'white', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.06)', borderTop: '3px solid #C9A044' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-navy)', marginBottom: '20px', fontWeight: 800 }}>
                Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', background: 'rgba(11,45,104,0.08)', color: 'var(--color-primary-navy)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-primary-navy)' }}>📞 Phone</div>
                    <div style={{ color: 'var(--color-dark-text)', fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>
                      {COMPANY_INFO.contact.phones.join(' / ')}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', background: 'rgba(23,74,150,0.1)', color: 'var(--color-royal-blue)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-primary-navy)' }}>✉️ Email</div>
                    <div style={{ color: 'var(--color-dark-text)', fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>
                      {COMPANY_INFO.contact.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', background: 'rgba(201,160,68,0.12)', color: 'var(--color-gold-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-primary-navy)' }}>📍 Location</div>
                    <div style={{ color: 'var(--color-dark-text)', fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>
                      {COMPANY_INFO.contact.location}
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '16px', marginTop: '4px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--color-primary-navy)', fontSize: '0.9rem', marginBottom: '10px' }}>
                    🌐 Official Social Profiles
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <a
                      href={COMPANY_INFO.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: 'white',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(220,39,67,0.25)'
                      }}
                    >
                      <Instagram size={16} /> Instagram <ExternalLink size={12} />
                    </a>
                    <a
                      href={COMPANY_INFO.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#0077b5',
                        color: 'white',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(0,119,181,0.25)'
                      }}
                    >
                      <Linkedin size={16} /> LinkedIn <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Launch Banner */}
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <MessageSquare size={26} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>WhatsApp Chat</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#ecfdf5', marginBottom: '20px', lineHeight: 1.6 }}>
                Click below to start an instant WhatsApp conversation with AS GROUPS.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'white',
                  color: '#047857',
                  padding: '12px 22px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <MessageSquare size={18} /> Chat With Us
              </a>
            </div>

          </div>

          {/* Right Contact / Enquiry Form */}
          <div className="p-5 sm:p-8 rounded-2xl" style={{ background: 'white', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 20px rgba(11,45,104,0.06)', borderTop: '3px solid #C9A044' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={52} color="#C9A044" style={{ margin: '0 auto 14px' }} />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-navy)', marginBottom: '10px', fontWeight: 800 }}>
                  Enquiry Submitted!
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--color-dark-text)', marginBottom: '22px', lineHeight: 1.6, fontWeight: 600 }}>
                  {successMessage}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary w-full justify-center py-2.5 sm:py-3 active:scale-[0.98] min-h-[40px]">
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-primary-navy)', marginBottom: '4px', fontWeight: 800 }}>
                  SEND US AN ENQUIRY
                </h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-dark-text)' }}>Full Name *</label>
                  <input type="text" required placeholder="Enter your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)', fontSize: '0.92rem' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-dark-text)' }}>Phone Number *</label>
                    <input type="tel" required placeholder="Enter phone number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)', fontSize: '0.92rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-dark-text)' }}>Email Address *</label>
                    <input type="email" required placeholder="Enter email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)', fontSize: '0.92rem' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-dark-text)' }}>Company Name</label>
                  <input type="text" placeholder="Enter your business / company name" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)', fontSize: '0.92rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-dark-text)' }}>Service Required *</label>
                  <select value={formData.serviceRequired} onChange={e => setFormData({...formData, serviceRequired: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)', fontSize: '0.92rem' }}>
                    {SERVICES_LIST.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-dark-text)' }}>Message *</label>
                  <textarea rows={4} required placeholder="Briefly describe your requirements..." value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-gray)', background: 'var(--color-light-bg)', fontSize: '0.92rem', resize: 'vertical' }}></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full justify-center py-2.5 sm:py-3.5 px-5 sm:px-6 font-bold text-sm sm:text-base active:scale-[0.98] transition-all shadow-md min-h-[42px] sm:min-h-[46px]" 
                  style={{ marginTop: '4px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Consultation Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
