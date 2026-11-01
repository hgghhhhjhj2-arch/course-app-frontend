/**
 * ثوابت ودوال مساعدة خاصة بصفحة الدورات المنعقدة حالياً وفق الـ ERD
 * جداول: CourseRounds, Courses, Instructors, Halls, CourseLectureDays, Applications
 */

export const DAY_OF_WEEK_MAP = {
  Sat: 'السبت',
  Sun: 'الأحد',
  Mon: 'الإثنين',
  Tue: 'الثلاثاء',
  Wed: 'الأربعاء',
  Thu: 'الخميس',
  Fri: 'الجمعة',
};

export const DAY_OF_WEEK_SHORT = {
  Sat: 'سبت',
  Sun: 'أحد',
  Mon: 'إثنين',
  Tue: 'ثلاثاء',
  Wed: 'أربعاء',
  Thu: 'خميس',
  Fri: 'جمعة',
};

export const ROUND_STATUS_CONFIG = {
  Ongoing: {
    label: 'جارية حالياً',
    badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    dotClass: 'bg-emerald-500 animate-pulse',
  },
  Available: {
    label: 'مفتوحة للتسجيل',
    badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    dotClass: 'bg-blue-500',
  },
  Full: {
    label: 'مكتملة العدد',
    badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    dotClass: 'bg-purple-500',
  },
  Ended: {
    label: 'منتهية',
    badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    dotClass: 'bg-slate-400',
  },
};

const DAY_INDEX_MAP = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * الحصول على عدد الأيام المتبقية حتى بداية الدورة
 */
export function getDaysUntilStart(startDateStr) {
  if (!startDateStr) return null;
  const start = new Date(startDateStr).getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  const diffTime = start - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * الحصول على كود اليوم الحالي بالإنجليزية لمطابقة جدول CourseLectureDays
 */
export function getTodayDayCode() {
  const d = new Date();
  return DAY_INDEX_MAP[d.getDay()] || 'Sun';
}

/**
 * التحقق مما إذا كانت دورة الانعقاد لديها محاضرة اليوم
 */
export function isRoundLectureToday(lectureDays) {
  if (!Array.isArray(lectureDays)) return false;
  const todayCode = getTodayDayCode();
  return lectureDays.includes(todayCode);
}

/**
 * تنسيق أيام المحاضرات المحددة
 */
export function formatLectureDays(days) {
  if (!Array.isArray(days) || days.length === 0) return '—';
  return days.map((d) => DAY_OF_WEEK_MAP[d] || d).join(' • ');
}

/**
 * حساب النسبة المئوية لانقضاء فترة الدورة التدريبية
 */
export function calculateProgress(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 0;
  const start = new Date(startDateStr).getTime();
  const end = new Date(endDateStr).getTime();
  const now = new Date().getTime();

  if (now <= start) return 5;
  if (now >= end) return 100;

  const total = end - start;
  const elapsed = now - start;
  return Math.min(100, Math.max(5, Math.round((elapsed / total) * 100)));
}

/**
 * حساب رقم الأسبوع الحالي وإجمالي أسابيع الدورة
 */
export function calculateWeeksInfo(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return { currentWeek: 1, totalWeeks: 4 };
  const start = new Date(startDateStr).getTime();
  const end = new Date(endDateStr).getTime();
  const now = new Date().getTime();

  const totalDays = Math.max(7, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(1, Math.ceil((now - start) / (1000 * 60 * 60 * 24)));

  const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
  const currentWeek = Math.min(totalWeeks, Math.max(1, Math.ceil(elapsedDays / 7)));

  return { currentWeek, totalWeeks };
}

/**
 * حساب مدة المحاضرة بالساعات
 */
export function calculateLectureDuration(startTime, endTime) {
  if (!startTime || !endTime) return '';
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startMinutes = (startH || 0) * 60 + (startM || 0);
  const endMinutes = (endH || 0) * 60 + (endM || 0);
  const diffMinutes = endMinutes - startMinutes;
  if (diffMinutes <= 0) return '';
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (minutes === 0) return `${hours} ساعات`;
  return `${hours} ساعة و ${minutes} دقيقة`;
}

/**
 * تنسيق التاريخ باللغة العربية
 */
export function formatDate(dateStr) {
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
