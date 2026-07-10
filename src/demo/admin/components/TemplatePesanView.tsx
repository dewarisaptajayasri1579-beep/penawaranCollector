import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Save, User, FileText, Calendar, Hash, DollarSign, Smartphone } from 'lucide-react';

export function TemplatePesanView() {
  const [template, setTemplate] = useState(
    'Halo Bpk/Ibu {nama_pelanggan},\n\n' +
    'Ini adalah pesan pengingat otomatis dari Blesscom.\n\n' +
    'Tagihan Anda dengan nomor faktur {nomor_faktur} sebesar {nominal_tagihan} akan jatuh tempo pada {jatuh_tempo}.\n\n' +
    'Mohon untuk menyiapkan pembayaran sebelum tanggal tersebut.\n\n' +
    'Terima kasih.'
  );

  const variables = [
    { id: '{nama_pelanggan}', label: 'Nama Pelanggan', icon: User },
    { id: '{nomor_faktur}', label: 'Nomor Faktur', icon: Hash },
    { id: '{nominal_tagihan}', label: 'Nominal Tagihan', icon: DollarSign },
    { id: '{jatuh_tempo}', label: 'Jatuh Tempo', icon: Calendar },
    { id: '{nama_collector}', label: 'Nama Collector', icon: FileText },
  ];

  const insertVariable = (variableId: string) => {
    setTemplate(prev => prev + variableId);
  };

  // Preview replacement
  const previewText = template
    .replace(/{nama_pelanggan}/g, 'Bidan Ningsih')
    .replace(/{nomor_faktur}/g, 'INV-2607-004')
    .replace(/{nominal_tagihan}/g, 'Rp 2.100.000')
    .replace(/{jatuh_tempo}/g, '12 Jul 2026')
    .replace(/{nama_collector}/g, 'Andi Saputra');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-5xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Pesan</h1>
          <p className="text-sm text-slate-500">Sesuaikan kata-kata untuk pesan otomatis WhatsApp.</p>
        </div>
        <div className="flex gap-2">
          <select className="text-sm border border-slate-200 bg-white rounded-xl py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 outline-none hover:bg-slate-50 transition-colors cursor-pointer">
            <option>Reminder H-3</option>
            <option>Reminder H-1</option>
            <option>Reminder Hari H</option>
            <option>Reminder Overdue</option>
            <option>Ucapan Terima Kasih</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <Save className="w-4 h-4" />
            Simpan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Editor Area */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col overflow-hidden h-full">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Editor Pesan
            </h3>
          </div>
          
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Variabel Tersedia</p>
            <div className="flex flex-wrap gap-2">
              {variables.map(v => (
                <button 
                  key={v.id}
                  onClick={() => insertVariable(v.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors shadow-sm"
                  title="Klik untuk menyisipkan"
                >
                  <v.icon className="w-3.5 h-3.5" />
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <textarea 
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="flex-1 w-full p-5 min-h-[350px] resize-none focus:outline-none focus:ring-0 text-slate-700 text-sm leading-relaxed"
            placeholder="Ketik pesan Anda di sini..."
          />
        </div>

        {/* Live Preview Area */}
        <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full relative">
          <div className="p-4 border-b border-slate-200 bg-slate-200/50 flex justify-between items-center backdrop-blur-sm z-10">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-600" />
              Live Preview (WhatsApp)
            </h3>
          </div>

          {/* Chat Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

          <div className="flex-1 p-6 flex flex-col justify-start overflow-y-auto relative z-10">
            {/* Chat Bubble */}
            <div className="bg-emerald-50 text-emerald-950 p-4 rounded-2xl rounded-tl-sm shadow-md max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed border border-emerald-100">
              {previewText}
              <div className="text-[10px] text-emerald-700/60 text-right mt-2 font-medium">10:45 AM</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
