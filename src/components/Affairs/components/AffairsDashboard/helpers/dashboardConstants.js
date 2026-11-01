/**
 * ثوابت وألوان ودوال مساعدة خاصة بلوحة معلومات شؤون الدارسين
 */

export function getChartTheme(isDark = false) {
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const textMutedColor = isDark ? '#64748b' : '#94a3b8';
  const gridColor = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.7)';

  return {
    textColor,
    textMutedColor,
    gridColor,
    fontFamily: 'Cairo, Tajawal, system-ui, sans-serif',
  };
}

export const QUICK_ACTIONS = [
  {
    title: 'طلبات المتقدمين',
    subtitle: 'فحص وتدقيق الطلبات الجديدة',
    route: '/affairs/applications/applicants',
    count: 24,
    badge: 'جديد',
    badgeClass: 'bg-primary-50 text-primary-700 dark:bg-primary-950/70 dark:text-primary-300',
    icon: 'FileText',
    color: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60',
  },
  {
    title: 'في انتظار الدفع',
    subtitle: 'متابعة مهل وإيصالات الخزينة',
    route: '/affairs/applications/pending-payment',
    count: 18,
    badge: 'مهل حرجة',
    badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
    icon: 'Clock',
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60',
  },
  {
    title: 'طلبات مكتملة',
    subtitle: 'سجل الدارسين وتصاريح البوابة',
    route: '/affairs/applications/completed',
    count: 156,
    badge: 'مسجل',
    badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
    icon: 'CheckCircle2',
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
  },
  {
    title: 'حضور البوابة اليوم',
    subtitle: 'متابعة حركات الدخول الأمنية',
    route: '/affairs/gate-attendance/today',
    count: 142,
    badge: 'اليوم',
    badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300',
    icon: 'DoorOpen',
    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60',
  },
];
