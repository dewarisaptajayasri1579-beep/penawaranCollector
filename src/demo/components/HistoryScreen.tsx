import React, { useState } from 'react';
import { SlidersHorizontal, Calendar, DollarSign, Clock, Info } from 'lucide-react';
import { VisitHistory } from '../types';

interface HistoryScreenProps {
  historyList: VisitHistory[];
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  historyList
}) => {
  const [activeRange, setActiveRange] = useState<'hari' | 'minggu' | 'bulan'>('hari');
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleToggleDetails = (id: string) => {
    setSelectedHistoryId(selectedHistoryId === id ? null : id);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      
      {/* Search/Filter Subheader */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 shadow-sm shrink-0 space-y-2.5">
        
        {/* Date range filter tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveRange('hari')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
              activeRange === 'hari' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Hari Ini
          </button>
          <button
            onClick={() => setActiveRange('minggu')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
              activeRange === 'minggu' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Minggu Ini
          </button>
          <button
            onClick={() => setActiveRange('bulan')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
              activeRange === 'bulan' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Bulan Ini
          </button>
        </div>

        {/* Date line helper */}
        <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold px-1">
          <span>Selasa, 27 Mei 2024 (Aktif)</span>
          <span className="text-blue-600 cursor-pointer flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filter</span>
          </span>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        {historyList.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
            Belum ada riwayat kunjungan hari ini
          </div>
        ) : (
          historyList.map((item) => {
            // Setup status styles
            let badgeStyle = 'bg-gray-100 text-gray-600';
            if (item.status === 'Lunas') badgeStyle = 'bg-emerald-100 text-emerald-700';
            else if (item.status === 'Tertagih Sebagian') badgeStyle = 'bg-blue-100 text-blue-700';
            else if (item.status === 'Janji Bayar') badgeStyle = 'bg-amber-100 text-amber-700';
            else if (item.status === 'Kendala') badgeStyle = 'bg-red-100 text-red-700';
            else if (item.status === 'Tidak di Tempat') badgeStyle = 'bg-gray-100 text-gray-500 border border-gray-200';

            const isExpanded = selectedHistoryId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleToggleDetails(item.id)}
                className="bg-white p-3 rounded-xl border border-gray-100 hover:border-blue-100 transition-all duration-200 cursor-pointer shadow-sm space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900 leading-tight">{item.customerName}</h4>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">{item.invoiceNo}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[10px]">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.timestamp.split('(')[1]?.replace(')', '') || '09:15 - 09:28'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-400 block uppercase font-bold text-right">Tertagih</span>
                    <span className="text-xs font-extrabold text-emerald-600 font-mono">{formatIDR(item.amount)}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-[11px] text-gray-600 mt-2 space-y-1.5 animate-fadeIn">
                    <p className="flex items-start gap-1">
                      <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Catatan Kolektor:</strong> {item.notes}</span>
                    </p>
                    <p className="text-[10px] text-gray-400">
                      <strong>Waktu Detail:</strong> {item.timestamp}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
