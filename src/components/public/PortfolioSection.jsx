import React from 'react';
import { PORTFOLIO_CASE_STUDIES } from '../../data/mockData';
import { ArrowUpRight, Award, TrendingUp, CheckCircle } from 'lucide-react';

export default function PortfolioSection({ onOpenBookModal }) {
  return (
    <div style={{ padding: '60px 0', background: 'var(--color-light-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Portfolio & Case Studies</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-navy)', marginBottom: '16px', fontWeight: 800 }}>
            Proven Track Record of Transformation
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)' }}>
            Discover how AS Groups has delivered measurable financial and operational growth across Healthcare, F&B, CSR Governance, and Global Trade.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {PORTFOLIO_CASE_STUDIES.map(item => (
            <div key={item.id} className="hover-card" style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.06)', borderTop: '3px solid #C9A044' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge badge-gold" style={{ position: 'absolute', top: '16px', left: '16px', backdropFilter: 'blur(4px)' }}>
                  {item.service}
                </span>
              </div>

              <div style={{ padding: '28px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary-gray)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.client}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-navy)', marginBottom: '12px', lineHeight: 1.3, fontWeight: 800 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {item.description}
                </p>

                <div style={{ background: 'var(--color-light-bg)', padding: '14px', borderRadius: '10px', border: '1px solid var(--color-border-gray)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary-gray)' }}>Key Impact</div>
                    <div style={{ fontWeight: 800, color: 'var(--color-primary-navy)', fontSize: '1rem' }}>{item.impact}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary-gray)' }}>Measured ROI</div>
                    <div style={{ fontWeight: 800, color: 'var(--color-gold-accent)', fontSize: '1rem' }}>{item.roi}</div>
                  </div>
                </div>

                <button onClick={onOpenBookModal} className="btn-primary" style={{ width: '100%', minHeight: '38px', padding: '8px 14px', fontSize: '0.84rem', justifyContent: 'center' }}>
                  Enquire Similar Strategy <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
