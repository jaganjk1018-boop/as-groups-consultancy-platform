import React, { useState } from 'react';
import { useNavigate } from '../utils/router';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, AlertCircle, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin.operations@asgroups.com');
  const [password, setPassword] = useState('Admin@ASGroups2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e, customEmail, customPassword) => {
    if (e) e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const loginEmail = customEmail || email;
    const loginPassword = customPassword || password;

    try {
      const result = await api.adminLogin({
        email: loginEmail,
        password: loginPassword
      });

      if (result && result.success && result.token) {
        // Persist session tokens
        sessionStorage.setItem('as_groups_token', result.token);
        localStorage.setItem('as_groups_token', result.token);
        sessionStorage.setItem('as_groups_user', JSON.stringify(result.user));
        localStorage.setItem('as_groups_user', JSON.stringify(result.user));

        setSuccessMsg(`Welcome, ${result.user.name || 'Admin'}! Authenticating command center...`);
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }

        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 500);
      } else {
        setError(result?.error || 'Invalid admin credentials. Please verify your email and password.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin.operations@asgroups.com');
    setPassword('Admin@ASGroups2026!');
    handleLogin(null, 'admin.operations@asgroups.com', 'Admin@ASGroups2026!');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#071D42] via-[#0B2D68] to-[#071D42] p-4 sm:p-6 text-white font-sans overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A044]/15 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#174A96]/20 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0B2D68]/95 backdrop-blur-2xl border border-[#C9A044]/35 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(11,45,104,0.5)] animate-fade-in overflow-hidden">
        
        {/* Accent Gold Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A044] via-[#DFC16E] to-[#C9A044]"></div>

        {/* Top Header & Back Link */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFC16E] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </button>

          <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A044] bg-[#071D42] px-2.5 py-1 rounded-full border border-[#C9A044]/30">
            Private Portal
          </span>
        </div>

        {/* Brand Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="/logo.png" 
            alt="AS GROUPS Logo" 
            className="h-14 w-auto object-contain rounded-xl bg-white p-1.5 border border-[#C9A044]/50 shadow-lg" 
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Admin Operations Portal
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Restricted access for authorized AS Groups corporate leadership.
          </p>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Authentication Failed</div>
              <div className="text-[11px] opacity-90">{error}</div>
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="font-bold">{successMsg}</div>
          </div>
        )}

        {/* Quick Demo Credentials Panel */}
        <div className="mb-5 p-3 rounded-xl bg-[#071D42]/90 border border-[#C9A044]/30 flex items-center justify-between">
          <div className="text-xs">
            <span className="font-extrabold text-[#DFC16E] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#DFC16E]" /> Authorized Demo Admin
            </span>
            <span className="text-[11px] text-slate-300 block">admin.operations@asgroups.com</span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-[#C9A044] hover:bg-[#DFC16E] text-[#0B2D68] font-black text-xs transition-all shadow-md active:scale-95"
          >
            Auto-Fill & Sign In
          </button>
        </div>

        {/* Admin Login Form */}
        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-[#DFC16E] mb-1.5">
              Authorized Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#DFC16E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin.operations@asgroups.com"
                className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A044] focus:ring-1 focus:ring-[#C9A044]/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#DFC16E] mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#DFC16E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A044] focus:ring-1 focus:ring-[#C9A044]/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-[#0B2D68] bg-[#C9A044] hover:bg-[#DFC16E] flex items-center justify-center gap-2 shadow-lg shadow-[#C9A044]/25 transition-all mt-4 disabled:opacity-50 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0B2D68]" />
                <span>Verifying Role & Access...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Operations</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#C9A044]/20 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
          <KeyRound className="w-3.5 h-3.5 text-[#DFC16E]" />
          <span>Server Role Verification Enforced</span>
        </div>
      </div>
    </div>
  );
}
