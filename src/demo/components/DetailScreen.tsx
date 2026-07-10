import React from 'react';
import { MapPin, Phone, MessageSquare, Calendar, CreditCard, ChevronLeft } from 'lucide-react';
import { Customer } from '../types';

interface DetailScreenProps {
  customer: Customer;
  onBack: () => void;
  onStartVisit: (customer: Customer) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  customer,
  onBack,
  onStartVisit
}) => {
  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleOpenMaps = () => {
    // Open google maps with mock coordinates based on distance
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customer.name + ' Boyolali')}`;
    window.open(url, '_blank');
  };

  const handleSendWA = () => {
    const text = `Halo Ibu/Bapak dari ${customer.name}, saya Andi, kolektor dari Blesscom. Ingin mengonfirmasi perihal tagihan faktur ${customer.invoiceNo} sebesar ${formatIDR(customer.remainingAmount)} yang sudah jatuh tempo pada ${customer.dueDate}. Terima kasih.`;
    const url = `https://wa.me/${customer.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      
      {/* Detail Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Card 1: Informasi Pelanggan */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3.5">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-gray-950 leading-snug">{customer.name}</h3>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">{customer.phone}</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
              Aktif
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex gap-2 text-xs">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div className="text-gray-600 leading-relaxed">
                <p className="font-semibold text-gray-900">Alamat Lengkap:</p>
                <p className="text-[11px] mt-0.5">{customer.address}</p>
              </div>
            </div>

            <div className="flex gap-2 text-xs">
              <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[9px]">i</div>
              <p className="text-gray-500 text-[11px]">
                Jarak dari lokasi Anda: <span className="font-extrabold text-blue-600">{customer.distance}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleOpenMaps}
              className="h-10 border border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Buka Maps</span>
            </button>
            <button
              onClick={handleSendWA}
              className="h-10 border border-emerald-200 hover:bg-emerald-50 text-emerald-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Kirim WA</span>
            </button>
          </div>
        </div>

        {/* Card 2: Informasi Tagihan */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 pb-2.5 border-b border-gray-100">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Informasi Tagihan</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Nomor Faktur</span>
              <span className="font-bold text-gray-900 font-mono">{customer.invoiceNo}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tanggal Faktur</span>
              <span className="font-semibold text-gray-800">{customer.invoiceDate}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Jatuh Tempo</span>
              <div className="text-right">
                <span className="font-bold text-red-600">{customer.dueDate}</span>
                <p className="text-[9px] text-red-500 leading-none mt-0.5">Overdue (Terlewat)</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-gray-100">
              <span className="text-gray-400">Total Tagihan</span>
              <span className="font-bold text-gray-800 font-mono">{formatIDR(customer.totalInvoice)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Sudah Dibayar</span>
              <span className="font-bold text-emerald-600 font-mono">{formatIDR(customer.paidAmount)}</span>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-gray-100">
              <span className="text-gray-900 font-bold">Sisa Tagihan</span>
              <span className="text-base font-extrabold text-red-600 font-mono">{formatIDR(customer.remainingAmount)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Primary Action Sticky Footer */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <button
          onClick={() => onStartVisit(customer)}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Mulai Kunjungan</span>
        </button>
      </div>

    </div>
  );
};
