import React, { useState, useEffect } from 'react';
import { Clock, Check, AlertTriangle, Upload, CreditCard, Calendar } from 'lucide-react';
import { Customer } from '../types';

interface CheckoutScreenProps {
  customer: Customer;
  onCancel: () => void;
  onCheckout: (resultData: {
    status: 'Lunas' | 'Tertagih Sebagian' | 'Janji Bayar' | 'Tidak di Tempat' | 'Kendala';
    collectedAmount: number;
    promiseDate?: string;
    notes: string;
  }) => void;
  isMockupGrid?: boolean;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  customer,
  onCancel,
  onCheckout,
  isMockupGrid = false,
}) => {
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(765); // Default start 12m 45s (765s) for high fidelity
  const [outcome, setOutcome] = useState<'Tertagih Sebagian' | 'Tertagih Sesuai Nominal' | 'Janji Bayar' | 'Tidak di Tempat' | 'Kendala Lain'>('Tertagih Sebagian');
  const [paidAmount, setPaidAmount] = useState<number>(500000);
  const [promiseDate, setPromiseDate] = useState<string>('2026-07-14');
  const [remark, setRemark] = useState('Klien membayar tunai, sisa dijanji minggu depan.');
  const [proofPhoto, setProofPhoto] = useState<boolean>(true); // Default attached

  // Timer tick effect (only active if not in static grid overview)
  useEffect(() => {
    if (isMockupGrid) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isMockupGrid]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Automatically update paidAmount if outcome is 'Tertagih Sesuai Nominal'
  useEffect(() => {
    if (outcome === 'Tertagih Sesuai Nominal') {
      setPaidAmount(customer.remainingAmount);
      setRemark('Penagihan berhasil dibayar penuh sesuai nominal invoice.');
    } else if (outcome === 'Janji Bayar') {
      setPaidAmount(0);
      setRemark('Bidan menjanjikan pembayaran ditransfer penuh pada tanggal janji bayar.');
    } else if (outcome === 'Tidak di Tempat') {
      setPaidAmount(0);
      setRemark('Toko tutup / Bidan sedang tidak berada di tempat saat dikunjungi.');
    } else if (outcome === 'Kendala Lain') {
      setPaidAmount(0);
      setRemark('Ada kendala komplain barang / selisih harga, perlu tindak lanjut supervisor.');
    } else if (outcome === 'Tertagih Sebagian' && paidAmount === customer.remainingAmount) {
      setPaidAmount(500000);
    }
  }, [outcome, customer.remainingAmount]);

  const sisaSetelahBayar = Math.max(0, customer.remainingAmount - (paidAmount || 0));

  const handleCheckoutSubmit = () => {
    // Map outcome values to final history statuses
    let finalStatus: 'Lunas' | 'Tertagih Sebagian' | 'Janji Bayar' | 'Tidak di Tempat' | 'Kendala' = 'Tertagih Sebagian';
    if (outcome === 'Tertagih Sesuai Nominal') finalStatus = 'Lunas';
    else if (outcome === 'Janji Bayar') finalStatus = 'Janji Bayar';
    else if (outcome === 'Tidak di Tempat') finalStatus = 'Tidak di Tempat';
    else if (outcome === 'Kendala Lain') finalStatus = 'Kendala';

    onCheckout({
      status: finalStatus,
      collectedAmount: paidAmount || 0,
      promiseDate: outcome === 'Janji Bayar' ? promiseDate : undefined,
      notes: remark
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      
      {/* Stepper Header (Check-In -> Proses -> Check-Out) */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center justify-center w-full max-w-xs mx-auto">
          {/* Step 1 Check-In */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-gray-400 mt-1">Check-In</span>
          </div>

          <div className="flex-1 h-0.5 bg-blue-300 -mt-4 mx-2"></div>

          {/* Step 2 Proses */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-blue-100">
              2
            </div>
            <span className="text-[9px] font-bold text-blue-600 mt-1">Proses</span>
          </div>

          <div className="flex-1 h-0.5 bg-gray-200 -mt-4 mx-2"></div>

          {/* Step 3 Check-Out */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <span className="text-[9px] font-bold text-gray-400 mt-1">Check-Out</span>
          </div>
        </div>
      </div>

      {/* Main Checkout Scroll Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Ringkasan Pelanggan */}
        <div className="bg-blue-950 text-white p-3.5 rounded-xl flex justify-between items-center shadow-sm">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-blue-300 font-bold">Pelanggan Dikunjungi</span>
            <h4 className="text-xs font-bold mt-0.5">{customer.name}</h4>
            <p className="text-[9px] text-blue-200 mt-0.5 font-mono">{customer.invoiceNo}</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-blue-300 block font-semibold leading-none">Sisa Tagihan</span>
            <span className="text-xs font-extrabold text-red-400 mt-1 block font-mono">{formatIDR(customer.remainingAmount)}</span>
          </div>
        </div>

        {/* Timer Durasi Kunjungan */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] text-gray-400 block uppercase font-bold">Durasi Kunjungan</span>
              <span className="text-base font-extrabold text-blue-900 font-mono tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-100">
            Minimal 10 menit
          </span>
        </div>

        {/* Form: Hasil Penagihan */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
          
          {/* Dropdown Hasil */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Hasil Kunjungan Penagihan <span className="text-red-500">*</span></label>
            <select
              value={outcome}
              disabled={isMockupGrid}
              onChange={(e) => setOutcome(e.target.value as any)}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-gray-800"
            >
              <option value="Tertagih Sebagian">Tertagih Sebagian</option>
              <option value="Tertagih Sesuai Nominal">Tertagih Sesuai Nominal (Lunas)</option>
              <option value="Janji Bayar">Janji Bayar</option>
              <option value="Tidak di Tempat">Tidak di Tempat</option>
              <option value="Kendala Lain">Kendala Lain</option>
            </select>
          </div>

          {/* Conditional Field: Nominal Dibayar */}
          {(outcome === 'Tertagih Sebagian' || outcome === 'Tertagih Sesuai Nominal') && (
            <div className="space-y-3.5 pt-2 border-t border-gray-50">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Nominal Dibayar (Rp) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-400">Rp</span>
                  <input
                    type="number"
                    value={paidAmount || ''}
                    disabled={isMockupGrid || outcome === 'Tertagih Sesuai Nominal'}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    placeholder="Contoh: 500000"
                    className="w-full h-10 pl-9 pr-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-bold text-gray-800"
                  />
                </div>
              </div>

              {/* Sisa Setelah Bayar Card */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Sisa Setelah Bayar</span>
                <span className="text-xs font-extrabold text-red-600 font-mono">
                  {formatIDR(sisaSetelahBayar)}
                </span>
              </div>
            </div>
          )}

          {/* Conditional Field: Tanggal Janji Bayar */}
          {outcome === 'Janji Bayar' && (
            <div className="space-y-1.5 pt-2 border-t border-gray-50">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Tanggal Janji Bayar Baru <span className="text-red-500">*</span></span>
              </label>
              <input
                type="date"
                value={promiseDate}
                disabled={isMockupGrid}
                onChange={(e) => setPromiseDate(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 font-semibold"
              />
            </div>
          )}

          {/* Upload Bukti Pembayaran */}
          {(outcome === 'Tertagih Sebagian' || outcome === 'Tertagih Sesuai Nominal') && (
            <div className="space-y-2 pt-2 border-t border-gray-50">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Bukti Pembayaran / Kuitansi</label>
              {proofPhoto || isMockupGrid ? (
                <div className="h-16 border border-emerald-100 bg-emerald-50/50 rounded-xl px-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800 leading-tight">bukti_bayar_0512.jpg</p>
                      <p className="text-[9px] text-gray-400">Attached • 1.2 MB</p>
                    </div>
                  </div>
                  <button 
                    disabled={isMockupGrid}
                    onClick={() => setProofPhoto(false)}
                    className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setProofPhoto(true)}
                  className="h-12 border border-dashed border-gray-200 hover:border-blue-300 rounded-xl flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50/20 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-[11px] font-bold text-blue-600">Upload Foto Bukti Bayar</span>
                </div>
              )}
            </div>
          )}

          {/* Remark / Catatan */}
          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Remark / Catatan Lapangan</label>
            <textarea
              value={remark}
              disabled={isMockupGrid}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Berikan keterangan detail penagihan..."
              className="w-full h-16 p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 resize-none"
            />
          </div>

        </div>

      </div>

      {/* Button footer row */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0 grid grid-cols-5 gap-3">
        {/* Batalkan Kunjungan */}
        <button
          onClick={onCancel}
          className="col-span-2 h-11 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs rounded-xl flex items-center justify-center transition-all cursor-pointer"
        >
          <span>Batalkan Kunjungan</span>
        </button>

        {/* Check-Out */}
        <button
          onClick={handleCheckoutSubmit}
          className="col-span-3 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
        >
          <span>Check-Out Kunjungan</span>
        </button>
      </div>

    </div>
  );
};
