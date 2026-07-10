import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, LayoutDashboard, FileText, Settings, Users, Bell, 
  TrendingUp, AlertCircle, CheckCircle2, Clock, MapPin, Search, 
  MoreVertical, Download, ChevronRight, FilePlus, Send, Activity, 
  BellRing, MessageSquare, PieChart, Contact, UploadCloud, FileSpreadsheet,
  Filter, Calendar, ChevronLeft, Eye, Edit, Trash2
} from 'lucide-react';

// --- MAIN ADMIN APP COMPONENT ---
export default function AdminApp() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/demo')}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 text-sm text-slate-600 shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#003366] rounded-lg flex items-center justify-center shadow-inner">
              <div className="w-3 h-3 border-2 border-white rotate-45"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 tracking-wide leading-tight">Collector Recall</span>
              <span className="text-[10px] text-blue-600 font-semibold tracking-wider">ADMIN PORTAL</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Cari faktur, pelanggan..." 
              className="bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 transition-all"
            />
          </div>
          <div className="relative cursor-pointer hover:bg-slate-100 p-2 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-slate-500 hover:text-slate-700" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Admin Pusat</p>
              <p className="text-[10px] text-slate-500">Superadmin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center border-2 border-slate-100 shadow-md">
              <span className="text-xs font-bold text-white">AP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-65px)]">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto hidden lg:flex shrink-0 custom-scrollbar">
          
          <div className="p-4 space-y-1">
            <div 
              onClick={() => setActiveMenu('dashboard')}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer font-semibold transition-colors ${activeMenu === 'dashboard' ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'}`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </div>
              {activeMenu === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
            </div>
          </div>

          <div className="px-4 pb-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Faktur & Penagihan</p>
            <div 
              onClick={() => setActiveMenu('import')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${activeMenu === 'import' ? 'bg-blue-50 text-blue-700 border border-blue-100 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'}`}
            >
              <FilePlus className="w-4 h-4" />
              <span className="text-sm">Import Faktur</span>
            </div>
            <div 
              onClick={() => setActiveMenu('data-faktur')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${activeMenu === 'data-faktur' ? 'bg-blue-50 text-blue-700 border border-blue-100 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'}`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Data Faktur</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <Send className="w-4 h-4" />
              <span className="text-sm">Serah Terima Faktur</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Verifikasi Pembayaran</span>
              </div>
              <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">12</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Monitoring Penagihan</span>
            </div>
          </div>

          <div className="px-4 pb-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Collector</p>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <Contact className="w-4 h-4" />
              <span className="text-sm">Data Collector</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Absensi Collector</span>
            </div>
          </div>

          <div className="px-4 pb-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Pelanggan</p>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <Users className="w-4 h-4" />
              <span className="text-sm">Data Pelanggan</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <BellRing className="w-4 h-4" />
              <span className="text-sm">Reminder Pelanggan</span>
            </div>
          </div>

          <div className="px-4 pb-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Sistem & Laporan</p>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Pengaturan Reminder</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Template Pesan</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent">
              <PieChart className="w-4 h-4" />
              <span className="text-sm">Laporan</span>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 relative">
          <AnimatePresence mode="wait">
            {activeMenu === 'dashboard' && <DashboardView key="dashboard" />}
            {activeMenu === 'import' && <ImportFakturView key="import" onNavigate={(menu) => setActiveMenu(menu)} />}
            {activeMenu === 'data-faktur' && <DataFakturView key="data-faktur" />}
          </AnimatePresence>
        </main>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}


// --- DASHBOARD VIEW COMPONENT ---
function DashboardView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ringkasan Operasional</h1>
          <p className="text-sm text-slate-500">Pantau aktivitas penagihan dan performa kolektor hari ini.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-slate-200 shadow-sm">
            <Clock className="w-4 h-4" />
            Hari Ini (10 Jul)
          </button>
          <button className="flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-blue-900/10 transition-colors">
            <Download className="w-4 h-4" />
            Export Laporan
          </button>
        </div>
      </div>

      {/* 1. Top KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-red-300 hover:shadow-md transition-all cursor-pointer">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-50 rounded-full blur-xl group-hover:bg-red-100 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-red-50 text-red-600 rounded-md border border-red-100">+12% vs Kemarin</span>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Tagihan Overdue</p>
          <h3 className="text-2xl font-extrabold text-slate-900">Rp 125.4M</h3>
          <p className="text-xs text-slate-500 mt-2"><span className="text-red-600 font-bold">42</span> Faktur Kritis</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 hover:shadow-md transition-all cursor-pointer">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50 rounded-full blur-xl group-hover:bg-amber-100 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-amber-50 text-amber-600 rounded-md border border-amber-100">Action Needed</span>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Menunggu Verifikasi</p>
          <h3 className="text-2xl font-extrabold text-slate-900">12 <span className="text-lg text-slate-400">Setoran</span></h3>
          <p className="text-xs text-slate-500 mt-2">Dari 4 Collector</p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 rounded-full blur-xl group-hover:bg-emerald-100 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200">Hari Ini</span>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Kunjungan Selesai</p>
          <h3 className="text-2xl font-extrabold text-slate-900">45 <span className="text-lg text-slate-400">/ 120</span></h3>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full blur-xl group-hover:bg-blue-100 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-100">+4% vs Kemarin</span>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Janji Bayar Hari Ini</p>
          <h3 className="text-2xl font-extrabold text-slate-900">Rp 42.5M</h3>
          <p className="text-xs text-slate-500 mt-2"><span className="text-blue-600 font-bold">18</span> Pelanggan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Grafik Tren */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Tren Penerimaan Pembayaran</h3>
              <p className="text-xs text-slate-500">Total setoran yang masuk & tervalidasi seminggu terakhir</p>
            </div>
            <select className="bg-white border border-slate-200 text-sm text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 shadow-sm">
              <option>7 Hari Terakhir</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          
          <div className="flex-1 relative min-h-[200px] flex items-end gap-2 pt-4 border-b border-l border-slate-200 px-2 pb-0">
            {/* Grid & Axis Lines */}
            <div className="absolute left-0 right-0 bottom-[25%] border-b border-slate-200 border-dashed w-full"></div>
            <div className="absolute left-0 right-0 bottom-[50%] border-b border-slate-200 border-dashed w-full"></div>
            <div className="absolute left-0 right-0 bottom-[75%] border-b border-slate-200 border-dashed w-full"></div>
            <div className="absolute left-0 right-0 top-0 border-b border-slate-200 border-dashed w-full"></div>
            <div className="absolute -left-10 bottom-0 text-[10px] text-slate-400">0</div>
            <div className="absolute -left-12 bottom-[25%] text-[10px] text-slate-400">15M</div>
            <div className="absolute -left-12 bottom-[50%] text-[10px] text-slate-400">30M</div>
            <div className="absolute -left-12 bottom-[75%] text-[10px] text-slate-400">45M</div>
            <div className="absolute -left-12 top-0 text-[10px] text-slate-400">60M</div>

            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md relative h-[40%]"></div>
              <span className="text-[10px] text-slate-400 mt-2">04 Jul</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md relative h-[30%]"></div>
              <span className="text-[10px] text-slate-400 mt-2">05 Jul</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md relative h-[65%]"></div>
              <span className="text-[10px] text-slate-400 mt-2">06 Jul</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md relative h-[45%]"></div>
              <span className="text-[10px] text-slate-400 mt-2">07 Jul</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md relative h-[80%]"></div>
              <span className="text-[10px] text-slate-400 mt-2">08 Jul</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md relative h-[55%]"></div>
              <span className="text-[10px] text-slate-400 mt-2">09 Jul</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
              <div className="w-full max-w-[40px] bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-t-md relative h-[95%]">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none z-20">Rp 57M</div>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold mt-2">10 Jul</span>
            </div>
          </div>
        </div>

        {/* 3. Menunggu Verifikasi */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col h-[320px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              Butuh Verifikasi
            </h3>
            <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-bold">12 Menunggu</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {/* List Item 1 */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 p-3 rounded-xl cursor-pointer hover:shadow-sm transition-all group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600 transition-colors">CV. Maju Jaya</span>
                <span className="text-xs font-bold text-slate-900">Rp 5.200.000</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" /> Andi (Collector)</span>
                <span>10 mnt lalu</span>
              </div>
            </div>
            {/* List Item 2 */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 p-3 rounded-xl cursor-pointer hover:shadow-sm transition-all group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600 transition-colors">Toko Sinar Abadi</span>
                <span className="text-xs font-bold text-slate-900">Rp 1.500.000</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" /> Budi (Collector)</span>
                <span>24 mnt lalu</span>
              </div>
            </div>
            {/* List Item 3 */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 p-3 rounded-xl cursor-pointer hover:shadow-sm transition-all group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600 transition-colors">PT. Sejahtera Abadi</span>
                <span className="text-xs font-bold text-slate-900">Rp 12.000.000</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" /> Rina (Collector)</span>
                <span>1 jam lalu</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-3 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1">
            Lihat Semua Antrean <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 4. Live Feed Aktivitas Collector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Live Feed Collector Lapangan
          </h3>
          <div className="flex gap-2">
            <span className="text-xs font-bold px-2 py-1 bg-slate-100 border border-slate-200 rounded text-slate-600 cursor-pointer hover:bg-slate-200">Semua Wilayah</span>
            <span className="text-xs font-bold px-2 py-1 bg-slate-100 border border-slate-200 rounded text-slate-600 cursor-pointer hover:bg-slate-200">Hari Ini</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                <th className="pb-3 pl-2 font-semibold">Waktu</th>
                <th className="pb-3 font-semibold">Collector</th>
                <th className="pb-3 font-semibold">Aktivitas</th>
                <th className="pb-3 font-semibold">Pelanggan</th>
                <th className="pb-3 font-semibold">Status/Hasil</th>
                <th className="pb-3 pr-2 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 pl-2 text-slate-500 text-xs">10:45 AM</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">BU</div>
                    <span className="font-semibold text-slate-700">Budi</span>
                  </div>
                </td>
                <td className="py-3 text-slate-600">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Input Pembayaran</span>
                </td>
                <td className="py-3 font-medium text-slate-800">Toko Sinar Abadi</td>
                <td className="py-3">
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">Berhasil (Rp 1.5M)</span>
                </td>
                <td className="py-3 pr-2 text-right">
                  <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
              
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 pl-2 text-slate-500 text-xs">10:32 AM</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">AN</div>
                    <span className="font-semibold text-slate-700">Andi</span>
                  </div>
                </td>
                <td className="py-3 text-slate-600">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-500" /> Check-in Lokasi</span>
                </td>
                <td className="py-3 font-medium text-slate-800">CV. Maju Jaya</td>
                <td className="py-3">
                  <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold">GPS Akurat (12m)</span>
                </td>
                <td className="py-3 pr-2 text-right">
                  <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}


// --- IMPORT FAKTUR WIZARD COMPONENT ---
function ImportFakturView({ onNavigate }: { onNavigate: (menu: string) => void }) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Data dummy distribusi collector
  const TOTAL_FAKTUR = 100;
  const DEFAULT_QUOTA = 12;
  
  const [distribusi, setDistribusi] = useState([
    { id: 1, name: 'Andi', kuota: DEFAULT_QUOTA, code: 'AN', color: 'indigo' },
    { id: 2, name: 'Budi', kuota: DEFAULT_QUOTA, code: 'BU', color: 'blue' },
    { id: 3, name: 'Rina', kuota: DEFAULT_QUOTA, code: 'RI', color: 'emerald' },
  ]);

  const assignedTotal = distribusi.reduce((acc, curr) => acc + curr.kuota, 0);
  const leftover = TOTAL_FAKTUR - assignedTotal;

  // Handler update kuota
  const updateKuota = (id: number, delta: number) => {
    setDistribusi(prev => prev.map(c => {
      if (c.id === id) {
        const newKuota = Math.max(0, c.kuota + delta);
        // Pastikan tidak melebih total faktur
        const currentAssigned = prev.reduce((acc, curr) => curr.id === id ? acc : acc + curr.kuota, 0);
        if (currentAssigned + newKuota > TOTAL_FAKTUR) return c;
        return { ...c, kuota: newKuota };
      }
      return c;
    }));
  };

  const handleUploadClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const handleKonfirmasi = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setStep(3);
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Import & Distribusi Faktur</h1>
        <p className="text-sm text-slate-500 mt-1">Unggah file Excel untuk membagikan tugas penagihan secara otomatis.</p>
      </div>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${step >= 1 ? 'bg-blue-600 text-white border-4 border-white' : 'bg-white text-slate-400 border-4 border-slate-100'}`}>1</div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${step >= 2 ? 'bg-blue-600 text-white border-4 border-white' : 'bg-white text-slate-400 border-4 border-slate-100'}`}>2</div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${step >= 3 ? 'bg-emerald-500 text-white border-4 border-white' : 'bg-white text-slate-400 border-4 border-slate-100'}`}>3</div>
      </div>

      {/* STEP 1: UPLOAD AREA */}
      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors border border-blue-200">
              <Download className="w-4 h-4" />
              Download Template Excel (.xlsx)
            </button>
          </div>

          <div 
            onClick={handleUploadClick}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${isProcessing ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'}`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                <h3 className="text-lg font-bold text-blue-800">Membaca Data Excel...</h3>
                <p className="text-sm text-blue-600">Memvalidasi 100 baris faktur, harap tunggu.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Upload File Template Faktur</h3>
                  <p className="text-sm text-slate-500">Tarik dan lepas file Excel ke area ini, atau klik untuk mencari file.</p>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full mt-4">Max file size: 10MB</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* STEP 2: REVIEW & DISTRIBUTION */}
      {step === 2 && !isSuccess && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-4">
            <div className="bg-emerald-500 text-white p-2 rounded-lg mt-0.5">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-emerald-900 font-bold">Validasi Berhasil: 100 Faktur Ditemukan</h3>
              <p className="text-sm text-emerald-700 mt-1">Sistem akan membagikan tugas secara otomatis dengan aturan standar <strong>Maks 12 Faktur / Collector</strong>. Silakan tinjau dan edit jika diperlukan sebelum konfirmasi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> 
                Distribusi Tugas Hari Ini
              </h4>
              
              {distribusi.map(coll => (
                <div key={coll.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-${coll.color}-100 text-${coll.color}-700 font-bold flex items-center justify-center text-sm`}>{coll.code}</div>
                    <div>
                      <h5 className="font-bold text-slate-900">Collector {coll.name}</h5>
                      <p className="text-xs text-slate-500">Area Jakarta Selatan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                    <button 
                      onClick={() => updateKuota(coll.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-600 font-bold transition-colors"
                    >-</button>
                    <div className="w-12 text-center">
                      <span className="font-extrabold text-lg text-slate-900">{coll.kuota}</span>
                      <span className="text-[10px] text-slate-500 block -mt-1">Faktur</span>
                    </div>
                    <button 
                      onClick={() => updateKuota(coll.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-600 font-bold transition-colors"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" /> 
                Sisa & Jadwal Besok
              </h4>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl shadow-sm text-center h-[calc(100%-2rem)] flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="text-4xl font-extrabold text-orange-600 mb-2">{leftover}</div>
                <h5 className="font-bold text-orange-900">Faktur Tersisa</h5>
                <p className="text-xs text-orange-700 mt-2 leading-relaxed">Faktur yang tidak terdistribusi akan otomatis masuk ke antrean tugas esok hari.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 transition-colors"
            >Batal</button>
            <button 
              onClick={handleKonfirmasi}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Konfirmasi & Bagikan Tugas
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center max-w-lg mx-auto mt-10"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Tugas Berhasil Dibagikan!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            36 Faktur telah berhasil dikirim ke aplikasi mobile 3 Collector lapangan, dan 64 faktur sisa telah dijadwalkan untuk esok hari.
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => { setStep(1); setIsSuccess(false); setDistribusi([
                { id: 1, name: 'Andi', kuota: DEFAULT_QUOTA, code: 'AN', color: 'indigo' },
                { id: 2, name: 'Budi', kuota: DEFAULT_QUOTA, code: 'BU', color: 'blue' },
                { id: 3, name: 'Rina', kuota: DEFAULT_QUOTA, code: 'RI', color: 'emerald' },
              ]); }}
              className="px-6 py-2.5 rounded-xl font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
            >Import Lagi</button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all"
            >Lihat Tugas Berjalan</button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// --- DATA FAKTUR VIEW COMPONENT ---
// --- DATA FAKTUR VIEW COMPONENT ---
const MASTER_INVOICES = [
  { id: 'INV-202607-001', date: '01 Jul 2026', customer: 'Bidan Lestari', area: 'Jakarta Selatan', amount: 1500000, remaining: 0, dueDate: '10 Jul 2026', status: 'Lunas', collector: 'Budi', result: 'Tertagih Sesuai Nominal' },
  { id: 'INV-202607-002', date: '02 Jul 2026', customer: 'Klinik Bidan Aminah', area: 'Jakarta Pusat', amount: 5200000, remaining: 5200000, dueDate: '15 Jul 2026', status: 'Menunggu Verifikasi', collector: 'Andi', result: 'Menunggu Konfirmasi' },
  { id: 'INV-202606-089', date: '25 Jun 2026', customer: 'Bidan Siti Rohmah', area: 'Jakarta Barat', amount: 12000000, remaining: 12000000, dueDate: '05 Jul 2026', status: 'Overdue', collector: 'Rina', result: 'Tidak Di Tempat' },
  { id: 'INV-202607-015', date: '05 Jul 2026', customer: 'Bidan Rina Setia', area: 'Tangerang', amount: 3400000, remaining: 3400000, dueDate: '12 Jul 2026', status: 'Belum Ditagih', collector: null, result: '-' },
  { id: 'INV-202607-018', date: '06 Jul 2026', customer: 'Bidan Mawar', area: 'Depok', amount: 850000, remaining: 350000, dueDate: '14 Jul 2026', status: 'Tertagih Sebagian', collector: 'Andi', result: 'Tertagih Sebagian' },
  { id: 'INV-202607-020', date: '07 Jul 2026', customer: 'Bidan Yulia', area: 'Jakarta Selatan', amount: 25000000, remaining: 25000000, dueDate: '20 Jul 2026', status: 'Belum Ditagih', collector: null, result: '-' },
  { id: 'INV-202606-045', date: '10 Jun 2026', customer: 'Klinik Bidan Ningsih', area: 'Jakarta Timur', amount: 4100000, remaining: 2000000, dueDate: '20 Jun 2026', status: 'Overdue', collector: 'Budi', result: 'Janji Bayar' },
  { id: 'INV-202607-022', date: '08 Jul 2026', customer: 'Bidan Wati', area: 'Bekasi', amount: 1800000, remaining: 0, dueDate: '18 Jul 2026', status: 'Lunas', collector: 'Rina', result: 'Tertagih Sesuai Nominal' },
  { id: 'INV-202607-025', date: '09 Jul 2026', customer: 'Bidan Kartini', area: 'Jakarta Barat', amount: 6700000, remaining: 6700000, dueDate: '19 Jul 2026', status: 'Menunggu Verifikasi', collector: 'Andi', result: 'Menunggu Konfirmasi' },
  { id: 'INV-202607-030', date: '10 Jul 2026', customer: 'Bidan Sumiati', area: 'Jakarta Utara', amount: 15500000, remaining: 15500000, dueDate: '25 Jul 2026', status: 'Belum Ditagih', collector: null, result: '-' },
];

function DataFakturView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [resultFilter, setResultFilter] = useState('Semua');

  const filteredInvoices = MASTER_INVOICES.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || inv.status === statusFilter;
    const matchesResult = resultFilter === 'Semua' || inv.result === resultFilter;
    return matchesSearch && matchesStatus && matchesResult;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Lunas': return <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-md text-[10px] font-bold">Lunas</span>;
      case 'Overdue': return <span className="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-md text-[10px] font-bold">Overdue</span>;
      case 'Menunggu Verifikasi': return <span className="bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-md text-[10px] font-bold">Verifikasi</span>;
      case 'Tertagih Sebagian': return <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-md text-[10px] font-bold">Parsial</span>;
      default: return <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Faktur</h1>
          <p className="text-sm text-slate-500">Database master seluruh tagihan aktif dan riwayatnya.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-slate-200 shadow-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari No. Faktur / Pelanggan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white" 
              />
            </div>
            
            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg pr-2 hover:bg-slate-50 transition-colors">
              <div className="pl-3 py-2 text-slate-400 pointer-events-none">
                <Filter className="w-4 h-4" />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-2 pr-4 py-2 text-sm text-slate-600 bg-transparent focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Semua">Semua Status</option>
                <option value="Lunas">Lunas</option>
                <option value="Overdue">Overdue</option>
                <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                <option value="Tertagih Sebagian">Tertagih Sebagian</option>
                <option value="Belum Ditagih">Belum Ditagih</option>
              </select>
            </div>

            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg pr-2 hover:bg-slate-50 transition-colors">
              <div className="pl-3 py-2 text-slate-400 pointer-events-none">
                <Activity className="w-4 h-4" />
              </div>
              <select 
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="pl-2 pr-4 py-2 text-sm text-slate-600 bg-transparent focus:outline-none cursor-pointer appearance-none max-w-[150px] truncate"
              >
                <option value="Semua">Hasil Kunjungan</option>
                <option value="Tertagih Sesuai Nominal">Sesuai Nominal</option>
                <option value="Tertagih Sebagian">Sebagian</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Janji Bayar">Janji Bayar</option>
                <option value="Tidak Di Tempat">Tidak Di Tempat</option>
                <option value="-">Belum Ada</option>
              </select>
            </div>
            
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              <Calendar className="w-4 h-4" /> Jatuh Tempo
            </button>
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              <Contact className="w-4 h-4" /> Collector
            </button>
          </div>
          <span className="text-xs text-slate-500 font-medium">Menampilkan {filteredInvoices.length} dari {MASTER_INVOICES.length} Data</span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">No. Faktur</th>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Nominal / Sisa</th>
                <th className="p-4">Jatuh Tempo</th>
                <th className="p-4">Status</th>
                <th className="p-4">Collector</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Tidak ada faktur yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{inv.id}</div>
                      <div className="text-[10px] text-slate-500">{inv.date}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-700">{inv.customer}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {inv.area}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">Rp {inv.amount.toLocaleString('id-ID')}</div>
                      {inv.remaining > 0 && inv.remaining !== inv.amount && (
                        <div className="text-[10px] text-orange-600 font-semibold mt-0.5">
                          Sisa: Rp {inv.remaining.toLocaleString('id-ID')}
                        </div>
                      )}
                      {inv.remaining === 0 && (
                        <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Lunas</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className={`font-semibold ${inv.status === 'Overdue' ? 'text-red-600' : 'text-slate-700'}`}>
                        {inv.dueDate}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(inv.status)}
                      {inv.result !== '-' && (
                        <div className="text-[10px] text-slate-500 mt-1 font-medium italic">
                          Hasil: {inv.result}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {inv.collector ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                            {inv.collector.substring(0,2).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-700 text-xs">{inv.collector}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Belum di-assign</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Detail">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-white hover:text-slate-700 flex items-center gap-1 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-200 text-sm font-medium">2</button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-200 text-sm font-medium">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
            <button className="w-8 h-8 rounded-lg bg-transparent text-slate-600 hover:bg-slate-200 text-sm font-medium">248</button>
          </div>
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-white hover:text-slate-700 flex items-center gap-1 disabled:opacity-50">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
