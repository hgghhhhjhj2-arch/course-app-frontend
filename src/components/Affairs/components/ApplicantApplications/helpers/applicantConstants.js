/**
 * ثوابت ومساعدات خاصة بطلبات المتقدمين وفق الـ ERD
 */

export const APPLICANT_CATEGORIES = {
  Civilian: {
    label: 'مدني',
    class: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    requiresProof: false,
  },
  MilitaryOfficer: {
    label: 'ضابط ق.م',
    class: 'bg-primary-50 text-primary-800 dark:bg-primary-950/70 dark:text-primary-300 border-primary-200 dark:border-primary-800/80',
    requiresProof: true,
  },
  MilitaryFamily: {
    label: 'عائلات ضباط ق.م',
    class: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80',
    requiresProof: true,
  },
  PoliceOfficerOrFamily: {
    label: 'شرطة / عائلاتهم',
    class: 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800/80',
    requiresProof: true,
  },
};

export const COMMON_REJECTION_REASONS = [
  'صورة بطاقة الرقم القومي غير واضحة أو منتهية السريان',
  'صورة شهادة المؤهل الدراسي غير مقروءة أو غير مكتملة',
  'عدم إرفاق كارنيه إثبات فئة الخصم (ضباط / عائلات / شرطة)',
  'المؤهل الدراسي غير مطابق لمتطلبات التسجيل بالدورة',
  'بيانات الرقم القومي المدخلة لا تطابق بيانات صورة البطاقة',
  'اكتمال السعة الاستيعابية المتاحة لمقاعد هذه الدورة',
];

export function formatEgyptianCurrency(val) {
  if (val == null) return '—';
  return Number(val).toLocaleString('ar-EG') + ' ج.م';
}

export function formatDateTime(isoString) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

export function formatDateOnly(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
