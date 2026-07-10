import React, { useState } from 'react';
import { Camera, Check, MapPin, Navigation, Info, RefreshCw } from 'lucide-react';
import { Customer } from '../types';

interface CheckinScreenProps {
  customer: Customer;
  onBack: () => void;
  onCheckInSuccess: (selfie: string, locationPhoto: string) => void;
  isMockupGrid?: boolean;
}

export const CheckinScreen: React.FC<CheckinScreenProps> = ({
  customer,
  onBack,
  onCheckInSuccess,
  isMockupGrid = false,
}) => {
  // Selfie and location photo local simulator state
  const [selfie, setSelfie] = useState<string | null>(null);
  const [locPhoto, setLocPhoto] = useState<string | null>(null);
  const [isGpsRefreshing, setIsGpsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleCaptureSelfie = () => {
    if (isMockupGrid) return;
    setErrorMessage(null);
    // Set a premium high-quality mock photo of a cheerful male field officer
    setSelfie('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
  };

  const handleCaptureLoc = () => {
    if (isMockupGrid) return;
    setErrorMessage(null);
    // Set a premium mock photo of an Indonesian local bidan clinic/storefront
    setLocPhoto('https://images.unsplash.com/photo-1586773860418-d3b3a978cd65?w=250&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
  };

  const handleRefreshGps = () => {
    setIsGpsRefreshing(true);
    setTimeout(() => {
      setIsGpsRefreshing(false);
    }, 800);
  };

  const handleCheckInSubmit = () => {
    if (!selfie && !isMockupGrid) {
      setErrorMessage('Silakan ambil Foto Selfie terlebih dahulu!');
      return;
    }
    if (!locPhoto && !isMockupGrid) {
      setErrorMessage('Silakan ambil Foto Lokasi/Plang terlebih dahulu!');
      return;
    }
    setErrorMessage(null);
    onCheckInSuccess(selfie || 'mock_selfie', locPhoto || 'mock_loc');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      
      {/* Stepper Header (Check-In -> Proses -> Check-Out) */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center justify-center w-full max-w-xs mx-auto">
          {/* Step 1 Check-In */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-blue-100">
              1
            </div>
            <span className="text-[9px] font-bold text-blue-600 mt-1">Check-In</span>
          </div>

          <div className="flex-1 h-0.5 bg-gray-200 -mt-4 mx-2"></div>

          {/* Step 2 Proses */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <span className="text-[9px] font-bold text-gray-400 mt-1">Proses</span>
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

      {/* Error Message Alert Banner */}
      {errorMessage && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 text-red-700 text-[11px] font-bold flex items-center gap-2 animate-fade-in shrink-0">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Ringkasan Pelanggan */}
        <div className="bg-blue-950 text-white p-3.5 rounded-xl flex justify-between items-center shadow-sm">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-blue-300 font-bold">Pelanggan Aktif</span>
            <h4 className="text-xs font-bold mt-0.5">{customer.name}</h4>
            <p className="text-[9px] text-blue-200 mt-0.5 font-mono">{customer.invoiceNo}</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-blue-300 block font-semibold leading-none">Sisa Tagihan</span>
            <span className="text-xs font-extrabold text-red-400 mt-1 block font-mono">{formatIDR(customer.remainingAmount)}</span>
          </div>
        </div>

        {/* Upload Selfie */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm space-y-2.5">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-extrabold text-gray-800">
              Foto Selfie <span className="text-red-500">*</span>
            </h4>
            <span className="text-[9px] text-gray-400">Wajah terlihat jelas</span>
          </div>

          {selfie || isMockupGrid ? (
            <div className="relative w-full h-28 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={selfie || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'} 
                alt="Selfie" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelfie(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full text-[10px] font-bold"
              >
                Ulangi
              </button>
            </div>
          ) : (
            <div 
              onClick={handleCaptureSelfie}
              className="w-full h-24 bg-gray-50 hover:bg-blue-50/40 border border-dashed border-gray-200 hover:border-blue-300 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Camera className="w-7 h-7 text-gray-400" />
              <span className="text-[11px] font-bold text-blue-600">Ambil Foto Selfie</span>
            </div>
          )}
        </div>

        {/* Upload Foto Lokasi */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm space-y-2.5">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-extrabold text-gray-800">
              Foto Lokasi / Plang / Rumah <span className="text-red-500">*</span>
            </h4>
            <span className="text-[9px] text-gray-400">Tampak depan/papan nama</span>
          </div>

          {locPhoto || isMockupGrid ? (
            <div className="relative w-full h-28 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={locPhoto || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=250&auto=format&fit=crop&q=60'} 
                alt="Lokasi" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setLocPhoto(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full text-[10px] font-bold"
              >
                Ulangi
              </button>
            </div>
          ) : (
            <div 
              onClick={handleCaptureLoc}
              className="w-full h-24 bg-gray-50 hover:bg-blue-50/40 border border-dashed border-gray-200 hover:border-blue-300 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Camera className="w-7 h-7 text-gray-400" />
              <span className="text-[11px] font-bold text-blue-600">Ambil Foto Lokasi</span>
            </div>
          )}
        </div>

        {/* GPS Card */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-extrabold text-gray-800 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span>Sinyal GPS Lokasi Anda</span>
            </h4>
            <button 
              onClick={handleRefreshGps}
              className={`p-1 hover:bg-gray-100 rounded-full text-blue-600 ${isGpsRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 p-2 rounded-lg font-mono">
              <span className="text-[9px] text-gray-400 block uppercase">Latitude</span>
              <span className="text-[11px] font-bold text-gray-700">-7.518123</span>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg font-mono">
              <span className="text-[9px] text-gray-400 block uppercase">Longitude</span>
              <span className="text-[11px] font-bold text-gray-700">110.592123</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-gray-400 text-[10px]">Akurasi GPS: <strong className="text-gray-700">± 10 meter</strong></span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Akurat
            </span>
          </div>
        </div>

      </div>

      {/* Button footer */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <button
          onClick={handleCheckInSubmit}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <Check className="w-4 h-4" />
          <span>Check-In Sekarang</span>
        </button>
      </div>

    </div>
  );
};
