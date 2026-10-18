import React, { useState } from 'react';
import { useNavigate } from '../utils/router';
import { 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail,
  Globe, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Briefcase,
  Sparkles,
  Shield,
  Zap,
  KeyRound,
  CheckCircle2,
  LogIn
} from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { supabaseService } from '../services/supabaseService';

export default function LoginSelection({ onSelectRole, onLoginSuccess }) {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('client'); // 'client' | 'admin'
  const [email, setEmail] = useState('anita@silkroute.co');
  const [password, setPassword] = useState('••••••••••••');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleRoleSwitch = (role) => {
    setActiveRole(role);
    if (role === 'client') {
      setEmail('anita@silkroute.co');
    } else {
      setEmail('admin.operations@asgroups.com');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (activeRole === 'client') {
      const user = {
        name: 'Anita Roy',
        company: 'SilkRoute Exim Global',
        email: email || 'anita@silkroute.co',
        role: 'client',
        provider: 'Password Authentication'
      };
      supabaseService.recordLogin(user);
      if (onLoginSuccess) onLoginSuccess(user);
      if (onSelectRole) onSelectRole('client-login');
      navigate('/client-dashboard');
    } else {
      const user = {
        name: 'Arun Sundaram',
        title: 'Managing Director',
        company: 'AS GROUPS Management',
        email: email || 'admin.operations@asgroups.com',
        role: 'admin',
        provider: 'MFA Secure Password'
      };
      supabaseService.recordLogin(user);
      if (onLoginSuccess) onLoginSuccess(user);
      if (onSelectRole) onSelectRole('admin-login');
      navigate('/admin-dashboard');
    }
  };

  const handleQuickLogin = (role) => {
    if (role === 'client') {
      const user = {
        name: 'Anita Roy',
        company: 'SilkRoute Exim Global',
        email: 'anita@silkroute.co',
        role: 'client',
        provider: 'Quick Demo Access'
      };
      supabaseService.recordLogin(user);
      if (onLoginSuccess) onLoginSuccess(user);
      if (onSelectRole) onSelectRole('client-login');
      navigate('/client-dashboard');
    } else {
      const user = {
        name: 'Arun Sundaram',
        title: 'Managing Director',
        company: 'AS GROUPS Management',
        email: 'admin.operations@asgroups.com',
        role: 'admin',
        provider: 'Quick Demo Access'
      };
      supabaseService.recordLogin(user);
      if (onLoginSuccess) onLoginSuccess(user);
      if (onSelectRole) onSelectRole('admin-login');
      navigate('/admin-dashboard');
    }
  };

  const handleNavigatePublic = () => {
    if (onSelectRole) onSelectRole('public');
    navigate('/');
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-gradient-to-br from-[#070f26] via-[#0a1936] to-[#040918] text-white overflow-hidden font-sans">
      
      {/* Background Ambient Gold & Navy Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-amber-500/15 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-600/15 blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/10 blur-[170px] pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full border-b border-amber-500/30 bg-[#070f26]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={handleNavigatePublic}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img src="/logo.png" alt="AS GROUPS Logo" className="h-10 w-auto object-contain rounded-lg bg-white/5 p-1 border border-amber-400/30 shadow-md" />
            <div>
              <div className="font-heading font-extrabold text-xl tracking-tight leading-none text-white group-hover:text-amber-300 transition-colors">
                AS GROUPS
              </div>
              <div className="text-[10px] text-amber-400/90 font-extrabold tracking-widest uppercase mt-0.5">
                Business Management & Consultant
              </div>
            </div>
          </div>

          {/* Right Action */}
          <button
            onClick={handleNavigatePublic}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 hover:text-white hover:bg-amber-500/20 text-xs font-bold tracking-wide transition-all duration-200 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" /> Back to Main Site
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex-1 flex flex-col justify-center items-center">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AS GROUPS Royal Enterprise Gateway
          </div>
          
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-3 leading-tight">
            Client & Admin <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">Login Portal</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Welcome to the AS Groups unified digital portal. Select your role or sign in below.
          </p>
        </div>

        {/* Unified Login Card Container (Royal Navy & Gold Styling) */}
        <div className="w-full max-w-xl bg-[#0a1936]/85 backdrop-blur-2xl border border-amber-500/35 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] animate-fade-in relative overflow-hidden">
          
          {/* Subtle Accent Gold Highlight Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600"></div>

          {/* Top Role Selector Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[#070f26] border border-amber-500/30 mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => handleRoleSwitch('client')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeRole === 'client'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-4 h-4" /> Client Portal Access
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('admin')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeRole === 'admin'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin Control Access
            </button>
          </div>

          {/* Role Summary Banner */}
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-[#070f26]/80 text-amber-200 mb-6 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xs font-extrabold flex items-center gap-1.5 text-amber-300">
                {activeRole === 'client' ? <UserCheck className="w-4 h-4 text-amber-400" /> : <ShieldCheck className="w-4 h-4 text-amber-400" />}
                <span>{activeRole === 'client' ? 'Client Workspace Account' : 'Senior Admin Operations'}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {activeRole === 'client' ? 'Demo: Anita Roy (SilkRoute Exim Global)' : 'Demo: Arun Sundaram (Managing Director)'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleQuickLogin(activeRole)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1 hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5" /> 1-Click Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-amber-200/90 mb-1.5">
                {activeRole === 'client' ? 'Registered Client Work Email' : 'Admin Staff Credentials Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={activeRole === 'client' ? 'client@company.com' : 'admin@asgroups.com'}
                  className="w-full bg-[#070f26]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-200/90 mb-1.5">
                {activeRole === 'client' ? 'Password' : 'Master Authorization Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#070f26]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-amber-400" />
                <span>Remember session</span>
              </label>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-amber-400 hover:text-amber-300 hover:underline font-semibold bg-transparent p-0 border-none cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:brightness-110 transition-all mt-4"
            >
              <span>{activeRole === 'client' ? 'Sign In to Client Portal' : 'Sign In to Admin Operations'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-500/20"></div>
              </div>
              <span className="relative bg-[#0a1936] px-3 text-[11px] font-extrabold text-amber-300 uppercase tracking-widest">
                Or continue with
              </span>
            </div>

            {/* Google Login Button */}
            <GoogleLoginButton 
              text="Sign in with Google" 
              role={activeRole} 
              onSuccess={(user) => {
                if (onLoginSuccess) onLoginSuccess(user);
                if (onSelectRole) onSelectRole(user.role === 'client' ? 'client-login' : 'admin-login');
                navigate(user.role === 'client' ? '/client-dashboard' : '/admin-dashboard');
              }} 
            />
          </form>

        </div>
      </main>

      {/* Footer Credentials */}
      <footer className="relative z-10 w-full border-t border-amber-500/30 bg-[#070f26]/90 py-4 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="text-amber-200/80 font-medium">
            © {new Date().getFullYear()} AS Groups Consultancy Platform. All Rights Reserved.
          </div>
        </div>
      </footer>

      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
        defaultEmail={email} 
        role={activeRole} 
      />
    </div>
  );
}
