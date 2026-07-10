import React from 'react';
import { 
  LogOut, 
  MapPin, 
  UserCheck, 
  Target, 
  Award, 
  TrendingUp, 
  Briefcase, 
  Phone, 
  Mail, 
  Settings 
} from 'lucide-react';
import { CollectorProfile } from '../types';

interface ProfileScreenProps {
  profile: CollectorProfile;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onLogout
}) => {
  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      
      {/* Profile Scroll Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Main Header Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3 relative overflow-hidden">
          {/* Subtle background visual flair */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>

          {/* Profile Picture */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
              alt="Collector Avatar"
              className="w-18 h-18 rounded-full object-cover border-2 border-blue-50 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0.5 right-0.5 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold" title="Online">
              ✓
            </span>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-gray-900 leading-tight">{profile.name}</h3>
            <span className="inline-block text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2.5 py-0.5 rounded-full mt-1 uppercase tracking-wider">
              {profile.role}
            </span>
          </div>

          {/* Micro Contacts */}
          <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-[10px] text-gray-500 font-medium">
            <div className="flex items-center justify-center gap-1">
              <Phone className="w-3 h-3 text-gray-400 shrink-0" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Mail className="w-3 h-3 text-gray-400 shrink-0 truncate" />
              <span className="truncate">andi@blesscom.id</span>
            </div>
          </div>
        </div>

        {/* Operational Scope Info Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-xs">
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
            <h4 className="font-extrabold text-gray-700 uppercase tracking-wider text-[10px]">Informasi Penugasan</h4>
          </div>

          <div className="divide-y divide-gray-50">
            {/* Area Kerja */}
            <div className="px-4 py-2.5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Area Kerja</span>
              </div>
              <span className="font-extrabold text-gray-900">{profile.workArea}</span>
            </div>

            {/* Supervisor */}
            <div className="px-4 py-2.5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <UserCheck className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Supervisor</span>
              </div>
              <span className="font-bold text-gray-800">{profile.supervisor}</span>
            </div>

            {/* Target Harian */}
            <div className="px-4 py-2.5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <Target className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Target Harian</span>
              </div>
              <span className="font-extrabold text-blue-600">{profile.dailyTarget} Kunjungan</span>
            </div>
          </div>
        </div>

        {/* Performance & Performance Badge Scorecard */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3.5">
          <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
            <Award className="w-4 h-4 text-amber-500" />
            <h4 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Performa Saya (Mei 2024)</h4>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div>
              <span className="text-[10px] text-gray-400 font-bold block uppercase leading-none">Skor Performa</span>
              <p className="text-lg font-extrabold text-blue-950 mt-1 font-mono">{profile.performanceScore} <span className="text-xs font-normal text-gray-400">/ 100</span></p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-700 font-extrabold px-3 py-1 rounded-lg">
              {profile.performanceBadge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-1.5">
            {/* Total Kunjungan */}
            <div className="space-y-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Total Kunjungan</span>
              <p className="text-sm font-extrabold text-gray-900 font-mono">{profile.totalVisits} Selesai</p>
            </div>
            
            {/* Total Tertagih */}
            <div className="space-y-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Total Tertagih</span>
              <p className="text-sm font-extrabold text-emerald-600 font-mono leading-tight">{formatIDR(profile.totalCollected)}</p>
            </div>
          </div>
        </div>

        {/* Red Logout Button */}
        <div className="pt-2">
          <button
            onClick={onLogout}
            className="w-full h-11 bg-red-100 hover:bg-red-200 text-red-600 border border-red-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun (Logout)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
