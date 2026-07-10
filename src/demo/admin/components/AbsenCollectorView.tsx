import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, CheckCircle2, Clock, Map, Camera, ExternalLink } from 'lucide-react';

export function AbsenCollectorView() {
  const [selectedDate, setSelectedDate] = useState('2026-07-10');

  const absensi = [
    { id: 1, name: 'Andi Saputra', clockIn: '07:45', clockOut: '17:30', status: 'Hadir', locationIn: 'Kantor Pusat', locationOut: 'Klinik Sehati', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Budi Santoso', clockIn: '08:15', clockOut: null, status: 'Hadir (Terlambat)', locationIn: 'Kantor Cabang', locationOut: null, avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    { id: 3, name: 'Rina Wijaya', clockIn: '-', clockOut: '-', status: 'Sakit', locationIn: '-', locationOut: '-', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 4, name: 'Dodi Pratama', clockIn: '07:55', clockOut: null, status: 'Hadir', locationIn: 'Kantor Pusat', locationOut: null, avatarUrl: 'https://i.pravatar.cc/150?img=15' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hadir': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Hadir (Terlambat)': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Sakit': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-rose-100 text-rose-700 border-rose-200';
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Absen Collector</h1>
          <p className="text-sm text-slate-500">Pantau kehadiran, waktu mulai kerja, dan waktu selesai tim lapangan.</p>
        </div>
        <div className="flex gap-2 items-center bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm font-semibold text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-4 mb-4">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <select className="text-sm border border-slate-200 rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 outline-none bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <option value="">Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Sakit">Sakit / Izin</option>
              <option value="Alpa">Alpa</option>
            </select>
          </div>
          
          <div className="relative w-full xl:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama collector..."
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
                <th className="py-3.5 px-6 whitespace-nowrap">Collector</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status Kehadiran</th>
                <th className="py-3.5 px-4 whitespace-nowrap text-center">Waktu Clock-in</th>
                <th className="py-3.5 px-4 whitespace-nowrap text-center">Waktu Clock-out</th>
                <th className="py-3.5 px-4 whitespace-nowrap text-center">Bukti Selfie</th>
                <th className="py-3.5 px-6 whitespace-nowrap text-right">Lokasi GPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {absensi.map((absen) => (
                <tr key={absen.id} className="transition-colors hover:bg-slate-50/70 group">
                  <td className="py-3.5 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={absen.avatarUrl} alt={absen.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{absen.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wide ${getStatusBadge(absen.status)}`}>
                      {absen.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-center">
                    {absen.clockIn !== '-' ? (
                      <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <Clock className="w-4 h-4" />
                        <span className="font-bold text-sm">{absen.clockIn}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-center">
                    {absen.clockOut ? (
                      <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        <Clock className="w-4 h-4" />
                        <span className="font-bold text-sm">{absen.clockOut}</span>
                      </div>
                    ) : absen.clockIn !== '-' ? (
                      <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">Sedang Tugas</span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-center">
                    {absen.clockIn !== '-' && (
                      <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors mx-auto block">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-6 whitespace-nowrap text-right">
                    {absen.locationIn !== '-' && (
                      <button className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                        Lihat Peta
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </button>
                    )}
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
