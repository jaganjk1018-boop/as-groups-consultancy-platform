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
    <section style={{ padding: '80px 0', background: 'white', borderTop: '1px solid var(--color-border-gray)', borderBottom: '1px solid var(--color-border-gray)' }}>
      <div className="container" style={{ maxWidth: '1500px' }}>
        
        {/* Article Meta Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', background: 'rgba(11, 45, 104, 0.08)', color: 'var(--color-primary-navy)', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '16px' }}>
            <BookOpen size={16} />
            {article.meta.category}
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'var(--color-primary-navy)', fontWeight: 900, lineHeight: 1.25, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {article.meta.title}
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--color-secondary-gray)', lineHeight: 1.75, marginBottom: '24px' }}>
            {article.meta.subtitle}
          </p>

          {/* Author & Meta Byline */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap', padding: '16px 24px', background: 'var(--color-light-bg)', borderRadius: '99px', border: '1px solid var(--color-border-gray)', width: 'fit-content', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/ceo.png" alt={article.meta.author} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A044' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-dark-text)' }}>{article.meta.author}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary-gray)' }}>{article.meta.authorRole}</div>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--color-border-gray)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--color-secondary-gray)', fontWeight: 600 }}>
              <Calendar size={15} color="#0B2D68" />
              {article.meta.date}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--color-secondary-gray)', fontWeight: 600 }}>
              <Clock size={15} color="#C9A044" />
              {article.meta.readTime}
            </div>
          </div>
        </div>

        {/* Key Track Record Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {article.keyMetrics.map((metric, mIdx) => (
            <div key={mIdx} style={{ background: 'linear-gradient(135deg, #0B2D68 0%, #174A96 100%)', padding: '24px', borderRadius: '16px', color: 'white', border: '1px solid rgba(201, 160, 68, 0.35)', boxShadow: '0 10px 25px rgba(11,45,104,0.15)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#DFC16E', marginBottom: '4px' }}>
                {metric.value}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
                {metric.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#E5E7EB' }}>
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
                  border: isActive ? '2px solid #0B2D68' : '1px solid var(--color-border-gray)',
                  background: isActive ? '#0B2D68' : 'var(--color-light-bg)',
                  color: isActive ? 'white' : 'var(--color-dark-text)',
                  cursor: 'pointer'
                }}
              >
                <TabIcon size={16} color={isActive ? '#DFC16E' : '#0B2D68'} />
                {pillar.badge}
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content Card */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', border: '1px solid var(--color-border-gray)', marginBottom: '45px', boxShadow: '0 8px 24px rgba(11,45,104,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(11,45,104,0.08)', color: '#0B2D68', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComponent size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#C9A044', fontWeight: 800, letterSpacing: '0.1em' }}>
                {activePillar.badge}
              </span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-primary-navy)', fontWeight: 900, margin: 0 }}>
                {activePillar.title}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-primary-navy)', fontWeight: 700, lineHeight: 1.7, background: 'var(--color-light-bg)', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid var(--color-primary-navy)', marginBottom: '24px' }}>
            "{activePillar.summary}"
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
            {activePillar.content.map((paragraph, paraIdx) => (
              <p key={paraIdx} style={{ fontSize: '1rem', color: 'var(--color-dark-text)', lineHeight: 1.8, margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaways Checklist Box */}
          <div style={{ background: 'var(--color-light-bg)', padding: '24px', borderRadius: '14px', border: '1px solid var(--color-border-gray)' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-primary-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#C9A044" />
              Strategic Deliverables & Takeaways:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {activePillar.takeaways.map((takeaway, tIdx) => (
                <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--color-dark-text)', fontWeight: 700 }}>
                  <CheckCircle2 size={18} color="#C9A044" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Quote & Conclusion Card */}
        <div style={{ background: 'linear-gradient(135deg, #0B2D68 0%, #174A96 100%)', borderRadius: '20px', padding: '40px', color: 'white', border: '1px solid rgba(201, 160, 68, 0.4)', boxShadow: '0 20px 40px rgba(11,45,104,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(201, 160, 68, 0.2)', border: '2px solid #C9A044', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Quote size={28} color="#DFC16E" />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <h4 style={{ fontSize: '1.4rem', color: '#DFC16E', fontWeight: 800, marginBottom: '10px' }}>
                {article.conclusion.title}
              </h4>
              
              <p style={{ fontSize: '1.02rem', color: '#E5E7EB', lineHeight: 1.75, marginBottom: '20px' }}>
                {article.conclusion.text}
              </p>

              <blockquote style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#FFFFFF', borderLeft: '3px solid #C9A044', paddingLeft: '16px', margin: '0 0 24px' }}>
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
