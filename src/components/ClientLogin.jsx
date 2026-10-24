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
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#071D42] via-[#0B2D68] to-[#071D42] p-6 text-white font-sans overflow-hidden">
      {/* Background Gold Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C9A044]/15 blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0B2D68]/95 backdrop-blur-2xl border border-[#C9A044]/35 rounded-3xl p-8 shadow-[0_12px_40px_rgba(11,45,104,0.4)] animate-fade-in overflow-hidden">
        
        {/* Subtle Accent Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9A044]"></div>

        {/* Top Header & Back Link */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A044] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Main Site
          </button>

          <button
            onClick={() => navigate('/login-select')}
            className="text-[11px] font-extrabold text-[#C9A044] hover:underline"
          >
            Role Selection
          </button>
        </div>

        {/* App Logo Branding */}
        <div className="flex justify-center mb-5">
          <img src="/logo.png" alt="AS GROUPS Logo" className="h-14 w-auto object-contain rounded-xl bg-white/10 p-1.5 border border-[#C9A044]/40 shadow-xl" />
        </div>

        {/* Role Switcher Tabs (Client vs Admin) */}
        <div className="flex items-center p-1.5 rounded-2xl bg-[#071D42] border border-[#C9A044]/30 mb-6">
          <button
            type="button"
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-black bg-[#C9A044] text-[#0B2D68] shadow-md flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-4 h-4 text-[#0B2D68]" /> Client Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin-login')}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white/80 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#C9A044]" /> Switch to Admin
          </button>
        </div>

        {/* Card Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-extrabold text-white">Client Portal Sign In</h2>
          <p className="text-xs text-white/80 mt-1">Access your consultation history, reports & appointments.</p>
        </div>

        {/* Quick 1-Click Demo Login Banner */}
        <div className="mb-5 p-3 rounded-xl bg-[#071D42]/80 border border-[#C9A044]/30 flex items-center justify-between">
          <div className="text-xs">
            <span className="font-extrabold text-[#C9A044] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#C9A044]" /> Instant Demo Client Access
            </span>
            <span className="text-[11px] text-white/70">Anita Roy (SilkRoute Exim)</span>
          </div>
          <button
            onClick={handleQuickClientLogin}
            className="px-3 py-1.5 rounded-lg bg-[#C9A044] hover:bg-[#d8b053] text-[#0B2D68] font-black text-xs transition-all shadow-md"
          >
            1-Click Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-white/90 mb-1.5">Registered Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C9A044] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#C9A044] focus:ring-1 focus:ring-[#C9A044]/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-white/90 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C9A044] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#C9A044] focus:ring-1 focus:ring-[#C9A044]/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/70">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#C9A044]" />
              <span>Remember account</span>
            </label>
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-[#C9A044] hover:underline font-semibold bg-transparent p-0 border-none cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#C9A044] hover:bg-[#d8b053] font-bold text-sm text-[#0B2D68] flex items-center justify-center gap-2 shadow-lg shadow-[#C9A044]/20 transition-all mt-4"
          >
            <span>Sign In to Client Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#C9A044]/20"></div>
            </div>
            <span className="relative bg-[#0B2D68] px-3 text-[11px] font-extrabold text-[#C9A044] uppercase tracking-widest">
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
