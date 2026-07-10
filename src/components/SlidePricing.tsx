import React from 'react';
import { Check, Download, MessageCircle, HelpCircle, Flame } from 'lucide-react';
import { PricingPlan } from '../types';
import { motion } from 'motion/react';

interface SlidePricingProps {
  onOpenProposal: () => void;
}

export default function SlidePricing({ onOpenProposal }: SlidePricingProps) {
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      desc: 'Cocok untuk bisnis mikro/UKM yang ingin mulai beralih dari pencatatan kertas atau WhatsApp manual.',
      price: 'Mulai Rp 5.000.000',
      features: [
        'Kelola Data Pelanggan',
        'Input Data Tagihan Terpusat',
        'Daftar Tugas Collector Harian',
        'Catat Hasil Follow Up Klien',
        'Laporan Penagihan Sederhana',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      desc: 'Ideal untuk bisnis dengan tim sales atau collection lapangan aktif yang membutuhkan pengawasan GPS.',
      price: 'Mulai Rp 12.000.000',
      isPopular: true,
      badge: 'Paling Populer',
      features: [
        'Semua fitur paket Starter',
        'Check-in Lokasi GPS Lapangan',
        'Upload Foto Bukti Kunjungan',
        'Sistem Reminder Follow Up',
        'Laporan Performa Masing-Masing Collector',
        'Impor & Ekspor Data Excel Instan',
      ],
    },
    {
      id: 'enterprise',
      name: 'Custom / Enterprise',
      desc: 'Dirancang bagi korporasi atau institusi pembiayaan dengan alur SOP penagihan yang kompleks.',
      price: 'By Request',
      features: [
        'Sistem Multi-Cabang / Regional',
        'Kustomisasi Flow Sesuai SOP Internal',
        'Integrasi Otomatis WhatsApp API',
        'Integrasi Sistem Existing (ERP, SAP, Core)',
        'Kustomisasi Laporan Khusus Manajemen',
        'Sesi Training Intensif Tim Admin & Collector',
      ],
    },
  ];

  return (
    <div id="slide-pricing" className="w-full flex flex-col justify-between h-full py-2 px-2 select-none overflow-y-auto">
      {/* Heading */}
      <div className="space-y-2 text-center max-w-3xl mx-auto mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
          Paket Investasi Terbaik Bisnis Anda
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Pilih paket sesuai dengan kapasitas tim dan kebutuhan operasional perusahaan, mulai dari sistem siap pakai hingga pengembangan custom.
        </p>
      </div>

      {/* Grid of 3 Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto items-stretch pt-2">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            id={`pricing-card-${plan.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`relative rounded-2xl p-5 text-left flex flex-col justify-between transition-all border ${
              plan.isPopular
                ? 'bg-gradient-to-br from-[#003366] to-slate-900 text-white border-blue-900 shadow-xl scale-102 z-10'
                : 'bg-white text-slate-800 border-slate-150 shadow-xs'
            }`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Flame className="h-3 w-3 fill-current" />
                {plan.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className={`text-base md:text-lg font-extrabold ${plan.isPopular ? 'text-blue-200' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-[11px] leading-relaxed mt-1 min-h-[50px] ${plan.isPopular ? 'text-slate-300' : 'text-slate-400'}`}>
                  {plan.desc}
                </p>
              </div>

              {/* Price Tag */}
              <div className="border-y py-3 border-dashed border-slate-200/20">
                <span className={`text-xs block ${plan.isPopular ? 'text-blue-300' : 'text-slate-400'}`}>Mulai Dari</span>
                <span className={`text-lg md:text-xl font-extrabold tracking-tight block mt-0.5 ${plan.isPopular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
              </div>

              {/* Feature Bullet Points */}
              <ul className="space-y-2 text-xs">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-600'}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action inside card */}
            <button
              id={`select-plan-${plan.id}-btn`}
              onClick={onOpenProposal}
              className={`w-full mt-6 py-2.5 px-4 font-bold rounded-xl text-xs transition-all cursor-pointer ${
                plan.isPopular
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Pilih Paket & Ambil Proposal
            </button>
          </motion.div>
        ))}
      </div>

      {/* Main Bottom CTAs */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <p className="text-xs md:text-sm font-bold text-slate-800">
            Ingin lihat demo langsung aplikasi?
          </p>
          <p className="text-[11px] md:text-xs text-slate-500 max-w-xl leading-relaxed">
            Hubungi tim teknis kami untuk menjadwalkan presentasi langsung menggunakan data simulasi bisnis Anda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            id="download-proposal-bottom-btn"
            onClick={onOpenProposal}
            className="px-5 py-3 bg-[#003366] hover:bg-[#002244] text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <Download className="h-4 w-4" />
            <span>Download Proposal Lengkap</span>
          </button>
          <a
            id="whatsapp-bottom-btn"
            href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Collector%20Recall"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <MessageCircle className="h-4 w-4 text-emerald-500 fill-current" />
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
