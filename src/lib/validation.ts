/**
 * Cleans phone string by stripping non-numeric characters (except leading +).
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[\s\-()]/g, '');
}

/**
 * Validates Indian 10-digit mobile number format (starts with 6, 7, 8, or 9).
 * Accepts optional +91 or 0 prefix.
 */
export function isValidIndianPhone(phone: string): boolean {
  const cleaned = sanitizePhoneNumber(phone);
  // Match +91 or 91 or 0 followed by 10 digits starting with 6-9, or raw 10 digits starting with 6-9
  const pattern = /^(?:\+?91|0)?[6-9]\d{9}$/;
  return pattern.test(cleaned);
}

/**
 * Formats a phone number for clean readable display.
 */
export function formatDisplayPhone(phone: string): string {
  const cleaned = sanitizePhoneNumber(phone);
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}
