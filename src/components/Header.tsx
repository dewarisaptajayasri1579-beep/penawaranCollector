import React from 'react';
import { Download, FileText, Smartphone } from 'lucide-react';

interface HeaderProps {
  currentSlide: number;
  onSetSlide: (slide: number) => void;
  onOpenProposal: () => void;
}

export default function Header({ currentSlide, onSetSlide, onOpenProposal }: HeaderProps) {
  const menus = [
    { label: 'Intro', slide: 0 },
    { label: 'Masalah', slide: 1 },
    { label: 'Solusi', slide: 2 },
    { label: 'Fitur', slide: 3 },
    { label: 'Paket', slide: 4 },
  ];

  const totalSlides = 5;
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Name / Logo */}
        <div
          id="header-brand"
          onClick={() => onSetSlide(0)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-[#003366] rounded flex items-center justify-center shadow-md shadow-blue-950/10 group-hover:scale-105 transition-transform duration-200">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <div className="text-left">
            <span className="font-bold text-xl tracking-tight text-[#003366] block leading-none">
              Collector <span className="text-slate-400">Recall</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {menus.map((menu) => {
            const isActive = currentSlide === menu.slide;
            return (
              <button
                key={menu.slide}
                id={`nav-item-${menu.slide}`}
                onClick={() => onSetSlide(menu.slide)}
                className={`text-sm transition-all cursor-pointer relative pb-1 ${
                  isActive
                    ? 'font-semibold text-[#003366] border-b-2 border-[#003366]'
                    : 'font-medium text-slate-400 hover:text-[#003366]'
                }`}
              >
                {menu.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div id="header-cta-container" className="flex items-center gap-3">
          {/* Mobile slide indicator */}
          <span className="md:hidden text-xs font-extrabold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            {currentSlide + 1} / 5
          </span>

          <button
            id="download-proposal-header-btn"
            onClick={onOpenProposal}
            className="px-5 py-2 bg-[#003366] text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-900/10 hover:bg-[#002244] transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <span className="hidden sm:inline">Download Proposal</span>
            <span className="inline sm:hidden"><Download className="h-4 w-4" /></span>
          </button>
        </div>
      </div>

      {/* Slide Progress Bar (Thin indicator) */}
      <div id="progress-bar-container" className="w-full h-1 bg-slate-100 relative overflow-hidden">
        <div
          id="progress-bar-fill"
          className="h-full bg-[#003366] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
