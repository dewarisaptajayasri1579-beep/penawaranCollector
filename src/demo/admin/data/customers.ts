import { Customer } from '../types/customer';

export const initialCustomers: Customer[] = [
  {
    id: 'PLG-0001',
    name: 'Bidan Siti Aisyah',
    phone: '0812-3456-7890',
    area: 'Jakarta Barat',
    city: 'Jakarta Barat',
    status: 'Active',
    riskLevel: 'Low',
    totalDebt: 1750000,
    lastUpdate: '19 Mei 2024 10:32 WIB',
    address: 'Jl. Meruya Ilir No. 45, Kembangan, Jakarta Barat 11620'
  },
  {
    id: 'PLG-0002',
    name: 'Klinik Harapan Ibu',
    phone: '0813-8765-4321',
    area: 'Jakarta Timur',
    city: 'Jakarta Timur',
    status: 'Active',
    riskLevel: 'Medium',
    totalDebt: 5000000,
    lastUpdate: '19 Mei 2024 09:15 WIB',
    address: 'Jl. Raya Bogor Km. 21, Ciracas, Jakarta Timur 13740'
  },
  {
    id: 'PLG-0003',
    name: 'Apotek Sehat Sentosa',
    phone: '0821-1111-2222',
    area: 'Tangerang',
    city: 'Tangerang',
    status: 'Active',
    riskLevel: 'High',
    totalDebt: 2500000,
    lastUpdate: '18 Mei 2024 16:22 WIB',
    address: 'Ruko Serpong Boulevard Block A No. 12, Serpong, Tangerang 15310'
  },
  {
    id: 'PLG-0004',
    name: 'Bidan Nurul Hidayah',
    phone: '0812-9876-6543',
    area: 'Bekasi',
    city: 'Bekasi',
    status: 'Inactive',
    riskLevel: 'Low',
    totalDebt: 750000,
    lastUpdate: '17 Mei 2024 11:08 WIB',
    address: 'Jl. KH. Noer Ali No. 8, Pekayon Jaya, Bekasi Selatan 17148'
  },
  {
    id: 'PLG-0005',
    name: 'PT Sehat Abadi',
    phone: '0813-2222-3333',
    area: 'Bandung',
    city: 'Bandung',
    status: 'Active',
    riskLevel: 'Critical',
    totalDebt: 12500000,
    lastUpdate: '17 Mei 2024 10:45 WIB',
    address: 'Kawasan Industri Batujajar Blok C No. 5, Bandung Barat 40561'
  },
  {
    id: 'PLG-0006',
    name: 'Apotek Bintang Farma',
    phone: '0821-4444-5555',
    area: 'Surabaya',
    city: 'Surabaya',
    status: 'Blocked',
    riskLevel: 'High',
    totalDebt: 8700000,
    lastUpdate: '16 Mei 2024 15:30 WIB',
    address: 'Jl. Dharmahusada No. 112, Gubeng, Surabaya 60285'
  },
  {
    id: 'PLG-0007',
    name: 'Klinik Sehat Bersama',
    phone: '0812-6666-7777',
    area: 'Depok',
    city: 'Depok',
    status: 'Active',
    riskLevel: 'Medium',
    totalDebt: 3200000,
    lastUpdate: '16 Mei 2024 09:20 WIB',
    address: 'Jl. Margonda Raya No. 230, Beji, Depok 16424'
  },
  {
    id: 'PLG-0008',
    name: 'Bidan Lestari',
    phone: '0813-8888-9999',
    area: 'Bogor',
    city: 'Bogor',
    status: 'Active',
    riskLevel: 'Low',
    totalDebt: 1100000,
    lastUpdate: '15 Mei 2024 14:05 WIB',
    address: 'Jl. Raya Pajajaran No. 88, Bogor Timur 16143'
  },
  {
    id: 'PLG-0009',
    name: 'Klinik Melati Sehat',
    phone: '0812-1212-3434',
    area: 'Semarang',
    city: 'Semarang',
    status: 'Inactive',
    riskLevel: 'Medium',
    totalDebt: 0,
    lastUpdate: '15 Mei 2024 10:12 WIB',
    address: 'Jl. Pemuda No. 150, Sekayu, Semarang Tengah 50132'
  },
  {
    id: 'PLG-0010',
    name: 'Apotek Citra Medika',
    phone: '0821-5555-6666',
    area: 'Medan',
    city: 'Medan',
    status: 'Active',
    riskLevel: 'High',
    totalDebt: 6400000,
    lastUpdate: '14 Mei 2024 16:50 WIB',
    address: 'Jl. Jamin Ginting No. 42, Padang Bulan, Medan 20156'
  }
];

export const allAreas = [
  'Jakarta Barat',
  'Jakarta Timur',
  'Jakarta Utara',
  'Jakarta Selatan',
  'Jakarta Pusat',
  'Tangerang',
  'Bekasi',
  'Depok',
  'Bogor',
  'Bandung',
  'Surabaya',
  'Semarang',
  'Medan'
];

export const allCities = [
  'Jakarta Barat',
  'Jakarta Timur',
  'Jakarta Utara',
  'Jakarta Selatan',
  'Jakarta Pusat',
  'Tangerang',
  'Bekasi',
  'Depok',
  'Bogor',
  'Bandung',
  'Surabaya',
  'Semarang',
  'Medan'
];
