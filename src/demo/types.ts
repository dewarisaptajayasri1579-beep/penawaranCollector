export type CustomerStatus = 'Lunas' | 'Overdue' | 'Janji Bayar' | 'Perlu Follow Up' | 'Selesai';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  distance: string;
  status: CustomerStatus;
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  totalInvoice: number;
  paidAmount: number;
  remainingAmount: number;
  visitType: 'Kunjungan' | 'Follow Up';
  scheduledTime: string;
}

export interface VisitHistory {
  id: string;
  customerName: string;
  invoiceNo: string;
  amount: number;
  timestamp: string;
  status: 'Lunas' | 'Tertagih Sebagian' | 'Janji Bayar' | 'Tidak di Tempat' | 'Kendala';
  notes: string;
}

export interface CollectorProfile {
  name: string;
  role: string;
  phone: string;
  email: string;
  workArea: string;
  supervisor: string;
  dailyTarget: number;
  performanceScore: number;
  performanceBadge: 'Baik' | 'Cukup' | 'Kurang';
  totalVisits: number;
  totalCollected: number;
}

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Bidan Siti Aisyah',
    phone: '6281234567890',
    address: 'Jl. Mawar No. 25 RT 02/RW 04, Kel. Sukamaju, Boyolali, Jawa Tengah 57312',
    distance: '1.2 km',
    status: 'Overdue',
    invoiceNo: 'INV/2024/0512',
    invoiceDate: '12 Mei 2024',
    dueDate: '27 Mei 2024',
    totalInvoice: 1250000,
    paidAmount: 0,
    remainingAmount: 1250000,
    visitType: 'Kunjungan',
    scheduledTime: '09:00'
  },
  {
    id: 'cust-2',
    name: 'Klinik Harapan Ibu',
    phone: '6281398765432',
    address: 'Jl. Merdeka No. 88, Kel. Siswodipuran, Boyolali, Jawa Tengah 57311',
    distance: '2.8 km',
    status: 'Overdue',
    invoiceNo: 'INV/2024/0508',
    invoiceDate: '10 Mei 2024',
    dueDate: '25 Mei 2024',
    totalInvoice: 2800000,
    paidAmount: 0,
    remainingAmount: 2800000,
    visitType: 'Kunjungan',
    scheduledTime: '10:30'
  },
  {
    id: 'cust-3',
    name: 'Apotek Sehat Sentosa',
    phone: '6285744556677',
    address: 'Jl. Pandanaran No. 142, Boyolali, Jawa Tengah 57314',
    distance: '4.5 km',
    status: 'Janji Bayar',
    invoiceNo: 'INV/2024/0505',
    invoiceDate: '05 Mei 2024',
    dueDate: '20 Mei 2024',
    totalInvoice: 2950000,
    paidAmount: 1000000,
    remainingAmount: 1950000,
    visitType: 'Kunjungan',
    scheduledTime: '13:30'
  },
  {
    id: 'cust-4',
    name: 'Bidan Nurul Hidayah',
    phone: '6281233445566',
    address: 'Perum Permata Indah Blok C3, Kel. Mojosongo, Boyolali, Jawa Tengah 57322',
    distance: '3.5 km',
    status: 'Perlu Follow Up',
    invoiceNo: 'INV/2024/0495',
    invoiceDate: '15 Mei 2024',
    dueDate: '30 Mei 2024',
    totalInvoice: 750000,
    paidAmount: 0,
    remainingAmount: 750000,
    visitType: 'Follow Up',
    scheduledTime: '15:00'
  },
  {
    id: 'cust-5',
    name: 'PT. Sehat Abadi',
    phone: '6281122223333',
    address: 'Kawasan Industri Boyolali Kav 12, Jawa Tengah 57315',
    distance: '5.0 km',
    status: 'Overdue',
    invoiceNo: 'INV/2024/0492',
    invoiceDate: '11 Mei 2024',
    dueDate: '26 Mei 2024',
    totalInvoice: 4500000,
    paidAmount: 0,
    remainingAmount: 4500000,
    visitType: 'Follow Up',
    scheduledTime: '11:00'
  }
];

export const INITIAL_HISTORY: VisitHistory[] = [
  {
    id: 'hist-1',
    customerName: 'Bidan Siti Aisyah',
    invoiceNo: 'INV/2024/0512',
    amount: 500000,
    timestamp: 'Selasa, 27 Mei 2024 (09:15 - 09:28)',
    status: 'Tertagih Sebagian',
    notes: 'Bidan berjanji melunasi sisanya minggu depan.'
  },
  {
    id: 'hist-2',
    customerName: 'Klinik Harapan Ibu',
    invoiceNo: 'INV/2024/0508',
    amount: 0,
    timestamp: 'Selasa, 27 Mei 2024 (10:45 - 11:02)',
    status: 'Janji Bayar',
    notes: 'Pemilik sedang di luar kota. Janji bayar tanggal 29 Mei 2024.'
  }
];

export const INITIAL_PROFILE: CollectorProfile = {
  name: 'Andi Setiawan',
  role: 'Collector',
  phone: '6281234567890',
  email: 'andi.setiawan@blesscom.co.id',
  workArea: 'Boyolali',
  supervisor: 'Budi Santoso',
  dailyTarget: 12,
  performanceScore: 82,
  performanceBadge: 'Baik',
  totalVisits: 8,
  totalCollected: 18450000
};
