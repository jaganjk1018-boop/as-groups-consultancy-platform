import React from 'react';
import { useNavigate } from '../../utils/router';
import { Home, Briefcase, Phone, ArrowLeft, Compass, LogIn, ShieldAlert } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 text-white" style={{ background: 'linear-gradient(135deg, #071D42 0%, #0B2D68 50%, #174A96 100%)' }}>
      <div className="max-w-2xl w-full text-center">
        
        {/* Glowing 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A044]/15 border border-[#C9A044]/40 text-[#DFC16E] text-xs font-bold uppercase tracking-widest mb-6">
          <Compass className="w-4 h-4 text-[#DFC16E] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Large 404 Display */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C9A044] via-[#DFC16E] to-[#C9A044] mb-4 drop-shadow-sm">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Looking for Strategic Advisory Directions?
        </h2>

        <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
          The requested page route could not be found or has been moved. Explore our core services or return to the homepage to continue your growth journey with {COMPANY_INFO.name}.
        </p>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-md mx-auto mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-[#C9A044] hover:bg-[#DFC16E] text-[#0B2D68] font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all min-h-[38px] sm:min-h-[44px]"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </button>

          <button
            onClick={() => navigate('/services')}
            className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 active:scale-95 transition-all min-h-[38px] sm:min-h-[44px]"
          >
            <Briefcase className="w-4 h-4 text-[#DFC16E]" /> Explore Services
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 active:scale-95 transition-all min-h-[38px] sm:min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-[#DFC16E]" /> Contact Advisory
          </button>

        </div>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#DFC16E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Go back to previous page
        </button>

      </div>
    </div>
  );
}
