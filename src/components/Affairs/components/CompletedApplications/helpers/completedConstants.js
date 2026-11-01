/**
 * ثوابت ومساعدات خاصة بالطلبات المكتملة والمقيدة وفق الـ ERD
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

export const COMPLETED_STATUSES = {
  Enrolled: {
    label: 'مقيد بالدورة',
    class: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80',
  },
  CourseEnded: {
    label: 'أتم التدريب',
    class: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800/80',
  },
};

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

export function getAttendanceBadge(rate) {
  if (rate == null) {
    return {
      label: 'لم يبدأ',
      class: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    };
  }

  if (rate >= 85) {
    return {
      label: `${rate}% ممتاز`,
      class: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    };
  }

  if (rate >= 75) {
    return {
      label: `${rate}% منتظم`,
      class: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    };
  }

  if (rate >= 60) {
    return {
      label: `${rate}% مقبول`,
      class: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    };
  }

  return {
    label: `${rate}% إنذار غياب`,
    class: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  };
}
