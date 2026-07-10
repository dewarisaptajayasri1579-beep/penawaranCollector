import React from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterNavProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSetSlide: (slide: number) => void;
  onOpenProposal: () => void;
}

export default function FooterNav({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSetSlide,
  onOpenProposal,
}: FooterNavProps) {
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  return (
    <footer id="app-footer-nav" className="h-20 border-t border-slate-100 flex items-center justify-between px-4 sm:px-10 shrink-0 bg-white z-50 select-none">
      {/* Left Side: Kembali Button */}
      <div id="footer-left-btn-wrapper" className="w-[110px] md:w-[130px] text-left">
        <button
          id="back-slide-btn"
          disabled={isFirst}
          onClick={onPrev}
          className={`flex items-center gap-2 font-bold transition-all focus:outline-none text-sm cursor-pointer ${
            isFirst
              ? 'text-slate-300 opacity-50 cursor-not-allowed'
              : 'text-[#003366] hover:text-[#002244] active:scale-95'
          }`}
        >
          <span>←</span>
          <span>Kembali</span>
        </button>
      </div>

      {/* Middle: Dot Indicator */}
      <div id="footer-middle" className="flex items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={idx}
              id={`dot-indicator-${idx}`}
              onClick={() => onSetSlide(idx)}
              className={`transition-all duration-300 focus:outline-none cursor-pointer ${
                isActive ? 'w-10 h-2 bg-[#003366] rounded-full' : 'w-2 h-2 bg-slate-200 rounded-full hover:bg-slate-300'
              }`}
              aria-label={`Pindah ke slide ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Right Side: Lanjut Button / Selesai */}
      <div id="footer-right-btn-wrapper" className="w-[110px] md:w-[130px] text-right flex justify-end">
        {isLast ? (
          <button
            id="finish-slide-btn"
            onClick={onOpenProposal}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold active:scale-95 cursor-pointer text-sm"
          >
            <span>Selesai</span>
            <span>✓</span>
          </button>
        ) : (
          <button
            id="next-slide-btn"
            onClick={onNext}
            className="flex items-center gap-2 text-[#003366] hover:text-[#002244] font-bold active:scale-95 cursor-pointer text-sm"
          >
            <span>Lanjut</span>
            <span>→</span>
          </button>
        )}
      </div>
    </footer>
  );
}
