import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '../../utils/router';
import { 
  TrendingUp, 
  HeartHandshake, 
  Briefcase, 
  Globe, 
  Activity, 
  Store, 
  Utensils, 
  Layers, 
  Lightbulb,
  CheckCircle2, 
  ArrowRight,
  Calendar,
  FileCheck,
  Target,
  GitCommit,
  Search,
  Clock,
  Award,
  Wrench,
  HelpCircle,
  Sparkles,
  Plus,
  Check,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  Zap,
  BarChart3
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/mockData';

const iconMap = {
  TrendingUp,
  HeartHandshake,
  Briefcase,
  Globe,
  Activity,
  Store,
  Utensils,
  Layers,
  Lightbulb
};

const CATEGORIES = [
  'All',
  'Strategy & Marketing',
  'Startups & Setup',
  'Healthcare & Clinical',
  'Food & Retail',
  'Global Trade',
  'Franchise & Scale'
];

export default function ServicesSection({ onOpenBookModal, selectedServiceId, setSelectedServiceId }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(serviceId || selectedServiceId || SERVICES_LIST[0].id);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'roadmap' | 'deliverables' | 'faqs'
  const [viewMode, setViewMode] = useState('workspace'); // 'workspace' | 'grid'
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Sync activeId with URL serviceId param or prop change
  useEffect(() => {
    if (serviceId && SERVICES_LIST.some(s => s.id === serviceId)) {
      setActiveId(serviceId);
      if (setSelectedServiceId) setSelectedServiceId(serviceId);
    } else if (selectedServiceId) {
      setActiveId(selectedServiceId);
    }
  }, [serviceId, selectedServiceId, setSelectedServiceId]);

  const handleSelectService = (id) => {
    setActiveId(id);
    if (setSelectedServiceId) setSelectedServiceId(id);
    setOpenFaqIndex(null);
    navigate(`/services/${id}`, { replace: true });
  };

  // Filter Services
  const filteredServices = SERVICES_LIST.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedService = SERVICES_LIST.find(s => s.id === activeId) || SERVICES_LIST[0];
  const IconComponent = iconMap[selectedService.icon] || Briefcase;

  const toggleAddon = (addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter(a => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleBookCustomPackage = () => {
    if (onOpenBookModal) {
      onOpenBookModal(selectedService.id);
    }
  };

  return (
    <div style={{ padding: '60px 0 80px', background: 'var(--color-light-bg)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px', fontSize: '0.82rem', fontWeight: 800 }}>
            ✨ AS GROUPS COMPREHENSIVE ADVISORY PRACTICES
          </span>
          <h1 className="text-navy-heading" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.7rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--color-primary-navy)' }}>
            Interactive Consultancy Services & Strategic Hub
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-secondary-gray)', lineHeight: 1.7 }}>
            Explore deep execution roadmaps, deliverables, ROI benchmarks, and customizable consulting packages across our 8 specialized domain practices.
          </p>
        </div>

        {/* Filter Toolbar & Search Bar */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '18px 24px', border: '1px solid var(--color-border-gray)', boxShadow: '0 4px 16px rgba(11,45,104,0.04)', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '400px' }}>
              <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search services, features, or industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border-gray)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: 'var(--color-light-bg)'
                }}
              />
            </div>

            {/* View Mode Toggle Switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-light-bg)', padding: '4px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
              <button
                onClick={() => setViewMode('workspace')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: viewMode === 'workspace' ? '#0B2D68' : 'transparent',
                  color: viewMode === 'workspace' ? '#DFC16E' : '#6B7280',
                  boxShadow: viewMode === 'workspace' ? '0 2px 8px rgba(11,45,104,0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <List size={15} /> Detailed Workspace
              </button>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: viewMode === 'grid' ? '#0B2D68' : 'transparent',
                  color: viewMode === 'grid' ? '#DFC16E' : '#6B7280',
                  boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(11,45,104,0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Grid size={15} /> Grid Comparison
              </button>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--color-border-gray)', paddingTop: '14px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  border: selectedCategory === cat ? '1px solid #C9A044' : '1px solid var(--color-border-gray)',
                  background: selectedCategory === cat ? '#0B2D68' : 'var(--color-light-bg)',
                  color: selectedCategory === cat ? '#DFC16E' : 'var(--color-dark-text)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* View Mode 1: Detailed Workspace View */}
        {viewMode === 'workspace' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '32px', alignItems: 'start' }}>
            
            {/* Left Vertical Selector Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', paddingLeft: '4px' }}>
                Select Service ({filteredServices.length} Available):
              </div>

              {filteredServices.length === 0 ? (
                <div style={{ padding: '20px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b', fontSize: '0.88rem' }}>
                  No services matched your search or category filter.
                </div>
              ) : (
                filteredServices.map(s => {
                  const Icon = iconMap[s.icon] || Briefcase;
                  const isSelected = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectService(s.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid #C9A044' : '1px solid var(--color-border-gray)',
                        background: isSelected ? '#0B2D68' : 'white',
                        color: isSelected ? '#DFC16E' : 'var(--color-dark-text)',
                        fontWeight: isSelected ? 800 : 600,
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 8px 20px rgba(11, 45, 104, 0.2)' : 'none',
                        transition: 'all 0.25s ease',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(201,160,68,0.2)' : 'var(--color-light-bg)',
                          color: isSelected ? '#DFC16E' : 'var(--color-secondary-gray)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: isSelected ? '1px solid rgba(201,160,68,0.4)' : '1px solid var(--color-border-gray)',
                          flexShrink: 0
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.9rem', lineHeight: 1.3 }}>{s.title}</div>
                          <div style={{ fontSize: '0.72rem', color: isSelected ? '#E5E7EB' : 'var(--color-secondary-gray)', fontWeight: 600, marginTop: '2px' }}>{s.category}</div>
                        </div>
                      </div>
                      {isSelected && <ArrowRight size={16} color="#DFC16E" style={{ flexShrink: 0 }} />}
                    </button>
                  );
                })
              )}
            </div>

            {/* Right Selected Service Detail Workspace */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--color-border-gray)', boxShadow: '0 8px 30px rgba(11,45,104,0.06)' }}>
              
              {/* Service Title Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border-gray)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #0B2D68, #174A96)', color: '#DFC16E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(11, 45, 104, 0.25)', border: '1px solid rgba(201,160,68,0.35)', flexShrink: 0 }}>
                    <IconComponent size={32} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{selectedService.badge}</span>
                      <span style={{ fontSize: '0.75rem', color: '#0B2D68', background: 'rgba(11,45,104,0.08)', fontWeight: 700, padding: '2px 10px', borderRadius: '99px' }}>{selectedService.category}</span>
                    </div>
                    <h2 style={{ fontSize: '1.9rem', color: 'var(--color-primary-navy)', fontWeight: 900, lineHeight: 1.2 }}>{selectedService.title}</h2>
                  </div>
                </div>

                <button onClick={() => onOpenBookModal && onOpenBookModal(selectedService.id)} className="btn-primary w-auto justify-center py-2 sm:py-2.5 px-3.5 sm:px-5 text-xs sm:text-sm font-bold">
                  <Calendar size={16} /> Request {selectedService.title} Meeting
                </button>
              </div>

              {/* Service Meta Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
                <div style={{ background: 'var(--color-light-bg)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-secondary-gray)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#C9A044" /> Engagement Duration
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-dark-text)', marginTop: '4px' }}>
                    {selectedService.duration || '2 - 4 Weeks Setup'}
                  </div>
                </div>

                <div style={{ background: 'var(--color-light-bg)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-secondary-gray)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BarChart3 size={14} color="#C9A044" /> Target Impact / ROI
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-primary-navy)', marginTop: '4px' }}>
                    {selectedService.expectedRoi || '3.5x Return on Investment'}
                  </div>
                </div>

                <div style={{ background: 'var(--color-light-bg)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--color-border-gray)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-secondary-gray)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} color="#0B2D68" /> Lead Consultant
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-primary-navy)', marginTop: '4px' }}>
                    {selectedService.leadConsultant || 'Harish V J (Founder & CEO)'}
                  </div>
                </div>
              </div>

              {/* Sub-Navigation Workspace Tabs */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--color-border-gray)', marginBottom: '28px', overflowX: 'auto' }}>
                {[
                  { id: 'overview', label: 'Overview & Scope' },
                  { id: 'roadmap', label: '4-Phase Execution Roadmap' },
                  { id: 'deliverables', label: 'Deliverables & Tech Stack' },
                  { id: 'faqs', label: 'Custom Package Builder & FAQs' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      border: 'none',
                      borderBottom: activeTab === tab.id ? '3px solid #C9A044' : '3px solid transparent',
                      background: 'none',
                      color: activeTab === tab.id ? 'var(--color-primary-navy)' : 'var(--color-secondary-gray)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Overview & Scope */}
              {activeTab === 'overview' && (
                <div className="animate-fade-in">
                  
                  {/* Target Audience Banner */}
                  {selectedService.targetAudience && (
                    <div style={{ background: 'rgba(201,160,68,0.1)', border: '1px solid rgba(201,160,68,0.3)', color: '#0B2D68', padding: '12px 18px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                      <Target size={18} color="#C9A044" /> Target Audience: {selectedService.targetAudience}
                    </div>
                  )}

                  {/* Executive Overview */}
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '0.82rem', color: 'var(--color-secondary-gray)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '10px' }}>
                      Executive Overview & Commercial Proposition
                    </h4>
                    <p style={{ fontSize: '1.05rem', color: 'var(--color-dark-text)', lineHeight: 1.7, fontWeight: 500 }}>
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Core Execution Capabilities Grid */}
                  <div>
                    <h4 style={{ fontSize: '0.82rem', color: 'var(--color-secondary-gray)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '14px' }}>
                      Key Scope & Advisory Capabilities
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                      {selectedService.features.map((feat, i) => (
                        <div key={i} style={{ background: 'var(--color-light-bg)', padding: '14px 18px', borderRadius: '10px', border: '1px solid var(--color-border-gray)', display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem', color: 'var(--color-dark-text)', fontWeight: 600 }}>
                          <CheckCircle2 size={18} color="#C9A044" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: 4-Phase Execution Roadmap */}
              {activeTab === 'roadmap' && (
                <div className="animate-fade-in">
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--color-primary-navy)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <GitCommit size={18} color="#C9A044" /> Standard 4-Phase Consulting Methodology
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary-gray)' }}>
                      How AS GROUPS manages audit, strategy design, execution rollout, and long-term optimization.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    {selectedService.roadmap.map((step, idx) => (
                      <div key={idx} style={{ background: 'var(--color-light-bg)', padding: '20px', borderRadius: '14px', border: '1px solid var(--color-border-gray)', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'white', background: '#0B2D68', border: '1px solid rgba(201,160,68,0.4)', padding: '3px 10px', borderRadius: '99px' }}>
                            STAGE 0{idx + 1}
                          </span>
                          <Zap size={16} color="#C9A044" />
                        </div>
                        <h5 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-dark-text)', marginBottom: '8px' }}>
                          {step.phase}
                        </h5>
                        <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary-gray)', lineHeight: 1.6 }}>
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Deliverables & Tech Stack */}
              {activeTab === 'deliverables' && (
                <div className="animate-fade-in">
                  
                  {/* Tangible Deliverables List */}
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--color-primary-navy)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCheck size={18} color="#C9A044" /> Tangible Strategy & Execution Deliverables
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                      {selectedService.deliverables.map((item, idx) => (
                        <div key={idx} style={{ background: 'var(--color-light-bg)', padding: '14px 18px', borderRadius: '10px', border: '1px solid var(--color-border-gray)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-dark-text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <CheckCircle2 size={18} color="#C9A044" style={{ flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Technology Badges */}
                  {selectedService.toolsAndTech && (
                    <div>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--color-primary-navy)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wrench size={18} color="#0B2D68" /> Frameworks, Analytics & Tools Employed
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {selectedService.toolsAndTech.map((tool, idx) => (
                          <span key={idx} style={{ background: 'var(--color-light-bg)', color: 'var(--color-primary-navy)', border: '1px solid var(--color-border-gray)', padding: '8px 16px', borderRadius: '99px', fontSize: '0.84rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            🛠️ {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Tab 4: Custom Package Builder & Service FAQs */}
              {activeTab === 'faqs' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  
                  {/* Custom Modular Package Builder */}
                  {selectedService.modularAddons && (
                    <div style={{ background: 'linear-gradient(135deg, #0B2D68, #174A96)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(201,160,68,0.4)', color: 'white', boxShadow: '0 12px 30px rgba(11,45,104,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span className="badge badge-gold" style={{ fontSize: '0.72rem', fontWeight: 800, marginBottom: '4px' }}>
                            PACKAGE BUILDER
                          </span>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#DFC16E' }}>
                            Build Custom {selectedService.title} Package
                          </h4>
                        </div>
                        <span style={{ fontSize: '0.82rem', color: '#E5E7EB' }}>
                          {selectedAddons.length} Custom Add-on(s) Selected
                        </span>
                      </div>

                      <p style={{ fontSize: '0.88rem', color: '#E5E7EB', marginBottom: '16px' }}>
                        Select optional modular add-ons to customize your consulting engagement:
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                        {selectedService.modularAddons.map((addon, idx) => {
                          const isChecked = selectedAddons.includes(addon);
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleAddon(addon)}
                              style={{
                                background: isChecked ? 'rgba(201,160,68,0.2)' : 'rgba(255,255,255,0.06)',
                                border: isChecked ? '1px solid #C9A044' : '1px solid rgba(255,255,255,0.12)',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '0.84rem',
                                color: isChecked ? '#DFC16E' : '#E5E7EB',
                                fontWeight: isChecked ? 800 : 600,
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '6px',
                                background: isChecked ? '#C9A044' : 'rgba(255,255,255,0.12)',
                                color: isChecked ? '#0B2D68' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                {isChecked ? <Check size={14} /> : <Plus size={14} />}
                              </div>
                              <span>{addon}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 pt-4 border-t border-white/10">
                        <div style={{ fontSize: '0.84rem', color: '#E5E7EB' }}>
                          Ready to discuss your customized scope with <strong>{selectedService.leadConsultant}</strong>?
                        </div>
                        <button
                          onClick={handleBookCustomPackage}
                          className="btn-primary w-auto sm:w-auto justify-center py-2 sm:py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-black active:scale-[0.98]"
                        >
                          <Calendar size={15} /> Book Tailored Package
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Service Specific FAQs */}
                  {selectedService.faqs && (
                    <div>
                      <h4 style={{ fontSize: '0.88rem', color: 'var(--color-primary-navy)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={18} color="#C9A044" /> Frequently Asked Questions — {selectedService.title}
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {selectedService.faqs.map((faq, idx) => {
                          const isOpen = openFaqIndex === idx;
                          return (
                            <div key={idx} style={{ background: 'var(--color-light-bg)', borderRadius: '10px', border: '1px solid var(--color-border-gray)', overflow: 'hidden' }}>
                              <button
                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                style={{
                                  width: '100%',
                                  padding: '14px 18px',
                                  textAlign: 'left',
                                  background: 'none',
                                  border: 'none',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  fontWeight: 800,
                                  fontSize: '0.92rem',
                                  color: 'var(--color-dark-text)',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>❓ {faq.q}</span>
                                {isOpen ? <ChevronUp size={16} color="#6B7280" /> : <ChevronDown size={16} color="#6B7280" />}
                              </button>
                              {isOpen && (
                                <div style={{ padding: '0 18px 14px', fontSize: '0.88rem', color: 'var(--color-secondary-gray)', lineHeight: 1.6, borderTop: '1px dashed var(--color-border-gray)', paddingTop: '10px' }}>
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

        {/* View Mode 2: Grid Comparison View */}
        {viewMode === 'grid' && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredServices.map(s => {
              const Icon = iconMap[s.icon] || Briefcase;
              return (
                <div
                  key={s.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '1px solid var(--color-border-gray)',
                    boxShadow: '0 4px 16px rgba(11,45,104,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    borderTop: '3px solid #C9A044'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #0B2D68, #174A96)', color: '#DFC16E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={24} />
                      </div>
                      <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{s.badge}</span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-navy)', fontWeight: 900, marginBottom: '8px' }}>
                      {s.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-royal-blue)', fontWeight: 700, marginBottom: '12px' }}>
                      Category: {s.category}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                      {s.shortDesc}
                    </p>

                    {/* Timeline & ROI Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '0.75rem', background: 'var(--color-light-bg)', color: 'var(--color-secondary-gray)', border: '1px solid var(--color-border-gray)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                        ⏱️ {s.duration}
                      </span>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(11,45,104,0.08)', color: '#0B2D68', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                        📈 {s.expectedRoi}
                      </span>
                    </div>
                  </div>

                  <div className="btn-pair-responsive" style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '14px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { handleSelectService(s.id); setViewMode('workspace'); setActiveTab('overview'); }}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '7px 12px', fontSize: '0.8rem', minHeight: '36px', justifyContent: 'center' }}
                    >
                      Deep Scope
                    </button>
                    <button
                      onClick={() => onOpenBookModal && onOpenBookModal(s.id)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '7px 12px', fontSize: '0.8rem', minHeight: '36px', justifyContent: 'center' }}
                    >
                      Book Session
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
