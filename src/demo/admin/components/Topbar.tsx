import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Calendar, 
  Menu, 
  ChevronDown, 
  LogOut, 
  User, 
  Settings,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

interface TopbarProps {
  onToggleSidebar: () => void;
  title: string;
}

export default function Topbar({ onToggleSidebar, title }: TopbarProps) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState('19 Mei 2024 - 19 Mei 2024');

  const dummyNotifications = [
    {
      id: 1,
      title: 'Tunggakan Kritis',
      desc: 'PT Sehat Abadi memiliki tunggakan Rp 12.500.000 (Critical Risk)',
      time: '5 menit yang lalu',
      type: 'critical'
    },
    {
      id: 2,
      title: 'Penagihan Berhasil',
      desc: 'Faktur FL-9821 Bidan Siti Aisyah sebesar Rp 1.750.000 telah terverifikasi',
      time: '2 jam yang lalu',
      type: 'success'
    },
    {
      id: 3,
      title: 'Reminder WhatsApp Terkirim',
      desc: 'Pengingat otomatis terkirim ke Klinik Harapan Ibu',
      time: '4 jam yang lalu',
      type: 'info'
    },
    {
      id: 4,
      title: 'Perubahan Risk Level',
      desc: 'Apotek Bintang Farma naik ke High Risk Level',
      time: '1 hari yang lalu',
      type: 'warning'
    }
  ];

  const handleNotificationClick = (desc: string) => {
    alert(`Notifikasi: ${desc}`);
    setShowNotifications(false);
  };

  return (
    <header className="h-16 border-b border-slate-100/50 bg-white/70 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Hamburger button for mobile, page title */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => navigate('/demo')}
          className="p-1.5 md:p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 text-xs md:text-sm text-slate-600 shadow-sm border border-slate-200 shrink-0"
          aria-label="Kembali ke penawaran"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">Kembali</span>
        </button>
        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
        <button
          id="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          className="p-2 -ml-1 rounded-lg text-slate-500 hover:bg-slate-50 lg:hidden"
          aria-label="Buka menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase line-clamp-1">Blesscom Collector</p>
        </div>
      </div>

      {/* Right section: Datepicker, Search, Notification, Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Dummy Date Range Picker */}
        <div className="relative">
          <button
            id="btn-date-picker"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3.5 py-1.5 md:py-2 rounded-xl border border-slate-200 text-xs md:text-sm text-slate-700 hover:bg-slate-50 transition-all font-medium"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="hidden xs:inline">{selectedRange}</span>
            <span className="xs:hidden">19 Mei 2024</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-100 shadow-xl p-4 z-50">
              <h4 className="text-xs font-bold text-slate-900 mb-2">Pilih Rentang Tanggal</h4>
              <div className="space-y-1.5 mb-3">
                {[
                  'Hari Ini (19 Mei 2024)',
                  'Kemarin (18 Mei 2024)',
                  '7 Hari Terakhir',
                  'Bulan Ini (Mei 2024)',
                  '19 Mei 2024 - 19 Mei 2024'
                ].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range.includes('19 Mei') ? '19 Mei 2024 - 19 Mei 2024' : range);
                      setShowDatePicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all ${
                      selectedRange === range || (range.startsWith('19 Mei') && selectedRange === '19 Mei 2024 - 19 Mei 2024')
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[10px] text-slate-400">Format default: DD MMM YYYY</span>
                <button 
                  onClick={() => setShowDatePicker(false)}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Search Icon Button */}
        <button 
          id="btn-global-search"
          onClick={() => alert('Fitur pencarian global akan segera hadir')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
          aria-label="Cari data"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notification Icon Badge */}
        <div className="relative">
          <button
            id="btn-notification"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all relative"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white animate-pulse">
              8
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl border border-slate-100 shadow-xl py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Notifikasi</h3>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => alert('Semua notifikasi ditandai dibaca')}>Tandai semua dibaca</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {dummyNotifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    onClick={() => handleNotificationClick(notif.desc)}
                    className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-all flex gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                      notif.type === 'critical' ? 'bg-red-50 text-red-600' :
                      notif.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                      notif.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {notif.type === 'critical' ? <Shield className="w-4 h-4" /> :
                       notif.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                       notif.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800">{notif.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{notif.desc}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-50 text-center">
                <button 
                  onClick={() => {
                    alert('Halaman semua notifikasi segera hadir');
                    setShowNotifications(false);
                  }}
                  className="text-xs text-blue-600 font-medium hover:underline py-1"
                >
                  Lihat Semua Notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 hidden xs:block" />

        {/* User Profile */}
        <div className="relative">
          <button
            id="btn-profile"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 hover:bg-slate-50 rounded-xl transition-all text-left"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
              alt="Admin Avatar"
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-50"
              referrerPolicy="no-referrer"
            />
            <div className="hidden md:block">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">Admin</h4>
              <p className="text-[10px] text-slate-400 font-medium">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-100 shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                <h4 className="text-xs font-bold text-slate-900">Admin</h4>
                <p className="text-[10px] text-slate-400">Administrator</p>
              </div>
              <button 
                onClick={() => {
                  alert('Profil Saya');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Profil Saya</span>
              </button>
              <button 
                onClick={() => {
                  alert('Pengaturan Akun');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Pengaturan Akun</span>
              </button>
              <div className="h-px bg-slate-100 my-1" />
              <button 
                onClick={() => {
                  alert('Keluar dari sistem dashboard');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
