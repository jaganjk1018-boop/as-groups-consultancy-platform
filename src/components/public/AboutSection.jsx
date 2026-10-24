import React from 'react';
import { Target, Compass, Award, Users, ShieldCheck, CheckCircle2, ArrowRight, Lightbulb, TrendingUp } from 'lucide-react';
import { COMPANY_INFO, WHY_CHOOSE_US } from '../../data/mockData';
import WhyUsArticleSection from './WhyUsArticleSection';

export default function AboutSection({ onOpenBookModal }) {
  return (
    <div style={{ padding: '60px 0', background: 'var(--color-light-bg)' }}>
      <div className="container">
        
        {/* Banner Title */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>ABOUT AS GROUPS</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-navy)', marginBottom: '16px', fontWeight: 800 }}>
            AS GROUPS — BUSINESS CONSULTANT
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-royal-blue)', fontWeight: 700, marginBottom: '8px' }}>
            "{COMPANY_INFO.tagline}"
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)', lineHeight: 1.7 }}>
            {COMPANY_INFO.positioningStatement}
          </p>
        </div>

        {/* Founder Focus Card */}
        <div style={{ background: 'linear-gradient(135deg, #0B2D68 0%, #174A96 50%, #0B2D68 100%)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '40px', marginBottom: '50px', boxShadow: '0 20px 45px rgba(11,45,104,0.25)', border: '1px solid rgba(201,160,68,0.4)', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
            
            {/* CEO Image Container */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'absolute', inset: '-6px', borderRadius: '24px', background: 'linear-gradient(135deg, #C9A044, #DFC16E)', filter: 'blur(8px)', opacity: 0.6 }}></div>
                <img 
                  src={COMPANY_INFO.founder.image} 
                  alt={COMPANY_INFO.founder.name}
                  style={{
                    width: '100%',
                    maxWidth: '320px',
                    height: 'auto',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 2,
                    border: '2px solid rgba(201,160,68,0.7)',
                    boxShadow: '0 15px 35px rgba(7,29,66,0.6)'
                  }}
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  CHIEF EXECUTIVE OFFICER & FOUNDER
                </span>
              </div>
            </div>

            {/* CEO Content Details */}
            <div>
              <div style={{ fontSize: '0.8rem', color: '#DFC16E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '6px' }}>
                EXECUTIVE LEADERSHIP
              </div>
              <h2 style={{ fontSize: '2.3rem', color: 'white', marginBottom: '4px', fontWeight: 900 }}>
                {COMPANY_INFO.founder.name}
              </h2>
              <div style={{ fontSize: '1rem', color: '#DFC16E', fontWeight: 700, marginBottom: '18px' }}>
                {COMPANY_INFO.founder.designation}
              </div>

              <blockquote style={{ fontStyle: 'italic', color: '#FFFFFF', fontSize: '1.15rem', lineHeight: 1.6, borderLeft: '4px solid #C9A044', paddingLeft: '18px', margin: '0 0 20px', background: 'rgba(255,255,255,0.06)', padding: '12px 18px', borderRadius: '0 12px 12px 0' }}>
                {COMPANY_INFO.founder.quote}
              </blockquote>

              <p style={{ fontSize: '1.02rem', color: '#E5E7EB', lineHeight: 1.8, marginBottom: '22px' }}>
                {COMPANY_INFO.founder.bio}
              </p>

              {/* Achievements Grid */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#DFC16E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  KEY TRACK RECORD & MILESTONES
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {COMPANY_INFO.founder.achievements.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.07)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(201,160,68,0.25)', fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Expertise Badges */}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  STRATEGIC ADVISORY EXPERTISE
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {COMPANY_INFO.founder.expertise.map((exp, idx) => (
                    <span key={idx} style={{ background: 'rgba(23,74,150,0.6)', color: '#FFFFFF', border: '1px solid rgba(201,160,68,0.35)', padding: '5px 12px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 600 }}>
                      ✨ {exp}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Mission & Vision Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          
          {/* Mission */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(11,45,104,0.08)', color: 'var(--color-primary-navy)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={24} />
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-navy)', fontWeight: 800 }}>OUR MISSION</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-dark-text)', lineHeight: 1.8, background: 'var(--color-light-bg)', padding: '20px', borderRadius: '10px', borderLeft: '4px solid var(--color-primary-navy)' }}>
              To empower businesses and entrepreneurs with practical strategies, innovative ideas and customized consulting solutions that support sustainable growth and long-term success.
            </p>
          </div>

          {/* Vision */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(201,160,68,0.12)', color: 'var(--color-gold-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={24} />
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-navy)', fontWeight: 800 }}>OUR VISION</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-dark-text)', lineHeight: 1.8, background: 'var(--color-light-bg)', padding: '20px', borderRadius: '10px', borderLeft: '4px solid var(--color-gold-accent)' }}>
              To become a trusted business consulting partner for businesses, startups, hospitals, entrepreneurs and organizations seeking sustainable growth and meaningful transformation.
            </p>
          </div>

        </div>

        {/* Our Approach */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid var(--color-border-gray)', marginBottom: '50px', boxShadow: '0 4px 16px rgba(11,45,104,0.06)' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-navy)', marginBottom: '16px', fontWeight: 800 }}>
            Our Approach & Commitment
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)', lineHeight: 1.8, marginBottom: '24px' }}>
            Our approach is simple — understand the business, identify the challenges, develop the right strategy and support the journey towards sustainable growth.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)', lineHeight: 1.8, marginBottom: '30px' }}>
            Whether you are starting a new business, expanding an existing one or looking for better ways to reach your customers, AS GROUPS is here to help you move forward with clarity and confidence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--color-light-bg)', padding: '20px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-navy)', marginBottom: '6px', fontWeight: 700 }}>Strategy</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)' }}>Designing customized strategies tailored to your exact business objectives.</p>
            </div>
            <div style={{ background: 'var(--color-light-bg)', padding: '20px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-navy)', marginBottom: '6px', fontWeight: 700 }}>Marketing & Branding</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)' }}>Building high-visibility brand presence and effective marketing channels.</p>
            </div>
            <div style={{ background: 'var(--color-light-bg)', padding: '20px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-navy)', marginBottom: '6px', fontWeight: 700 }}>Sustainable Growth</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)' }}>Executing long-term growth plans with continuous support and refinement.</p>
            </div>
          </div>
        </div>

        {/* Why Choose AS GROUPS - Strategic Differentiators */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid var(--color-border-gray)', marginBottom: '50px', boxShadow: '0 4px 16px rgba(11,45,104,0.06)' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px', fontSize: '0.8rem', fontWeight: 800 }}>WHY CLIENTS TRUST US</span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--color-primary-navy)', fontWeight: 900, marginBottom: '12px' }}>
              Why Choose AS GROUPS?
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--color-secondary-gray)' }}>
              Built on senior consulting leadership, measurable ROI, tailored SOP blueprints, and long-term partnership commitment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border-gray)', boxShadow: '0 2px 10px rgba(11,45,104,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #C9A044' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0B2D68', background: 'rgba(11,45,104,0.08)', padding: '4px 10px', borderRadius: '99px' }}>
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0B2D68', background: 'var(--color-light-bg)', border: '1px solid var(--color-border-gray)', padding: '4px 10px', borderRadius: '99px' }}>
                      {item.stat}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-text)', fontWeight: 800, marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-accent)', fontWeight: 700, marginBottom: '12px' }}>
                    {item.tagline}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.highlights.map((hp, hIdx) => (
                      <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--color-dark-text)', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="#C9A044" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{hp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Strategic Blueprint Article */}
        <WhyUsArticleSection onOpenBookModal={onOpenBookModal} />

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0B2D68 0%, #174A96 100%)', color: 'white', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(201,160,68,0.3)', boxShadow: '0 12px 30px rgba(11,45,104,0.2)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', fontWeight: 800 }}>Ready to Move Forward with Clarity & Confidence?</h2>
          <p style={{ fontSize: '1rem', color: '#E5E7EB', marginBottom: '24px' }}>Let's discuss your business goals and explore the right strategy for you.</p>
          <button 
            onClick={onOpenBookModal} 
            className="btn-primary"
            style={{ display: 'inline-flex', padding: '12px 28px', fontSize: '0.95rem' }}
          >
            Get a Free Consultation
          </button>
        </div>

      </div>
    </div>
  );
}
