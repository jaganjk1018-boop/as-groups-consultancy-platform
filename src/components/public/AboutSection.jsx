import React from 'react';
import { Target, Compass, Award, Users, ShieldCheck, CheckCircle2, ArrowRight, Lightbulb, TrendingUp } from 'lucide-react';
import { COMPANY_INFO, WHY_CHOOSE_US } from '../../data/mockData';
import WhyUsArticleSection from './WhyUsArticleSection';

export default function AboutSection({ onOpenBookModal }) {
  return (
    <div style={{ padding: '60px 0', background: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Banner Title */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '12px' }}>ABOUT AS GROUPS</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-900)', marginBottom: '16px', fontWeight: 800 }}>
            AS GROUPS — BUSINESS CONSULTANT
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#2563eb', fontWeight: 700, marginBottom: '8px' }}>
            "{COMPANY_INFO.tagline}"
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {COMPANY_INFO.positioningStatement}
          </p>
        </div>

        {/* Founder Focus Card */}
        <div style={{ background: 'linear-gradient(135deg, #0a1936 0%, #0f2b5c 50%, #0a1936 100%)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '40px', marginBottom: '50px', boxShadow: '0 20px 50px rgba(10,25,54,0.3)', border: '1px solid rgba(212,175,55,0.4)', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
            
            {/* CEO Image Container */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'absolute', inset: '-6px', borderRadius: '24px', background: 'linear-gradient(135deg, #d4af37, #c59b27)', filter: 'blur(8px)', opacity: 0.7 }}></div>
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
                    border: '2px solid rgba(212,175,55,0.6)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
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
              <div style={{ fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '6px' }}>
                EXECUTIVE LEADERSHIP
              </div>
              <h2 style={{ fontSize: '2.3rem', color: 'white', marginBottom: '4px', fontWeight: 900 }}>
                {COMPANY_INFO.founder.name}
              </h2>
              <div style={{ fontSize: '1rem', color: '#fef08a', fontWeight: 700, marginBottom: '18px' }}>
                {COMPANY_INFO.founder.designation}
              </div>

              <blockquote style={{ fontStyle: 'italic', color: '#fef08a', fontSize: '1.15rem', lineHeight: 1.6, borderLeft: '4px solid #d4af37', paddingLeft: '18px', margin: '0 0 20px', background: 'rgba(255,255,255,0.04)', padding: '12px 18px', borderRadius: '0 12px 12px 0' }}>
                {COMPANY_INFO.founder.quote}
              </blockquote>

              <p style={{ fontSize: '1.02rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '22px' }}>
                {COMPANY_INFO.founder.bio}
              </p>

              {/* Achievements Grid */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  KEY TRACK RECORD & MILESTONES
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {COMPANY_INFO.founder.achievements.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem', fontWeight: 700, color: '#fef08a' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Expertise Badges */}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  STRATEGIC ADVISORY EXPERTISE
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {COMPANY_INFO.founder.expertise.map((exp, idx) => (
                    <span key={idx} style={{ background: 'rgba(30,58,138,0.5)', color: '#cbd5e1', border: '1px solid rgba(96,165,250,0.3)', padding: '5px 12px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 600 }}>
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
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', background: '#dbeafe', color: '#1e40af', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={24} />
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-900)' }}>OUR MISSION</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, background: '#f8fafc', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #2563eb' }}>
              To empower businesses and entrepreneurs with practical strategies, innovative ideas and customized consulting solutions that support sustainable growth and long-term success.
            </p>
          </div>

          {/* Vision */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', background: '#d1fae5', color: '#047857', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={24} />
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-900)' }}>OUR VISION</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, background: '#f0fdf4', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
              To become a trusted business consulting partner for businesses, startups, hospitals, entrepreneurs and organizations seeking sustainable growth and meaningful transformation.
            </p>
          </div>

        </div>

        {/* Our Approach */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid var(--border-color)', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
            Our Approach & Commitment
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            Our approach is simple — understand the business, identify the challenges, develop the right strategy and support the journey towards sustainable growth.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '30px' }}>
            Whether you are starting a new business, expanding an existing one or looking for better ways to reach your customers, AS GROUPS is here to help you move forward with clarity and confidence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1e40af', marginBottom: '6px', fontWeight: 700 }}>Strategy</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>Designing customized strategies tailored to your exact business objectives.</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1e40af', marginBottom: '6px', fontWeight: 700 }}>Marketing & Branding</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>Building high-visibility brand presence and effective marketing channels.</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1e40af', marginBottom: '6px', fontWeight: 700 }}>Sustainable Growth</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>Executing long-term growth plans with continuous support and refinement.</p>
            </div>
          </div>
        </div>

        {/* Why Choose AS GROUPS - Strategic Differentiators */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid var(--border-color)', marginBottom: '50px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px', fontSize: '0.8rem', fontWeight: 800 }}>WHY CLIENTS TRUST US</span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--primary-900)', fontWeight: 900, marginBottom: '12px' }}>
              Why Choose AS GROUPS?
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748b' }}>
              Built on senior consulting leadership, measurable ROI, tailored SOP blueprints, and long-term partnership commitment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', background: '#dbeafe', padding: '4px 10px', borderRadius: '99px' }}>
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', background: '#ecfdf5', padding: '4px 10px', borderRadius: '99px' }}>
                      {item.stat}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 700, marginBottom: '12px' }}>
                    {item.tagline}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.highlights.map((hp, hIdx) => (
                      <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="#d4af37" style={{ flexShrink: 0, marginTop: '2px' }} />
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
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Ready to Move Forward with Clarity & Confidence?</h2>
          <p style={{ fontSize: '1rem', color: '#dbeafe', marginBottom: '24px' }}>Let's discuss your business goals and explore the right strategy for you.</p>
          <button onClick={onOpenBookModal} style={{ background: 'white', color: '#1e40af', padding: '14px 32px', borderRadius: 'var(--radius-md)', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
            Get a Free Consultation
          </button>
        </div>

      </div>
    </div>
  );
}
