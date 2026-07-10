import { Search, FileSpreadsheet, UserPlus, X } from 'lucide-react';
import { CustomerStatus, CustomerRiskLevel } from '../types/customer';
import { allAreas } from '../data/customers';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedArea: string;
  onAreaChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedRisk: string;
  onRiskChange: (value: string) => void;
  onExportExcel: () => void;
  onAddCustomer: () => void;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedArea,
  onAreaChange,
  selectedStatus,
  onStatusChange,
  selectedRisk,
  onRiskChange,
  onExportExcel,
  onAddCustomer
}: FilterBarProps) {
  const statuses: { value: string; label: string }[] = [
    { value: '', label: 'Semua Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Blocked', label: 'Blocked' }
  ];

  const riskLevels: { value: string; label: string }[] = [
    { value: '', label: 'Semua Risk Level' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' }
  ];

  const handleClearFilters = () => {
    onSearchChange('');
    onAreaChange('');
    onStatusChange('');
    onRiskChange('');
  };

  const hasActiveFilters = searchTerm !== '' || selectedArea !== '' || selectedStatus !== '' || selectedRisk !== '';

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-4">
      <div className="flex flex-col xl:flex-row xl:items-center gap-3">
        {/* Search input with inner icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama pelanggan / no HP / kode pelanggan..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Dropdown Area */}
          <div className="relative">
            <select
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none"
            >
              <option value="">Semua Area</option>
              {allAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Dropdown Status */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none"
            >
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Dropdown Risk Level */}
          <div className="relative">
            <select
              value={selectedRisk}
              onChange={(e) => onRiskChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none"
            >
              {riskLevels.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Buttons Action Group */}
        <div className="flex items-center gap-2.5 sm:justify-end xl:justify-start">
          {/* Button Export Excel */}
          <button
            id="btn-export-excel"
            onClick={onExportExcel}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs md:text-sm font-semibold transition-all active:scale-95 cursor-pointer flex-1 sm:flex-initial"
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            <span>Export Excel</span>
          </button>

          {/* Button Tambah Pelanggan */}
          <button
            id="btn-add-customer"
            onClick={onAddCustomer}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold transition-all shadow-sm shadow-blue-500/10 active:scale-95 cursor-pointer flex-1 sm:flex-initial"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>Tambah Pelanggan</span>
          </button>
        </div>
      </div>

      {/* Filter summary with reset button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-700">Filter Aktif:</span>
            {searchTerm && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">Cari: "{searchTerm}"</span>}
            {selectedArea && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">Area: {selectedArea}</span>}
            {selectedStatus && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">Status: {selectedStatus}</span>}
            {selectedRisk && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">Risk: {selectedRisk}</span>}
          </div>
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1 shrink-0 ml-4"
          >
            <X className="w-3 h-3" />
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
