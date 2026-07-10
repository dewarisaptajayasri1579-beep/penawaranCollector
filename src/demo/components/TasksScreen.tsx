import React, { useState, useMemo } from 'react';
import { Search, MapPin, PhoneCall, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Customer } from '../types';

interface TasksScreenProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
}

type TabType = 'semua' | 'kunjungan' | 'followup';

export const TasksScreen: React.FC<TasksScreenProps> = ({
  customers,
  onSelectCustomer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('semua');

  // Format IDR
  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Filter customers based on active tab and search query
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            customer.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            customer.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const isKunjungan = customer.visitType === 'Kunjungan';
      const isFollowUp = customer.visitType === 'Follow Up';

      if (!matchesSearch) return false;
      if (activeTab === 'kunjungan' && !isKunjungan) return false;
      if (activeTab === 'followup' && !isFollowUp) return false;

      return true;
    });
  }, [customers, searchQuery, activeTab]);

  // Separate lists for categorized sections
  const kunjunganList = useMemo(() => {
    return filteredCustomers.filter(c => c.visitType === 'Kunjungan');
  }, [filteredCustomers]);

  const followUpList = useMemo(() => {
    return filteredCustomers.filter(c => c.visitType === 'Follow Up');
  }, [filteredCustomers]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      
      {/* Subheader Search & Filter tabs */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-gray-100 shrink-0 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari bidan, apotek, atau no. faktur..."
            className="w-full h-10 pl-10 pr-4 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Tab Filters */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('semua')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
              activeTab === 'semua' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Semua ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('kunjungan')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
              activeTab === 'kunjungan' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Kunjungan ({customers.filter(c => c.visitType === 'Kunjungan').length})
          </button>
          <button
            onClick={() => setActiveTab('followup')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
              activeTab === 'followup' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Follow Up ({customers.filter(c => c.visitType === 'Follow Up').length})
          </button>
        </div>
      </div>

      {/* Scrollable List Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Section 1: Kunjungan Lapangan */}
        {(activeTab === 'semua' || activeTab === 'kunjungan') && (
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Kunjungan Lapangan ({kunjunganList.length})</h3>
            </div>

            {kunjunganList.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4 bg-white rounded-xl border border-dashed border-gray-200">Tidak ada penugasan kunjungan</p>
            ) : (
              <div className="space-y-2">
                {kunjunganList.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => onSelectCustomer(customer)}
                    className="bg-white p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {customer.scheduledTime}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-950 leading-tight">{customer.name}</h4>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{customer.invoiceNo}</p>
                        <p className="text-[10px] text-red-600 font-bold mt-1 font-mono">{formatIDR(customer.remainingAmount)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Kunjungan
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Follow Up / Telepon */}
        {(activeTab === 'semua' || activeTab === 'followup') && (
          <div className="pt-2">
            <div className="flex items-center gap-1.5 mb-2.5">
              <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Follow Up Telepon / WA ({followUpList.length})</h3>
            </div>

            {followUpList.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4 bg-white rounded-xl border border-dashed border-gray-200">Tidak ada penugasan follow up</p>
            ) : (
              <div className="space-y-2">
                {followUpList.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => onSelectCustomer(customer)}
                    className="bg-white p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {customer.scheduledTime}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-950 leading-tight">{customer.name}</h4>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{customer.invoiceNo}</p>
                        <p className="text-[10px] text-red-600 font-bold mt-1 font-mono">{formatIDR(customer.remainingAmount)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[9px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Follow Up
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
