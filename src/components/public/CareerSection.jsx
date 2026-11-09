import React, { useState, useMemo } from 'react';
import { CAREER_JOBS, COMPANY_INFO } from '../../data/mockData';
import { supabaseService } from '../../services/supabaseService';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Search, 
  X, 
  Upload, 
  FileText, 
  Sparkles, 
  Building2, 
  Users, 
  Award, 
  TrendingUp, 
  Phone, 
  Mail, 
  AlertCircle, 
  Loader2,
  ChevronRight
} from 'lucide-react';

export default function CareerSection({ onAddLead, onAddNotification }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Applicant Form State
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '1-3 Years',
    resumeLink: '',
    resumeFileName: '',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Categories for filter tabs
  const categories = ['All', 'Consulting', 'Healthcare', 'Hospitality', 'Marketing', 'Open Role'];

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return CAREER_JOBS.filter(job => {
      const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Open modal for a specific job
  const handleOpenApplyModal = (job) => {
    setSelectedJob(job);
    setApplied(false);
    setErrorMessage('');
    setApplicant({
      name: '',
      email: '',
      phone: '',
      experience: job.experience.includes('3+') ? '3-5 Years' : '1-3 Years',
      resumeLink: '',
      resumeFileName: '',
      note: ''
    });
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplied(false);
    setErrorMessage('');
  };

  // Handle resume file selection
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit. Please upload a smaller document.');
        return;
      }
      setErrorMessage('');
      setApplicant(prev => ({
        ...prev,
        resumeFileName: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
        resumeLink: prev.resumeLink || file.name
      }));
    }
  };

  // Form submission handler
  const handleApply = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!applicant.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!applicant.email.trim() || !applicant.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    const cleanPhone = applicant.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!applicant.resumeLink.trim() && !applicant.resumeFileName) {
      setErrorMessage('Please provide your resume link (LinkedIn/Google Drive) or upload your CV document.');
      return;
    }

    setIsSubmitting(true);
    const refCode = `ASG-APP-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const resumeInfo = applicant.resumeFileName 
        ? `${applicant.resumeFileName} | Link: ${applicant.resumeLink || 'Uploaded'}` 
        : applicant.resumeLink;

      // 1. Submit to Supabase / Backend API
      const enquiryPayload = {
        name: applicant.name.trim(),
        email: applicant.email.trim(),
        phone: applicant.phone.trim(),
        company: `Applicant: ${selectedJob.title}`,
        service: `Career Application: ${selectedJob.title}`,
        message: `Reference: ${refCode} | Role: ${selectedJob.title} (${selectedJob.department}) | Exp: ${applicant.experience} | Resume: ${resumeInfo} | Note: ${applicant.note || 'None'}`
      };

      try {
        await supabaseService.createEnquiry(enquiryPayload);
      } catch (err) {
        console.warn('Backend sync warning:', err);
      }

      // 2. Add to Lead Management for Admin Visibility
      const newLead = {
        id: `LD-${Math.floor(100 + Math.random() * 900)}`,
        client_name: applicant.name.trim(),
        company: `Career Candidate (${selectedJob.title})`,
        email: applicant.email.trim(),
        phone: applicant.phone.trim(),
        service_name: `Job: ${selectedJob.title}`,
        status: 'New',
        notes: `Exp: ${applicant.experience} | Resume: ${resumeInfo} | Ref: ${refCode}`,
        date: new Date().toISOString().split('T')[0]
      };

      if (onAddLead) {
        onAddLead(newLead);
      }

      // 3. Add to notifications
      if (onAddNotification) {
        onAddNotification({
          id: `NT-${Math.floor(800 + Math.random() * 100)}`,
          channel: 'Careers Intake',
          recipient: `${applicant.phone} (${applicant.name})`,
          template: 'Career Application Received',
          status: 'Delivered',
          timestamp: new Date().toLocaleString(),
          message: `Application ${refCode} submitted for ${selectedJob.title}.`
        });
      }

      // 4. Save to local storage for backup permanence
      try {
        const existingApps = JSON.parse(localStorage.getItem('as_groups_career_applications') || '[]');
        existingApps.unshift({
          ref: refCode,
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          ...applicant,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('as_groups_career_applications', JSON.stringify(existingApps));
      } catch (e) {}

      setApplicationRef(refCode);
      setApplied(true);
    } catch (err) {
      setErrorMessage('An unexpected error occurred while submitting. Please try again or apply directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp fast-track link after application
  const whatsappApplyUrl = selectedJob
    ? `https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent(
        `Hello AS GROUPS Careers Team, I have submitted my job application for "${selectedJob.title}" (Ref: ${applicationRef}). Name: ${applicant.name}, Phone: ${applicant.phone}. Sharing my resume for your review.`
      )}`
    : '';

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '60px 0 80px' }}>
      <div className="container">

        {/* HERO HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
          <span 
            className="badge badge-gold" 
            style={{ 
              marginBottom: '14px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 16px', 
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}
          >
            <Sparkles size={14} /> CAREERS AT AS GROUPS
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#0B2D68', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2 }}>
            Join Our Senior Consulting Practice
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
            Work alongside founders and industry pioneers across Corporate Growth Strategy, Ethical Healthcare Branding, F&B Operations, and Multi-City Expansion.
          </p>

          {/* Quick Pillars */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '0.85rem' }}>
            <div style={{ background: '#FFFFFF', padding: '8px 16px', borderRadius: '30px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', color: '#0B2D68', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <MapPin size={15} color="#C9A044" /> {COMPANY_INFO.contact.location} & Hybrid
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 16px', borderRadius: '30px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', color: '#0B2D68', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <Award size={15} color="#C9A044" /> Direct Mentorship by Harish Ambigadoss
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 16px', borderRadius: '30px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', color: '#0B2D68', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
              <TrendingUp size={15} color="#C9A044" /> Fast-Track Growth & Real Enterprise Impact
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(11,45,104,0.04)', marginBottom: '36px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search open positions by role, department, or keyword..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 46px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: '#F8FAFC'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '24px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: activeCategory === cat ? '1px solid #0B2D68' : '1px solid #E2E8F0',
                      background: activeCategory === cat ? '#0B2D68' : '#FFFFFF',
                      color: activeCategory === cat ? '#FFFFFF' : '#475569'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: 600 }}>
                Showing <strong>{filteredJobs.length}</strong> open {filteredJobs.length === 1 ? 'position' : 'positions'}
              </div>
            </div>

          </div>
        </div>

        {/* JOB CARDS GRID */}
        {filteredJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '50px' }}>
            <Briefcase size={44} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0B2D68', fontWeight: 800 }}>No roles match your search</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '6px', marginBottom: '20px' }}>
              Try adjusting your search query or view all open positions across departments.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="btn-primary"
              style={{ display: 'inline-flex', padding: '8px 20px', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '26px', marginBottom: '50px' }}>
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '16px', 
                  padding: '28px', 
                  border: '1px solid #E2E8F0', 
                  boxShadow: '0 4px 20px rgba(11,45,104,0.05)', 
                  borderTop: '4px solid #C9A044',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                    <span 
                      style={{ 
                        background: 'rgba(201, 160, 68, 0.12)', 
                        color: '#9E7422', 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '0.74rem', 
                        fontWeight: 800, 
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {job.department}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0B2D68', background: '#F1F5F9', padding: '3px 8px', borderRadius: '4px' }}>
                      {job.type}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#0B2D68', marginBottom: '10px', fontWeight: 800, lineHeight: 1.3 }}>
                    {job.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, marginBottom: '18px' }}>
                    {job.description}
                  </p>

                  {job.responsibilities && (
                    <div style={{ marginBottom: '20px', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0B2D68', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        Key Responsibilities:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {job.responsibilities.slice(0, 2).map((resp, idx) => (
                          <li key={idx} style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                            <span style={{ color: '#C9A044', fontWeight: 900 }}>•</span> {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.8rem', color: '#64748B', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} color="#0B2D68" /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} color="#C9A044" /> {job.experience}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenApplyModal(job)}
                    className="btn-primary"
                    style={{ 
                      width: '100%', 
                      minHeight: '42px', 
                      padding: '10px 16px', 
                      justifyContent: 'center', 
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>Apply for Position</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WHY WORK WITH US SECTION */}
        <div style={{ background: '#0B2D68', color: '#FFFFFF', borderRadius: '20px', padding: '44px 32px', marginBottom: '50px', border: '1px solid rgba(201,160,68,0.3)', boxShadow: '0 10px 30px rgba(11,45,104,0.15)' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span style={{ color: '#DFC16E', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Why Choose AS GROUPS
            </span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
              Culture, Exposure & Accelerated Leadership
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
              We are an entrepreneurial advisory firm where consultants do not push paper—they build businesses, lead client transformations, and solve critical enterprise challenges.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(201,160,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: '#DFC16E' }}>
                <Award size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>Direct Founder Access</h4>
              <p style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                Work directly alongside Founder Harish Ambigadoss on tier-1 client presentations, strategy sessions, and commercial negotiation.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(201,160,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: '#DFC16E' }}>
                <Building2 size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>Diverse Domain Exposure</h4>
              <p style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                Handle diverse portfolios: Hospitals, F&B concepts, Export hubs, retail brands, and scaling corporate ventures.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(201,160,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: '#DFC16E' }}>
                <TrendingUp size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>Merit-First Growth</h4>
              <p style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                No waiting for annual appraisals. Promotion and incentive compensation are tied directly to client success and execution quality.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(201,160,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: '#DFC16E' }}>
                <Users size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>Collaborative Team Spirit</h4>
              <p style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                Join a dynamic, growth-hungry team committed to excellence, integrity, and client confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* DIRECT HR OUTREACH BANNER */}
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#0B2D68', fontWeight: 800, marginBottom: '6px' }}>
              Have questions about careers or prefer direct WhatsApp submission?
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
              Connect directly with our Talent Acquisition Desk or email your CV to our senior recruiting team.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href={`https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent('Hello AS GROUPS HR, I am looking for career opportunities and would like to share my profile.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#16A34A',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Phone size={15} /> WhatsApp HR Directly
            </a>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}?subject=Career%20Inquiry%20-%20AS%20GROUPS`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F1F5F9',
                color: '#0B2D68',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid #CBD5E1'
              }}
            >
              <Mail size={15} /> Email Your Resume
            </a>
          </div>
        </div>

        {/* JOB APPLICATION MODAL */}
        {selectedJob && (
          <div 
            onClick={(e) => {
              if (e.target === e.currentTarget && !isSubmitting) handleCloseModal();
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(7, 29, 66, 0.8)',
              backdropFilter: 'blur(6px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              overflowY: 'auto'
            }}
          >
            <div 
              style={{ 
                background: '#FFFFFF', 
                borderRadius: '16px', 
                maxWidth: '560px', 
                width: '100%', 
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', 
                border: '1px solid #E2E8F0', 
                boxShadow: '0 25px 60px rgba(11,45,104,0.3)',
                overflow: 'hidden'
              }}
            >
              {/* Modal Top Bar */}
              <div style={{ background: '#0B2D68', color: '#FFFFFF', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #C9A044' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#DFC16E', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                    JOB APPLICATION
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, margin: '2px 0 0' }}>
                    {selectedJob.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                {applied ? (
                  /* SUCCESS STATE */
                  <div style={{ textAlign: 'center', padding: '16px 0' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,160,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <CheckCircle2 size={38} color="#C9A044" />
                    </div>
                    
                    <h3 style={{ fontSize: '1.35rem', color: '#0B2D68', fontWeight: 800, marginBottom: '6px' }}>
                      Application Submitted Successfully!
                    </h3>
                    
                    <div style={{ display: 'inline-block', background: '#F1F5F9', border: '1px dashed #0B2D68', borderRadius: '8px', padding: '6px 14px', margin: '10px auto 16px', fontSize: '0.84rem', fontWeight: 700, color: '#0B2D68' }}>
                      Application ID: <strong>{applicationRef}</strong>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                      Thank you, <strong>{applicant.name}</strong>. Your profile for <strong>{selectedJob.title}</strong> has been logged into our talent registry. Our Talent Acquisition team will review your qualifications and reach out within 2-3 business days.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <a
                        href={whatsappApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          background: '#16A34A',
                          color: '#FFFFFF',
                          padding: '12px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          textDecoration: 'none'
                        }}
                      >
                        <Phone size={16} /> Fast-Track on WhatsApp With Resume
                      </a>

                      <button
                        onClick={handleCloseModal}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', minHeight: '40px', fontSize: '0.88rem' }}
                      >
                        Done & Close
                      </button>
                    </div>
                  </div>
                ) : (
                  /* APPLICATION FORM */
                  <form onSubmit={handleApply}>
                    <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#475569' }}>
                      <span><strong>Department:</strong> {selectedJob.department}</span>
                      <span><strong>Location:</strong> {selectedJob.location}</span>
                    </div>

                    {errorMessage && (
                      <div style={{ background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', padding: '10px 14px', borderRadius: '8px', fontSize: '0.84rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Name */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px', color: '#0B2D68' }}>
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Senthil Nathan"
                          value={applicant.name} 
                          onChange={e => setApplicant({...applicant, name: e.target.value})} 
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }} 
                        />
                      </div>

                      {/* Email & Phone Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px', color: '#0B2D68' }}>
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            required 
                            placeholder="name@example.com"
                            value={applicant.email} 
                            onChange={e => setApplicant({...applicant, email: e.target.value})} 
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }} 
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px', color: '#0B2D68' }}>
                            Phone / WhatsApp Number *
                          </label>
                          <input 
                            type="tel" 
                            required 
                            placeholder="e.g. 9876543210"
                            value={applicant.phone} 
                            onChange={e => setApplicant({...applicant, phone: e.target.value})} 
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }} 
                          />
                        </div>
                      </div>

                      {/* Experience Level */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px', color: '#0B2D68' }}>
                          Total Relevant Experience *
                        </label>
                        <select
                          value={applicant.experience}
                          onChange={e => setApplicant({...applicant, experience: e.target.value})}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFFFFF' }}
                        >
                          <option value="Fresher / < 1 Year">Fresher / Less than 1 Year</option>
                          <option value="1-3 Years">1 - 3 Years</option>
                          <option value="3-5 Years">3 - 5 Years</option>
                          <option value="5+ Years">5+ Years Senior Professional</option>
                        </select>
                      </div>

                      {/* Resume / Portfolio Link */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px', color: '#0B2D68' }}>
                          Resume / Portfolio Link or File *
                        </label>
                        <input 
                          type="text" 
                          placeholder="Paste LinkedIn URL, Google Drive link, or GitHub"
                          value={applicant.resumeLink} 
                          onChange={e => setApplicant({...applicant, resumeLink: e.target.value})} 
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', marginBottom: '8px' }} 
                        />
                        
                        {/* File Upload Alternative */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <label 
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '6px', 
                              background: '#F1F5F9', 
                              border: '1px solid #CBD5E1', 
                              padding: '6px 12px', 
                              borderRadius: '6px', 
                              fontSize: '0.78rem', 
                              fontWeight: 700, 
                              color: '#0B2D68', 
                              cursor: 'pointer' 
                            }}
                          >
                            <Upload size={14} /> Upload PDF/Word Document
                            <input 
                              type="file" 
                              accept=".pdf,.doc,.docx" 
                              onChange={handleFileChange} 
                              style={{ display: 'none' }} 
                            />
                          </label>

                          {applicant.resumeFileName && (
                            <span style={{ fontSize: '0.78rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                              <FileText size={13} /> {applicant.resumeFileName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Brief Cover Note */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px', color: '#0B2D68' }}>
                          Brief Introduction / Key Skills (Optional)
                        </label>
                        <textarea 
                          rows={3}
                          placeholder="Tell us about your background, relevant projects, or why you want to work with AS GROUPS..."
                          value={applicant.note} 
                          onChange={e => setApplicant({...applicant, note: e.target.value})} 
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }} 
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '22px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                      <button 
                        type="button" 
                        onClick={handleCloseModal} 
                        disabled={isSubmitting}
                        className="btn-secondary" 
                        style={{ flex: 1, minHeight: '40px', padding: '8px 14px', fontSize: '0.86rem', justifyContent: 'center' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary" 
                        style={{ 
                          flex: 2, 
                          minHeight: '40px', 
                          padding: '8px 16px', 
                          fontSize: '0.86rem', 
                          justifyContent: 'center',
                          opacity: isSubmitting ? 0.75 : 1
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <Send size={15} /> 
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
