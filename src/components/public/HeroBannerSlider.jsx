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
        background: '#0B2D68',
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
            {/* Background Image */}
            <div
              className={isActive ? 'animate-kenburns' : ''}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(1.02) contrast(1.1) saturate(1.1)'
              }}
            />

            {/* Corporate Navy Gradient Overlay */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(11, 45, 104, 0.94) 0%, rgba(11, 45, 104, 0.72) 48%, rgba(11, 45, 104, 0.25) 100%)'
              }}
            />
          </div>
        );
      })}

      {/* Top Animated Progress Indicator Bar */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '3px', background: 'rgba(255, 255, 255, 0.15)' }}>
        <div 
          key={currentIndex}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #C9A044, #DFC16E)',
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
      <div className="container" style={{ position: 'relative', zIndex: 5, padding: '30px 16px 45px', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center', width: '100%' }}>
          
          {/* Left Column Content with Crisp Text & Shadows */}
          <div key={currentSlide.id}>
            
            {/* Pill & Stat Badge */}
            <div className="text-anim-fadeup" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: '99px',
                background: 'rgba(11, 45, 104, 0.9)',
                border: '1px solid rgba(201, 160, 68, 0.6)',
                color: '#DFC16E',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <img src="/logo.png" alt="AS GROUPS Logo" style={{ height: '18px', width: 'auto', borderRadius: '4px', background: 'white', padding: '1px' }} />
                {currentSlide.badge}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '99px',
                background: 'rgba(23, 74, 150, 0.85)',
                border: '1px solid rgba(201, 160, 68, 0.4)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <Award size={13} color="#DFC16E" />
                {currentSlide.statBadge}
              </div>
            </div>

            {/* Main Headline */}
            <h1 
              className="text-anim-title" 
              style={{ 
                fontSize: 'clamp(1.65rem, 5.5vw, 3.4rem)', 
                lineHeight: 1.15, 
                fontWeight: 900, 
                marginBottom: '14px', 
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}
            >
              {currentSlide.title}<br />
              <span style={{ color: '#DFC16E', textShadow: '0 4px 25px rgba(201,160,68,0.35)' }}>
                {currentSlide.highlightTitle}
              </span>
            </h1>

            {/* Subtitle */}
            <div 
              className="text-anim-subtitle" 
              style={{ 
                fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)', 
                fontWeight: 800, 
                color: '#DFC16E', 
                marginBottom: '10px',
                textShadow: '0 2px 10px rgba(0,0,0,0.7)'
              }}
            >
              {currentSlide.subtitle}
            </div>

            {/* Description */}
            <p 
              className="text-anim-desc" 
              style={{ 
                fontSize: 'clamp(0.88rem, 2.5vw, 1.02rem)', 
                color: '#F5F6F8', 
                lineHeight: 1.65, 
                marginBottom: '24px', 
                maxWidth: '620px',
                textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                fontWeight: 400
              }}
            >
              {currentSlide.description}
            </p>

            {/* Action Buttons & Highlights */}
            <div className="text-anim-actions">
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto mb-6">
                <button 
                  onClick={onOpenBookModal} 
                  className="btn-primary w-full sm:w-auto justify-center py-2.5 sm:py-3.5 px-4 sm:px-7 text-sm sm:text-base font-bold border border-[#C9A044]/60 active:scale-[0.98] transition-all min-h-[40px] sm:min-h-[44px]"
                >
                  Get Free Consultation <ArrowRight size={15} className="text-[#C9A044]" />
                </button>
                <button 
                  onClick={() => navigate('/services')} 
                  className="btn-outline-white w-full sm:w-auto justify-center py-2.5 sm:py-3.5 px-4 sm:px-6 text-sm sm:text-base font-bold border border-white/30 text-white bg-white/10 hover:border-[#C9A044] hover:text-[#DFC16E] backdrop-blur-md active:scale-[0.98] transition-all min-h-[40px] sm:min-h-[44px]"
                >
                  Explore Services
                </button>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#E5E7EB', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14} color="#C9A044" /> Strategic Advisory</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14} color="#C9A044" /> Customized Blueprint</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14} color="#C9A044" /> Sustainable Growth</span>
              </div>
            </div>
          </div>

          {/* Right Column Feature Card */}
          <div 
            key={currentSlide.id + '-card'} 
            className="dark-glass gold-glow-border card-anim-slide p-5 sm:p-7 rounded-2xl" 
            style={{ 
              background: 'rgba(11, 45, 104, 0.92)', 
              backdropFilter: 'blur(20px)', 
              border: '1px solid rgba(201, 160, 68, 0.35)', 
              boxShadow: '0 20px 40px rgba(7, 29, 66, 0.5)' 
            }}
          >
            <div style={{ borderBottom: '1px solid rgba(201, 160, 68, 0.3)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.72rem', color: '#C9A044', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>
                {currentSlide.cardTitle}
              </div>
              <h3 style={{ fontSize: '1.35rem', marginTop: '4px', fontWeight: 900, color: '#FFFFFF' }}>
                {currentSlide.cardSub}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {currentSlide.features.map((feat, fIdx) => (
                <div key={fIdx} style={{ background: 'rgba(255,255,255,0.06)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontWeight: 800, color: fIdx === 0 ? '#DFC16E' : fIdx === 1 ? '#93C5FD' : '#6EE7B7', marginBottom: '4px', fontSize: '0.92rem' }}>
                    {feat.title}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#E5E7EB', lineHeight: 1.5 }}>
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onOpenBookModal}
              className="btn-primary w-full justify-center border border-[#C9A044]/50 hover:border-[#C9A044]" 
              style={{ marginTop: '16px', fontSize: '0.88rem', padding: '9px 16px', minHeight: '38px' }}
            >
              Discuss {currentSlide.category} Needs
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
