import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Clock, 
  Calendar, 
  Sparkles, 
  Quote, 
  Award,
  ChevronRight,
  TrendingUp,
  Activity,
  Rocket,
  Utensils,
  Globe
} from 'lucide-react';
import { WHY_AS_GROUPS_ARTICLE } from '../../data/mockData';

const pillarIcons = {
  'healthcare-marketing': Activity,
  'startup-setup': Rocket,
  'food-restaurant': Utensils,
  'export-trade': Globe
};

export default function WhyUsArticleSection({ onOpenBookModal }) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const article = WHY_AS_GROUPS_ARTICLE;
  const activePillar = article.pillars[activePillarIndex];
  const IconComponent = pillarIcons[activePillar.id] || TrendingUp;

  return (
    <section style={{ padding: '80px 0', background: 'white', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container" style={{ maxWidth: '1500px' }}>
        
        {/* Article Meta Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '16px' }}>
            <BookOpen size={16} />
            {article.meta.category}
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'var(--primary-900)', fontWeight: 900, lineHeight: 1.25, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {article.meta.title}
          </h2>

          <p style={{ fontSize: '1.08rem', color: '#475569', lineHeight: 1.75, marginBottom: '24px' }}>
            {article.meta.subtitle}
          </p>

          {/* Author & Meta Byline */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap', padding: '16px 24px', background: '#f8fafc', borderRadius: '99px', border: '1px solid #e2e8f0', width: 'fit-content', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/ceo.png" alt={article.meta.author} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d4af37' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>{article.meta.author}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{article.meta.authorRole}</div>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
              <Calendar size={15} color="#2563eb" />
              {article.meta.date}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
              <Clock size={15} color="#d4af37" />
              {article.meta.readTime}
            </div>
          </div>
        </div>

        {/* Key Track Record Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {article.keyMetrics.map((metric, mIdx) => (
            <div key={mIdx} style={{ background: 'linear-gradient(135deg, #0a1936 0%, #1e3a8a 100%)', padding: '24px', borderRadius: '16px', color: 'white', border: '1px solid rgba(212, 175, 55, 0.3)', boxShadow: '0 10px 25px rgba(10,25,54,0.15)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fef08a', marginBottom: '4px' }}>
                {metric.value}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
                {metric.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {metric.note}
              </div>
            </div>
          ))}
        </div>

        {/* Article Pillars Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '30px', scrollbarWidth: 'thin' }}>
          {article.pillars.map((pillar, pIdx) => {
            const isActive = pIdx === activePillarIndex;
            const TabIcon = pillarIcons[pillar.id] || TrendingUp;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarIndex(pIdx)}
                className="flex items-center gap-2 sm:gap-2.5 py-2 px-3.5 sm:py-3 sm:px-5 rounded-xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all"
                style={{
                  border: isActive ? '2px solid #1e3a8a' : '1px solid #e2e8f0',
                  background: isActive ? '#1e3a8a' : '#f8fafc',
                  color: isActive ? 'white' : '#334155',
                  cursor: 'pointer'
                }}
              >
                <TabIcon size={16} color={isActive ? '#fef08a' : '#1e3a8a'} />
                {pillar.badge}
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content Card */}
        <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '40px', border: '1px solid #e2e8f0', marginBottom: '45px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#dbeafe', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComponent size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#d4af37', fontWeight: 800, letterSpacing: '0.1em' }}>
                {activePillar.badge}
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 900, margin: 0 }}>
                {activePillar.title}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#1e40af', fontWeight: 700, lineHeight: 1.7, background: '#eff6ff', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #2563eb', marginBottom: '24px' }}>
            "{activePillar.summary}"
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
            {activePillar.content.map((paragraph, paraIdx) => (
              <p key={paraIdx} style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaways Checklist Box */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#d4af37" />
              Strategic Deliverables & Takeaways:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {activePillar.takeaways.map((takeaway, tIdx) => (
                <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#334155', fontWeight: 700 }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Quote & Conclusion Card */}
        <div style={{ background: 'linear-gradient(135deg, #0a1936 0%, #0f2b5c 100%)', borderRadius: '20px', padding: '40px', color: 'white', border: '1px solid rgba(212, 175, 55, 0.4)', boxShadow: '0 20px 40px rgba(10,25,54,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.2)', border: '2px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Quote size={28} color="#fef08a" />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <h4 style={{ fontSize: '1.4rem', color: '#fef08a', fontWeight: 800, marginBottom: '10px' }}>
                {article.conclusion.title}
              </h4>
              
              <p style={{ fontSize: '1.02rem', color: '#cbd5e1', lineHeight: 1.75, marginBottom: '20px' }}>
                {article.conclusion.text}
              </p>

              <blockquote style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#fef08a', borderLeft: '3px solid #d4af37', paddingLeft: '16px', margin: '0 0 24px' }}>
                {article.conclusion.quote}
              </blockquote>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={onOpenBookModal} className="btn-gold w-auto justify-center py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold">
                  Schedule Strategic Consultation <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
