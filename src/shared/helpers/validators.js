/**
 * Form and Egyptian National ID Validators
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateEgyptianNationalId(id) {
  if (!id) return false;
  const str = String(id).trim();
  if (str.length !== 14 || !/^\d{14}$/.test(str)) return false;
  // First digit must be 2 (1900-1999) or 3 (2000-2099)
  const century = parseInt(str[0], 10);
  return century === 2 || century === 3;
}

export function validatePhone(phone) {
  if (!phone) return false;
  const str = String(phone).trim();
  return /^01[0125][0-9]{8}$/.test(str);
}
