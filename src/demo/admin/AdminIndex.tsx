import { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  DollarSign, 
  TrendingUp, 
  UserCheck, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign as DollarIcon, 
  Activity, 
  CheckCircle2, 
  X,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Customer } from './types/customer';
import { initialCustomers } from './data/customers';
import { formatCurrency } from './utils/formatCurrency';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SummaryCard from './components/SummaryCard';
import FilterBar from './components/FilterBar';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DashboardView, 
  ImportFakturView, 
  DataFakturView, 
  SerahTerimaFakturView, 
  VerifikasiPembayaranView, 
  LaporanView 
} from './components/OldViews';
import { MonitoringPenagihanView } from './components/MonitoringPenagihanView';
import { ReminderPelangganView } from './components/ReminderPelangganView';
import { DataCollectorView } from './components/DataCollectorView';
import { AbsenCollectorView } from './components/AbsenCollectorView';
import { PengaturanReminderView } from './components/PengaturanReminderView';
import { TemplatePesanView } from './components/TemplatePesanView';


export default function App() {
  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Customer states
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');

  // Handle menu changes
  const handleSelectMenu = (menuName: string) => {
    setActiveMenu(menuName);
  };

  // Filtered customers logic
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = selectedArea === '' || customer.area === selectedArea;
    const matchesStatus = selectedStatus === '' || customer.status === selectedStatus;
    const matchesRisk = selectedRisk === '' || customer.riskLevel === selectedRisk;

    return matchesSearch && matchesArea && matchesStatus && matchesRisk;
  });

  // Export Excel action
  const handleExportExcel = () => {
    alert(`Export Excel Berhasil!\n\nLaporan "Data Pelanggan Blesscom" telah diekspor dengan sukses.\nTotal record yang diekspor: ${filteredCustomers.length} baris.`);
  };

  // Scroll to form and focus
  const handleAddCustomerClick = () => {
    setEditingCustomer(null); // Clear editing to reset to blank/default template
    const formElement = document.getElementById('customer-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      // Wait for scroll animation, then focus on first input
      setTimeout(() => {
        const nameInput = formElement.querySelector('input') as HTMLInputElement;
        if (nameInput) {
          nameInput.focus();
        }
      }, 600);
    }
  };

  // Save customer handler (both Add & Edit)
  const handleSaveCustomer = (savedCustomer: Customer) => {
    const exists = customers.some((c) => c.id === savedCustomer.id);
    if (exists) {
      // Update existing
      setCustomers((prev) =>
        prev.map((c) => (c.id === savedCustomer.id ? { ...savedCustomer, totalDebt: c.totalDebt } : c))
      );
    } else {
      // Add new (assign some dummy debt for visual variance)
      const newWithDebt: Customer = {
        ...savedCustomer,
        totalDebt: Math.floor(Math.random() * 5 + 1) * 1250000 // Random debt between 1.25M and 6.25M
      };
      setCustomers((prev) => [newWithDebt, ...prev]);
    }
    setEditingCustomer(null);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    const formElement = document.getElementById('customer-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = formElement.querySelector('input') as HTMLInputElement;
        if (nameInput) {
          nameInput.focus();
        }
      }, 600);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased">
      {/* Sidebar - Left Section */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeMenu={activeMenu}
        onSelectMenu={handleSelectMenu}
      />

      {/* Main Container - Right Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          title="Data Pelanggan" 
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <AnimatePresence mode="wait">
          {activeMenu === 'Data Pelanggan' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header Title & Breadcrumb */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Data Pelanggan</h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                Kelola data pelanggan, bidan, outlet, dan informasi kontak
              </p>
            </div>
            
            {/* Breadcrumb path */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 self-start md:self-auto">
              <span>Blesscom</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-blue-600 font-bold">Data Pelanggan</span>
            </div>
          </div>

          {/* Card Ringkasan Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              title="Total Pelanggan"
              value="1.248"
              description="<span class='text-green-600 font-semibold'>+12</span> pelanggan baru bulan ini"
              icon={Users}
              iconColorClass="text-blue-600"
              iconBgClass="bg-blue-50"
            />
            <SummaryCard
              title="Pelanggan Aktif"
              value="1.012"
              description="<span class='text-blue-600 font-semibold'>81,25%</span> dari total pelanggan"
              icon={UserCheck}
              iconColorClass="text-green-600"
              iconBgClass="bg-green-50"
            />
            <SummaryCard
              title="High Risk"
              value="138"
              description="<span class='text-red-600 font-semibold'>11,06%</span> dari total pelanggan"
              icon={ShieldAlert}
              iconColorClass="text-orange-600"
              iconBgClass="bg-orange-50"
            />
            <SummaryCard
              title="Total Piutang Pelanggan"
              value="Rp 1.930.000.000"
              description="Rata-rata hari tunggakan <span class='font-semibold text-slate-700'>45 hari</span>"
              icon={TrendingUp}
              iconColorClass="text-blue-600"
              iconBgClass="bg-blue-50"
            />
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedArea={selectedArea}
            onAreaChange={setSelectedArea}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedRisk={selectedRisk}
            onRiskChange={setSelectedRisk}
            onExportExcel={handleExportExcel}
            onAddCustomer={handleAddCustomerClick}
          />

          {/* Customer Table Section */}
          <CustomerTable
            customers={filteredCustomers}
            totalCount={searchTerm || selectedArea || selectedStatus || selectedRisk ? filteredCustomers.length : 1248}
            onEdit={handleEditCustomer}
            onView={(customer) => setViewingCustomer(customer)}
          />

          {/* Customer Form Section */}
          <CustomerForm
            editingCustomer={editingCustomer}
            onSave={handleSaveCustomer}
            onCancel={() => setEditingCustomer(null)}
          />
          </motion.div>
          )}

          {/* Imported old views */}
          {activeMenu === 'Dashboard' && <DashboardView key="dashboard" />}
          {activeMenu === 'Import Faktur' && <ImportFakturView key="import" onNavigate={setActiveMenu} />}
          {activeMenu === 'Data Faktur' && <DataFakturView key="data" />}
          {activeMenu === 'Serah Terima Faktur' && <SerahTerimaFakturView key="serah" />}
          {activeMenu === 'Verifikasi Pembayaran' && <VerifikasiPembayaranView key="verifikasi" />}
          {activeMenu === 'Monitoring Penagihan' && <MonitoringPenagihanView key="monitoring" />}
          {activeMenu === 'Reminder Pelanggan' && <ReminderPelangganView key="reminder" />}
          {activeMenu === 'Data Collector' && <DataCollectorView key="collector" />}
          {activeMenu === 'Absen Collector' && <AbsenCollectorView key="absen" />}
          {activeMenu === 'Pengaturan Reminder' && <PengaturanReminderView key="pengaturan" />}
          {activeMenu === 'Template Pesan' && <TemplatePesanView key="template" />}
          {activeMenu.startsWith('laporan-') && <LaporanView key="laporan" activeReport={activeMenu} />}
          </AnimatePresence>
        </main>
      </div>

      {/* Customer Detail Overlay Modal */}
      {viewingCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-bold font-mono tracking-wider">
                  {viewingCustomer.id}
                </span>
                <h3 className="font-bold text-base md:text-lg">{viewingCustomer.name}</h3>
              </div>
              <button 
                onClick={() => setViewingCustomer(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                aria-label="Tutup detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status Pelanggan</p>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                      viewingCustomer.status === 'Active' ? 'bg-green-100 text-green-800' :
                      viewingCustomer.status === 'Inactive' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-800'
                    }`}>
                      {viewingCustomer.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Risk Level</p>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                      viewingCustomer.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      viewingCustomer.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      viewingCustomer.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {viewingCustomer.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No. HP / WhatsApp</p>
                    <p className="font-mono text-slate-800 font-semibold">{viewingCustomer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Wilayah Operasional</p>
                    <p className="text-slate-800 font-semibold">{viewingCustomer.area}, {viewingCustomer.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarIcon className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Piutang Berjalan</p>
                    <p className="text-slate-900 font-extrabold text-base">{formatCurrency(viewingCustomer.totalDebt)}</p>
                  </div>
                </div>
              </div>

              {/* Alamat Lengkap */}
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alamat Lengkap</p>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-xs">
                  {viewingCustomer.address}
                </p>
              </div>

              {/* Last update footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  Terakhir Diperbarui
                </span>
                <span>{viewingCustomer.lastUpdate}</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={() => handleEditCustomer(viewingCustomer)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Edit Data Pelanggan
              </button>
              <button 
                onClick={() => setViewingCustomer(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
