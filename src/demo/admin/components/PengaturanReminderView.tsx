import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Save, BellRing, Smartphone, AlertTriangle } from 'lucide-react';

export function PengaturanReminderView() {
  const [settings, setSettings] = useState({
    h3: true,
    h1: true,
    hariH: true,
    overdue: true,
    time: '09:00',
    fallbackSms: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-4xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Reminder</h1>
          <p className="text-sm text-slate-500">Atur otomatisasi jadwal pengiriman pesan tagihan ke pelanggan.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 w-fit">
          <Save className="w-4 h-4" />
          Simpan Pengaturan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-blue-600" />
                Jadwal Otomatisasi (H-X)
              </h3>
            </div>
            
            <div className="divide-y divide-slate-100">
              {/* Item 1 */}
              <div className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800">Reminder H-3 Jatuh Tempo</h4>
                  <p className="text-sm text-slate-500 mt-1">Kirim pesan peringatan awal 3 hari sebelum jatuh tempo.</p>
                </div>
                <button 
                  onClick={() => handleToggle('h3')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.h3 ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.h3 ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Item 2 */}
              <div className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800">Reminder H-1 Jatuh Tempo</h4>
                  <p className="text-sm text-slate-500 mt-1">Kirim pesan sehari sebelum tanggal pembayaran.</p>
                </div>
                <button 
                  onClick={() => handleToggle('h1')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.h1 ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.h1 ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Item 3 */}
              <div className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800">Reminder Hari H</h4>
                  <p className="text-sm text-slate-500 mt-1">Kirim pesan di hari jatuh tempo.</p>
                </div>
                <button 
                  onClick={() => handleToggle('hariH')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.hariH ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.hariH ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Item 4 */}
              <div className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    Reminder Overdue <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">Kirim pesan peringatan keras saat sudah lewat jatuh tempo.</p>
                </div>
                <button 
                  onClick={() => handleToggle('overdue')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.overdue ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.overdue ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Waktu Pengiriman
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-500">Pilih jam saat pesan otomatis akan dikirimkan setiap harinya.</p>
              <input 
                type="time" 
                value={settings.time}
                onChange={(e) => setSettings(prev => ({ ...prev, time: e.target.value }))}
                className="w-full text-lg font-bold border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-700"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                Fallback SMS
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-500">Kirim SMS jika pesan WhatsApp gagal terkirim (membutuhkan pulsa).</p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleToggle('fallbackSms')}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${settings.fallbackSms ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.fallbackSms ? 'left-7' : 'left-1'}`} />
                </button>
                <span className="text-sm font-bold text-slate-700">{settings.fallbackSms ? 'Aktif' : 'Tidak Aktif'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
