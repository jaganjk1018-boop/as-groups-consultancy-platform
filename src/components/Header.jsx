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
    <header className="sticky top-0 z-[1000] bg-[#070f26] text-white shadow-2xl border-b border-amber-500/25">

      {/* Top Secondary Menubar Strip (Contact Info & Office Hours) */}
      <div className="bg-[#050b1e] border-b border-white/10 text-xs py-2 text-slate-300">
        <div className="container flex flex-wrap justify-between items-center gap-2">
          
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium text-[12px]">
            <a href={`tel:${COMPANY_INFO.contact.rawPhones[0]}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone size={13} className="text-amber-400" />
              <span>{COMPANY_INFO.contact.phones[0]}</span>
            </a>

            <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail size={13} className="text-amber-400" />
              <span>{COMPANY_INFO.contact.email}</span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin size={13} className="text-amber-400" />
              <span>{COMPANY_INFO.contact.location}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-3">
              <a 
                href={COMPANY_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Instagram"
                className="text-pink-400 hover:text-pink-300 transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                <Instagram size={14} />
              </a>
              <a 
                href={COMPANY_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                className="text-sky-400 hover:text-sky-300 transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Office Hours & Quick Portal Badges */}
          <div className="flex items-center gap-4 text-[12px]">
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Clock size={12} />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>

            <div className="flex items-center gap-2">
              {!currentUser ? (
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center gap-1.5 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/40 transition-all text-xs shadow-md hover:bg-amber-500/30"
                >
                  <LogIn size={13} /> Login
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">Hi, {currentUser.name}</span>
                  <button onClick={onLogout} className="text-red-400 underline text-[11px]">Logout</button>
                </div>
              )}
            </div>
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
            className="h-9 sm:h-12 w-auto object-contain rounded-xl bg-white/10 p-1 sm:p-1.5 border border-amber-400/40 group-hover:border-amber-400 transition-all shadow-md shrink-0" 
          />
          <div>
            <div className="font-heading text-sm sm:text-xl font-black tracking-tight leading-none text-white flex items-center gap-1 sm:gap-1.5">
              {COMPANY_INFO.name}
              <span className="text-[9px] sm:text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 font-extrabold px-1 sm:px-1.5 py-0.5 rounded">
                CONSULTING
              </span>
            </div>
            <div className="text-[8px] sm:text-[10px] text-amber-400 tracking-wider sm:tracking-[0.16em] font-extrabold uppercase mt-0.5 sm:mt-1 truncate max-w-[180px] sm:max-w-none">
              BUSINESS MANAGEMENT & CONSULTANT
            </div>
          </div>
        </div>

        {/* Desktop Public Navigation Menubar */}
        {currentRole === 'public' && (
          <nav className="hidden lg:flex gap-1.5 items-center bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {navLinks.map(link => {
              const IconComp = link.icon;
              const isActive = isLinkActive(link);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20' 
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComp size={14} className={isActive ? 'text-slate-950' : 'text-amber-400'} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Portal Menubar for Logged-In Roles */}
        {currentRole !== 'public' && (
          <nav className="hidden md:flex gap-2 items-center bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => { setCurrentRole('public'); setActivePublicTab('home'); navigate('/'); }}
                  className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10"
                >
                  <Home size={14} className="text-amber-400" /> Public Portal
                </button>
                <button
                  onClick={() => { navigate('/admin-dashboard'); }}
                  className="flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 shadow-md"
                >
                  <ShieldCheck size={14} /> Admin Page
                </button>
              </>
            )}

            {currentRole === 'client' && (
              <button
                onClick={() => { navigate('/client-dashboard'); }}
                className="flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 shadow-md"
              >
                <UserCheck size={14} /> Client Page
              </button>
            )}
          </nav>
        )}

        {/* Right Action CTA Buttons & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenBookModal}
            className="btn-gold text-xs py-1.5 px-3 sm:py-2.5 sm:px-4 font-black shadow-md shadow-amber-500/20 flex items-center gap-1.5 sm:gap-2 active:scale-95 transition-all"
          >
            <Calendar size={13} className="shrink-0" />
            <span className="hidden sm:inline">Get Free Consultation</span>
            <span className="sm:hidden font-extrabold">Consult</span>
          </button>

          {/* Mobile Hamburger Menubar Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-white/10 text-amber-400 border border-amber-400/30 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Toggle Menubar"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Collapsible Menubar Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#070f26] border-t border-amber-500/30 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          
          <div className="text-xs font-black uppercase text-amber-400 tracking-wider mb-2">
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
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-black' 
                          : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComp size={16} className={isActive ? 'text-slate-950' : 'text-amber-400'} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight size={16} className={isActive ? 'text-slate-950' : 'text-slate-500'} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-black py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md hover:brightness-110 transition-all"
                >
                  <LogIn size={16} /> Login
                </button>
              </div>
            </>
          ) : currentRole === 'client' ? (
            <div className="space-y-2">
              <button
                onClick={() => { navigate('/client-dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-xs font-black py-3 rounded-xl bg-amber-400 text-slate-950 shadow-md"
              >
                <UserCheck size={16} /> Client Page
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { setCurrentRole('public'); setActivePublicTab('home'); navigate('/'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl bg-white/5 text-slate-200 border border-white/10 mb-2"
              >
                <Home size={15} className="text-amber-400" /> Public Portal
              </button>
              <button
                onClick={() => { navigate('/admin-dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-xs font-black py-3 rounded-xl bg-amber-400 text-slate-950 shadow-md"
              >
                <ShieldCheck size={16} /> Admin Page
              </button>
            </div>
          )}

        </div>
      )}

    </header>
  );
}
