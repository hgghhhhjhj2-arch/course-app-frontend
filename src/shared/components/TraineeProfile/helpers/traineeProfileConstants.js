/**
 * ثوابت ودوال مساعدة خاصة بملف وسجل الدارس الأكاديمي والمدني
 */

export const APPLICANT_CATEGORIES = {
  Civilian: {
    label: 'مدني',
    class:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    dotClass: 'bg-slate-400',
    requiresProof: false,
  },
  MilitaryOfficer: {
    label: 'ضابط ق.م',
    class:
      'bg-primary-50 text-primary-800 dark:bg-primary-950/70 dark:text-primary-300 border-primary-200 dark:border-primary-800/80',
    dotClass: 'bg-primary-500',
    requiresProof: true,
  },
  MilitaryFamily: {
    label: 'عائلات ضباط ق.م',
    class:
      'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80',
    dotClass: 'bg-emerald-500',
    requiresProof: true,
  },
  PoliceOfficerOrFamily: {
    label: 'شرطة / عائلاتهم',
    class:
      'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800/80',
    dotClass: 'bg-blue-500',
    requiresProof: true,
  },
};

export const COURSE_STATUSES = {
  Ongoing: {
    label: 'قيد الانعقاد حالياً',
    class:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    badgeText: 'جارية',
    dotClass: 'bg-emerald-500',
  },
  Completed: {
    label: 'مكتملة ومجتازة',
    class:
      'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    badgeText: 'مكتملة',
    dotClass: 'bg-blue-500',
  },
  CourseEnded: {
    label: 'منتهية',
    class:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    badgeText: 'منتهية',
    dotClass: 'bg-slate-400',
  },
  PendingPayment: {
    label: 'في انتظار السداد',
    class:
      'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    badgeText: 'معلقة مالياً',
    dotClass: 'bg-amber-500',
  },
};

export const GRADE_BADGES = {
  'ممتاز': {
    label: 'ممتاز',
    class: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  },
  'جيد جداً': {
    label: 'جيد جداً',
    class: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  },
  'جيد': {
    label: 'جيد',
    class: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700',
  },
  'اجتياز': {
    label: 'تم الاجتياز',
    class: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  },
};

export const GATE_DECISIONS = {
  Allowed: {
    label: 'دخول مصرح به',
    class:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    dotClass: 'bg-emerald-500',
  },
  Denied: {
    label: 'دخول مرفوض',
    class:
      'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    dotClass: 'bg-rose-500',
  },
};

export function formatEgyptianCurrency(amount) {
  if (amount === null || amount === undefined) return '—';
  return `${Number(amount).toLocaleString('ar-EG')} ج.م`;
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoStr;
  }
}

export function calculateAge(birthDateStr) {
  if (!birthDateStr) return '—';
  const birth = new Date(birthDateStr);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return `${age} سنة`;
}

export function isIdExpired(expiryDateStr) {
  if (!expiryDateStr) return false;
  return new Date(expiryDateStr) < new Date();
}
