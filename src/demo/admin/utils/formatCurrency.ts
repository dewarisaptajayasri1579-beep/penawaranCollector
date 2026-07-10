/**
 * Formats a number into Indonesian Rupiah format (e.g. 1750000 -> "Rp 1.750.000")
 */
export function formatCurrency(amount: number): string {
  if (amount === 0) return 'Rp 0';
  return 'Rp ' + amount.toLocaleString('id-ID');
}
