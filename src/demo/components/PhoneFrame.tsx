import React from 'react';
import { 
  Home, 
  ClipboardList, 
  History, 
  User, 
  Wifi, 
  Battery, 
  Signal 
} from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeTab?: 'dashboard' | 'tugas' | 'history' | 'profil' | 'none';
  onTabChange?: (tab: 'dashboard' | 'tugas' | 'history' | 'profil') => void;
  showNavBar?: boolean;
  screenTitle?: string;
  onBack?: () => void;
  headerRight?: React.ReactNode;
  isLoginScreen?: boolean;
  isHeaderBlue?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  activeTab = 'none',
  onTabChange,
  showNavBar = true,
  screenTitle,
  onBack,
  headerRight,
  isLoginScreen = false,
  isHeaderBlue = true,
}) => {
  return (
    <div className="relative w-full h-full md:max-w-[420px] md:h-[90vh] md:max-h-[850px] bg-gray-50 md:rounded-2xl md:shadow-2xl md:border md:border-gray-100 overflow-hidden flex flex-col font-sans select-none shrink-0 text-gray-800 transition-all duration-300">
      {/* Status Bar */}
      <div className={`h-11 px-6 flex items-center justify-between text-xs font-semibold z-30 shrink-0 ${
        isLoginScreen 
          ? 'bg-transparent text-gray-700' 
          : isHeaderBlue 
            ? 'bg-blue-900 text-white' 
            : 'bg-white text-gray-800'
      }`}>
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 rotate-0" />
        </div>
      </div>

      {/* Header (Jika bukan login screen dan memiliki judul) */}
      {!isLoginScreen && screenTitle && (
        <div className={`h-14 px-4 flex items-center justify-between shadow-sm z-20 shrink-0 ${
          isHeaderBlue ? 'bg-blue-900 text-white' : 'bg-white text-gray-800 border-b border-gray-100'
        }`}>
          <div className="flex items-center gap-2">
            {onBack && (
              <button 
                onClick={onBack} 
                className="p-1 rounded-full hover:bg-black/10 active:bg-black/20 transition-colors cursor-pointer"
                aria-label="Kembali"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h1 className="text-base font-bold tracking-tight line-clamp-1">{screenTitle}</h1>
          </div>
          <div className="flex items-center gap-1">
            {headerRight}
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col relative" id="phone-body">
        {children}
      </div>

      {/* Bottom Navigation Bar */}
      {showNavBar && !isLoginScreen && (
        <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-30 shrink-0 shadow-lg">
          <button
            onClick={() => onTabChange?.('dashboard')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
              activeTab === 'dashboard' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          <button
            onClick={() => onTabChange?.('tugas')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
              activeTab === 'tugas' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px]">Tugas</span>
          </button>

          <button
            onClick={() => onTabChange?.('history')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
              activeTab === 'history' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[10px]">History</span>
          </button>

          <button
            onClick={() => onTabChange?.('profil')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
              activeTab === 'profil' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profil</span>
          </button>
        </div>
      )}
    </div>
  );
};
