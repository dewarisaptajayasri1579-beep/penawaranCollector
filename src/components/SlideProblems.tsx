import React from 'react';
import { AlertCircle, FileSpreadsheet, MapPinOff, CalendarRange, History, CameraOff, Hourglass, HelpCircle } from 'lucide-react';
import { ProblemCard } from '../types';
import { motion } from 'motion/react';

export default function SlideProblems() {
  const problems: ProblemCard[] = [
    {
      id: 1,
      title: 'Data Tagihan Tersebar',
      desc: 'Data tagihan berserakan di Excel, obrolan grup WhatsApp, dan catatan manual kertas. Sangat riskan hilang.',
      iconName: 'Excel',
      color: 'yellow',
    },
    {
      id: 2,
      title: 'Collector Tidak Terpantau',
      desc: 'Manajemen kesulitan mengetahui apakah collector benar-benar melakukan kunjungan lapangan harian secara tertib.',
      iconName: 'MapPinOff',
      color: 'red',
    },
    {
      id: 3,
      title: 'Tagihan Sering Terlewat',
      desc: 'Tidak ada sistem pengingat otomatis, sehingga faktur yang jatuh tempo terlambat di-follow up berhari-hari.',
      iconName: 'CalendarRange',
      color: 'orange',
    },
    {
      id: 4,
      title: 'Histori Tidak Rapi',
      desc: 'Hasil pembicaraan dan riwayat janji bayar dari klien tidak terekam secara terpusat, menyulitkan tindak lanjut.',
      iconName: 'History',
      color: 'purple',
    },
    {
      id: 5,
      title: 'Bukti Kunjungan Lemah',
      desc: 'Tidak ada verifikasi autentik seperti foto kondisi di lokasi, koordinat GPS real-time, dan tanda tangan digital.',
      iconName: 'CameraOff',
      color: 'blue',
    },
    {
      id: 6,
      title: 'Laporan Lambat & Manual',
      desc: 'Proses rekap laporan harian memakan waktu berjam-jam, membuat keputusan penanganan piutang terlambat.',
      iconName: 'Hourglass',
      color: 'slate',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Excel':
        return <FileSpreadsheet className="h-6 w-6" />;
      case 'MapPinOff':
        return <MapPinOff className="h-6 w-6" />;
      case 'CalendarRange':
        return <CalendarRange className="h-6 w-6" />;
      case 'History':
        return <History className="h-6 w-6" />;
      case 'CameraOff':
        return <CameraOff className="h-6 w-6" />;
      case 'Hourglass':
        return <Hourglass className="h-6 w-6" />;
      default:
        return <HelpCircle className="h-6 w-6" />;
    }
  };

  const getBadgeColors = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'orange':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'yellow':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'purple':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div id="slide-problems" className="w-full flex flex-col justify-between h-full py-2 px-2 select-none overflow-y-auto">
      {/* Upper Content - Heading */}
      <div className="space-y-2 text-center max-w-3xl mx-auto mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
          Masalah Penagihan yang Sering Terjadi
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Banyak bisnis masih kesulitan mengontrol piutang, follow up pelanggan, dan memantau aktivitas collector di lapangan secara efisien.
        </p>
      </div>

      {/* Grid of 6 problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-auto">
        {problems.map((prob, index) => (
          <motion.div
            key={prob.id}
            id={`problem-card-${prob.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="p-4 bg-white rounded-xl border border-slate-150 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg border ${getBadgeColors(prob.color)}`}>
                {getIcon(prob.iconName)}
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug">{prob.title}</h3>
            </div>
            <p className="text-[12px] text-slate-500 leading-relaxed">
              {prob.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer warning alert box */}
      <motion.div
        id="problem-footer-alert"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-red-50/70 border border-red-100 rounded-xl flex items-start gap-3 text-left max-w-4xl mx-auto"
      >
        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs md:text-sm font-semibold text-red-800">
            Dampak Kritis Bagi Finansial Bisnis Anda:
          </p>
          <p className="text-xs text-red-700/90 leading-relaxed mt-0.5">
            Jika proses penagihan tidak terkontrol dengan ketat, arus kas perusahaan akan terganggu, piutang macet (bad debt) membengkak, dan efektivitas tim lapangan terus menurun tanpa evaluasi yang jelas.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
