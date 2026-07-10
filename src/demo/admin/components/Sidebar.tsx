import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileDown, 
  ClipboardCheck, 
  TrendingUp, 
  Bell, 
  Settings, 
  ShieldCheck,
  CheckSquare,
  Clock,
  Contact,
  MapPin,
  MessageSquare,
  PieChart,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onSelectMenu?: (menu: string) => void;
}

export default function Sidebar({ isOpen, onClose, activeMenu, onSelectMenu }: SidebarProps) {
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);

  const handleMenuClick = (name: string) => {
    if (onSelectMenu) {
      onSelectMenu(name);
    }
    // For smaller devices, close on click
    if (window.innerWidth < 1024 && !name.startsWith('Laporan-')) {
      onClose();
    }
  };

  const menuGroups = [
    {
      title: '',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Faktur & Penagihan',
      items: [
        { name: 'Import Faktur', icon: FileDown },
        { name: 'Data Faktur', icon: FileText },
        { name: 'Serah Terima Faktur', icon: ClipboardCheck },
        { name: 'Verifikasi Pembayaran', icon: CheckSquare },
        { name: 'Monitoring Penagihan', icon: TrendingUp },
      ]
    },
    {
      title: 'Pelanggan',
      items: [
        { name: 'Data Pelanggan', icon: Users },
        { name: 'Reminder Pelanggan', icon: Clock },
      ]
    },
    {
      title: 'Collector',
      items: [
        { name: 'Data Collector', icon: Contact },
        { name: 'Absen Collector', icon: MapPin },
      ]
    },
    {
      title: 'Sistem & Laporan',
      items: [
        { name: 'Pengaturan Reminder', icon: Settings },
        { name: 'Template Pesan', icon: MessageSquare },
      ]
    }
  ];

  const laporanSubMenus = [
    { id: 'tugas-hari-ini', label: 'Tugas Hari Ini' },
    { id: 'riwayat-kunjungan', label: 'Riwayat Penagihan' },
    { id: 'monitoring-overdue', label: 'Monitoring Overdue' },
    { id: 'status-penagihan', label: 'Status Penagihan' },
    { id: 'performa-collector', label: 'Performa Collector' },
    { id: 'customer-risk', label: 'Customer Risk Level' },
    { id: 'audit-log', label: 'Audit Log' },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="sidebar-container"
        className={`fixed inset-y-0 left-0 w-64 bg-white/70 backdrop-blur-md border-r border-slate-100/50 flex flex-col z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            {/* Elegant Brand Logo */}
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-base leading-tight">Blesscom</h1>
              <p className="text-xs text-blue-600 font-medium tracking-wide uppercase">Collector</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 lg:hidden"
            aria-label="Tutup sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {group.title && (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeMenu === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleMenuClick(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-4 rounded-full bg-blue-600" />
                    )}
                  </button>
                );
              })}
              
              {/* Special Handling for Laporan Accordion in the last group */}
              {group.title === 'Sistem & Laporan' && (
                <div className="mt-1">
                  <div 
                    onClick={() => setIsLaporanOpen(!isLaporanOpen)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${activeMenu.startsWith('laporan-') ? 'bg-blue-50 text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <PieChart className={`w-4 h-4 ${activeMenu.startsWith('laporan-') ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>Laporan</span>
                    </div>
                    {isLaporanOpen ? <ChevronUp className="w-4 h-4 opacity-50" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                  
                  <AnimatePresence>
                    {isLaporanOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-5 mt-1 space-y-1 border-l border-slate-200"
                      >
                        {laporanSubMenus.map(item => {
                          const id = `laporan-${item.id}`;
                          const isSubActive = activeMenu === id;
                          return (
                            <div 
                              key={item.id}
                              onClick={() => handleMenuClick(id)}
                              className={`pl-4 py-2 cursor-pointer text-[13px] transition-colors relative before:content-[''] before:absolute before:left-[-1px] before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-4 before:rounded-r-md ${isSubActive ? 'text-blue-700 font-bold before:bg-blue-600 bg-blue-50/50 rounded-r-lg' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-r-lg'}`}
                            >
                              {item.label}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Security Card */}
        <div className="p-4 border-t border-slate-50">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded-lg text-green-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-[11px] font-bold text-slate-900">Keamanan Data Terjamin</h4>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
