/**
 * Normalizes an Indonesian phone number to international format (628xxxxxxxx)
 * for use in WhatsApp APIs.
 * Example: "0812-3456-7890" -> "6281234567890"
 */
export function normalizePhone(phone: string): string {
  // Strip all non-numeric characters
  const clean = phone.replace(/\D/g, '');
  
  if (clean.startsWith('0')) {
    return '62' + clean.slice(1);
  }
  if (clean.startsWith('62')) {
    return clean;
  }
  if (clean.startsWith('8')) {
    return '62' + clean;
  }
  return clean;
}
