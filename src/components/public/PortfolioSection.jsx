import React from 'react';
import { PORTFOLIO_CASE_STUDIES } from '../../data/mockData';
import { ArrowUpRight, Award, TrendingUp, CheckCircle } from 'lucide-react';

export default function PortfolioSection({ onOpenBookModal }) {
  return (
    <div style={{ padding: '60px 0', background: 'var(--bg-main)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>Portfolio & Case Studies</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
            Proven Track Record of Transformation
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Discover how AS Groups has delivered measurable financial and operational growth across Healthcare, F&B, CSR Governance, and Global Trade.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {PORTFOLIO_CASE_STUDIES.map(item => (
            <div key={item.id} className="hover-card" style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge badge-blue" style={{ position: 'absolute', top: '16px', left: '16px', backdropFilter: 'blur(4px)' }}>
                  {item.service}
                </span>
              </div>

              <div style={{ padding: '28px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.client}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)', marginBottom: '12px', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {item.description}
                </p>

                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Key Impact</div>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>{item.impact}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Measured ROI</div>
                    <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '1rem' }}>{item.roi}</div>
                  </div>
                </div>

                <button onClick={onOpenBookModal} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Enquire Similar Strategy <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
