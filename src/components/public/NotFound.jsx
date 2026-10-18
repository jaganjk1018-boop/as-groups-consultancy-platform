import React from 'react';
import { useNavigate } from '../../utils/router';
import { Home, Briefcase, Phone, ArrowLeft, Compass, LogIn, ShieldAlert } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-[#070f26] text-white">
      <div className="max-w-2xl w-full text-center">
        
        {/* Glowing 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Large 404 Display */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 mb-4 drop-shadow-sm">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Looking for Strategic Advisory Directions?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
          The requested page route could not be found or has been moved. Explore our core services or return to the homepage to continue your growth journey with {COMPANY_INFO.name}.
        </p>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </button>

          <button
            onClick={() => navigate('/services')}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all"
          >
            <Briefcase className="w-4 h-4 text-amber-400" /> Explore Services
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-400" /> Contact Advisory
          </button>

          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all"
          >
            <LogIn className="w-4 h-4 text-amber-300" /> Client & Admin Login
          </button>
        </div>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Go back to previous page
        </button>

      </div>
    </div>
  );
}
