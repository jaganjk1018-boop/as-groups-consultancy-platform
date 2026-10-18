import React, { useState, useEffect } from 'react';
import { 
  Router, 
  Routes, 
  Route, 
  Navigate, 
  Outlet, 
  useLocation, 
  useNavigate,
  ScrollToTopOnNavigate 
} from './utils/router';
import Header from './components/Header';
import Footer from './components/Footer';
import BookModal from './components/BookModal';
import PromoPosterModal from './components/PromoPosterModal';
import { supabaseService } from './services/supabaseService';
import { MessageSquare, Sparkles, ArrowUp } from 'lucide-react';

// Authentication Pages
import LoginSelection from './components/LoginSelection';
import ClientLogin from './components/ClientLogin';
import AdminLogin from './components/AdminLogin';

// Public Page Modules
import HomeSection from './components/public/HomeSection';
import AboutSection from './components/public/AboutSection';
import ServicesSection from './components/public/ServicesSection';
import PortfolioSection from './components/public/PortfolioSection';
import TestimonialsSection from './components/public/TestimonialsSection';
import BlogSection from './components/public/BlogSection';
import CareerSection from './components/public/CareerSection';
import ContactSection from './components/public/ContactSection';
import NotFound from './components/public/NotFound';

// Dashboards
import ClientDashboard from './components/dashboards/ClientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';

// Mock Central Data & Info
import { 
  COMPANY_INFO,
  INITIAL_LEADS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PROJECTS, 
  INITIAL_REPORTS, 
  NOTIFICATION_LOGS 
} from './data/mockData';

// Dynamic SEO Document Title Manager
function DocumentTitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') {
      document.title = `${COMPANY_INFO.name} | Business Management & Corporate Advisory`;
    } else if (path.startsWith('/about')) {
      document.title = `About Us | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/services')) {
      document.title = `Advisory Services | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/industries') || path.startsWith('/portfolio')) {
      document.title = `Industries & Portfolio | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/process') || path.startsWith('/testimonials')) {
      document.title = `Our Process & Testimonials | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/why-us') || path.startsWith('/blog')) {
      document.title = `Why Choose Us & Insights | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/careers') || path.startsWith('/career')) {
      document.title = `Careers | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/contact')) {
      document.title = `Contact Us | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/login')) {
      document.title = `Portal Login | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/client-login')) {
      document.title = `Client Login | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/admin-login')) {
      document.title = `Admin Operations Portal | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/client-dashboard') || path.startsWith('/client')) {
      document.title = `Client Dashboard | ${COMPANY_INFO.name}`;
    } else if (path.startsWith('/admin-dashboard') || path.startsWith('/admin')) {
      document.title = `Admin Operations Command Center | ${COMPANY_INFO.name}`;
    } else {
      document.title = `Page Not Found | ${COMPANY_INFO.name}`;
    }
  }, [location.pathname]);

  return null;
}

// Top-Level Public Layout Component
function PublicLayout({
  setCurrentRole,
  currentUser,
  onLogout,
  setIsBookModalOpen,
  isBookModalOpen,
  selectedServiceId,
  handleAddLead,
  handleAddNotification,
  isPromoPosterOpen,
  setIsPromoPosterOpen,
  showScrollTop,
  scrollToTop,
  whatsappUrl
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header
        currentRole="public"
        setCurrentRole={setCurrentRole}
        onOpenBookModal={() => setIsBookModalOpen(true)}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer
        setCurrentRole={setCurrentRole}
        onOpenBookModal={() => setIsBookModalOpen(true)}
      />

      {/* Booking Modal */}
      <BookModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        defaultServiceId={selectedServiceId}
        onAddLead={handleAddLead}
        onAddNotification={handleAddNotification}
      />

      {/* Promotional Poster Modal */}
      <PromoPosterModal
        isOpen={isPromoPosterOpen}
        onClose={() => setIsPromoPosterOpen(false)}
        onOpenBookModal={() => setIsBookModalOpen(true)}
      />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to Top"
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            background: 'linear-gradient(135deg, #0a1936 0%, #1e3a8a 100%)',
            color: '#fef08a',
            borderRadius: '50px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '800',
            boxShadow: '0 8px 24px rgba(10, 25, 54, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
            zIndex: 9999,
            border: '1.5px solid rgba(212, 175, 55, 0.6)',
            cursor: 'pointer',
            fontSize: '0.82rem',
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowUp size={16} /> Top
        </button>
      )}

      {/* Floating Special Offer Poster Button (Bottom Left) */}
      <button
        onClick={() => setIsPromoPosterOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: 'linear-gradient(135deg, #d4af37, #c59b27)',
          color: '#0a1936',
          borderRadius: '50px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '900',
          boxShadow: '0 10px 25px rgba(197, 155, 39, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
          zIndex: 9998,
          border: '1px solid rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}
      >
        <Sparkles size={18} className="animate-pulse text-[#0a1936]" /> Special Offer Poster
      </button>

      {/* Floating WhatsApp Button (Bottom Right) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#25D366',
          color: 'white',
          borderRadius: '50px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold',
          boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
          zIndex: 9999,
          textDecoration: 'none',
          fontSize: '0.9rem'
        }}
      >
        <MessageSquare size={20} /> Chat With Us
      </a>
    </div>
  );
}

export default function App() {
  const [currentRole, setCurrentRole] = useState('public'); // public | client | admin
  const [selectedServiceId, setSelectedServiceId] = useState('physical-digital-marketing');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isPromoPosterOpen, setIsPromoPosterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // null | { name, email, role }
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track window scroll position for floating Scroll-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-open promotional popup poster on initial visit after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const hasSeen = sessionStorage.getItem('as_groups_poster_seen');
        if (!hasSeen) {
          setIsPromoPosterOpen(true);
          sessionStorage.setItem('as_groups_poster_seen', 'true');
        }
      } catch (err) {
        // Storage may be restricted in sandboxed environments
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // App Central State
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState(NOTIFICATION_LOGS);

  // Sync state with Database on mount
  useEffect(() => {
    async function syncDatabase() {
      const dbLeads = await supabaseService.getLeads();
      if (dbLeads) setLeads(dbLeads);

      const dbApts = await supabaseService.getAppointments();
      if (dbApts) setAppointments(dbApts);

      const dbProjects = await supabaseService.getProjects();
      if (dbProjects) setProjects(dbProjects);

      const dbReports = await supabaseService.getReports();
      if (dbReports) setReports(dbReports);

      const dbNotifs = await supabaseService.getNotifications();
      if (dbNotifs) setNotifications(dbNotifs);
    }
    syncDatabase();
  }, []);

  const handleAddLead = async (newLead) => {
    setLeads([newLead, ...leads]);
    await supabaseService.createLead(newLead);
  };

  const handleAddNotification = (newNotification) => {
    setNotifications([newNotification, ...notifications]);
  };

  const handleSelectServiceFromHome = (serviceId) => {
    setSelectedServiceId(serviceId);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('public');
  };

  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent(COMPANY_INFO.contact.whatsappMessage)}`;

  return (
    <>
      <ScrollToTopOnNavigate />
      <DocumentTitleManager />

      <Routes>
        {/* Public Website Routes */}
        <Route 
          element={
            <PublicLayout 
              setCurrentRole={setCurrentRole}
              currentUser={currentUser}
              onLogout={handleLogout}
              setIsBookModalOpen={setIsBookModalOpen}
              isBookModalOpen={isBookModalOpen}
              selectedServiceId={selectedServiceId}
              handleAddLead={handleAddLead}
              handleAddNotification={handleAddNotification}
              isPromoPosterOpen={isPromoPosterOpen}
              setIsPromoPosterOpen={setIsPromoPosterOpen}
              showScrollTop={showScrollTop}
              scrollToTop={scrollToTop}
              whatsappUrl={whatsappUrl}
            />
          }
        >
          <Route 
            path="/" 
            element={
              <HomeSection
                onOpenBookModal={() => setIsBookModalOpen(true)}
                onSelectService={handleSelectServiceFromHome}
              />
            } 
          />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route 
            path="/about" 
            element={<AboutSection onOpenBookModal={() => setIsBookModalOpen(true)} />} 
          />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />

          <Route 
            path="/services" 
            element={
              <ServicesSection
                onOpenBookModal={(serviceId) => {
                  if (serviceId && typeof serviceId === 'string') {
                    setSelectedServiceId(serviceId);
                  }
                  setIsBookModalOpen(true);
                }}
                selectedServiceId={selectedServiceId}
                setSelectedServiceId={setSelectedServiceId}
              />
            } 
          />
          <Route 
            path="/services/:serviceId" 
            element={
              <ServicesSection
                onOpenBookModal={(serviceId) => {
                  if (serviceId && typeof serviceId === 'string') {
                    setSelectedServiceId(serviceId);
                  }
                  setIsBookModalOpen(true);
                }}
                selectedServiceId={selectedServiceId}
                setSelectedServiceId={setSelectedServiceId}
              />
            } 
          />

          <Route 
            path="/industries" 
            element={<PortfolioSection onOpenBookModal={() => setIsBookModalOpen(true)} />} 
          />
          <Route path="/portfolio" element={<Navigate to="/industries" replace />} />

          <Route 
            path="/process" 
            element={<TestimonialsSection onOpenBookModal={() => setIsBookModalOpen(true)} />} 
          />
          <Route path="/testimonials" element={<Navigate to="/process" replace />} />

          <Route path="/why-us" element={<BlogSection />} />
          <Route path="/blog" element={<Navigate to="/why-us" replace />} />
          <Route path="/insights" element={<Navigate to="/why-us" replace />} />

          <Route path="/careers" element={<CareerSection />} />
          <Route path="/career" element={<Navigate to="/careers" replace />} />

          <Route 
            path="/contact" 
            element={
              <ContactSection 
                onAddLead={handleAddLead} 
                onAddNotification={handleAddNotification} 
              />
            } 
          />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />

          {/* 404 Catch-All Page inside layout */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dedicated Standalone Authentication Routes */}
        <Route 
          path="/login" 
          element={
            <LoginSelection 
              onSelectRole={(role) => {
                if (role === 'client-login') setCurrentRole('client');
                if (role === 'admin-login') setCurrentRole('admin');
                if (role === 'public') setCurrentRole('public');
              }}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setCurrentRole(user.role);
              }}
            />
          } 
        />
        <Route path="/login-select" element={<Navigate to="/login" replace />} />

        <Route 
          path="/client-login" 
          element={
            <ClientLogin 
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setCurrentRole('client');
              }} 
            />
          } 
        />

        <Route 
          path="/admin-login" 
          element={
            <AdminLogin 
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setCurrentRole('admin');
              }} 
            />
          } 
        />

        {/* Dedicated Client Portal Dashboard Route */}
        <Route 
          path="/client-dashboard" 
          element={
            <div className="min-h-screen flex flex-col relative">
              <Header 
                currentRole="client" 
                setCurrentRole={setCurrentRole} 
                onOpenBookModal={() => setIsBookModalOpen(true)}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
              <main className="flex-1">
                <ClientDashboard 
                  appointments={appointments} 
                  projects={projects} 
                  reports={reports} 
                  onOpenBookModal={() => setIsBookModalOpen(true)} 
                />
              </main>
              <Footer 
                setCurrentRole={setCurrentRole} 
                onOpenBookModal={() => setIsBookModalOpen(true)} 
              />
              
              <BookModal
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                defaultServiceId={selectedServiceId}
                onAddLead={handleAddLead}
                onAddNotification={handleAddNotification}
              />

              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  title="Scroll to Top"
                  aria-label="Scroll to Top"
                  style={{
                    position: 'fixed',
                    bottom: '84px',
                    right: '24px',
                    background: 'linear-gradient(135deg, #0a1936 0%, #1e3a8a 100%)',
                    color: '#fef08a',
                    borderRadius: '50px',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '800',
                    boxShadow: '0 8px 24px rgba(10, 25, 54, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
                    zIndex: 9999,
                    border: '1.5px solid rgba(212, 175, 55, 0.6)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ArrowUp size={16} /> Top
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'fixed',
                  bottom: '24px',
                  right: '24px',
                  background: '#25D366',
                  color: 'white',
                  borderRadius: '50px',
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
                  zIndex: 9999,
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <MessageSquare size={20} /> Chat With Us
              </a>
            </div>
          } 
        />
        <Route path="/client" element={<Navigate to="/client-dashboard" replace />} />

        {/* Dedicated Admin Operations Command Center Route */}
        <Route 
          path="/admin-dashboard" 
          element={
            <div className="min-h-screen flex flex-col relative">
              <Header 
                currentRole="admin" 
                setCurrentRole={setCurrentRole} 
                onOpenBookModal={() => setIsBookModalOpen(true)}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
              <main className="flex-1">
                <AdminDashboard 
                  leads={leads} 
                  setLeads={setLeads} 
                  appointments={appointments} 
                  setAppointments={setAppointments} 
                  projects={projects} 
                  setProjects={setProjects} 
                  reports={reports} 
                  setReports={setReports} 
                  notifications={notifications} 
                  onOpenBookModal={() => setIsBookModalOpen(true)} 
                />
              </main>
              <Footer 
                setCurrentRole={setCurrentRole} 
                onOpenBookModal={() => setIsBookModalOpen(true)} 
              />

              <BookModal
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                defaultServiceId={selectedServiceId}
                onAddLead={handleAddLead}
                onAddNotification={handleAddNotification}
              />

              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  title="Scroll to Top"
                  aria-label="Scroll to Top"
                  style={{
                    position: 'fixed',
                    bottom: '84px',
                    right: '24px',
                    background: 'linear-gradient(135deg, #0a1936 0%, #1e3a8a 100%)',
                    color: '#fef08a',
                    borderRadius: '50px',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '800',
                    boxShadow: '0 8px 24px rgba(10, 25, 54, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
                    zIndex: 9999,
                    border: '1.5px solid rgba(212, 175, 55, 0.6)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ArrowUp size={16} /> Top
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'fixed',
                  bottom: '24px',
                  right: '24px',
                  background: '#25D366',
                  color: 'white',
                  borderRadius: '50px',
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
                  zIndex: 9999,
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <MessageSquare size={20} /> Chat With Us
              </a>
            </div>
          } 
        />
        <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    </>
  );
}
