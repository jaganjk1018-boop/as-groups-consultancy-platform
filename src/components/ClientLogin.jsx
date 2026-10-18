import React, { useState } from 'react';
import { useNavigate } from '../utils/router';
import { UserCheck, Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { supabaseService } from '../services/supabaseService';

export default function ClientLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('anita@silkroute.co');
  const [password, setPassword] = useState('••••••••••••');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: 'Anita Roy',
      company: 'SilkRoute Exim Global',
      email: email || 'anita@silkroute.co',
      role: 'client',
      provider: 'Password Authentication'
    };

    supabaseService.recordLogin(user);

    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    navigate('/client-dashboard');
  };

  const handleQuickClientLogin = () => {
    const user = {
      name: 'Anita Roy',
      company: 'SilkRoute Exim Global',
      email: 'anita@silkroute.co',
      role: 'client',
      provider: 'Quick Demo Access'
    };
    supabaseService.recordLogin(user);
    if (onLoginSuccess) onLoginSuccess(user);
    navigate('/client-dashboard');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#070f26] via-[#0a1936] to-[#040918] p-6 text-white font-sans overflow-hidden">
      {/* Background Gold Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/15 blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0a1936]/85 backdrop-blur-2xl border border-amber-500/35 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] animate-fade-in overflow-hidden">
        
        {/* Subtle Accent Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600"></div>

        {/* Top Header & Back Link */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Main Site
          </button>

          <button
            onClick={() => navigate('/login-select')}
            className="text-[11px] font-extrabold text-amber-400 hover:underline"
          >
            Role Selection
          </button>
        </div>

        {/* App Logo Branding */}
        <div className="flex justify-center mb-5">
          <img src="/logo.png" alt="AS GROUPS Logo" className="h-14 w-auto object-contain rounded-xl bg-white/10 p-1.5 border border-amber-400/30 shadow-xl" />
        </div>

        {/* Role Switcher Tabs (Client vs Admin) */}
        <div className="flex items-center p-1.5 rounded-2xl bg-[#070f26] border border-amber-500/30 mb-6">
          <button
            type="button"
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" /> Client Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin-login')}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> Switch to Admin
          </button>
        </div>

        {/* Card Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-extrabold text-white">Client Portal Sign In</h2>
          <p className="text-xs text-amber-200/80 mt-1">Access your consultation history, reports & appointments.</p>
        </div>

        {/* Quick 1-Click Demo Login Banner */}
        <div className="mb-5 p-3 rounded-xl bg-[#070f26]/80 border border-amber-500/30 flex items-center justify-between">
          <div className="text-xs">
            <span className="font-extrabold text-amber-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Demo Client Access
            </span>
            <span className="text-[11px] text-slate-400">Anita Roy (SilkRoute Exim)</span>
          </div>
          <button
            onClick={handleQuickClientLogin}
            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md"
          >
            1-Click Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-amber-200/90 mb-1.5">Registered Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full bg-[#070f26]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-amber-200/90 mb-1.5">Password</label>
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
              <span>Remember account</span>
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
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 font-black text-sm text-slate-950 flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all mt-4"
          >
            <span>Sign In to Client Portal</span>
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
            role="client" 
            onSuccess={(user) => {
              if (onLoginSuccess) onLoginSuccess(user);
              navigate('/client-dashboard');
            }} 
          />
        </form>

      </div>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        defaultEmail={email}
        role="client"
      />
    </div>
  );
}
