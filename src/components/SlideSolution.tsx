import React, { useState } from 'react';
import { Database, ClipboardList, Smartphone, CheckSquare, BarChart3, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { SolutionStep } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function SlideSolution() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: SolutionStep[] = [
    {
      step: 1,
      title: 'Input / Import Tagihan',
      desc: 'Admin menginput atau mengimpor data pelanggan, nominal tagihan, dan tanggal jatuh tempo langsung dari Excel atau sistem ERP.',
      role: 'Admin Backoffice',
      iconName: 'database',
    },
    {
      step: 2,
      title: 'Pembuatan Daftar Tugas',
      desc: 'Sistem menyaring tagihan overdue secara otomatis dan admin membagikan tugas kunjungan/follow up harian kepada tim collector.',
      role: 'Sistem & Admin',
      iconName: 'clipboard',
    },
    {
      step: 3,
      title: 'Daftar Tugas Harian HP',
      desc: 'Collector menerima daftar tugas harian langsung di ponsel mereka. Lengkap dengan detail alamat, nominal, dan riwayat pelanggan.',
      role: 'Collector Lapangan',
      iconName: 'smartphone',
    },
    {
      step: 4,
      title: 'Follow Up & GPS Check-in',
      desc: 'Collector melakukan kunjungan lapangan, menekan tombol check-in GPS sebagai bukti kehadiran otentik di titik lokasi klien.',
      role: 'Collector Lapangan',
      iconName: 'location',
    },
    {
      step: 5,
      title: 'Input Hasil Real-time',
      desc: 'Collector langsung menginput status penagihan: Terbayar, Janji Bayar, Tidak Bertemu, atau butuh Reschedule, disertai foto bukti.',
      role: 'Collector Lapangan',
      iconName: 'check',
    },
    {
      step: 6,
      title: 'Laporan Real-time',
      desc: 'Manajemen memantau progress recovery penagihan, performa masing-masing collector, dan grafik setoran harian.',
      role: 'Manajemen & Owner',
      iconName: 'chart',
    },
  ];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'clipboard':
        return <ClipboardList className="h-5 w-5" />;
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'location':
        return <UserCheck className="h-5 w-5" />;
      case 'check':
        return <CheckSquare className="h-5 w-5" />;
      case 'chart':
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  return (
    <div id="slide-solution" className="w-full flex flex-col justify-between h-full py-2 px-2 select-none overflow-y-auto">
      {/* Heading */}
      <div className="space-y-2 text-center max-w-3xl mx-auto mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
          Satu Sistem untuk Mengatur Follow Up Tagihan
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Collector Recall mengotomatiskan pembagian tugas, pencatatan kunjungan, hingga pembuatan laporan performa piutang terpadu.
        </p>
      </div>

      {/* Main Flow Visual Diagram - Clickable Node-based Tracker */}
      <div className="my-auto space-y-6">
        <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-2 relative">
            
            {/* Horizontal Line background for big screens */}
            <div className="hidden md:block absolute top-[22px] left-8 right-8 h-0.5 bg-slate-800 z-0" />

            {steps.map((item, idx) => {
              const isSelected = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <div
                  key={item.step}
                  id={`solution-step-node-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  className="flex-1 relative z-10 flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Circle Indicator */}
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-all border-2 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white scale-110 shadow-lg shadow-blue-500/20'
                        : isPassed
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 group-hover:border-slate-600 group-hover:text-slate-200'
                    }`}
                  >
                    {getStepIcon(item.iconName)}
                  </div>

                  {/* Step label */}
                  <span
                    className={`mt-2.5 text-[10px] md:text-[11px] font-bold transition-colors block ${
                      isSelected ? 'text-blue-400' : isPassed ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    Langkah {item.step}
                  </span>

                  <span className="text-[11px] text-slate-300 font-medium hidden md:block mt-1 max-w-[100px] line-clamp-1">
                    {item.title.split('/')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive Step Details Card inside */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-left min-h-[110px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-9 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-900/60 text-blue-400 border border-blue-800 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {steps[activeStep].role}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white">
                      Langkah {steps[activeStep].step}: {steps[activeStep].title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>
                <div className="md:col-span-3 flex justify-start md:justify-end">
                  <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 text-[11px] space-y-1">
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase">Status Alur</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 inline" />
                      Aktif & Otomatis
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Help Instructions */}
        <p className="text-[11px] text-slate-400 text-center animate-pulse">
          * Klik pada setiap ikon langkah di atas untuk mempelajari detail alur kerja sistem.
        </p>
      </div>

      {/* Footer Closing Quote */}
      <motion.div
        id="solution-footer-quote"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-center gap-2 max-w-2xl mx-auto"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        <p className="text-xs md:text-sm font-semibold text-emerald-800 text-center">
          "Dengan alur yang jelas, pekerjaan collector menjadi lebih rapi, terukur, dan mudah dievaluasi."
        </p>
      </motion.div>
    </div>
  );
}
