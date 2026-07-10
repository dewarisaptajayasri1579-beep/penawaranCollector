export type CustomerStatus = 'Active' | 'Inactive' | 'Blocked';
export type CustomerRiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Customer {
  id: string; // Kode Pelanggan, e.g., "PLG-0001"
  name: string;
  phone: string;
  area: string;
  city: string;
  status: CustomerStatus;
  riskLevel: CustomerRiskLevel;
  totalDebt: number; // Rupiah amount
  lastUpdate: string; // Formatting timestamp or string
  address: string;
}
