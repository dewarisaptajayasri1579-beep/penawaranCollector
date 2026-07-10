import React, { useState } from 'react';
import { Download, MessageCircle, BarChart3, Shield, Users, Smartphone, RefreshCw, Layers, Play } from 'lucide-react';
import { StatItem } from '../types';
import { motion } from 'motion/react';

import { useNavigate } from 'react-router-dom';

interface SlideIntroProps {
  onOpenProposal: () => void;
}

export default function SlideIntro({ onOpenProposal }: SlideIntroProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'overdue' | 'active'>('all');

  // Stats to render at the bottom of the slide
  const stats: StatItem[] = [
    { id: '1', label: 'Tagihan Overdue', value: 'Rp 125.000.000', change: '+12% dari kemarin', isPositive: false, type: 'overdue' },
    { id: '2', label: 'Follow Up Hari Ini', value: '356 Pelanggan', change: '+8% dari kemarin', isPositive: true, type: 'today' },
    { id: '3', label: 'Janji Bayar', value: '189 Pelanggan', change: '+5% dari kemarin', isPositive: true, type: 'promised' },
    { id: '4', label: 'Sudah Tertagih', value: 'Rp 38.000.000', change: '+15% dari kemarin', isPositive: true, type: 'collected' },
  ];

  return (
    <div id="slide-intro" className="w-full flex flex-col justify-between h-full py-2 px-2 select-none overflow-y-auto">
      {/* Upper Content - Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 relative">
        {/* Decorative Background Shapes */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Left Column: Heading and CTAs */}
        <div className="lg:col-span-5 space-y-6 text-left z-10">
          {/* Tagline Badge */}
          <motion.div
            id="tagline-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 bg-blue-50 text-[#003366] rounded-full text-xs font-bold uppercase tracking-wider mb-6"
          >
            B2B Solution
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              id="intro-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl lg:text-6xl font-extrabold text-[#003366] leading-[1.1] mb-2"
            >
              Collector Recall
            </motion.h1>
            <motion.h2
              id="intro-subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl lg:text-2xl font-semibold text-slate-600 leading-snug"
            >
              Tagihan Lebih Terkontrol,<br />Collector Lebih Terarah
            </motion.h2>
          </div>

          <motion.p
            id="intro-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-500 text-sm lg:text-base leading-relaxed max-w-md"
          >
            Bantu perusahaan mengelola tagihan pelanggan, membagi tugas collector, memantau kunjungan lapangan secara real-time, dan memantau progress penagihan dalam satu sistem yang rapi.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            id="intro-ctas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 pt-2"
          >
            <button
              id="demo-intro-btn"
              onClick={() => navigate('/demo')}
              className="w-full sm:w-auto px-6 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-extrabold shadow-xl shadow-amber-900/20 transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4 fill-current" />
              Lihat Demo Interaktif
            </button>
            {/* <a
              id="whatsapp-intro-btn"
              href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Collector%20Recall"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.52.909 3.243 1.389 5.005 1.391 5.482.002 9.944-4.461 9.947-9.945.002-2.657-1.032-5.155-2.908-7.03s-4.375-2.912-7.033-2.913c-5.483 0-9.944 4.463-9.947 9.947-.001 1.77.465 3.497 1.348 5.011l-.893 3.258 3.481-.912z"/></svg>
              <span>Konsultasi WA</span>
            </a> */}
          </motion.div>
        </div>

        {/* Right Column: Premium Mockups */}
        <div className="lg:col-span-7 relative flex justify-center items-center py-6">
          {/* Admin Dashboard Mockup */}
          <motion.div
            id="dashboard-laptop-mockup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-[480px] bg-slate-900 rounded-xl p-2.5 shadow-2xl border border-slate-700 relative z-10"
          >
            {/* Screen Header */}
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                <span className="ml-1 text-slate-400 font-mono text-[9px]">collector-recall.com/admin</span>
              </div>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[8px]">v1.4.0</span>
            </div>

            {/* Screen Content - Simulated App Interface */}
            <div className="bg-slate-950 text-slate-200 rounded-lg p-3 text-[11px] font-sans mt-2 space-y-3 relative overflow-hidden h-[240px]">
              {/* Mock Dashboard App Topbar */}
              <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-[10px]">CR</div>
                  <span className="font-bold text-white text-[10px]">Collector Recall Admin</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span>SOP Aktif: Kunjungan Terjadwal</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Mock App Main Dashboard Layout */}
              <div className="grid grid-cols-12 gap-2 h-full">
                {/* Sidebar */}
                <div className="col-span-3 bg-slate-900 rounded p-1.5 space-y-1 text-slate-400 text-[9px] border border-slate-800/50">
                  <div className="p-1.5 bg-slate-800 text-white rounded font-medium flex items-center gap-1">
                    <BarChart3 className="h-3 w-3 text-blue-400" />
                    <span>Dashboard</span>
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Daftar Tugas</span>
                  </div>
                  <div className="p-1.5 hover:bg-slate-800 rounded flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>Monitoring Map</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-9 bg-slate-900/60 rounded p-2 text-left space-y-2.5 border border-slate-800/40">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-bold text-[10px]">Selamat Pagi, Admin Kopi</h4>
                      <p className="text-[8px] text-slate-400">Ringkasan performa penagihan hari ini.</p>
                    </div>
                    <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-blue-400 font-mono">Kamis, 09 Jul 2026</span>
                  </div>

                  {/* Inside metrics */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="bg-slate-900 p-1.5 rounded border border-red-950/40">
                      <p className="text-[8px] text-slate-400">Overdue</p>
                      <p className="text-[11px] font-bold text-red-400">125 JT</p>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded border border-orange-950/40">
                      <p className="text-[8px] text-slate-400">Belum Selesai</p>
                      <p className="text-[11px] font-bold text-orange-400">42 Antrean</p>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded border border-emerald-950/40">
                      <p className="text-[8px] text-slate-400">Sudah Bayar</p>
                      <p className="text-[11px] font-bold text-emerald-400">38 JT</p>
                    </div>
                  </div>

                  {/* Simple graph line representation */}
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800 flex flex-col justify-between h-[80px]">
                    <div className="flex justify-between items-center text-[7px] text-slate-400">
                      <span>Tren Penagihan 7 Hari Terakhir</span>
                      <span className="text-emerald-400 font-bold">+18.5% recovery rate</span>
                    </div>
                    {/* Simulated SVG Graph */}
                    <svg className="w-full h-8 mt-1 text-blue-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path
                        d="M0,15 L15,12 L30,17 L45,8 L60,11 L75,4 L90,6 L100,2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0,18 L15,14 L30,19 L45,11 L60,13 L75,6 L90,9 L100,4 L100,20 L0,20 Z"
                        fill="rgba(37, 99, 235, 0.15)"
                      />
                    </svg>
                    <div className="flex justify-between text-[6px] text-slate-500 pt-1 font-mono">
                      <span>Sen</span>
                      <span>Sel</span>
                      <span>Rab</span>
                      <span>Kam</span>
                      <span>Jum</span>
                      <span>Sab</span>
                      <span>Min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Smartphone Collector Application Mockup */}
          <motion.div
            id="collector-phone-mockup"
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute -right-2 md:right-8 -bottom-4 w-[160px] md:w-[180px] bg-slate-900 rounded-[24px] p-2 shadow-2xl border-4 border-slate-800 z-20"
          >
            {/* Phone Ear Piece / Dynamic Island */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-slate-800 inline-block mr-1" />
              <span className="w-1.5 h-1 bg-blue-900 rounded-full inline-block" />
            </div>

            {/* Phone Screen */}
            <div className="bg-slate-50 rounded-[18px] text-slate-800 p-2.5 pt-6 text-[9px] font-sans h-[250px] md:h-[280px] overflow-hidden flex flex-col justify-between relative">
              <div className="space-y-2">
                {/* Simulated Header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-700 rounded-full" />
                    <span className="font-bold text-slate-900 text-[8px]">Collector App</span>
                  </div>
                  <span className="text-[7px] text-slate-400 font-bold bg-slate-100 px-1 rounded">Budi - LAPANGAN</span>
                </div>

                {/* Target progress summary */}
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-2 rounded-lg space-y-1 text-left relative overflow-hidden">
                  <p className="text-[7px] text-blue-200">Kunjungan Hari Ini</p>
                  <p className="text-sm font-bold">12 / 15</p>
                  <div className="w-full bg-blue-800 rounded-full h-1 mt-1">
                    <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="absolute right-1 bottom-1 text-[24px] opacity-10">
                    <Smartphone className="h-6 w-6" />
                  </div>
                </div>

                {/* Simulated Task List */}
                <p className="font-bold text-slate-700 text-[8px] text-left">Daftar Tugas Kunjungan</p>
                <div className="space-y-1 max-h-[120px] overflow-y-auto">
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-left flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800 text-[7px]">CV. Maju Jaya</p>
                      <p className="text-[6px] text-slate-500">Overdue: 24 Hari</p>
                    </div>
                    <span className="text-[6px] bg-red-50 text-red-600 px-1 rounded font-bold">Kritis</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-left flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800 text-[7px]">Bapak Hendra</p>
                      <p className="text-[6px] text-slate-500">Tagihan: Rp 1.500.000</p>
                    </div>
                    <span className="text-[6px] bg-orange-50 text-orange-600 px-1 rounded font-bold">Hari ini</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-left flex justify-between items-center opacity-60">
                    <div>
                      <p className="font-bold text-slate-800 text-[7px]">Toko Sinar Abadi</p>
                      <p className="text-[6px] text-emerald-600">✓ Sudah Bayar</p>
                    </div>
                    <span className="text-[6px] bg-emerald-50 text-emerald-600 px-1 rounded font-bold">Selesai</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside Phone */}
              <div className="pt-2 border-t border-slate-100 flex gap-1 justify-between">
                <button className="flex-1 py-1 bg-blue-700 text-white rounded text-[7px] font-bold">Check-in GPS</button>
                <button className="flex-1 py-1 bg-slate-200 text-slate-700 rounded text-[7px]">Foto Hasil</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Content - 4 Stat Cards */}
      <motion.div
        id="stats-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 pt-6 border-t border-slate-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            // Colors depending on stats type
            let bgTheme = 'bg-white';
            let textAccent = 'text-blue-700';
            let badgeStyle = 'bg-blue-50 text-blue-700 border-blue-100';

            if (item.type === 'overdue') {
              bgTheme = 'bg-white border-l-4 border-l-red-500';
              textAccent = 'text-red-600';
              badgeStyle = 'bg-red-50 text-red-700 border-red-100';
            } else if (item.type === 'today') {
              bgTheme = 'bg-white border-l-4 border-l-orange-500';
              textAccent = 'text-orange-600';
              badgeStyle = 'bg-orange-50 text-orange-700 border-orange-100';
            } else if (item.type === 'promised') {
              bgTheme = 'bg-white border-l-4 border-l-blue-500';
              textAccent = 'text-blue-600';
              badgeStyle = 'bg-blue-50 text-blue-700 border-blue-100';
            } else if (item.type === 'collected') {
              bgTheme = 'bg-white border-l-4 border-l-emerald-500';
              textAccent = 'text-emerald-600';
              badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-100';
            }

            return (
              <div
                key={item.id}
                id={`stat-card-${idx}`}
                className={`p-4 rounded-xl shadow-xs border border-slate-100 text-left transition-all hover:shadow-md ${bgTheme}`}
              >
                <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">{item.label}</span>
                <span className={`text-lg md:text-xl font-extrabold block tracking-tight ${textAccent}`}>
                  {item.value}
                </span>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-2 ${badgeStyle}`}>
                  {item.change}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
