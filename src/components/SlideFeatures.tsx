import React from 'react';
import { BarChart3, ListTodo, MapPin, Camera, ClipboardCheck, TrendingUp, ShieldCheck, Zap, Activity, CheckCircle2, MessageCircle, FileText } from 'lucide-react';
import { FeatureItem } from '../types';
import { motion } from 'motion/react';

export default function SlideFeatures() {
  const features: FeatureItem[] = [
    {
      id: 1,
      title: 'Dashboard Tagihan',
      desc: 'Melihat rangkuman total tagihan, overdue, daftar follow up hari ini, serta rasio kesuksesan penagihan secara real-time.',
      iconName: 'Dashboard',
      badge: 'Admin & Manajemen',
    },
    {
      id: 2,
      title: 'Daftar Tugas Collector',
      desc: 'Collector tahu pasti pelanggan mana yang harus dihubungi atau dikunjungi setiap harinya secara rapi dan otomatis.',
      iconName: 'ListTodo',
      badge: 'Collector Lapangan',
    },
    {
      id: 3,
      title: 'Check-in Lokasi (GPS)',
      desc: 'Memantau aktivitas lapangan tim collector dengan data penunjuk lokasi GPS/koordinat peta saat kunjungan dilakukan.',
      iconName: 'MapPin',
      badge: 'Anti-Kecurangan',
    },
    {
      id: 4,
      title: 'Foto Bukti Kunjungan',
      desc: 'Dokumentasi otentik foto di lokasi (seperti gerbang toko, bukti faktur diterima, atau kondisi tutup) tersimpan aman.',
      iconName: 'Camera',
      badge: 'Bukti Valid',
    },
    {
      id: 5,
      title: 'Hasil Kunjungan Terperinci',
      desc: 'Mencatat status mutakhir pelanggan: Sudah Bayar, Janji Bayar, Belum Bertemu, atau butuh Follow up Ulang dengan mudah.',
      iconName: 'ClipboardCheck',
      badge: 'History Terjaga',
    },
    {
      id: 6,
      title: 'Laporan Penagihan Otomatis',
      desc: 'Evaluasi instan mengenai progress penagihan harian, performa recovery rate collector, dan tren tunggakan piutang.',
      iconName: 'TrendingUp',
      badge: 'Satu Klik Ekspor',
    },
    {
      id: 7,
      title: 'Integrasi WhatsApp Reminder',
      desc: 'Kirim pesan pengingat (reminder) jatuh tempo langsung ke HP pelanggan dengan satu klik atau secara otomatis.',
      iconName: 'MessageCircle',
      badge: 'Auto-Reminder',
    },
    {
      id: 8,
      title: 'Tracking Faktur Fisik',
      desc: 'Sistem memantau serah terima dokumen faktur fisik antara admin dan collector untuk mencegah resiko kehilangan berkas.',
      iconName: 'FileText',
      badge: 'Keamanan Dokumen',
    },
  ];

  const benefits = [
    { text: 'Lebih Rapi', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { text: 'Lebih Terpantau', icon: Activity, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { text: 'Lebih Cepat', icon: Zap, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { text: 'Lebih Mudah Dievaluasi', icon: CheckCircle2, color: 'text-purple-600 bg-purple-50 border-purple-100' },
  ];

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Dashboard':
        return <BarChart3 className="h-5 w-5 text-[#003366]" />;
      case 'ListTodo':
        return <ListTodo className="h-5 w-5 text-[#003366]" />;
      case 'MapPin':
        return <MapPin className="h-5 w-5 text-[#003366]" />;
      case 'Camera':
        return <Camera className="h-5 w-5 text-[#003366]" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="h-5 w-5 text-[#003366]" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5 text-[#003366]" />;
      case 'MessageCircle':
        return <MessageCircle className="h-5 w-5 text-[#003366]" />;
      case 'FileText':
        return <FileText className="h-5 w-5 text-[#003366]" />;
      default:
        return <BarChart3 className="h-5 w-5 text-[#003366]" />;
    }
  };

  return (
    <div id="slide-features" className="w-full flex flex-col justify-between h-full py-2 px-2 select-none overflow-y-auto">
      {/* Heading */}
      <div className="space-y-3 text-center max-w-3xl mx-auto mb-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
          Fitur Utama untuk Kemudahan Tim Penagihan
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Setiap instrumen dalam Collector Recall dikembangkan secara matang demi keselarasan kerja admin, collector, dan manajemen bisnis.
        </p>

        {/* Benefits Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {benefits.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${b.color}`}
              >
                <IconComponent className="h-3.5 w-3.5" />
                <span>{b.text}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-auto pt-2">
        {features.map((feat, index) => (
          <motion.div
            key={feat.id}
            id={`feature-card-${feat.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="p-4 bg-white rounded-xl border border-slate-150 hover:border-slate-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-50 text-[#003366] rounded-lg">
                  {getFeatureIcon(feat.iconName)}
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                  {feat.badge}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">{feat.title}</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Closing Quote */}
      <motion.div
        id="features-footer-quote"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-center gap-2 max-w-2xl mx-auto"
      >
        <span className="h-2 w-2 rounded-full bg-[#003366] shrink-0" />
        <p className="text-xs md:text-sm font-semibold text-[#003366] text-center">
          "Collector Recall bukan hanya mencatat tagihan, tetapi membantu membangun sistem kerja collection yang lebih profesional."
        </p>
      </motion.div>
    </div>
  );
}
