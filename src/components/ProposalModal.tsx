import React, { useState, useRef } from 'react';
import { X, CheckCircle, FileText, Send, Building2, Users, Briefcase, MessageSquare, Mail, Phone, User, Loader2 } from 'lucide-react';
import { ProposalFormInput } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import html2pdf from 'html2pdf.js';
import ProposalPdfTemplate from './ProposalPdfTemplate';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
  const [formData, setFormData] = useState<ProposalFormInput>({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    businessType: '',
    collectorCount: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<ProposalFormInput>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  const pdfRef = useRef<HTMLDivElement>(null);

  const businessTypes = [
    'Distributor',
    'Leasing / Pembiayaan',
    'Koperasi',
    'Toko Grosir',
    'Perusahaan Sales B2B',
    'Rental',
    'Lainnya',
  ];

  const collectorCounts = [
    '1 - 3 Collector',
    '4 - 10 Collector',
    '11 - 30 Collector',
    'Lebih dari 30 Collector',
  ];

  const validate = (): boolean => {
    const newErrors: Partial<ProposalFormInput> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.company.trim()) newErrors.company = 'Nama perusahaan wajib diisi';
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.whatsapp.replace(/[\s-]/g, ''))) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid (minimal 8 digit)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.businessType) newErrors.businessType = 'Silakan pilih bidang usaha';
    if (!formData.collectorCount) newErrors.collectorCount = 'Silakan pilih jumlah collector';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProposalFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;
    
    try {
      setIsGeneratingPdf(true);
      
      const element = pdfRef.current;
      const opt = {
        margin:       0,
        filename:     `Proposal_Blesscom_Collector_${formData.company.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // html2pdf returns a promise if called like this
      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const getWaLink = () => {
    const text = encodeURIComponent(
      `Halo Tim Collector Recall, saya *${formData.name}* dari *${formData.company}* baru saja mengunduh proposal. Saya ingin berkonsultasi lebih lanjut mengenai penawaran aplikasi untuk perusahaan kami dengan bidang usaha *${formData.businessType}* dan jumlah collector *${formData.collectorCount}*.`
    );
    return `https://wa.me/6281234567890?text=${text}`;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      whatsapp: '',
      email: '',
      businessType: '',
      collectorCount: '',
      notes: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="proposal-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#003366]" />
                <h3 className="font-bold text-slate-900 text-lg">Dapatkan Proposal Lengkap</h3>
              </div>
              <button
                id="close-modal-btn"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all duration-150"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto p-6 flex-1">
              {!isSubmitted ? (
                <form id="proposal-form" onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Silakan isi data perusahaan Anda secara singkat untuk mendapatkan file proposal penawaran, rincian fitur, dan simulasi keuntungan menggunakan **Collector Recall**.
                  </p>

                  {/* Nama Lengkap */}
                  <div>
                    <label htmlFor="name-input" className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        id="name-input"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Contoh: Budi Santoso"
                        className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                            : 'border-slate-200 focus:ring-blue-900/10 focus:border-[#003366]'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Nama Perusahaan */}
                  <div>
                    <label htmlFor="company-input" className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Perusahaan *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                        <Building2 className="h-4 w-4" />
                      </span>
                      <input
                        id="company-input"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Contoh: PT Sukses Mandiri"
                        className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.company
                            ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                            : 'border-slate-200 focus:ring-blue-900/10 focus:border-[#003366]'
                        }`}
                      />
                    </div>
                    {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                  </div>

                  {/* Row WhatsApp & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nomor WhatsApp */}
                    <div>
                      <label htmlFor="whatsapp-input" className="block text-xs font-semibold text-slate-700 mb-1">
                        Nomor WhatsApp *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                          <Phone className="h-4 w-4" />
                        </span>
                        <input
                          id="whatsapp-input"
                          name="whatsapp"
                          type="text"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="Contoh: 081234567890"
                          className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                            errors.whatsapp
                              ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                              : 'border-slate-200 focus:ring-blue-900/10 focus:border-[#003366]'
                          }`}
                        />
                      </div>
                      {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Perusahaan *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input
                          id="email-input"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Contoh: budi@perusahaan.com"
                          className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                              : 'border-slate-200 focus:ring-blue-900/10 focus:border-[#003366]'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row Bidang Usaha & Jumlah Collector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Bidang Usaha */}
                    <div>
                      <label htmlFor="businessType-select" className="block text-xs font-semibold text-slate-700 mb-1">
                        Bidang Usaha *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                          <Briefcase className="h-4 w-4" />
                        </span>
                        <select
                          id="businessType-select"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
                            errors.businessType
                              ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                              : 'border-slate-200 focus:ring-blue-900/10 focus:border-[#003366]'
                          }`}
                        >
                          <option value="">Pilih Bidang Usaha</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.businessType && <p className="text-xs text-red-500 mt-1">{errors.businessType}</p>}
                    </div>

                    {/* Jumlah Collector */}
                    <div>
                      <label htmlFor="collectorCount-select" className="block text-xs font-semibold text-slate-700 mb-1">
                        Jumlah Estimasi Collector *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                          <Users className="h-4 w-4" />
                        </span>
                        <select
                          id="collectorCount-select"
                          name="collectorCount"
                          value={formData.collectorCount}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
                            errors.collectorCount
                              ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                              : 'border-slate-200 focus:ring-blue-900/10 focus:border-[#003366]'
                          }`}
                        >
                          <option value="">Pilih Jumlah Collector</option>
                          {collectorCounts.map((count) => (
                            <option key={count} value={count}>
                              {count}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.collectorCount && <p className="text-xs text-red-500 mt-1">{errors.collectorCount}</p>}
                    </div>
                  </div>

                  {/* Catatan Kebutuhan Singkat */}
                  <div>
                    <label htmlFor="notes-input" className="block text-xs font-semibold text-slate-700 mb-1">
                      Catatan Kebutuhan Singkat (Opsional)
                    </label>
                    <div className="relative">
                      <span className="absolute top-2.5 left-3 text-slate-400 pointer-events-none">
                        <MessageSquare className="h-4 w-4" />
                      </span>
                      <textarea
                        id="notes-input"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Contoh: Ingin integrasi dengan sistem ERP kami saat ini, butuh penanganan tagihan jatuh tempo di atas 90 hari."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-[#003366] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-proposal-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 bg-[#003366] hover:bg-[#002244] text-white font-semibold rounded-xl text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Memproses data Anda...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Kirim Form & Unduh Proposal</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  id="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6 px-2"
                >
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 animate-bounce">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xl mb-2">Pendaftaran Sukses!</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Terima kasih, proposal <strong className="text-slate-900">Collector Recall</strong> siap diunduh. Tim kami juga dapat menghubungi Anda untuk konsultasi lebih lanjut terkait solusi monitoring penagihan ini.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    {/* Download Button */}
                    <button
                      id="download-pdf-btn"
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPdf}
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isGeneratingPdf ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      <span>{isGeneratingPdf ? 'Membuat PDF...' : 'Download PDF'}</span>
                    </button>

                    {/* WhatsApp Action */}
                    <a
                      id="wa-consultation-btn"
                      href={getWaLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-[#003366] hover:bg-[#002244] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="font-bold text-white">WA</span>
                      <span>Konsultasi WA</span>
                    </a>
                  </div>

                  {/* Hidden PDF Template for generation */}
                  <ProposalPdfTemplate formData={formData} pdfRef={pdfRef} />

                  <button
                    id="back-modal-btn"
                    onClick={() => {
                      onClose();
                      resetForm();
                    }}
                    className="mt-8 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-all underline"
                  >
                    Tutup Jendela
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer Notice */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 text-center text-[11px] text-slate-400">
              Data Anda aman dan tidak akan disebarluaskan kepada pihak ketiga.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
