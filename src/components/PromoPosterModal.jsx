import React from 'react';
import { X, Calendar, Phone, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function PromoPosterModal({ isOpen, onClose, onOpenBookModal }) {
  if (!isOpen) return null;

  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.contact.rawPhones[0]}?text=${encodeURIComponent("Hello AS GROUPS, I saw your promotional poster and would like to claim my Free 30-Minute Growth Strategy Session.")}`;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 md:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[88vh] overflow-y-auto bg-gradient-to-b from-[#0a1936] via-[#0f2b5c] to-[#0a1936] text-white rounded-2xl shadow-2xl border border-amber-400/40"
        style={{
          boxShadow: '0 20px 50px rgba(10, 25, 54, 0.8), 0 0 25px rgba(212, 175, 55, 0.25)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-white/20 shadow-md"
          aria-label="Close Poster"
        >
          <X size={18} />
        </button>

        {/* Poster Header */}
        <div className="p-4 md:p-5 text-center relative z-10 border-b border-amber-500/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[11px] font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={12} className="text-amber-400 animate-pulse" /> EXCLUSIVE FREE BUSINESS STRATEGY SESSION
          </div>

          {/* Logo Showcase */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <img 
              src="/logo.png" 
              alt="AS GROUPS Logo" 
              className="h-11 w-auto object-contain rounded-xl bg-white/10 p-1 border border-amber-400/40 shadow-md" 
            />
          </div>

          <h2 className="text-xl font-black tracking-tight text-white mb-0.5">
            {COMPANY_INFO.name}
          </h2>
          <p className="text-[10px] font-black text-amber-400 tracking-[0.18em] uppercase mb-1.5">
            BUSINESS MANAGEMENT & CONSULTANT
          </p>

          <div className="text-xs font-black text-amber-300 tracking-wide">
            "YOUR GROWTH, OUR COMMITMENT"
          </div>
        </div>

        {/* Main Offer Body */}
        <div className="p-4 md:p-5 relative z-10 space-y-3.5">
          <div className="bg-white/5 rounded-xl p-3 border border-amber-400/30 text-center">
            <div className="text-[10px] font-bold text-sky-300 uppercase tracking-widest mb-0.5">
              LIMITED TIME CONSULTING OFFER
            </div>
            <div className="text-base font-black text-amber-300 leading-snug">
              Transform Your Ideas Into Sustainable Business Growth
            </div>
            <p className="text-[11px] text-slate-300 mt-1 font-medium">
              Direct consultation with <strong className="text-white">Harish V J</strong> (Founder & Growth Strategist)
            </p>
          </div>

          {/* 5 Vertical Pillars Highlight */}
          <div>
            <div className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider mb-2 text-center">
              Our 5 Core Consulting Pillars
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>📈 Business Setup & Growth</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>🏥 Hospital & Healthcare Marketing</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>🍽️ Tea Shop & Restaurant Setup</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>🌍 Import & Export Trade Advice</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>💡 Innovation & Business Model Strategy</span>
              </div>
            </div>
          </div>

          {/* Call-to-action buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenBookModal();
              }}
              className="w-full btn-gold py-2.5 px-4 rounded-xl justify-center text-xs md:text-sm font-black shadow-lg"
            >
              <Calendar size={16} /> Book Free Strategy Consultation Now
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all text-center"
              >
                <MessageSquare size={14} /> WhatsApp Us
              </a>

              <a
                href={`tel:${COMPANY_INFO.contact.rawPhones[0]}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all text-center"
              >
                <Phone size={14} className="text-amber-400" /> Call Consultant
              </a>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="text-center text-[10px] text-slate-400 pt-0.5">
            📍 Mambakkam, Tamil Nadu | 📞 +91 73055 79137
          </div>
        </div>
      </div>
    </div>
  );
}
