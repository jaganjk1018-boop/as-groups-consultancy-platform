import React, { useState } from 'react';
import { useNavigate } from '../../utils/router';
import { 
  Building2, 
  ArrowRight, 
  TrendingUp, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Activity, 
  Rocket, 
  Award, 
  Utensils, 
  Clock, 
  Star, 
  Sparkles, 
  Compass, 
  Layers, 
  Briefcase, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  BookOpen, 
  Quote 
} from 'lucide-react';
import { 
  SERVICES_LIST, 
  COMPANY_INFO, 
  INDUSTRIES_SERVED, 
  PROCESS_STEPS, 
  WHY_CHOOSE_US, 
  FAQ_LIST 
} from '../../data/mockData';
import HeroBannerSlider from './HeroBannerSlider';
import WhyUsArticleSection from './WhyUsArticleSection';

const iconMap = {
  TrendingUp,
  HeartHandshake,
  Briefcase,
  Activity,
  Rocket,
  Utensils,
  Award,
  Layers,
  Compass,
  Users,
  Sparkles
};

export default function HomeSection({ setActivePublicTab, onOpenBookModal, onSelectService }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* 1. HERO BANNER SLIDER WITH SHIFTING BACKGROUND IMAGES */}
      <HeroBannerSlider setActivePublicTab={setActivePublicTab} onOpenBookModal={onOpenBookModal} />


      {/* 5 LOGO PILLARS BANNER */}
      <section style={{ background: '#0a1936', padding: '30px 0', borderTop: '1px solid rgba(212,175,55,0.3)', borderBottom: '1px solid rgba(212,175,55,0.3)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div style={{ padding: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>📈</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fef08a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>BUSINESS GROWTH</div>
            </div>
            <div style={{ padding: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🤝</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fef08a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>STRATEGY & CONSULTING</div>
            </div>
            <div style={{ padding: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>💡</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fef08a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>INNOVATION & SOLUTIONS</div>
            </div>
            <div style={{ padding: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>👥</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fef08a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>MANAGEMENT EXCELLENCE</div>
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🎯</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fef08a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>YOUR SUCCESS, OUR COMMITMENT</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER SECTION */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            
            <div style={{ background: 'linear-gradient(135deg, #0a1936, #0f2b5c)', color: 'white', padding: '36px', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 40px rgba(10,25,54,0.25)', border: '1px solid rgba(212,175,55,0.4)', textCenter: 'center' }}>
              <div style={{ textCenter: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ position: 'absolute', inset: '-4px', borderRadius: '20px', background: 'linear-gradient(135deg, #d4af37, #c59b27)', filter: 'blur(6px)', opacity: 0.6 }}></div>
                  <img 
                    src={COMPANY_INFO.founder.image} 
                    alt={COMPANY_INFO.founder.name}
                    style={{
                      width: '180px',
                      height: '210px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      position: 'relative',
                      zIndex: 2,
                      border: '2px solid rgba(212,175,55,0.5)'
                    }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '4px' }}>
                  CHIEF EXECUTIVE OFFICER & FOUNDER
                </div>
                <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '4px', fontWeight: 900 }}>
                  {COMPANY_INFO.founder.name}
                </h2>
                <div style={{ fontSize: '0.88rem', color: '#fef08a', marginBottom: '18px', fontWeight: 700 }}>
                  {COMPANY_INFO.founder.designation}
                </div>

                <blockquote style={{ fontStyle: 'italic', color: '#fef08a', fontSize: '0.95rem', lineHeight: 1.6, borderLeft: '3px solid #d4af37', paddingLeft: '14px', margin: '0 0 18px', textAlign: 'left', background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '0 10px 10px 0' }}>
                  {COMPANY_INFO.founder.quote}
                </blockquote>

                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, textAlign: 'left' }}>
                  {COMPANY_INFO.founder.bio}
                </p>
              </div>
            </div>

            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>EXECUTIVE ADVISORY LEADERSHIP</span>
              <h2 className="text-navy-heading" style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '20px' }}>
                Practical Consulting Solutions for Sustainable Growth
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '16px' }}>
                Under the strategic leadership of <strong>Harish V J</strong>, AS GROUPS provides actionable consulting solutions for businesses looking to convert market opportunities into long-term profit.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '24px' }}>
                We cover 8 specialized verticals: Digital & Physical Marketing, Business Setup, Import & Export Trade, Hospital Marketing, Tea Shop & Restaurant Setup, Innovation Strategy, Franchise Development, and Corporate Branding.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#c59b27" /> Understand the business and its unique challenges
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#c59b27" /> Identify market opportunities and develop the right strategy
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#c59b27" /> Support your journey with clarity, confidence, and ongoing guidance
                </div>
              </div>

              <button onClick={() => navigate('/about')} className="btn-gold">
                Read Full CEO Profile & About Us <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES GRID (8 Verticals) */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '12px' }}>OUR SERVICES</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
              8 Customized Consulting Verticals
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Every business is different. That's why we provide customized consulting solutions designed around your business goals, challenges and opportunities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {SERVICES_LIST.map((service) => {
              const IconComp = iconMap[service.icon] || Briefcase;
              return (
                <div 
                  key={service.id}
                  className="hover-card"
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={24} />
                      </div>
                      <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>{service.badge}</span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)', marginBottom: '10px', fontWeight: 700 }}>
                      {service.title}
                    </h3>
                    
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                      {service.shortDesc}
                    </p>

                    {service.targetAudience && (
                      <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 700, marginBottom: '16px', background: '#f0f9ff', padding: '6px 10px', borderRadius: '6px' }}>
                        {service.targetAudience}
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <button
                      onClick={() => {
                        if (onSelectService) onSelectService(service.id);
                        navigate(`/services/${service.id}`);
                      }}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                    >
                      {service.buttonText || 'Learn More'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES WE SERVE */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '12px' }}>TARGET SECTORS</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
              Industries We Serve
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              We provide customized consulting solutions for businesses across different industries and stages of growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <div key={idx} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '10px', fontWeight: 700 }}>
                  {ind.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS (HOW WE WORK) */}
      <section style={{ padding: '80px 0', background: '#0f172a', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge badge-amber" style={{ marginBottom: '12px' }}>OUR METHODOLOGY</span>
            <h2 style={{ fontSize: '2.2rem', color: 'white', marginBottom: '16px' }}>
              How We Work
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
              Understand ➔ Analyze ➔ Strategize ➔ Execute ➔ Grow
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {PROCESS_STEPS.map((ps) => (
              <div key={ps.step} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38bdf8', marginBottom: '10px' }}>
                  {ps.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '8px', fontWeight: 700 }}>
                  {ps.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {ps.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE AS GROUPS? - COMPREHENSIVE STRATEGIC ADVANTAGE */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)', position: 'relative' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '14px', fontSize: '0.85rem', fontWeight: 800 }}>
              THE AS GROUPS ADVANTAGE
            </span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', color: 'var(--primary-900)', marginBottom: '18px', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Why Choose AS GROUPS as Your Growth Partner?
            </h2>
            <p style={{ fontSize: '1.08rem', color: '#475569', lineHeight: 1.75 }}>
              We combine strategic foresight, domain expertise, hands-on SOP structuring, and result-oriented marketing to help hospitals, startups, food ventures, and enterprises achieve sustainable expansion.
            </p>
          </div>

          {/* 6 Comprehensive Advantage Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Award;
              return (
                <div 
                  key={idx} 
                  style={{ 
                    background: 'white', 
                    borderRadius: '16px', 
                    padding: '32px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  className="hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Subtle Top Accent Border */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: idx % 2 === 0 ? 'linear-gradient(90deg, #1e3a8a, #3b82f6)' : 'linear-gradient(90deg, #d4af37, #fef08a)' }} />

                  <div>
                    {/* Top Pill & Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={24} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#d4af37', fontWeight: 800, background: '#fefce8', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Title & Tagline */}
                    <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '6px', fontWeight: 800 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: '#2563eb', fontWeight: 700, marginBottom: '14px' }}>
                      {item.tagline}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, marginBottom: '20px' }}>
                      {item.desc}
                    </p>

                    {/* Key Highlights Bulleted List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                      {item.highlights.map((point, pIdx) => (
                        <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem', color: '#334155', lineHeight: 1.5, fontWeight: 600 }}>
                          <CheckCircle2 size={16} color="#d4af37" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stat Badge Footer */}
                  <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Track Record:</span>
                    <span style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 800, background: '#ecfdf5', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      🏆 {item.stat}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Consultation Banner */}
          <div style={{ background: 'linear-gradient(135deg, #0a1936 0%, #1e3a8a 100%)', borderRadius: '20px', padding: '36px 40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', boxShadow: '0 20px 40px rgba(10, 25, 54, 0.25)', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
            <div>
              <div style={{ fontSize: '0.82rem', color: '#fef08a', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '6px' }}>
                READY TO EXPERIENCE THE AS GROUPS DIFFERENCE?
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'white', fontWeight: 800, margin: 0 }}>
                Schedule a Strategic Business Discovery Session
              </h3>
            </div>

            <button onClick={onOpenBookModal} className="btn-gold" style={{ padding: '14px 32px', fontSize: '0.96rem' }}>
              Book Your Strategic Session <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* 6.5. DEEP-DIVE STRATEGIC ARTICLE / INSIGHTS BLUEPRINT */}
      <WhyUsArticleSection onOpenBookModal={onOpenBookModal} />

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>FAQ</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-900)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: isOpen ? '#f8fafc' : 'white'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#0f172a',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="#2563eb" /> : <ChevronDown size={20} color="#64748b" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 20px 18px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CALL-TO-ACTION SECTION */}
      <section style={{ padding: '70px 0', background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', fontWeight: 800 }}>READY TO GROW YOUR BUSINESS?</h2>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '30px' }}>
            Whether you're starting a new business, looking to improve your marketing, expanding your operations or developing a new business idea, we're ready to understand your requirements.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button onClick={onOpenBookModal} className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', background: '#059669' }}>
              GET A FREE CONSULTATION
            </button>
            <button onClick={() => navigate('/contact')} className="btn-outline-white" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              CONTACT AS GROUPS
            </button>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Let's discuss your business goals and explore the right strategy for you.
          </div>
        </div>
      </section>

    </div>
  );
}
