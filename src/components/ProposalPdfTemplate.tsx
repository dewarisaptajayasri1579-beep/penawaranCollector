import React from 'react';
import { ProposalFormInput } from '../types';
import { Database, Smartphone, Activity, MapPin } from 'lucide-react';

interface Props {
  formData: ProposalFormInput;
}

export default function ProposalPdfTemplate({ formData }: Props) {
  // We use inline styles or specific width to mimic A4 paper size. 
  // 794px width roughly matches A4 width at 96 DPI, giving consistent rendering.
  return (
    <div
      className="hidden print:block print:relative print:w-full print:h-auto bg-white text-slate-800"
    >
      <div className="p-12 print:p-0 flex flex-col bg-white">
        
        {/* Header section */}
        <div className="flex justify-between items-start border-b-2 border-[#003366] pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-[#003366] tracking-tight">Blesscom Collector Recal</h1>
            <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-widest">Sistem Manajemen Penagihan Modern</p>
          </div>
          <div className="text-right">
            <div className="bg-[#003366] text-white px-4 py-1.5 rounded-l-full font-bold text-sm inline-block">PROPOSAL PENAWARAN</div>
            <p className="text-xs text-slate-500 mt-2">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Client Info Section */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-8 flex flex-col">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Disiapkan Khusus Untuk:</p>
          <h2 className="text-2xl font-bold text-slate-800">{formData.company || 'Perusahaan Anda'}</h2>
          <p className="text-slate-600 font-medium mt-1">Attn: {formData.name || 'Bapak/Ibu'}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-xs text-slate-500">Bidang Usaha</p>
              <p className="text-sm font-semibold text-slate-700">{formData.businessType || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Estimasi Collector</p>
              <p className="text-sm font-semibold text-slate-700">{formData.collectorCount || '-'}</p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#003366] mb-3">Mengapa Memilih Blesscom Collector Recal?</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Berdasarkan profil usaha Anda di bidang {formData.businessType || 'Anda'}, kelancaran arus kas (cashflow) dari perputaran piutang sangat bergantung pada performa penagihan lapangan. Kami menawarkan sistem terpadu yang membantu menertibkan, memantau, dan mempercepat proses tersebut.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-[#003366]">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#003366]">Manajemen Tugas Otomatis</h4>
              <p className="text-xs text-slate-600 mt-1">Pembagian tagihan prioritas dari admin langsung ke HP collector tanpa kertas terselip.</p>
            </div>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-start gap-4">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-800">GPS & Validasi Kunjungan</h4>
              <p className="text-xs text-slate-600 mt-1">Bukti otentik berupa koordinat lokasi dan foto kunjungan untuk mencegah kecurangan (fraud).</p>
            </div>
          </div>
          <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-start gap-4">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-purple-800">Laporan Real-Time</h4>
              <p className="text-xs text-slate-600 mt-1">Monitoring status penagihan detik itu juga. Hasil Lunas atau Janji Bayar langsung masuk sistem.</p>
            </div>
          </div>
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-800">WhatsApp Auto-Reminder</h4>
              <p className="text-xs text-slate-600 mt-1">Peringatan otomatis jatuh tempo terkirim langsung ke pelanggan untuk mempercepat penagihan.</p>
            </div>
          </div>
        </div>

        {/* Pricing / Closing */}
        <div className="mt-auto pt-8 border-t border-slate-100">
          <p className="text-sm font-semibold text-slate-700 text-center mb-2">Siap Tingkatkan Performa Collection Anda?</p>
          <p className="text-xs text-slate-500 text-center mb-6 max-w-lg mx-auto">
            Tim konsultan kami akan segera menghubungi Anda melalui nomor WhatsApp <b>{formData.whatsapp || '-'}</b> atau Email <b>{formData.email || '-'}</b> untuk menjadwalkan demo sistem.
          </p>
          
          <div className="bg-[#003366] text-white p-4 rounded-xl text-center">
            <p className="text-xs opacity-80 uppercase tracking-widest font-semibold mb-1">Hubungi Kami Langsung</p>
            <p className="font-bold text-lg">WhatsApp: +62 812-3456-7890</p>
          </div>
        </div>

      </div>
    </div>
  );
}
