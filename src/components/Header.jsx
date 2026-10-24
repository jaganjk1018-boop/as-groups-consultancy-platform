import React, { useState } from 'react';
import { useNavigate, useLocation } from '../utils/router';
import { 
  Building2, 
  Calendar, 
  LogIn,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Globe,
  Award,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Instagram,
  Linkedin
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activePublicTab, 
  setActivePublicTab,
  onOpenBookModal,
  currentUser,
  onLogout
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'about', path: '/about', label: 'About Us', icon: Info },
    { id: 'services', path: '/services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', path: '/industries', label: 'Industries', icon: Globe },
    { id: 'testimonials', path: '/process', label: 'Our Process', icon: ShieldCheck },
    { id: 'blog', path: '/why-us', label: 'Why Us', icon: Award },
    { id: 'career', path: '/careers', label: 'Careers', icon: Briefcase },
    { id: 'contact', path: '/contact', label: 'Contact', icon: MessageSquare }
  ];

  const isLinkActive = (link) => {
    if (link.path === '/') {
      return currentPath === '/' || currentPath === '/home';
    }
    return currentPath === link.path || currentPath.startsWith(link.path + '/');
  };

  const handleNavClick = (link) => {
    if (setActivePublicTab) setActivePublicTab(link.id);
    navigate(link.path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[1000] bg-[#0B2D68] text-white shadow-lg border-b border-[#C9A044]/30">

      {/* Top Secondary Menubar Strip (Contact Info & Office Hours) */}
      <div className="bg-[#071D42] border-b border-white/10 text-xs py-2 text-slate-200">
        <div className="container flex flex-wrap justify-between items-center gap-2">
          
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium text-[12px]">
            <a href={`tel:${COMPANY_INFO.contact.rawPhones[0]}`} className="flex items-center gap-1.5 hover:text-[#DFC16E] transition-colors">
              <Phone size={13} className="text-[#C9A044]" />
              <span>{COMPANY_INFO.contact.phones[0]}</span>
            </a>

            <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hidden md:flex items-center gap-1.5 hover:text-[#DFC16E] transition-colors">
              <Mail size={13} className="text-[#C9A044]" />
              <span>{COMPANY_INFO.contact.email}</span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-[#C9A044]" />
              <span>{COMPANY_INFO.contact.location}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 border-l border-white/15 pl-3">
              <a 
                href={COMPANY_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Instagram"
                className="text-[#C9A044] hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                <Instagram size={14} />
              </a>
              <a 
                href={COMPANY_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                className="text-[#C9A044] hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Office Hours & Quick Portal Badges */}
          <div className="flex items-center gap-4 text-[12px]">
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-300 font-semibold bg-[#0B2D68] px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Clock size={12} />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>

            {currentUser && (
              <div className="flex items-center gap-2">
                <span className="text-[#C9A044] font-bold">Hi, {currentUser.name}</span>
                <button onClick={onLogout} className="text-red-300 underline text-[11px]">Logout</button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Main Navigation Menubar Row */}
      <div className="container flex justify-between items-center h-16 sm:h-20">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => { 
            if (currentRole === 'client') {
              navigate('/client-dashboard');
            } else if (currentRole === 'admin') {
              navigate('/admin-dashboard');
            } else {
              setCurrentRole('public'); 
              setActivePublicTab('home'); 
              navigate('/'); 
            }
          }} 
          className="cursor-pointer flex items-center gap-2 sm:gap-3 group shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="AS GROUPS Logo" 
            className="h-10 sm:h-12 w-auto object-contain rounded-xl bg-white p-1 border border-[#C9A044]/40 group-hover:border-[#C9A044] transition-all shadow-sm shrink-0" 
          />
          <div>
            <div className="font-heading text-sm sm:text-xl font-black tracking-tight leading-none text-white flex items-center gap-1 sm:gap-1.5">
              {COMPANY_INFO.name}
              <span className="text-[9px] sm:text-[10px] bg-[#174A96] text-[#DFC16E] border border-[#C9A044]/40 font-bold px-1 sm:px-1.5 py-0.5 rounded">
                CONSULTING
              </span>
            </div>
            <div className="text-[8px] sm:text-[10px] text-[#C9A044] tracking-wider sm:tracking-[0.16em] font-bold uppercase mt-0.5 sm:mt-1 truncate max-w-[180px] sm:max-w-none">
              BUSINESS MANAGEMENT & CONSULTANT
            </div>
          </div>
        </div>

        {/* Desktop Public Navigation Menubar */}
        {currentRole === 'public' && (
          <nav className="hidden lg:flex gap-1 items-center bg-[#071D42]/60 p-1.5 rounded-2xl border border-white/10">
            {navLinks.map(link => {
              const IconComp = link.icon;
              const isActive = isLinkActive(link);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#174A96] text-white font-extrabold border border-[#C9A044]/50 shadow-sm' 
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComp size={14} className={isActive ? 'text-[#C9A044]' : 'text-[#C9A044]/80'} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Portal Menubar for Logged-In Roles */}
        {currentRole !== 'public' && (
          <nav className="hidden md:flex gap-2 items-center bg-[#071D42]/60 p-1.5 rounded-2xl border border-white/10">
            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => { setCurrentRole('public'); setActivePublicTab('home'); navigate('/'); }}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10"
                >
                  <Home size={14} className="text-[#C9A044]" /> Public Portal
                </button>
                <button
                  onClick={() => { navigate('/admin-dashboard'); }}
                  className="flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-2 rounded-xl bg-[#174A96] text-white border border-[#C9A044]/50 shadow-sm"
                >
                  <ShieldCheck size={14} className="text-[#C9A044]" /> Admin Page
                </button>
              </>
            )}

            {currentRole === 'client' && (
              <button
                onClick={() => { navigate('/client-dashboard'); }}
                className="flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-2 rounded-xl bg-[#174A96] text-white border border-[#C9A044]/50 shadow-sm"
              >
                <UserCheck size={14} className="text-[#C9A044]" /> Client Page
              </button>
            )}
          </nav>
        )}

        {/* Right Action CTA Buttons & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenBookModal}
            className="btn-primary text-xs h-9 sm:h-10 py-1.5 px-3 sm:py-2 sm:px-4 font-bold border border-[#C9A044]/50 hover:border-[#C9A044] shadow-sm flex items-center gap-1.5 sm:gap-2 active:scale-95 transition-all"
          >
            <Calendar size={13} className="shrink-0 text-[#C9A044]" />
            <span className="hidden sm:inline">Get Free Consultation</span>
            <span className="sm:hidden font-bold">Consult</span>
          </button>

          {/* Mobile Hamburger Menubar Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/10 text-[#C9A044] border border-[#C9A044]/30 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center"
            aria-label="Toggle Menubar"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Collapsible Menubar Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0B2D68] border-t border-[#C9A044]/30 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          
          <div className="text-xs font-extrabold uppercase text-[#C9A044] tracking-wider mb-2">
            Navigation Menu
          </div>

          {currentRole === 'public' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navLinks.map(link => {
                  const IconComp = link.icon;
                  const isActive = isLinkActive(link);
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-[#174A96] text-white border-[#C9A044] font-extrabold' 
                          : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComp size={16} className={isActive ? 'text-[#C9A044]' : 'text-[#C9A044]/80'} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight size={16} className={isActive ? 'text-[#C9A044]' : 'text-slate-400'} />
                    </button>
                  );
                })}
              </div>

            </>
          ) : currentRole === 'client' ? (
            <div className="space-y-2">
              <button
                onClick={() => { navigate('/client-dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full btn-primary flex items-center justify-center gap-2 text-xs font-bold py-2.5 min-h-[40px] rounded-xl border border-[#C9A044]/50"
              >
                <UserCheck size={16} className="text-[#C9A044]" /> Client Page
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { setCurrentRole('public'); setActivePublicTab('home'); navigate('/'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 min-h-[40px] rounded-xl bg-white/5 text-slate-200 border border-white/10 mb-2 active:scale-95 transition-all"
              >
                <Home size={15} className="text-[#C9A044]" /> Public Portal
              </button>
              <button
                onClick={() => { navigate('/admin-dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full btn-primary flex items-center justify-center gap-2 text-xs font-bold py-2.5 min-h-[40px] rounded-xl border border-[#C9A044]/50"
              >
                <ShieldCheck size={16} className="text-[#C9A044]" /> Admin Page
              </button>
            </div>
          )}

        </div>
      )}

    </header>
  );
}
