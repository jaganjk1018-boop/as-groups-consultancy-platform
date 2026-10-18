import React from 'react';
import { INITIAL_TESTIMONIALS } from '../../data/mockData';
import { Star, Quote, ThumbsUp, ShieldCheck } from 'lucide-react';

export default function TestimonialsSection({ onOpenBookModal }) {
  return (
    <div style={{ padding: '60px 0', background: 'var(--bg-main)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-amber" style={{ marginBottom: '12px' }}>Client Reviews & Endorsements</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
            What Our Enterprise Clients Say
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Read real feedback from hospital directors, CSR heads, F&B owners, and global trade founders who rely on AS Groups.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {INITIAL_TESTIMONIALS.map(t => (
            <div key={t.id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
              <Quote size={40} color="#e2e8f0" style={{ position: 'absolute', top: '20px', right: '20px' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#f59e0b' }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#f59e0b" />)}
              </div>

              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--primary-900)', fontSize: '1rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{t.role}, <strong>{t.company}</strong></div>
                </div>
                <span className="badge badge-blue">{t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
