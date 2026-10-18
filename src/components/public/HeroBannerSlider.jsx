import React, { useState, useEffect } from 'react';
import { useNavigate } from '../../utils/router';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Activity, 
  Rocket, 
  Utensils, 
  Globe,
  CheckCircle2,
  Award
} from 'lucide-react';

const BANNER_SLIDES = [
  {
    id: 'growth',
    category: 'BUSINESS GROWTH',
    icon: TrendingUp,
    badge: '📈 STRATEGY & ADVISORY',
    title: 'BUILD YOUR BUSINESS.',
    highlightTitle: 'YOUR GROWTH, OUR COMMITMENT.',
    subtitle: 'Strategy • Marketing • Branding • Business Growth',
    description: 'At AS GROUPS, we help hospitals, clinics, startups, restaurants, entrepreneurs and businesses transform business challenges into practical strategies and sustainable expansion.',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=95',
    statBadge: '🏆 150+ Consultations Delivered',
    cardTitle: 'CORE BRAND COMMITMENT',
    cardSub: '"YOUR GROWTH, OUR COMMITMENT"',
    features: [
      { title: '🏥 Hospitals & Clinics Consulting', desc: 'Specialized healthcare marketing, hospital branding, and patient outreach workflows.' },
      { title: '🚀 Startups & Business Setup', desc: 'Turn ideas into structured business models, market validation, and growth roadmaps.' },
      { title: '🍽️ Tea Shops & Restaurants', desc: 'Concept development, food venture SOPs, branding, and customer acquisition.' }
    ]
  },
  {
    id: 'healthcare',
    category: 'HEALTHCARE MARKETING',
    icon: Activity,
    badge: '🏥 ETHICAL HEALTHCARE MARKETING',
    title: 'ELEVATE PATIENT TRUST &',
    highlightTitle: 'CLINICAL REPUTATION.',
    subtitle: 'Hospital Branding • Specialty Clinics • Local Outreach',
    description: 'Ethical, patient-centric marketing strategies designed to increase hospital footfall, specialty department inquiries, and community medical trust.',
    bgImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2400&q=95',
    statBadge: '🏥 40+ Healthcare Institutions Scaled',
    cardTitle: 'HEALTHCARE EXCELLENCE',
    cardSub: 'PATIENT-CENTRIC REPUTATION',
    features: [
      { title: '📍 Local Emergency & Geo-Visibility', desc: 'Dominating Google Maps & emergency care search listings for your locality.' },
      { title: '👨‍⚕️ Physician Referral Networks', desc: 'Doctor-to-doctor outreach and specialty clinic case management frameworks.' },
      { title: '💚 Patient Trust & Testimonial Hub', desc: 'Ethical health awareness content that builds long-term community confidence.' }
    ]
  },
  {
    id: 'startup',
    category: 'STARTUPS & SETUP',
    icon: Rocket,
    badge: '🚀 STARTUP ARCHITECTURE',
    title: 'TURN VISIONARY IDEAS INTO',
    highlightTitle: 'MARKET-READY VENTURES.',
    subtitle: 'Feasibility • Business Models • Pitch Kits • Compliance',
    description: 'Comprehensive business setup solutions from concept validation and commercial unit economics to market launch execution.',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=95',
    statBadge: '💼 98% Client Success & Retention',
    cardTitle: 'LAUNCH WITH CONFIDENCE',
    cardSub: 'STARTUP ADVISORY ENGINE',
    features: [
      { title: '📋 Viability & Market Validation', desc: 'In-depth market demand assessment and risk mitigation analysis.' },
      { title: '💡 Business Model Canvas', desc: 'Structuring high-margin revenue streams and operational workflows.' },
      { title: '🎯 Go-To-Market Execution', desc: 'Targeted customer acquisition campaigns and operational launch support.' }
    ]
  },
  {
    id: 'restaurant',
    category: 'TEA SHOP & RESTAURANT',
    icon: Utensils,
    badge: '🍽️ FOOD VENTURE ADVISORY',
    title: 'BUILD PROFITABLE FOOD &',
    highlightTitle: 'TEA OUTLET NETWORKS.',
    subtitle: 'Unit Economics • Menu Engineering • Store Branding',
    description: 'End-to-end food venture consulting covering kitchen SOPs, foot-traffic driver campaigns, staff training, and multi-branch franchising.',
    bgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=95',
    statBadge: '🍽️ 25+ Outlets Successfully Launched',
    cardTitle: 'FOOD VENTURE ENGINE',
    cardSub: 'HIGH-MARGIN STORE SOPS',
    features: [
      { title: '📜 Kitchen SOPs & Staff Training', desc: 'Standard operating procedures for consistent food quality & customer service.' },
      { title: '📊 Menu Engineering & Pricing', desc: 'High-margin item placement and optimal unit economics structuring.' },
      { title: '🏬 Foot-Traffic & Grand Launch', desc: 'Hyper-local promotional campaigns and food delivery platform optimization.' }
    ]
  },
  {
    id: 'trade',
    category: 'GLOBAL TRADE',
    icon: Globe,
    badge: '🌍 IMPORT & EXPORT CONSULTING',
    title: 'EXPAND YOUR BRAND ACROSS',
    highlightTitle: 'INTERNATIONAL MARKETS.',
    subtitle: 'Cross-Border Entry • HS Codes • Buyer Prospecting',
    description: 'Navigating international trade opportunities with destination market audits, distributor sourcing, and trade compliance guidance.',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=95',
    statBadge: '🌐 Cross-Border Trade Network',
    cardTitle: 'GLOBAL EXPANSION',
    cardSub: 'INTERNATIONAL TRADE ADVISORY',
    features: [
      { title: '🗺️ Destination Market Selection', desc: 'Identifying top international markets with high demand for your products.' },
      { title: '🤝 Global Buyer Prospecting', desc: 'Connecting domestic exporters with overseas agents and distributors.' },
      { title: '📑 Trade Compliance & Logistics', desc: 'HS code classification, documentation awareness, and shipping channels.' }
    ]
  }
];

export default function HeroBannerSlider({ setActivePublicTab, onOpenBookModal }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide shifting timer (shifts every 4.5 seconds cleanly without manual control buttons)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = BANNER_SLIDES[currentIndex];

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '650px',
        background: '#04091a',
        color: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Razor Sharp Ultra-HD Background Images with Smooth Scaling */}
      {BANNER_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            {/* Ultra Bright, High-Contrast 4K Background Image */}
            <div
              className={isActive ? 'animate-kenburns' : ''}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(1.05) contrast(1.15) saturate(1.15)'
              }}
            />

            {/* Subtle Text-Legibility Overlay (Preserves 100% Image Brightness & Clarity on Right Side) */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(4, 9, 26, 0.85) 0%, rgba(4, 9, 26, 0.55) 45%, rgba(4, 9, 26, 0.15) 100%)'
              }}
            />
          </div>
        );
      })}

      {/* Top Animated Progress Indicator Bar */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '3px', background: 'rgba(255, 255, 255, 0.2)' }}>
        <div 
          key={currentIndex}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #d4af37, #fef08a)',
            animation: 'autoTimerProgress 4.5s linear forwards'
          }}
        />
        <style>{`
          @keyframes autoTimerProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>

      {/* Main Banner Content Overlay */}
      <div className="container" style={{ position: 'relative', zIndex: 5, padding: '45px 20px 55px', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center', width: '100%' }}>
          
          {/* Left Column Content with Crisp Text & Shadows */}
          <div key={currentSlide.id}>
            
            {/* Pill & Stat Badge */}
            <div className="text-anim-fadeup" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '99px',
                background: 'rgba(7, 15, 38, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.7)',
                color: '#fef08a',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
              }}>
                <img src="/logo.png" alt="AS GROUPS Logo" style={{ height: '22px', width: 'auto', borderRadius: '4px' }} />
                {currentSlide.badge}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '99px',
                background: 'rgba(6, 78, 59, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.7)',
                color: '#6ee7b7',
                fontSize: '0.78rem',
                fontWeight: 700,
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
              }}>
                <Award size={14} />
                {currentSlide.statBadge}
              </div>
            </div>

            {/* Main Headline with Razor Sharp Drop Shadow */}
            <h1 
              className="text-anim-title" 
              style={{ 
                fontSize: 'clamp(2.3rem, 4.2vw, 3.5rem)', 
                lineHeight: 1.12, 
                fontWeight: 900, 
                marginBottom: '16px', 
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              {currentSlide.title}<br />
              <span className="text-gold-gradient" style={{ textShadow: '0 4px 25px rgba(212,175,55,0.4)' }}>
                {currentSlide.highlightTitle}
              </span>
            </h1>

            {/* Subtitle */}
            <div 
              className="text-anim-subtitle" 
              style={{ 
                fontSize: '1.15rem', 
                fontWeight: 800, 
                color: '#fef08a', 
                marginBottom: '12px',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)'
              }}
            >
              {currentSlide.subtitle}
            </div>

            {/* Description */}
            <p 
              className="text-anim-desc" 
              style={{ 
                fontSize: '1.02rem', 
                color: '#f1f5f9', 
                lineHeight: 1.7, 
                marginBottom: '32px', 
                maxWidth: '620px',
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                fontWeight: 500
              }}
            >
              {currentSlide.description}
            </p>

            {/* Action Buttons & Highlights */}
            <div className="text-anim-actions">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <button onClick={onOpenBookModal} className="btn-gold" style={{ padding: '15px 32px', fontSize: '0.98rem', boxShadow: '0 10px 25px rgba(212,175,55,0.35)' }}>
                  Get a Free Consultation <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => navigate('/services')} 
                  className="btn-outline-white" 
                  style={{ padding: '15px 26px', fontSize: '0.98rem', border: '1px solid rgba(212, 175, 55, 0.6)', color: '#fef08a', background: 'rgba(7, 15, 38, 0.6)', backdropFilter: 'blur(10px)' }}
                >
                  Explore Services
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={15} color="#d4af37" /> Strategic Advisory</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={15} color="#d4af37" /> Customized Blueprint</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={15} color="#d4af37" /> Sustainable Growth</span>
              </div>
            </div>
          </div>

          {/* Right Column Feature Card with Ultra Glassmorphism */}
          <div key={currentSlide.id + '-card'} className="dark-glass gold-glow-border card-anim-slide" style={{ borderRadius: 'var(--radius-lg)', padding: '32px', background: 'rgba(7, 15, 38, 0.88)', backdropFilter: 'blur(25px)', border: '1px solid rgba(212, 175, 55, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
            <div style={{ borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>
                {currentSlide.cardTitle}
              </div>
              <h3 className="text-gold-gradient" style={{ fontSize: '1.4rem', marginTop: '4px', fontWeight: 900 }}>
                {currentSlide.cardSub}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {currentSlide.features.map((feat, fIdx) => (
                <div key={fIdx} style={{ background: 'rgba(255,255,255,0.06)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div style={{ fontWeight: 800, color: fIdx === 0 ? '#fef08a' : fIdx === 1 ? '#60a5fa' : '#34d399', marginBottom: '4px', fontSize: '0.92rem' }}>
                    {feat.title}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onOpenBookModal}
              className="btn-gold" 
              style={{ width: '100%', marginTop: '24px', justifyContent: 'center', fontSize: '0.92rem' }}
            >
              Discuss {currentSlide.category} Needs
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
