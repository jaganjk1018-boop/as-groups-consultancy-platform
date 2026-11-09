import React, { useState } from 'react';
import { 
  PROCESS_STEPS, 
  INITIAL_TESTIMONIALS, 
  COMPANY_INFO 
} from '../../data/mockData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Compass, 
  Layers, 
  Search, 
  Target, 
  TrendingUp, 
  Rocket, 
  ShieldCheck, 
  Award, 
  Store, 
  Utensils, 
  ChevronRight, 
  Sparkles, 
  Star, 
  Quote, 
  Phone, 
  Calendar, 
  Building2, 
  MapPin,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';

export default function ProcessSection({ onOpenBookModal }) {
  const [activeVerticalTab, setActiveVerticalTab] = useState('food');
  const [selectedStep, setSelectedStep] = useState(0);

  // Detailed stages expanding on the 5 core PROCESS_STEPS
  const detailedStages = [
    {
      step: '01',
      title: 'DISCOVERY & DIAGNOSTIC AUDIT',
      tagline: 'Deep-dive evaluation of your vision, unit economics & feasibility',
      icon: Search,
      badge: 'PHASE 1',
      duration: 'Week 1 - 2',
      overview: 'Every successful enterprise starts with total clarity. We evaluate your core business concept, current market standing, capital allocations, and target demographic needs before recommending any strategy.',
      keyActions: [
        'Comprehensive 360° business model & financial viability audit',
        'Customer persona definition and demand validation in target geography',
        'Identification of operational bottlenecks, cost leakages, and market gaps',
        'Direct strategy alignment workshop with Founder & CEO Harish Ambigadoss'
      ],
      deliverable: 'Comprehensive Diagnostic Audit & Opportunity Roadmap'
    },
    {
      step: '02',
      title: 'MARKET & LOCATION INTELLIGENCE',
      tagline: 'Hyper-local demographic analysis, competitor pricing & catchment mapping',
      icon: Compass,
      badge: 'PHASE 2',
      duration: 'Week 2 - 3',
      overview: 'Whether setting up a physical food outlet, hospital department, or corporate service, market dynamics dictate success. We conduct rigorous field research and data-backed footfall analysis.',
      keyActions: [
        'Catchment area footfall density, traffic flow, and demographic profiling',
        'Competitor pricing benchmarks, menu / service gap identification',
        'Real estate evaluation, lease terms review, and zoning suitability',
        'Customer willingness-to-pay and average order value (AOV) forecasting'
      ],
      deliverable: 'Location Suitability Scorecard & Competitor Matrix'
    },
    {
      step: '03',
      title: 'COMMERCIAL ARCHITECTURE & BRANDING',
      tagline: 'Designing high-margin offerings, brand identity & operational SOPs',
      icon: Layers,
      badge: 'PHASE 3',
      duration: 'Week 3 - 5',
      overview: 'We construct the blueprint of your venture: high-margin unit economics, distinct visual identity, high-visibility signage architecture, and standardized operating procedures (SOPs).',
      keyActions: [
        'Menu engineering / service package design for optimal gross profit margins',
        'Brand identity creation: logo, mascot, exterior illuminated signage & packaging',
        'Standard Operating Procedures (SOPs) for kitchen/clinical/office teams',
        'Vendor sourcing agreements, raw material procurement & pricing contracts'
      ],
      deliverable: 'Complete Operational Blueprint, Brand Kit & SOP Manuals'
    },
    {
      step: '04',
      title: 'TURNKEY PHYSICAL & DIGITAL EXECUTION',
      tagline: 'Hands-on store rollout, physical signage, digital funnels & team training',
      icon: Rocket,
      badge: 'PHASE 4',
      duration: 'Week 5 - 7',
      overview: 'We roll up our sleeves and execute on the ground alongside you. From installing glowing LED storefront signboards to running targeted digital campaigns, we transform blueprints into physical reality.',
      keyActions: [
        'Physical storefront installation, high-visibility LED fascia boards & interior branding',
        'Kitchen equipment layout optimization and order assembly counter setup',
        'Staff hiring assistance, customer service training, and POS system onboarding',
        'High-impact localized digital marketing launch campaigns (Meta, Google, local PR)'
      ],
      deliverable: 'Turnkey Launch-Ready Storefront & Pre-Opening Footfall Funnel'
    },
    {
      step: '05',
      title: 'LAUNCH, PERFORMANCE SCALING & EXPANSION',
      tagline: 'Grand opening execution, KPI monitoring, customer retention & franchise growth',
      icon: TrendingUp,
      badge: 'PHASE 5',
      duration: 'Week 8 & Ongoing',
      overview: 'Opening day is just the beginning. We provide on-site opening supervision, monitor daily unit metrics, optimize customer retention loops, and prepare the foundation for multi-city expansion.',
      keyActions: [
        'Grand opening event coordination, sampling activations & promotional rollout',
        'Daily unit sales tracking, customer feedback loops, and margin adjustments',
        'Repeat customer loyalty programs and local corporate delivery tie-ups',
        'Franchise network structuring and multi-location replication framework'
      ],
      deliverable: 'Sustainable Commercial Growth, ROI Tracking & Expansion Blueprint'
    }
  ];

  // Specific domain execution blueprints
  const verticalProcesses = {
    food: {
      title: 'Food Ventures, Tea Shops & Restaurants',
      subtitle: 'Turnkey Store Launches & Scalable QSR Operations',
      icon: Utensils,
      color: '#C9A044',
      highlights: [
        'Footfall & prime retail corridor site selection (high highway/commercial visibility)',
        'Menu engineering & cost margin structuring (smash burgers, tea, fried chicken, beverages)',
        'High-visibility glowing LED storefront fascia signage & friendly mascot branding',
        'Standardized recipe formulation, kitchen assembly flow, and inventory control SOPs',
        'Grand opening promotional buzz, local flyer distribution, and delivery aggregator onboarding'
      ]
    },
    healthcare: {
      title: 'Hospitals & Specialty Medical Clinics',
      subtitle: 'Ethical Healthcare Branding & Patient Trust Building',
      icon: ShieldCheck,
      color: '#0B2D68',
      highlights: [
        'Specialty department patient intake audit & demographic healthcare needs mapping',
        'Senior doctor authority profiling, clinical integrity review, and ethical messaging',
        'Hyper-local community healthcare awareness outreach and camp coordination',
        'Digital reputation management, patient experience SOPs, and emergency search optimization',
        'Hospital corporate tie-ups and localized physician referral networks'
      ]
    },
    franchise: {
      title: 'Franchise Networks & Multi-City Expansion',
      subtitle: 'Transforming Single Outlets into Regional Powerhouses',
      icon: Store,
      color: '#C9A044',
      highlights: [
        'Franchise Disclosure Document (FDD) & legal franchise agreement drafting',
        'Standardized store setup manual (kitchen dimensions, signage specs, equipment checklist)',
        'Franchisee fee models, royalty percentage structures, and marketing fund rules',
        'Investor pitch deck design and qualified franchisee screening protocol',
        'Territory allocation and multi-city supply chain logistics planning'
      ]
    },
    corporate: {
      title: 'MSME & Corporate Strategy Advisory',
      subtitle: 'Commercial Blueprints, Capital Efficiency & B2B Growth',
      icon: Building2,
      color: '#0B2D68',
      highlights: [
        'Business model restructuring to eliminate unprofitable revenue drains',
        'Working capital management and cash flow predictability frameworks',
        'B2B strategic enterprise partnership development and high-ticket sales pipelines',
        'Cross-border import/export compliance and international trade market entry',
        'Executive dashboard setup for real-time commercial metric tracking'
      ]
    }
  };

  const currentVertical = verticalProcesses[activeVerticalTab];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '60px 0 90px' }}>
      <div className="container">

        {/* 1. HERO HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 50px' }}>
          <span 
            className="badge badge-gold" 
            style={{ 
              marginBottom: '16px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 18px', 
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}
          >
            <Sparkles size={14} /> PROVEN 5-STAGE ADVISORY FRAMEWORK
          </span>
          
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.1rem)', color: '#0B2D68', fontWeight: 900, marginBottom: '18px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            From Strategic Blueprint to Physical Storefront
          </h1>
          
          <p style={{ fontSize: '1.12rem', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
            We do not just hand you advisory presentations. At <strong>AS GROUPS</strong>, we walk beside entrepreneurs through discovery, financial modeling, brand creation, on-the-ground store setup, and sustainable scaling.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={onOpenBookModal}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.92rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Calendar size={18} /> Book Strategy Consultation
            </button>
            <a
              href="#case-study"
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Store size={18} /> View Store Launch Case Study
            </a>
          </div>
        </div>

        {/* 2. THE 5-STAGE PROCESS INTERACTIVE TIMELINE */}
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '36px 30px', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(11,45,104,0.06)', marginBottom: '60px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span style={{ color: '#C9A044', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              HOW WE WORK WITH YOU
            </span>
            <h2 style={{ fontSize: '1.9rem', color: '#0B2D68', fontWeight: 900, marginTop: '6px' }}>
              Our 5-Stage Execution Methodology
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.94rem', marginTop: '8px' }}>
              Click any stage below to inspect key deliverables, timelines, and execution actions.
            </p>
          </div>

          {/* Stepper Tabs Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '32px' }}>
            {detailedStages.map((stg, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <button
                  key={stg.step}
                  onClick={() => setSelectedStep(idx)}
                  style={{
                    padding: '16px 14px',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    border: isSelected ? '2px solid #C9A044' : '1px solid #E2E8F0',
                    background: isSelected ? '#0B2D68' : '#F8FAFC',
                    color: isSelected ? '#FFFFFF' : '#0B2D68',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '100px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: isSelected ? '#DFC16E' : '#C9A044' }}>
                      {stg.step}
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: isSelected ? 'rgba(255,255,255,0.15)' : '#E2E8F0', color: isSelected ? '#FFFFFF' : '#475569' }}>
                      {stg.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, lineHeight: 1.3 }}>
                    {stg.title.split('&')[0].trim()}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Card */}
          {(() => {
            const current = detailedStages[selectedStep];
            const IconComp = current.icon;
            return (
              <div style={{ background: '#F8FAFC', borderRadius: '18px', padding: '32px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ background: '#0B2D68', color: '#FFFFFF', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                        PHASE {current.step}
                      </span>
                      <span style={{ color: '#64748B', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} color="#C9A044" /> Estimated Duration: {current.duration}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', color: '#0B2D68', fontWeight: 900, margin: '4px 0' }}>
                      {current.title}
                    </h3>
                    <p style={{ color: '#C9A044', fontSize: '0.95rem', fontWeight: 700 }}>
                      {current.tagline}
                    </p>
                  </div>

                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(201,160,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9E7422' }}>
                    <IconComp size={28} />
                  </div>
                </div>

                <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.7, marginBottom: '24px' }}>
                  {current.overview}
                </p>

                {/* Key Actions Grid */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0B2D68', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                    What We Execute in this Stage:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {current.keyActions.map((act, i) => (
                      <div key={i} style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#1E293B', fontWeight: 600 }}>
                        <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverable Pill */}
                <div style={{ background: '#0B2D68', color: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#DFC16E', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                      CORE DELIVERABLE
                    </span>
                    <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                      📦 {current.deliverable}
                    </div>
                  </div>
                  <button
                    onClick={onOpenBookModal}
                    style={{ background: '#C9A044', color: '#0B2D68', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 800, fontSize: '0.84rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    Discuss This Stage <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

        {/* 3. REAL-WORLD CASE STUDY SPOTLIGHT: TINTIN SMASH, EAT & REPEAT */}
        <section id="case-study" style={{ scrollMarginTop: '100px', marginBottom: '60px' }}>
          <div style={{ background: 'linear-gradient(135deg, #071D42 0%, #0B2D68 100%)', color: '#FFFFFF', borderRadius: '24px', padding: '44px 32px', border: '1px solid rgba(201,160,68,0.4)', boxShadow: '0 20px 50px rgba(7,29,66,0.3)' }}>
            
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
              <span style={{ background: 'rgba(201,160,68,0.2)', color: '#DFC16E', padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                ⭐ REAL-WORLD EXECUTION CASE STUDY
              </span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)', color: '#FFFFFF', fontWeight: 900, marginTop: '12px', marginBottom: '14px' }}>
                From Concept to Grand Opening: tintin SMASH, EAT & REPEAT
              </h2>
              <p style={{ color: '#E2E8F0', fontSize: '1.02rem', lineHeight: 1.6 }}>
                See our 5-phase consulting methodology in action. AS GROUPS executed the complete store launch, high-visibility signage architecture, and menu strategy for this buzzing fast-casual burger concept.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
              
              {/* Photo Showcase */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-6px', borderRadius: '22px', background: 'linear-gradient(135deg, #C9A044, #DFC16E)', filter: 'blur(10px)', opacity: 0.5 }}></div>
                <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '3px solid rgba(201,160,68,0.7)', boxShadow: '0 20px 45px rgba(0,0,0,0.5)' }}>
                  <img 
                    src="/tintin-burger.jpg" 
                    alt="tintin SMASH, EAT & REPEAT - Store Launch Execution by AS GROUPS" 
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                  
                  {/* Overlay Tag */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(7,29,66,0.95), transparent)', padding: '20px 18px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: '#DFC16E' }}>
                        <MapPin size={16} /> 2/302, Medavakkam Main Road, Mambakkam
                      </div>
                      <span style={{ background: '#16A34A', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                        LIVE & OPERATIONAL
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study Breakdown */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ background: '#EF4444', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                    FOOD & RESTAURANT ADVISORY
                  </span>
                  <span style={{ color: '#DFC16E', fontSize: '0.82rem', fontWeight: 700 }}>
                    Turnkey Launch by AS GROUPS
                  </span>
                </div>

                <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', fontWeight: 900, marginBottom: '14px', lineHeight: 1.3 }}>
                  Turnkey Store Setup, High-Impact Signage & Fast-Casual Brand Launch
                </h3>

                <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '22px' }}>
                  The founders of <strong>tintin</strong> partnered with AS GROUPS to build an energetic, memorable burger and fast-casual brand on Medavakkam Main Road, Mambakkam. We steered the project from location feasibility through to the opening night.
                </p>

                {/* 4 Pillars of Execution */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '26px' }}>
                  
                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,160,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#DFC16E' }}>
                      <Store size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                        1. Glowing Storefront Signage Architecture
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                        Engineered the illuminated 3D LED red lightbox fascia with the signature dog mascot, appetizing high-def food photography, and bold highway visibility.
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,160,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#DFC16E' }}>
                      <Utensils size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                        2. Menu Margin Engineering & Unit Economics
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                        Formulated signature smash burger combos, crispy chicken buckets, rolls, mojitos, and cold shakes for high kitchen prep speed and 65%+ gross margins.
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,160,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#DFC16E' }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                        3. Strategic Location & Catchment Mapping
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                        Selected 2/302 Medavakkam Main Road, Mambakkam to capture high vehicular traffic between Medavakkam and Kelambakkam, along with dense residential delivery reach.
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,160,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#DFC16E' }}>
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                        4. Opening Night Buzz & Local Customer Acquisition
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                        Orchestrated pre-opening tasting, social media teaser reels, flyer distribution, and phone order hotlines (+91 7550006656) to ensure strong day-one sales.
                      </div>
                    </div>
                  </div>

                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={onOpenBookModal}
                    className="btn-primary"
                    style={{ padding: '12px 24px', fontSize: '0.88rem', fontWeight: 800 }}
                  >
                    Launch Your Food Venture With Us
                  </button>
                  <a
                    href={`https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent('Hello AS GROUPS, I saw your tintin burger store launch case study and want to discuss setting up a restaurant / food venture.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#FFFFFF',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <Phone size={15} color="#DFC16E" /> WhatsApp About Store Setup
                  </a>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 4. DOMAIN-SPECIFIC PROCESS COMPARISON TABS */}
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '36px 30px', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(11,45,104,0.06)', marginBottom: '60px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 30px' }}>
            <span style={{ color: '#C9A044', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              CROSS-INDUSTRY EXPERTISE
            </span>
            <h2 style={{ fontSize: '1.9rem', color: '#0B2D68', fontWeight: 900, marginTop: '6px' }}>
              How Our Process Adapts to Your Industry
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.94rem', marginTop: '6px' }}>
              Our methodology is engineered to solve the distinct operational and regulatory realities of each sector.
            </p>
          </div>

          {/* Industry Selection Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
            {[
              { id: 'food', label: '🍽️ Food & Restaurants', icon: Utensils },
              { id: 'healthcare', label: '🏥 Hospitals & Clinics', icon: ShieldCheck },
              { id: 'franchise', label: '🏪 Franchise Networks', icon: Store },
              { id: 'corporate', label: '💼 Corporate & MSMEs', icon: Building2 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveVerticalTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: activeVerticalTab === tab.id ? '2px solid #0B2D68' : '1px solid #E2E8F0',
                  background: activeVerticalTab === tab.id ? '#0B2D68' : '#F8FAFC',
                  color: activeVerticalTab === tab.id ? '#FFFFFF' : '#475569'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Vertical Details Box */}
          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0' }}>
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0B2D68', fontWeight: 900, marginBottom: '4px' }}>
                {currentVertical.title}
              </h3>
              <p style={{ color: '#C9A044', fontSize: '0.92rem', fontWeight: 700 }}>
                {currentVertical.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {currentVertical.highlights.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155', fontWeight: 600 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(201,160,68,0.2)', color: '#0B2D68', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', fontSize: '0.75rem', fontWeight: 800 }}>
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={onOpenBookModal}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.86rem', fontWeight: 800 }}
              >
                Discuss {currentVertical.title.split('&')[0].trim()} Process With Harish Ambigadoss
              </button>
            </div>
          </div>

        </div>

        {/* 5. CLIENT ENDORSEMENTS & TESTIMONIALS */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>VERIFIED RESULTS</span>
            <h2 style={{ fontSize: '2rem', color: '#0B2D68', fontWeight: 900, marginBottom: '12px' }}>
              What Clients Say About Our Process
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B' }}>
              Real feedback from healthcare directors, restaurant founders, and corporate leaders who have trusted our execution frameworks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
            {INITIAL_TESTIMONIALS.map(t => (
              <div 
                key={t.id} 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '16px', 
                  padding: '30px', 
                  border: '1px solid #E2E8F0', 
                  boxShadow: '0 4px 18px rgba(11,45,104,0.05)', 
                  position: 'relative', 
                  borderTop: '4px solid #C9A044',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <Quote size={36} color="#E2E8F0" style={{ position: 'absolute', top: '20px', right: '20px' }} />
                  
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', color: '#C9A044' }}>
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#C9A044" />)}
                  </div>

                  <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.7, marginBottom: '22px', fontStyle: 'italic' }}>
                    "{t.quote}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0B2D68', fontSize: '0.96rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{t.role}, <strong>{t.company}</strong></div>
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. BOTTOM CALL TO ACTION */}
        <div style={{ background: '#0B2D68', color: '#FFFFFF', borderRadius: '20px', padding: '44px 32px', textAlign: 'center', border: '1px solid rgba(201,160,68,0.4)', boxShadow: '0 15px 35px rgba(11,45,104,0.15)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span style={{ color: '#DFC16E', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              TAKE THE FIRST STEP
            </span>
            <h2 style={{ fontSize: '2.1rem', color: '#FFFFFF', fontWeight: 900, marginTop: '8px', marginBottom: '14px' }}>
              Ready to Turn Your Business Vision Into Commercial Reality?
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '26px' }}>
              Schedule a one-on-one Process Strategy Session with <strong>Harish Ambigadoss (Founder & CEO)</strong>. We will review your idea, evaluate site or market feasibility, and map your customized roadmap.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
              <button
                onClick={onOpenBookModal}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.92rem', fontWeight: 800 }}
              >
                Book 30-Minute Strategy Call
              </button>
              <a
                href={`https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent('Hello AS GROUPS, I would like to schedule a process consultation to discuss my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#16A34A',
                  color: '#FFFFFF',
                  padding: '12px 22px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Phone size={16} /> WhatsApp Directly
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

