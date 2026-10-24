import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/mockData';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div style={{ padding: '60px 0', background: 'var(--color-light-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Industry Insights & Thought Leadership</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-navy)', marginBottom: '16px', fontWeight: 800 }}>
            AS Groups Consultancy Blog
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-secondary-gray)' }}>
            Expert commentary on statutory CSR changes, hospital marketing strategies, F&B operations, and global trade dynamics.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="hover-card" style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #C9A044' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-gold">{post.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-secondary-gray)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#C9A044" /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-navy)', marginBottom: '12px', lineHeight: 1.4, fontWeight: 800 }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary-gray)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="#0B2D68" /> {post.author}
                </div>
                <button
                  onClick={() => setSelectedArticle(post)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary-navy)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Read Article <ArrowRight size={14} color="#C9A044" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(7, 29, 66, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '36px',
              position: 'relative',
              border: '1px solid var(--color-border-gray)',
              boxShadow: '0 20px 50px rgba(11,45,104,0.25)'
            }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'var(--color-light-bg)',
                  border: '1px solid var(--color-border-gray)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-dark-text)'
                }}
              >
                <X size={18} />
              </button>

              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>{selectedArticle.category}</span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-navy)', marginBottom: '12px', fontWeight: 800 }}>{selectedArticle.title}</h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-secondary-gray)', marginBottom: '24px', display: 'flex', gap: '16px' }}>
                <span>By {selectedArticle.author}</span>
                <span>Published: {selectedArticle.date}</span>
              </div>

              <div style={{ fontSize: '1rem', color: 'var(--color-dark-text)', lineHeight: 1.8, whiteSpace: 'pre-line', borderTop: '1px solid var(--color-border-gray)', paddingTop: '20px' }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <button onClick={() => setSelectedArticle(null)} className="btn-primary w-auto justify-center text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-4 sm:px-6">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
