import React from 'react';
import { 
  Bell, 
  Map, 
  CalendarClock, 
  MapPin, 
  DollarSign, 
  PhoneCall, 
  Calendar, 
  ChevronRight, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Customer } from '../types';

interface DashboardScreenProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onNavigateToTab: (tab: 'dashboard' | 'tugas' | 'history' | 'profil') => void;
  totalCollectedToday?: number;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  customers,
  onSelectCustomer,
  onNavigateToTab,
  totalCollectedToday = 18450000,
}) => {
  // Format numbers to Indonesian Rupiah (IDR)
  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Get some priority customers
  const priorityCustomers = customers.slice(0, 4);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header Profile Area (Inside dashboard body for full-fidelity design) */}
      <div className="bg-blue-900 text-white px-5 pt-3 pb-6 rounded-b-[24px] shadow-md shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] text-blue-200 uppercase tracking-widest font-bold">Menu Collector</p>
            <h2 className="text-lg font-extrabold tracking-tight mt-0.5">Selamat pagi, Andi 👋</h2>
            <p className="text-[11px] text-blue-100 mt-0.5">Kamis, 9 Juli 2026 • 09:00 WIB</p>
          </div>
          <div className="relative">
            <button className="p-2 bg-blue-800/60 rounded-full hover:bg-blue-800 transition-colors cursor-pointer relative">
              <Bell className="w-4 h-4 text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Shortcuts cards row */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Shortcut 1: Rute Hari Ini */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600/50 rounded-lg">
              <Map className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-blue-200 uppercase tracking-wide leading-none font-bold">Rute Hari Ini</p>
              <p className="text-xs font-bold mt-1 text-white">5 Lokasi Efisien</p>
            </div>
          </div>

          {/* Shortcut 2: Reminder */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500/50 rounded-lg">
              <CalendarClock className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <p className="text-[10px] text-blue-200 uppercase tracking-wide leading-none font-bold">Reminder Janji</p>
              <p className="text-xs font-bold mt-1 text-white">Siti Aisyah - 09:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Scrollable Content */}
      <div className="px-4 py-4 space-y-4 flex-1 overflow-y-auto">
        
        {/* Section Ringkasan Tugas */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Ringkasan Hari Ini</h3>
            <button 
              onClick={() => onNavigateToTab('tugas')} 
              className="text-[11px] text-blue-600 font-bold hover:underline"
            >
              Lihat Detail
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Kunjungan */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold leading-none">Kunjungan</p>
                <p className="text-sm font-extrabold text-blue-950 mt-1">8 <span className="text-[10px] text-gray-400 font-normal">Situs</span></p>
              </div>
            </div>

            {/* Tagihan Ditagih */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold leading-none">Tagihan</p>
                <p className="text-xs font-extrabold text-emerald-600 mt-1">12.45M</p>
              </div>
            </div>

            {/* Follow Up Telepon */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold leading-none">Follow Up</p>
                <p className="text-sm font-extrabold text-indigo-950 mt-1">5 <span className="text-[10px] text-gray-400 font-normal">Klien</span></p>
              </div>
            </div>

            {/* Janji Bayar */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold leading-none">Janji Bayar</p>
                <p className="text-sm font-extrabold text-amber-600 mt-1">3 <span className="text-[10px] text-gray-400 font-normal">Faktur</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Prioritas Penagihan */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Prioritas Penagihan</h3>
            <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              Perlu Tindakan
            </span>
          </div>

          {/* List Klien */}
          <div className="space-y-2.5">
            {priorityCustomers.map((customer) => {
              // Custom colors based on status
              let badgeColor = 'bg-gray-100 text-gray-600';
              if (customer.status === 'Lunas') badgeColor = 'bg-emerald-100 text-emerald-700';
              else if (customer.status === 'Overdue') badgeColor = 'bg-red-100 text-red-700';
              else if (customer.status === 'Janji Bayar') badgeColor = 'bg-amber-100 text-amber-700';
              else if (customer.status === 'Perlu Follow Up') badgeColor = 'bg-blue-100 text-blue-700';

              return (
                <div 
                  key={customer.id}
                  onClick={() => onSelectCustomer(customer)}
                  className="bg-white p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900 leading-tight">{customer.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{customer.invoiceNo}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                      {customer.status === 'Overdue' ? 'Overdue 16 hari' : customer.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-bold leading-none">Sisa Tagihan</p>
                      <p className="text-xs font-extrabold text-red-600 mt-1 font-mono">{formatIDR(customer.remainingAmount)}</p>
                    </div>
                    
                    <button className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5 group">
                      <span>Detail</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pro Tip Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2.5">
          <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-[11px] text-blue-800 leading-relaxed">
            <strong className="font-extrabold">Tips Hari Ini:</strong> Lakukan kunjungan dengan jarak terdekat dari posisi GPS Anda untuk menghemat bahan bakar. Ambil foto plang bidan dengan pencahayaan yang cukup.
          </div>
        </div>

      </div>
    </div>
  );
};
