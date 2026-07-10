import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColorClass: string;
  iconBgClass: string;
}

export default function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconColorClass,
  iconBgClass
}: SummaryCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(0,51,102,0.15)] flex items-center gap-5 transition-shadow duration-300 cursor-default"
    >
      {/* Icon Area with soft colored circles */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${iconBgClass} ${iconColorClass}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Metrics Data */}
      <div className="space-y-1 overflow-hidden">
        <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase truncate">{title}</p>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight truncate">{value}</h3>
        <p className="text-[11px] text-slate-500 truncate" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </motion.div>
  );
}
