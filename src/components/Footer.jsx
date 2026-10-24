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
    <footer style={{ background: '#0B2D68', color: '#FFFFFF', paddingTop: '65px', paddingBottom: '35px', borderTop: '2px solid rgba(201, 160, 68, 0.4)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/logo.png" alt="AS GROUPS Logo" style={{ height: '48px', width: 'auto', borderRadius: '10px', background: '#FFFFFF', padding: '4px', border: '1px solid rgba(201, 160, 68, 0.4)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 900, letterSpacing: '-0.01em' }}>{COMPANY_INFO.name}</h3>
                <span style={{ fontSize: '0.72rem', color: '#C9A044', letterSpacing: '0.14em', fontWeight: 800, textTransform: 'uppercase' }}>BUSINESS MANAGEMENT & CONSULTANT</span>
              </div>
            </div>
            <p style={{ color: '#C9A044', fontSize: '0.98rem', fontWeight: 800, marginBottom: '12px' }}>
              "YOUR GROWTH, OUR COMMITMENT"
            </p>
            <p style={{ fontSize: '0.86rem', color: '#E5E7EB', lineHeight: 1.6, marginBottom: '20px' }}>
              {COMPANY_INFO.positioningStatement}
            </p>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1', fontStyle: 'italic', borderLeft: '3px solid #C9A044', paddingLeft: '10px', marginBottom: '16px' }}>
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
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#E5E7EB',
                  border: '1px solid rgba(201, 160, 68, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Instagram size={15} color="#C9A044" /> Instagram
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
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#E5E7EB',
                  border: '1px solid rgba(201, 160, 68, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Linkedin size={15} color="#C9A044" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '18px', borderBottom: '2px solid #C9A044', paddingBottom: '6px', display: 'inline-block', fontWeight: 800 }}>
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
                    style={{ background: 'none', border: 'none', color: '#E5E7EB', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#C9A044'}
                    onMouseLeave={e => e.target.style.color = '#E5E7EB'}
                  >
                    ➔ {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '18px', borderBottom: '2px solid #C9A044', paddingBottom: '6px', display: 'inline-block', fontWeight: 800 }}>
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
                    style={{ background: 'none', border: 'none', color: '#E5E7EB', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '0.85rem' }}
                    onMouseEnter={e => e.target.style.color = '#C9A044'}
                    onMouseLeave={e => e.target.style.color = '#E5E7EB'}
                  >
                    • {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Portal Access */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '18px', borderBottom: '2px solid #C9A044', paddingBottom: '6px', display: 'inline-block', fontWeight: 800 }}>
              Contact Us
            </h4>
            <div style={{ fontSize: '0.88rem', color: '#E5E7EB', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} color="#C9A044" />
                <span>{COMPANY_INFO.contact.phones.join(' / ')}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} color="#C9A044" />
                <span>{COMPANY_INFO.contact.email}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={16} color="#C9A044" />
                <span>{COMPANY_INFO.contact.location}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.78rem', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Follow & Connect</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={COMPANY_INFO.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#E5E7EB',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(201, 160, 68, 0.3)'
                  }}
                >
                  <Instagram size={14} color="#C9A044" /> Instagram <ArrowUpRight size={12} />
                </a>
                <a
                  href={COMPANY_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#E5E7EB',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(201, 160, 68, 0.3)'
                  }}
                >
                  <Linkedin size={14} color="#C9A044" /> LinkedIn <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Statement & Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <div style={{ color: '#C9A044', fontSize: '0.96rem', fontWeight: 800, marginBottom: '8px' }}>
            Empowering Growth. Transforming Ideas. Creating Lasting Impact.
          </div>
          <div style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
            © {new Date().getFullYear()} AS GROUPS. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
