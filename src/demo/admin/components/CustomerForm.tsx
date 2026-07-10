import React, { useState, useEffect } from 'react';
import { Customer, CustomerStatus, CustomerRiskLevel } from '../types/customer';
import { allAreas, allCities } from '../data/customers';
import { Info, Check, RotateCcw, Save, Trash2 } from 'lucide-react';

interface CustomerFormProps {
  editingCustomer: Customer | null;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

const defaultTemplate: Omit<Customer, 'totalDebt' | 'lastUpdate'> = {
  id: 'PLG-0001',
  name: 'Bidan Siti Aisyah',
  phone: '0812-3456-7890',
  riskLevel: 'Low',
  area: 'Jakarta Barat',
  city: 'Jakarta Barat',
  status: 'Active',
  address: 'Jl. Meruya Ilir No. 45, Kembangan, Jakarta Barat 11620'
};

const blankForm: Omit<Customer, 'totalDebt' | 'lastUpdate'> = {
  id: '',
  name: '',
  phone: '',
  riskLevel: 'Low',
  area: '',
  city: '',
  status: 'Active',
  address: ''
};

export default function CustomerForm({
  editingCustomer,
  onSave,
  onCancel
}: CustomerFormProps) {
  const [formData, setFormData] = useState<Omit<Customer, 'totalDebt' | 'lastUpdate'>>(defaultTemplate);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Sync state when editingCustomer changes
  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        id: editingCustomer.id,
        name: editingCustomer.name,
        phone: editingCustomer.phone,
        riskLevel: editingCustomer.riskLevel,
        area: editingCustomer.area,
        city: editingCustomer.city,
        status: editingCustomer.status,
        address: editingCustomer.address
      });
      setIsEditMode(true);
      setErrors({});
    } else {
      // Default to the template values when not editing
      setFormData(defaultTemplate);
      setIsEditMode(false);
      setErrors({});
    }
  }, [editingCustomer]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama Pelanggan wajib diisi';
    if (!formData.id.trim()) newErrors.id = 'Kode Pelanggan wajib diisi';
    if (!formData.phone.trim()) {
      newErrors.phone = 'No HP / WhatsApp wajib diisi';
    } else {
      // Basic check for phone format (only digits, spaces, dashes)
      const clean = formData.phone.replace(/[\s-]/g, '');
      if (!/^\d{9,15}$/.test(clean)) {
        newErrors.phone = 'No HP / WhatsApp tidak valid (harus 9-15 digit angka)';
      }
    }
    if (!formData.area) newErrors.area = 'Area wajib dipilih';
    if (!formData.city) newErrors.city = 'Kota wajib dipilih';
    if (!formData.address.trim()) newErrors.address = 'Alamat lengkap wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Find first error and scroll to it or alert
      const firstError = Object.values(newErrorsAlert())[0];
      alert(`Gagal menyimpan: ${firstError}`);
      return;
    }

    // Prepare full customer record
    const savedCustomer: Customer = {
      ...formData,
      // If editing, preserve the debt, otherwise default to 0 for new
      totalDebt: editingCustomer ? editingCustomer.totalDebt : 0,
      // Update last update timestamp
      lastUpdate: getCurrentTimestamp()
    };

    onSave(savedCustomer);
    alert('Data pelanggan berhasil disimpan');
    handleReset();
  };

  const newErrorsAlert = () => {
    const list: Record<string, string> = {};
    if (!formData.name.trim()) list.name = 'Nama Pelanggan wajib diisi';
    if (!formData.id.trim()) list.id = 'Kode Pelanggan wajib diisi';
    if (!formData.phone.trim()) list.phone = 'No HP wajib diisi';
    if (!formData.area) list.area = 'Area wajib dipilih';
    if (!formData.city) list.city = 'Kota wajib dipilih';
    if (!formData.address.trim()) list.address = 'Alamat wajib diisi';
    return list;
  };

  const handleReset = () => {
    setFormData(defaultTemplate);
    setErrors({});
    setIsEditMode(false);
    onCancel();
  };

  const handleSetBlank = () => {
    setFormData({
      id: `PLG-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      phone: '',
      riskLevel: 'Low',
      area: '',
      city: '',
      status: 'Active',
      address: ''
    });
    setIsEditMode(false);
    setErrors({});
  };

  const getCurrentTimestamp = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const now = new Date();
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  };

  return (
    <div id="customer-form-section" className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-5">
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">
              {isEditMode ? `Form Pelanggan (Mode Edit - ${formData.id})` : 'Form Pelanggan (Template / Tambah Baru)'}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {isEditMode ? 'Mengubah rincian informasi data pelanggan terdaftar.' : 'Gunakan contoh template atau bersihkan form untuk membuat data baru.'}
          </p>
        </div>

        {/* Quick actions for form */}
        <div className="flex items-center gap-2">
          {!isEditMode && (
            <button
              type="button"
              onClick={handleSetBlank}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bersihkan Form (Baru)</span>
            </button>
          )}
          {isEditMode && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold uppercase tracking-wider">
              Sedang Mengedit
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Nama, Kode, No HP, Risk Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nama Pelanggan */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Nama Pelanggan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Masukkan nama pelanggan / outlet"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:border-blue-500 transition-all placeholder:text-slate-400 ${
                errors.name ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
              }`}
            />
            {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
          </div>

          {/* Kode Pelanggan */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Kode Pelanggan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => handleChange('id', e.target.value)}
              disabled={isEditMode} // Cannot edit code after created
              placeholder="Contoh: PLG-0011"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 font-mono focus:outline-hidden focus:ring-2 focus:border-blue-500 transition-all placeholder:text-slate-400 ${
                isEditMode ? 'bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed' :
                errors.id ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
              }`}
            />
            {errors.id && <p className="text-[10px] text-red-500 font-medium">{errors.id}</p>}
          </div>

          {/* No HP / WhatsApp */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              No HP / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Contoh: 0812-3456-7890"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 font-mono focus:outline-hidden focus:ring-2 focus:border-blue-500 transition-all placeholder:text-slate-400 ${
                errors.phone ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
              }`}
            />
            {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
          </div>

          {/* Risk Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Risk Level <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.riskLevel}
                onChange={(e) => handleChange('riskLevel', e.target.value)}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none"
              >
                <option value="Low">Low (Rendah)</option>
                <option value="Medium">Medium (Sedang)</option>
                <option value="High">High (Tinggi)</option>
                <option value="Critical">Critical (Kritis)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Area, Kota, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Area <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                className={`w-full pl-3.5 pr-8 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none ${
                  errors.area ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
                }`}
              >
                <option value="">-- Pilih Area --</option>
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
            {errors.area && <p className="text-[10px] text-red-500 font-medium">{errors.area}</p>}
          </div>

          {/* Kota */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Kota <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className={`w-full pl-3.5 pr-8 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none ${
                  errors.city ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
                }`}
              >
                <option value="">-- Pilih Kota --</option>
                {allCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {errors.city && <p className="text-[10px] text-red-500 font-medium">{errors.city}</p>}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-slate-700 font-medium cursor-pointer appearance-none"
              >
                <option value="Active">Active (Aktif)</option>
                <option value="Inactive">Inactive (Tidak Aktif)</option>
                <option value="Blocked">Blocked (Diblokir)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Alamat */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            Alamat Lengkap <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            placeholder="Masukkan alamat lengkap penagihan dan pengiriman faktur..."
            className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none ${
              errors.address ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
            }`}
          />
          {errors.address && <p className="text-[10px] text-red-500 font-medium">{errors.address}</p>}
        </div>

        {/* Buttons Action */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-50">
          <button
            type="button"
            id="btn-form-cancel"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs md:text-sm font-semibold transition-all cursor-pointer active:scale-95"
          >
            Batal
          </button>
          <button
            type="submit"
            id="btn-form-save"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold transition-all shadow-sm shadow-blue-500/10 cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isEditMode ? 'Simpan Perubahan' : 'Simpan Pelanggan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
