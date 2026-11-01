/**
 * ثوابت ودوال مساعدة خاصة بحضور البوابة وسجل الـ GateLogs
 */

export const GATE_DECISIONS = {
  Allowed: {
    label: 'دخول مصرح به',
    badgeClass:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80',
    dotClass: 'bg-emerald-500',
  },
  Denied: {
    label: 'دخول مرفوض',
    badgeClass:
      'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800/80',
    dotClass: 'bg-rose-500',
  },
};

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

export function formatTimeOnly(isoString) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return isoString;
  }
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
