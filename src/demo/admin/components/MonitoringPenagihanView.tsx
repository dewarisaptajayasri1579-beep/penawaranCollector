import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, CheckCircle2, XCircle, TrendingUp, Users } from 'lucide-react';

export function MonitoringPenagihanView() {
  const stats = [
    { label: 'Total Kunjungan', value: '45', icon: Navigation, color: 'blue' },
    { label: 'Sedang Jalan', value: '12', icon: TrendingUp, color: 'amber' },
    { label: 'Selesai', value: '28', icon: CheckCircle2, color: 'emerald' },
    { label: 'Gagal / Reschedule', value: '5', icon: XCircle, color: 'rose' },
  ];

  const timeline = [
    { id: 1, time: '10:45', collector: 'Andi Saputra', action: 'Selesai Penagihan', location: 'Klinik Sehati - Tangerang', amount: 'Rp 4.500.000', status: 'success' },
    { id: 2, time: '10:30', collector: 'Budi Santoso', action: 'Menuju Lokasi', location: 'Bidan Sri - Jakarta Selatan', amount: null, status: 'process' },
    { id: 3, time: '10:15', collector: 'Rina Wijaya', action: 'Gagal (Tutup)', location: 'Apotek Sehat - Jakarta Timur', amount: null, status: 'failed' },
    { id: 4, time: '09:50', collector: 'Andi Saputra', action: 'Mulai Kunjungan', location: 'Klinik Sehati - Tangerang', amount: null, status: 'process' },
    { id: 5, time: '09:30', collector: 'Dodi Pratama', action: 'Selesai Penagihan', location: 'Bidan Ningsih - Jakarta Pusat', amount: 'Rp 2.100.000', status: 'success' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Monitoring Penagihan</h1>
          <p className="text-sm text-slate-500">Pantau pergerakan dan aktivitas kolektor secara real-time.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Live Tracker Aktif
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Peta Persebaran
            </h3>
            <div className="flex gap-2">
              <select className="text-xs border-slate-200 rounded-lg py-1.5 focus:ring-blue-500 text-slate-700 bg-white">
                <option>Semua Area</option>
                <option>Jakarta Pusat</option>
                <option>Jakarta Selatan</option>
                <option>Tangerang</option>
              </select>
            </div>
          </div>
          <div className="flex-1 bg-slate-100 relative">
            {/* Dummy Map Visual */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            
            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
              <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg mb-1">Andi S.</div>
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md animate-bounce"></div>
            </div>
            
            <div className="absolute top-1/2 left-2/3 flex flex-col items-center">
              <div className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg mb-1">Budi S.</div>
              <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-md"></div>
            </div>

            <div className="absolute bottom-1/3 left-1/4 flex flex-col items-center opacity-50">
              <div className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg mb-1">Rina W.</div>
              <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-md"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold text-slate-500 shadow-sm border border-slate-200">
                Integrasi Google Maps / Mapbox
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Feed */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Live Feed
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <div key={item.id} className="relative pl-6">
                  {/* Timeline Line */}
                  {idx !== timeline.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-100"></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
                    item.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                    item.status === 'process' ? 'bg-amber-100 text-amber-600' : 
                    'bg-rose-100 text-rose-600'
                  }`}>
                    {item.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : 
                     item.status === 'process' ? <TrendingUp className="w-3 h-3" /> : 
                     <XCircle className="w-3 h-3" />}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-slate-500">{item.time}</span>
                      {item.amount && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{item.amount}</span>}
                    </div>
                    <p className="text-sm font-bold text-slate-800">{item.action}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {item.collector}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
