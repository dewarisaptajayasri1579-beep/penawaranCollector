import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function DemoSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            title="Kembali ke Penawaran"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#003366] rounded flex items-center justify-center shadow-md">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <span className="font-bold text-xl text-[#003366] tracking-tight">
              Collector <span className="text-slate-400">Recall</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Pilih Peran Demo Anda
          </h1>
          <p className="text-lg text-slate-500">
            Aplikasi ini memiliki dua antarmuka utama yang dirancang khusus untuk memenuhi kebutuhan masing-masing peran di lapangan dan di kantor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Collector Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/demo/collector')}
            className="group bg-white rounded-3xl p-8 border-2 border-transparent hover:border-amber-400 shadow-xl hover:shadow-2xl hover:shadow-amber-900/10 transition-all cursor-pointer flex flex-col relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Aplikasi Collector</h2>
            <p className="text-slate-500 mb-8 flex-1 leading-relaxed">
              Coba simulasi aplikasi *mobile* yang digunakan kolektor di lapangan untuk mencatat kunjungan, memantau rute, dan melihat tugas harian.
            </p>
            <div className="inline-flex items-center text-amber-600 font-bold text-sm">
              Masuk sebagai Collector
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/demo/admin')}
            className="group bg-white rounded-3xl p-8 border-2 border-transparent hover:border-blue-600 shadow-xl hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer flex flex-col relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Monitor className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Dashboard Admin</h2>
            <p className="text-slate-500 mb-8 flex-1 leading-relaxed">
              Lihat bagaimana tim di kantor memantau performa kolektor, mendistribusikan tugas penagihan, dan memantau analitik secara *real-time*.
            </p>
            <div className="inline-flex items-center text-blue-700 font-bold text-sm">
              Masuk sebagai Admin
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
