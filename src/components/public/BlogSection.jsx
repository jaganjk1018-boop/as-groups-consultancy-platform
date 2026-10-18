import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/mockData';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div style={{ padding: '60px 0', background: 'var(--bg-main)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>Industry Insights & Thought Leadership</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-900)', marginBottom: '16px' }}>
            AS Groups Consultancy Blog
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Expert commentary on statutory CSR changes, hospital marketing strategies, F&B operations, and global trade dynamics.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="hover-card" style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-purple">{post.category}</span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-900)', marginBottom: '12px', lineHeight: 1.4 }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} /> {post.author}
                </div>
                <button
                  onClick={() => setSelectedArticle(post)}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Read Article <ArrowRight size={14} />
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
            background: 'rgba(15, 23, 42, 0.75)',
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
              position: 'relative'
            }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>

              <span className="badge badge-purple" style={{ marginBottom: '12px' }}>{selectedArticle.category}</span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-900)', marginBottom: '12px' }}>{selectedArticle.title}</h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '24px', display: 'flex', gap: '16px' }}>
                <span>By {selectedArticle.author}</span>
                <span>Published: {selectedArticle.date}</span>
              </div>

              <div style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8, whiteSpace: 'pre-line', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: '30px', textAlign: 'right' }}>
                <button onClick={() => setSelectedArticle(null)} className="btn-primary">
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
