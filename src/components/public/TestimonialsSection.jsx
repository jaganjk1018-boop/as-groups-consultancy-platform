import React from 'react';
import { INITIAL_TESTIMONIALS } from '../../data/mockData';
import { Star, Quote, ThumbsUp, ShieldCheck } from 'lucide-react';

export default function TestimonialsSection({ onOpenBookModal }) {
  return (
    <div style={{ padding: '60px 0', background: 'var(--color-light-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Client Reviews & Endorsements</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-navy)', marginBottom: '16px', fontWeight: 800 }}>
            What Our Enterprise Clients Say
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)' }}>
            Read real feedback from hospital directors, CSR heads, F&B owners, and global trade founders who rely on AS Groups.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {INITIAL_TESTIMONIALS.map(t => (
            <div key={t.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.06)', position: 'relative', borderTop: '3px solid #C9A044' }}>
              <Quote size={40} color="#E5E7EB" style={{ position: 'absolute', top: '20px', right: '20px' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#C9A044' }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#C9A044" />)}
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--color-dark-text)', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>

              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--color-primary-navy)', fontSize: '1rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-secondary-gray)' }}>{t.role}, <strong>{t.company}</strong></div>
                </div>
                <span className="badge badge-gold">{t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
