import React from 'react';
import { useNavigate } from '../utils/router';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Globe,
  UserCheck,
  ShieldAlert,
  Instagram,
  Linkedin
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/mockData';

export default function Footer({ setActivePublicTab, setCurrentRole, onOpenBookModal }) {
  const navigate = useNavigate();

  return (
    <footer style={{ background: '#0a1936', color: 'white', paddingTop: '65px', paddingBottom: '35px', borderTop: '2px solid rgba(212,175,55,0.4)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/logo.png" alt="AS GROUPS Logo" style={{ height: '48px', width: 'auto', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', padding: '5px', border: '1px solid rgba(212,175,55,0.3)' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: 900, letterSpacing: '-0.01em' }}>{COMPANY_INFO.name}</h3>
                <span style={{ fontSize: '0.72rem', color: '#fef08a', letterSpacing: '0.14em', fontWeight: 800, textTransform: 'uppercase' }}>BUSINESS MANAGEMENT & CONSULTANT</span>
              </div>
            </div>
            <p className="text-gold-gradient" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '12px' }}>
              "YOUR GROWTH, OUR COMMITMENT"
            </p>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
              {COMPANY_INFO.positioningStatement}
            </p>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', borderLeft: '3px solid #d4af37', paddingLeft: '10px', marginBottom: '16px' }}>
              "{COMPANY_INFO.founder.quote}"
            </div>
            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <a 
                href={COMPANY_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram - @asgroupsbmc"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(220,39,67,0.3)'
                }}
              >
                <Instagram size={15} /> Instagram
              </a>
              <a 
                href={COMPANY_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn - Harish Ambigadoss"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#0077b5',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,119,181,0.3)'
                }}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fef08a', marginBottom: '18px', borderBottom: '2px solid #d4af37', paddingBottom: '6px', display: 'inline-block', fontWeight: 800 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', padding: 0 }}>
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/industries', label: 'Industries' },
                { path: '/process', label: 'Our Process' },
                { path: '/why-us', label: 'Why Us' },
                { path: '/careers', label: 'Careers' },
                { path: '/contact', label: 'Contact' }
              ].map(item => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      if (setCurrentRole) setCurrentRole('public');
                      navigate(item.path);
                    }}
                    style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fef08a'}
                    onMouseLeave={e => e.target.style.color = '#cbd5e1'}
                  >
                    ➔ {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fef08a', marginBottom: '18px', borderBottom: '2px solid #d4af37', paddingBottom: '6px', display: 'inline-block', fontWeight: 800 }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', padding: 0 }}>
              {SERVICES_LIST.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      if (setCurrentRole) setCurrentRole('public');
                      navigate(`/services/${s.id}`);
                    }}
                    style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '0.85rem' }}
                    onMouseEnter={e => e.target.style.color = '#fef08a'}
                    onMouseLeave={e => e.target.style.color = '#cbd5e1'}
                  >
                    • {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Portal Access */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fef08a', marginBottom: '18px', borderBottom: '2px solid #d4af37', paddingBottom: '6px', display: 'inline-block', fontWeight: 800 }}>
              Contact Us
            </h4>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} color="#d4af37" />
                <span>{COMPANY_INFO.contact.phones.join(' / ')}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} color="#60a5fa" />
                <span>{COMPANY_INFO.contact.email}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={16} color="#fef08a" />
                <span>{COMPANY_INFO.contact.location}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Follow & Connect</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={COMPANY_INFO.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#f472b6',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(244,114,182,0.1)',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(244,114,182,0.25)'
                  }}
                >
                  <Instagram size={14} /> Instagram <ArrowUpRight size={12} />
                </a>
                <a
                  href={COMPANY_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#38bdf8',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(56,189,248,0.1)',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(56,189,248,0.25)'
                  }}
                >
                  <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Page Access</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => navigate('/client-login')} style={{ background: 'none', border: 'none', color: '#fef08a', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Client Page <ArrowUpRight size={14} />
                </button>
                <span style={{ color: '#475569' }}>|</span>
                <button onClick={() => navigate('/admin-login')} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Admin Page <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Statement & Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <div className="text-gold-gradient" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>
            Empowering Growth. Transforming Ideas. Creating Lasting Impact.
          </div>
          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            © {new Date().getFullYear()} AS GROUPS. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
