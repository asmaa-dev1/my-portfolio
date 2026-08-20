import React, { useState } from 'react';
import { User, Mail, UserPlus, ArrowLeft, Check, ChevronDown } from 'lucide-react';

// Default discovered/recent Google accounts matching the user's browser screenshot
const INITIAL_ACCOUNTS = [
  {
    name: 'Elhint Asmaa',
    email: 'elhintasmaa@gmail.com',
    initial: 'E',
    avatarBg: '#475569'
  },
  {
    name: 'Asmaa El Hint',
    email: 'asmaaelhint@gmail.com',
    initial: 'A',
    avatarBg: '#3b82f6'
  },
  {
    name: 'lll dfg',
    email: 'llldfg016@gmail.com',
    initial: 'I',
    avatarBg: '#8b5cf6'
  },
  {
    name: 'Asmaa El Hint',
    email: 'asmaaelhint0@gmail.com',
    initial: 'A',
    avatarBg: '#a855f7'
  }
];

export default function GoogleOAuthModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState('choose'); // 'choose', 'confirm', 'custom'
  const [selectedAccount, setSelectedAccount] = useState(INITIAL_ACCOUNTS[2]); // Default 'lll dfg'
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customError, setCustomError] = useState('');

  if (!isOpen) return null;

  const handleSelectAccount = (acc) => {
    setSelectedAccount(acc);
    setStep('confirm');
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim() || !customEmail.includes('@') || !customEmail.includes('.')) {
      setCustomError('Please enter a valid Google Account email.');
      return;
    }

    const cleanEmail = customEmail.trim().toLowerCase();
    const cleanName = customName.trim() || cleanEmail.split('@')[0];

    const newAcc = {
      name: cleanName,
      email: cleanEmail,
      initial: cleanName.charAt(0).toUpperCase(),
      avatarBg: '#7c3aed'
    };

    setSelectedAccount(newAcc);
    setStep('confirm');
  };

  const handleConfirmAuth = () => {
    onSuccess(selectedAccount);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 select-none font-sans">
      {/* Google Chrome Window Wrapper */}
      <div className="w-full max-w-[440px] rounded-2xl bg-[#131314] text-[#e3e3e3] border border-[#3c4043] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        
        {/* Chrome / Google Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2d2f31] bg-[#1a1a1c]">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-xs font-medium text-[#c4c7c5]">Sign in with Google</span>
          </div>

          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full flex items-center justify-center text-[#8e918f] hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>

        {/* --------------------------------------------------------------------------
            STEP 1: CHOOSE AN ACCOUNT (Screenshot 1: media_1787174339290.png)
            -------------------------------------------------------------------------- */}
        {step === 'choose' && (
          <div className="p-6 md:p-8 animate-in fade-in">
            {/* App Icon */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center mb-5 shadow-lg">
              <div className="w-full h-full rounded-full bg-[#131314] flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-lg">G</span>
              </div>
            </div>

            <h2 className="text-2xl font-normal text-[#e3e3e3] mb-1">
              Choose an account
            </h2>
            <p className="text-sm text-[#8e918f] mb-6">
              to continue to <span className="text-[#a8c7fa] font-medium">Asmaa Portfolio Authentication</span>
            </p>

            {/* Accounts List */}
            <div className="divide-y divide-[#2d2f31] border-y border-[#2d2f31]">
              {INITIAL_ACCOUNTS.map((acc, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full py-3.5 px-2 flex items-center gap-3.5 hover:bg-[#202124] transition-colors cursor-pointer text-left group"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: acc.avatarBg }}
                  >
                    {acc.initial}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#e3e3e3] leading-tight truncate group-hover:text-[#a8c7fa]">
                      {acc.name}
                    </h4>
                    <p className="text-xs text-[#8e918f] font-normal truncate mt-0.5">
                      {acc.email}
                    </p>
                  </div>
                </button>
              ))}

              {/* Use Another Account */}
              <button
                onClick={() => setStep('custom')}
                className="w-full py-3.5 px-2 flex items-center gap-3.5 hover:bg-[#202124] transition-colors cursor-pointer text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-[#2d2f31] flex items-center justify-center text-[#c4c7c5] shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-[#e3e3e3] group-hover:text-[#a8c7fa]">
                  Use another account
                </span>
              </button>
            </div>

            {/* Bottom Footer */}
            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-[#8e918f]">
              <span>English (United States)</span>
              <div className="flex items-center gap-4">
                <span className="hover:underline cursor-pointer">Help</span>
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Terms</span>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
            STEP 2: AUTHENTICATION CONFIRMATION (Screenshot 2: media_1787174344822.png)
            -------------------------------------------------------------------------- */}
        {step === 'confirm' && (
          <div className="p-6 md:p-8 animate-in fade-in">
            <h2 className="text-2xl font-normal text-[#e3e3e3] mb-4">
              Authentication
            </h2>

            {/* Selected Account Pill */}
            <button
              onClick={() => setStep('choose')}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#3c4043] bg-[#1a1a1c] hover:bg-[#202124] transition-colors cursor-pointer mb-6"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs text-white"
                style={{ backgroundColor: selectedAccount.avatarBg }}
              >
                {selectedAccount.initial}
              </div>
              <span className="text-xs font-medium text-[#e3e3e3]">
                {selectedAccount.email}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8e918f]" />
            </button>

            {/* Heading */}
            <h3 className="text-lg font-normal text-[#e3e3e3] leading-snug mb-5">
              Google will allow <span className="font-semibold text-white">Asmaa Portfolio</span> to access this info about you
            </h3>

            {/* Permissions List */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3.5">
                <User className="w-5 h-5 text-[#8e918f] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-[#e3e3e3]">
                    {selectedAccount.name}
                  </h5>
                  <p className="text-xs text-[#8e918f]">
                    Name and profile picture
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#8e918f] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-[#e3e3e3]">
                    {selectedAccount.email}
                  </h5>
                  <p className="text-xs text-[#8e918f]">
                    Email address
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <p className="text-xs text-[#8e918f] leading-relaxed mb-8">
              Review Asmaa Portfolio's <span className="text-[#a8c7fa] hover:underline cursor-pointer">Privacy Policy</span> and <span className="text-[#a8c7fa] hover:underline cursor-pointer">Terms of Service</span> to understand how data will process and protect your visitor drawing.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('choose')}
                className="flex-1 py-2.5 rounded-full border border-[#3c4043] text-sm font-medium text-[#a8c7fa] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmAuth}
                className="flex-1 py-2.5 rounded-full bg-[#a8c7fa] hover:bg-[#8ab4f8] text-[#041e49] font-medium text-sm transition-all shadow-md cursor-pointer"
              >
                Continue
              </button>
            </div>

            {/* Bottom Footer */}
            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-[#8e918f] border-t border-[#2d2f31]">
              <span>English (United States)</span>
              <div className="flex items-center gap-4">
                <span className="hover:underline cursor-pointer">Help</span>
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Terms</span>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
            STEP 3: CUSTOM ACCOUNT FORM
            -------------------------------------------------------------------------- */}
        {step === 'custom' && (
          <form onSubmit={handleCustomSubmit} className="p-6 md:p-8 animate-in fade-in">
            <button
              type="button"
              onClick={() => setStep('choose')}
              className="flex items-center gap-1.5 text-xs text-[#a8c7fa] hover:underline mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to account list</span>
            </button>

            <h2 className="text-2xl font-normal text-[#e3e3e3] mb-1">
              Sign in with Google
            </h2>
            <p className="text-sm text-[#8e918f] mb-6">
              Enter your Google Account email address
            </p>

            {customError && (
              <div className="p-2.5 mb-4 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
                {customError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs text-[#8e918f] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Asmaa"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a1a1c] border border-[#3c4043] text-white text-sm focus:outline-none focus:border-[#a8c7fa]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#8e918f] mb-1.5">
                  Google Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => {
                    setCustomEmail(e.target.value);
                    setCustomError('');
                  }}
                  placeholder="your.email@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a1a1c] border border-[#3c4043] text-white text-sm focus:outline-none focus:border-[#a8c7fa]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setStep('choose')}
                className="px-4 py-2 rounded-full text-sm text-[#a8c7fa] hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#a8c7fa] hover:bg-[#8ab4f8] text-[#041e49] font-medium text-sm transition-all shadow-md cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
