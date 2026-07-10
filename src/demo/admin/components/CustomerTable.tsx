import { useState } from 'react';
import { Eye, Edit2, Send, ChevronLeft, ChevronRight, HelpCircle, AlertCircle } from 'lucide-react';
import { Customer } from '../types/customer';
import { formatCurrency } from '../utils/formatCurrency';
import { normalizePhone } from '../utils/normalizePhone';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';

interface CustomerTableProps {
  customers: Customer[];
  totalCount: number;
  onEdit: (customer: Customer) => void;
  onView: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  totalCount,
  onEdit,
  onView
}: CustomerTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleSendWA = (customer: Customer) => {
    const waNumber = normalizePhone(customer.phone);
    const greeting = `Halo ${customer.name},\nKami dari Blesscom Collector ingin mengingatkan mengenai informasi tagihan Anda sebesar ${formatCurrency(customer.totalDebt)} yang berstatus ${customer.status}. Mohon segera melakukan verifikasi pembayaran. Terima kasih.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(greeting)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      {/* Table Header Section */}
      <div className="px-6 py-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Daftar Pelanggan</h3>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-500">
          <span>Menampilkan 1 - {Math.min(customers.length, 10)} dari {totalCount} data</span>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold tracking-wider uppercase border-b border-slate-100">
              <th className="py-3.5 px-6 whitespace-nowrap">Kode Pelanggan</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Nama Pelanggan</th>
              <th className="py-3.5 px-4 whitespace-nowrap">No. HP / WA</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Area</th>
              <th className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-400">Kota</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Risk Level</th>
              <th className="py-3.5 px-4 whitespace-nowrap text-right">Total Piutang</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Last Update</th>
              <th className="py-3.5 px-6 whitespace-nowrap text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="text-sm font-medium">Tidak ada data pelanggan yang sesuai dengan filter.</p>
                  </div>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Kode Pelanggan */}
                  <td className="py-3.5 px-6 text-xs font-semibold text-slate-900 font-mono">
                    {customer.id}
                  </td>
                  
                  {/* Nama Pelanggan */}
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-900 whitespace-nowrap">
                    {customer.name}
                  </td>
                  
                  {/* No HP / WA */}
                  <td className="py-3.5 px-4 text-xs text-slate-600 font-medium font-mono whitespace-nowrap">
                    {customer.phone}
                  </td>
                  
                  {/* Area */}
                  <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                    {customer.area}
                  </td>
                  
                  {/* Kota */}
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                    {customer.city}
                  </td>
                  
                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={customer.status} />
                  </td>
                  
                  {/* Risk Level */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <RiskBadge riskLevel={customer.riskLevel} />
                  </td>
                  
                  {/* Total Piutang */}
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-900 text-right whitespace-nowrap">
                    {formatCurrency(customer.totalDebt)}
                  </td>
                  
                  {/* Last Update */}
                  <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                    {customer.lastUpdate}
                  </td>
                  
                  {/* Aksi */}
                  <td className="py-3.5 px-6 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Lihat detail */}
                      <button
                        onClick={() => onView(customer)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                        title="Lihat Detail"
                        aria-label={`Lihat detail ${customer.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(customer)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer"
                        title="Edit Data"
                        aria-label={`Edit ${customer.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Kirim WA */}
                      <button
                        onClick={() => handleSendWA(customer)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-all cursor-pointer"
                        title="Kirim WA / Reminder"
                        aria-label={`Kirim WhatsApp ke ${customer.name}`}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {customers.length > 0 && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-semibold text-slate-700">1-{customers.length}</span> dari <span className="font-semibold text-slate-700">{totalCount}</span> entri
          </div>
          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button 
              onClick={() => alert('Ini adalah halaman pertama (Dummy)')}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Page indices */}
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center ${
                  page === 1 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <span className="text-slate-400 px-1 text-xs">...</span>

            <button
              onClick={() => setCurrentPage(125)}
              className="w-9 h-9 rounded-lg text-xs font-semibold border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center"
            >
              125
            </button>

            {/* Next Button */}
            <button 
              onClick={() => alert('Navigasi ke halaman berikutnya (Dummy)')}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-all cursor-pointer"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
