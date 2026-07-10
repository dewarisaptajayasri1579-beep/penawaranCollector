import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Star, 
  TrendingUp, 
  Search, 
  FileSpreadsheet, 
  UserPlus, 
  Edit2, 
  Eye, 
  MapPin, 
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SummaryCard from './SummaryCard';

export function DataCollectorView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const collectors = [
    { 
      id: 'COL-001', 
      name: 'Andi Saputra', 
      phone: '0812-1111-2222', 
      area: 'Jakarta Pusat', 
      joined: '12 Jan 2024', 
      rating: 4.8, 
      completed: 342, 
      successRate: '92%', 
      status: 'Active' 
    },
    { 
      id: 'COL-002', 
      name: 'Budi Santoso', 
      phone: '0856-3333-4444', 
      area: 'Jakarta Selatan', 
      joined: '05 Feb 2024', 
      rating: 4.5, 
      completed: 215, 
      successRate: '88%', 
      status: 'Active' 
    },
    { 
      id: 'COL-003', 
      name: 'Rina Wijaya', 
      phone: '0821-5555-6666', 
      area: 'Jakarta Timur', 
      joined: '18 Mar 2024', 
      rating: 4.9, 
      completed: 189, 
      successRate: '95%', 
      status: 'Active' 
    },
    { 
      id: 'COL-004', 
      name: 'Dodi Pratama', 
      phone: '0813-7777-8888', 
      area: 'Tangerang', 
      joined: '01 Apr 2024', 
      rating: 4.2, 
      completed: 156, 
      successRate: '82%', 
      status: 'Active' 
    },
    { 
      id: 'COL-005', 
      name: 'Hendra Setiawan', 
      phone: '0819-8888-9999', 
      area: 'Jakarta Barat', 
      joined: '10 Mei 2024', 
      rating: 4.6, 
      completed: 140, 
      successRate: '89%', 
      status: 'Active' 
    },
    { 
      id: 'COL-006', 
      name: 'Siti Nurhaliza', 
      phone: '0811-2222-3333', 
      area: 'Bekasi', 
      joined: '20 Jun 2024', 
      rating: 4.7, 
      completed: 98, 
      successRate: '91%', 
      status: 'Inactive' 
    },
  ];

  const filteredCollectors = collectors.filter(col => {
    const matchesSearch = col.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          col.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          col.phone.includes(searchTerm);
    const matchesArea = !selectedArea || col.area === selectedArea;
    const matchesStatus = !selectedStatus || col.status === selectedStatus;
    return matchesSearch && matchesArea && matchesStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Card Ringkasan Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Collector"
          value="24"
          description="<span class='text-green-600 font-semibold'>+2</span> collector baru bulan ini"
          icon={Users}
          iconColorClass="text-blue-600"
          iconBgClass="bg-blue-50"
        />
        <SummaryCard
          title="Collector Aktif"
          value="22"
          description="<span class='text-blue-600 font-semibold'>91,6%</span> siap bertugas lapangan"
          icon={UserCheck}
          iconColorClass="text-green-600"
          iconBgClass="bg-green-50"
        />
        <SummaryCard
          title="Rata-rata Rating"
          value="4.7"
          description="Berdasarkan penilaian kepuasan nasabah"
          icon={Star}
          iconColorClass="text-amber-600"
          iconBgClass="bg-amber-50"
        />
        <SummaryCard
          title="Success Rate Penagihan"
          value="89,5%"
          description="Rata-rata penyelesaian penagihan tepat waktu"
          icon={TrendingUp}
          iconColorClass="text-emerald-600"
          iconBgClass="bg-emerald-50"
        />
      </div>

      {/* Filter Bar (samakan persis dengan Data Pelanggan) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ID, nama collector, atau nomor HP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
            >
              <option value="">Semua Area</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Tangerang">Tangerang</option>
              <option value="Bekasi">Bekasi</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
            >
              <option value="">Semua Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              onClick={() => {}}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2 transition-all active:scale-98"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export Excel</span>
            </button>

            <button
              onClick={() => {}}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Collector</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section (samakan persis dengan CustomerTable Data Pelanggan) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Table Header Section */}
        <div className="px-6 py-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Daftar Collector</h3>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-500">
            <span>Menampilkan 1 - {filteredCollectors.length} dari {collectors.length} data</span>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold tracking-wider uppercase border-b border-slate-100">
                <th className="py-3.5 px-6 whitespace-nowrap">Kode Collector</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Nama Collector</th>
                <th className="py-3.5 px-4 whitespace-nowrap">No. HP / WA</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Area Tugas</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Tanggal Bergabung</th>
                <th className="py-3.5 px-4 whitespace-nowrap text-center">Rating</th>
                <th className="py-3.5 px-4 whitespace-nowrap text-center">Success Rate</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-6 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredCollectors.map((col) => (
                <tr 
                  key={col.id} 
                  className="hover:bg-blue-50/40 transition-colors duration-150 group"
                >
                  <td className="py-3.5 px-6 whitespace-nowrap font-mono font-semibold text-blue-600">
                    {col.id}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{col.name}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-600">
                    {col.phone}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                    {col.area}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                    {col.joined}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {col.rating}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-center font-bold text-emerald-600">
                    {col.successRate}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {col.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 whitespace-nowrap text-center">
                    <div className="inline-flex items-center justify-center gap-1">
                      <button
                        onClick={() => {}}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {}}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-semibold text-slate-700">1</span> sampai <span className="font-semibold text-slate-700">{filteredCollectors.length}</span> dari <span className="font-semibold text-slate-700">{collectors.length}</span> entri
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 font-medium disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
            >
              1
            </button>
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 font-medium disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
