import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess?: (email: string) => void;
  isMockupGrid?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLoginSuccess, 
  isMockupGrid = false 
}) => {
  const [email, setEmail] = useState('andi.setiawan@blesscom.co.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(email);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white px-6 py-6 overflow-y-auto">
      {/* Logo & Branding */}
      <div className="flex flex-col items-center mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-200">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-blue-950 text-base leading-tight tracking-tight">Blesscom</span>
            <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold leading-none">Collector</span>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 text-center">
          Kelola penagihan lebih mudah, kerja lebih terarah.
        </p>
      </div>

      {/* Vector Illustration */}
      <div className="my-4 flex justify-center">
        <svg viewBox="0 0 200 140" className="w-40 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle cx="100" cy="70" r="45" fill="#f0f7ff" />
          <circle cx="150" cy="40" r="12" fill="#ecfdf5" />
          <circle cx="50" cy="95" r="18" fill="#fffbeb" />
          
          {/* Elements */}
          <path d="M145 40l5 5m0-5l-5 5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          
          {/* Field officer silhouette/avatar */}
          {/* Cap */}
          <path d="M102 38c-8 0-14 4-14 10h22c0-6-3-10-8-10z" fill="#2563eb" />
          <path d="M110 48h8v2h-8z" fill="#1d4ed8" />
          {/* Head */}
          <circle cx="100" cy="54" r="8" fill="#fbcfe8" />
          {/* Body */}
          <path d="M85 78c0-10 6-18 15-18s15 8 15 18v22H85V78z" fill="#1e3a8a" />
          {/* Bag strap */}
          <path d="M85 70l20 20" stroke="#f59e0b" strokeWidth="3" />
          {/* Smartphone */}
          <rect x="110" y="65" width="14" height="26" rx="2" fill="#0f172a" />
          <rect x="112" y="67" width="10" height="18" rx="1" fill="#22c55e" />
          {/* Checkmark inside phone */}
          <path d="M115 76l1.5 1.5 2.5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Coin stack drawing */}
          <rect x="42" y="88" width="14" height="4" rx="1" fill="#f59e0b" />
          <rect x="44" y="93" width="12" height="4" rx="1" fill="#d97706" />
          <rect x="43" y="98" width="14" height="4" rx="1" fill="#f59e0b" />
        </svg>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
        <div className="mb-4">
          <h2 className="text-xl font-extrabold text-blue-950 leading-tight">Login Collector</h2>
          <p className="text-xs text-gray-400 mt-1">Masuk untuk melanjutkan tugas harian Anda</p>
        </div>

        {/* Username/Email Input */}
        <div className="space-y-1.5 mb-3.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Email / Username</label>
          <div className="relative">
            <input
              type="text"
              required
              disabled={isMockupGrid}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email atau username"
              className="w-full h-11 px-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-85"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5 mb-3.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              disabled={isMockupGrid}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              className="w-full h-11 pl-4 pr-10 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-85"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Checkbox and Forgot Password */}
        <div className="flex items-center justify-between text-xs mb-5">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              disabled={isMockupGrid}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-gray-500 text-[11px]">Ingat saya</span>
          </label>
          <button 
            type="button" 
            onClick={() => alert('Fitur reset password akan dihubungkan ke sistem IT Blesscom.')}
            className="text-blue-600 font-semibold hover:underline text-[11px]"
          >
            Lupa password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-200 active:transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Masuk Sekarang</span>
        </button>
      </form>

      {/* Version and Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          <span>Sistem Keamanan IT</span>
        </div>
        <span>Collector App v1.0.0</span>
      </div>
    </div>
  );
};
