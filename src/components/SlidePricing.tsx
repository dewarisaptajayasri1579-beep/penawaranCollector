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
      id: 'termin',
      name: 'Pembayaran Termin (2x)',
      desc: 'Pembayaran bertahap untuk kemudahan cashflow. DP 16 Juta di awal, pelunasan 15 Juta sebelum aplikasi go-live.',
      price: 'Rp 31.000.000',
      features: [
        'Aplikasi PWA Mobile Collector',
        'Web Dashboard Admin & Supervisor',
        'Fitur GPS & Kamera Terintegrasi',
        'Setup & Inisiasi Server Awal',
        'Support Maintenance 3 Bulan'
      ],
    },
    {
      id: 'full',
      name: 'Full Payment',
      desc: 'Lebih hemat Rp 3,5 Juta. Pembayaran penuh di awal untuk mendapatkan prioritas pengembangan & diskon spesial.',
      price: 'Rp 27.500.000',
      isPopular: true,
      badge: 'Hemat Rp 3,5 Juta',
      features: [
        'Semua fitur aplikasi PWA & Web',
        'Diskon Langsung (Cashback) Rp 3.500.000',
        'Setup Server & Maintenance 3 Bulan',
        'Prioritas Antrean Pengembangan',
        'Konsultasi Optimalisasi SOP Gratis'
      ],
    }
  ];

  return (
    <div id="slide-pricing" className="w-full flex flex-col justify-between h-full py-2 px-2 select-none overflow-y-auto">
      {/* Heading */}
      <div className="space-y-2 text-center max-w-3xl mx-auto mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
          Pilihan Pembayaran yang Fleksibel
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Pilih metode pembayaran yang paling sesuai dengan cashflow perusahaan Anda. Dapatkan potongan harga khusus untuk pembayaran penuh.
        </p>
      </div>

      {/* Grid of 2 Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto items-stretch pt-2 max-w-4xl mx-auto w-full">
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

      {/* Main Bottom CTAs removed temporarily */}
    </div>
  );
}
