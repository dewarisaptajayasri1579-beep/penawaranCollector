import React from 'react';
import { Check, Flame, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SlidePricingProps {
  onOpenProposal: () => void;
}

export default function SlidePricing({ onOpenProposal }: SlidePricingProps) {
  const commonFeatures = [
    'Aplikasi PWA Mobile Collector',
    'Web Dashboard Admin & Supervisor',
    'Fitur GPS dan kamera terintegrasi',
    'Setup dan inisiasi aplikasi'
  ];

  const plans = [
    {
      id: 'termin',
      name: 'Pembayaran Termin (2×)',
      desc: 'Pembayaran bertahap untuk membantu pengaturan cashflow perusahaan.',
      normalPrice: null,
      price: 'Rp 31.000.000',
      scheme: [
        'Termin 1 / DP: Rp 16.000.000',
        'Termin 2: Rp 15.000.000',
        'Pelunasan sebelum aplikasi go-live'
      ],
      features: commonFeatures,
      buttonText: 'Pilih Pembayaran Termin',
      isPopular: false,
    },
    {
      id: 'full',
      badge: 'HEMAT Rp 3.500.000',
      name: 'Full Payment',
      desc: 'Pembayaran penuh di awal dengan harga khusus dan lebih hemat.',
      normalPrice: 'Rp 31.000.000',
      price: 'Rp 27.500.000',
      scheme: [
        'Dibayarkan penuh setelah kesepakatan',
        'Pengembangan dimulai setelah pembayaran diterima',
        'Hemat langsung Rp 3.500.000'
      ],
      features: commonFeatures,
      buttonText: 'Pilih Full Payment',
      isPopular: true,
    }
  ];

  return (
    <div id="slide-pricing" className="w-full flex flex-col justify-between h-full py-4 px-2 select-none overflow-y-auto">
      {/* Heading */}
      <div className="space-y-2 text-center max-w-3xl mx-auto mb-6 mt-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
          Pilih Skema Pembayaran yang Sesuai
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-medium max-w-2xl mx-auto">
          Seluruh pilihan mendapatkan fitur dan ruang lingkup aplikasi yang sama. Perbedaannya hanya pada metode pembayaran dan total investasi.
        </p>
      </div>

      {/* Grid of 2 Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto items-stretch pt-2 max-w-4xl mx-auto w-full pb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            id={`pricing-card-${plan.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`relative rounded-2xl p-6 text-left flex flex-col justify-between transition-all border ${
              plan.isPopular
                ? 'bg-gradient-to-br from-[#003366] to-slate-900 text-white border-blue-900 shadow-xl scale-[1.02] z-10'
                : 'bg-white text-slate-800 border-slate-200 shadow-sm'
            }`}
          >
            {/* Popular Badge */}
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md whitespace-nowrap">
                <Flame className="h-3 w-3 fill-current" />
                {plan.badge}
              </span>
            )}

            <div className="space-y-5">
              <div>
                <h3 className={`text-lg md:text-xl font-extrabold ${plan.isPopular ? 'text-blue-100' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs leading-relaxed mt-1.5 min-h-[40px] ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
              </div>

              {/* Price Tag */}
              <div className={`border-y py-4 ${plan.isPopular ? 'border-blue-800/50' : 'border-slate-100'}`}>
                {plan.normalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-400">Harga Normal</span>
                    <span className="text-xs text-rose-400 line-through font-semibold">{plan.normalPrice}</span>
                  </div>
                )}
                <span className={`text-xs block mb-0.5 font-medium ${plan.isPopular ? 'text-blue-300' : 'text-slate-500'}`}>Total Investasi</span>
                <span className={`text-2xl md:text-3xl font-black tracking-tight block ${plan.isPopular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
              </div>

              {/* Skema Pembayaran */}
              <div>
                <h4 className={`text-xs font-bold mb-2 uppercase tracking-wider ${plan.isPopular ? 'text-blue-300' : 'text-slate-500'}`}>Skema Pembayaran</h4>
                <ul className="space-y-2 text-xs">
                  {plan.scheme.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.isPopular ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Bullet Points */}
              <div>
                <h4 className={`text-xs font-bold mb-2 uppercase tracking-wider ${plan.isPopular ? 'text-blue-300' : 'text-slate-500'}`}>Sudah Termasuk</h4>
                <ul className="space-y-2 text-xs">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action inside card */}
            <button
              id={`select-plan-${plan.id}-btn`}
              onClick={onOpenProposal}
              className={`w-full mt-8 py-3 px-4 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm ${
                plan.isPopular
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100'
              }`}
            >
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
