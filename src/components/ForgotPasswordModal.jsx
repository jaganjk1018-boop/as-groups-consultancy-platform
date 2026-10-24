import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  RefreshCw,
  Sparkles,
  AlertCircle,
  Check,
  Send,
  Bell,
  Eye
} from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

export default function ForgotPasswordModal({ isOpen, onClose, defaultEmail = '', role = 'client' }) {
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP Verification, 3: New Password, 4: Success
  const [email, setEmail] = useState(defaultEmail || '');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const generateNewOtp = (targetEmail) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpInput(['', '', '', '', '', '']);
    setToastMessage(`Dispatched OTP Code to ${targetEmail} (Demo PIN: ${code})`);
    setTimeout(() => {
      setToastMessage('');
    }, 6000);
    return code;
  };

  const handleSendResetCode = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      generateNewOtp(email);
      setStep(2);
    }, 800);
  };

  const handleResendOtp = () => {
    setIsSubmitting(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsSubmitting(false);
      generateNewOtp(email);
    }, 600);
  };

  const handleAutoFillOtp = () => {
    const codeToUse = generatedOtp || '123456';
    setOtpInput(codeToUse.split(''));
    setErrorMsg('');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpInput.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    // Allow generated OTP or demo PIN 123456
    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      setErrorMsg(`Invalid OTP verification code. Demo code for testing is ${generatedOtp || '123456'}.`);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 700);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      supabaseService.createNotification({
        title: 'Password Reset Successful',
        message: `Password reset completed for ${email} (${role.toUpperCase()} Portal).`,
        type: 'system',
        timestamp: new Date().toISOString()
      });

      setStep(4);
    }, 900);
  };

  const handleResetStateAndClose = () => {
    setStep(1);
    setEmail('');
    setGeneratedOtp('');
    setOtpInput(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setToastMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#071D42]/85 backdrop-blur-md animate-fade-in font-sans">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0B2D68] border border-[#C9A044]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(201,160,68,0.25)] overflow-hidden">
        
        {/* Subtle Accent Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C9A044] via-[#DFC16E] to-[#C9A044]"></div>

        {/* Live Toast Notification Banner */}
        {toastMessage && (
          <div className="absolute top-3 left-4 right-14 z-20 bg-[#C9A044] text-[#0B2D68] px-3.5 py-2 rounded-xl text-xs font-black shadow-lg flex items-center gap-2 animate-bounce">
            <Bell className="w-4 h-4 shrink-0 text-[#0B2D68]" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleResetStateAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-[#C9A044]/30 text-[#DFC16E] hover:text-white hover:bg-[#C9A044]/20 transition-all z-10"
        >
          <X size={18} />
        </button>

        {/* Step 1: Send Reset Code */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-4 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A044]/15 border border-[#C9A044]/30 flex items-center justify-center text-[#DFC16E] shadow-inner">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-extrabold text-white">Password Recovery</h3>
                <p className="text-xs text-[#DFC16E]">AS Groups Email OTP Verification</p>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed mb-6 bg-[#071D42] p-3.5 rounded-xl border border-[#C9A044]/20">
              Enter your registered work email address below. A 6-digit OTP verification code will be dispatched directly to your email ID.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSendResetCode} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#DFC16E] mb-1.5">Work Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#DFC16E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. user@company.com"
                    className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A044] focus:ring-1 focus:ring-[#C9A044]/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C9A044] hover:bg-[#DFC16E] font-black text-sm text-[#0B2D68] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sending OTP to Email...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send OTP Code to Email <Send className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-4 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A044]/15 border border-[#C9A044]/30 flex items-center justify-center text-[#DFC16E] shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-extrabold text-white">Enter Email OTP</h3>
                <p className="text-xs text-[#DFC16E]">OTP sent to: <strong className="text-white">{email}</strong></p>
              </div>
            </div>

            {/* Email OTP Banner */}
            <div className="p-3.5 mb-5 rounded-2xl bg-[#071D42] border border-[#C9A044]/35 text-[#DFC16E] text-xs flex flex-col gap-2 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="font-extrabold flex items-center gap-1.5 text-[#DFC16E]">
                  <Mail className="w-4 h-4 text-[#DFC16E]" /> Dispatched OTP Code:
                </span>
                <span className="font-mono font-black text-[#DFC16E] tracking-widest text-sm bg-[#C9A044]/20 px-2.5 py-1 rounded-lg border border-[#C9A044]/50">
                  {generatedOtp || '123456'}
                </span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                Since live backend SMTP is simulated, your test PIN is <span className="text-[#DFC16E] font-bold font-mono">{generatedOtp || '123456'}</span>. Click 1-Click Auto-fill to test immediately.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-[#DFC16E]">6-Digit Verification Code</label>
                  <button
                    type="button"
                    onClick={handleAutoFillOtp}
                    className="text-[11px] font-extrabold text-[#DFC16E] hover:text-white underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> 1-Click Auto-Fill Code
                  </button>
                </div>
                <div className="flex justify-center gap-2">
                  {otpInput.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otpInput];
                        newOtp[idx] = val;
                        setOtpInput(newOtp);
                      }}
                      placeholder="•"
                      className="w-11 h-12 text-center bg-[#071D42] border border-[#C9A044]/40 rounded-xl text-lg font-bold text-[#DFC16E] focus:outline-none focus:border-[#C9A044]"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSubmitting}
                  className="text-[#DFC16E] hover:text-white hover:underline font-bold flex items-center gap-1 bg-transparent border-none cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Resend OTP Code
                </button>
                <span className="text-slate-300 text-[11px]">Valid for 10 minutes</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C9A044] hover:bg-[#DFC16E] font-black text-sm text-[#0B2D68] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying OTP...
                  </span>
                ) : (
                  <span>Verify Code & Proceed</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Set New Password */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-4 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A044]/15 border border-[#C9A044]/30 flex items-center justify-center text-[#DFC16E] shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-extrabold text-white">Create New Password</h3>
                <p className="text-xs text-[#DFC16E]">Account: {email}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#DFC16E] mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#DFC16E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 characters)"
                    className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A044]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#DFC16E] mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#DFC16E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-[#071D42] border border-[#C9A044]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A044]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C9A044] hover:bg-[#DFC16E] font-black text-sm text-[#0B2D68] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Saving Password...
                  </span>
                ) : (
                  <span>Update Password & Save</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success Confirmation */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#C9A044]/20 border border-[#C9A044]/40 text-[#DFC16E] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8 animate-bounce text-[#DFC16E]" />
            </div>

            <h3 className="text-2xl font-heading font-black text-white mb-2">Password Reset Completed!</h3>
            
            <p className="text-xs text-slate-200 leading-relaxed mb-6 max-w-sm mx-auto">
              Your account password for <strong className="text-[#DFC16E]">{email}</strong> has been updated successfully. You can now log in with your new password.
            </p>

            <button
              onClick={handleResetStateAndClose}
              className="w-full py-3.5 px-4 rounded-xl bg-[#C9A044] hover:bg-[#DFC16E] font-black text-sm text-[#0B2D68] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Return to Login Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
