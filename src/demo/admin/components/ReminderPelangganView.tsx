import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, MessageCircle, Clock, CheckCircle2, AlertTriangle, AlertCircle, Calendar } from 'lucide-react';

export function ReminderPelangganView() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const reminders = [
    { id: 'REM-001', name: 'Bidan Ningsih', phone: '0812-3456-7890', area: 'Jakarta Pusat', dueDate: '12 Jul 2026', remaining: 'Rp 2.100.000', status: 'H-2', lastSent: null },
    { id: 'REM-002', name: 'Klinik Sehati', phone: '0856-7890-1234', area: 'Tangerang', dueDate: '10 Jul 2026', remaining: 'Rp 4.500.000', status: 'Hari H', lastSent: '08:00 AM' },
    { id: 'REM-003', name: 'Bidan Aminah', phone: '0821-4321-9876', area: 'Jakarta Pusat', dueDate: '09 Jul 2026', remaining: 'Rp 800.000', status: 'Overdue', lastSent: 'Kemarin' },
    { id: 'REM-004', name: 'Apotek Sehat', phone: '0813-5555-4444', area: 'Jakarta Timur', dueDate: '15 Jul 2026', remaining: 'Rp 1.250.000', status: 'H-5', lastSent: null },
  ];

  const handleSelectAll = () => {
    if (selectedCustomers.length === reminders.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(reminders.map(r => r.id));
    }
  };

  const handleSelect = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(i => i !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Overdue': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Hari H': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Overdue': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'Hari H': return <AlertCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reminder Pelanggan</h1>
          <p className="text-sm text-slate-500">Daftar pelanggan yang perlu diingatkan terkait tagihan yang akan jatuh tempo.</p>
        </div>
        <button 
          disabled={selectedCustomers.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 w-fit"
        >
          <MessageCircle className="w-4 h-4" />
          Kirim WA Massal ({selectedCustomers.length})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-4 mb-4">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <select className="text-sm border border-slate-200 rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 outline-none bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <option value="">Semua Status Reminder</option>
              <option value="H-3">H-3 Jatuh Tempo</option>
              <option value="Hari H">Hari H</option>
              <option value="Overdue">Overdue (Lewat Waktu)</option>
            </select>
            <select className="text-sm border border-slate-200 rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 outline-none bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <option value="">Semua Area</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Tangerang">Tangerang</option>
            </select>
          </div>
          
          <div className="relative w-full xl:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pelanggan atau no telp..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6 whitespace-nowrap w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={selectedCustomers.length > 0 && selectedCustomers.length === reminders.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">Pelanggan</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Jatuh Tempo</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Sisa Tagihan</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status Reminder</th>
                <th className="py-3.5 px-6 whitespace-nowrap text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reminders.map((rem) => (
                <tr key={rem.id} className={`transition-colors ${selectedCustomers.includes(rem.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50/70'}`}>
                  <td className="py-3.5 px-6 whitespace-nowrap text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={selectedCustomers.includes(rem.id)}
                      onChange={() => handleSelect(rem.id)}
                    />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800 text-xs">{rem.name}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {rem.area}</span>
                      <span className="text-slate-400 font-mono">{rem.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {rem.dueDate}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-black text-rose-600 text-xs">{rem.remaining}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 items-start">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wide ${getStatusBadge(rem.status)}`}>
                        {getStatusIcon(rem.status)}
                        {rem.status}
                      </div>
                      {rem.lastSent ? (
                        <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Dikirim {rem.lastSent}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium italic">
                          Belum dikirim
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 whitespace-nowrap text-right">
                    <button className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" />
                      Kirim WA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
