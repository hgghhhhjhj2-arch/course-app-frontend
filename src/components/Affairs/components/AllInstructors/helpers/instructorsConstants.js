/**
 * الثوابت والخيارات المعتمدة لوحدة المحاضرين (Instructors)
 * مطابقة لجدول Instructors وجدول CourseRounds في الـ ERD
 */

export const INSTRUCTOR_SPECIALTIES = [
  'أمن سيبراني واختبار اختراق متقدم',
  'تحليل البيانات وذكاء الأعمال Power BI',
  'إدارة مشروعات احترافية PMP و Agile',
  'شبكات وسحابة إلكترونية Cisco CCNA',
  'تطوير تطبيقات الويب Full Stack',
  'تسويق رقمي وإعلانات ممولة',
  'الذكاء الاصطناعي وتعلم الآلة AI & ML',
  'صيانة الحواسب والدعم الفني CompTIA A+',
  'إدارة قواعد البيانات SQL Server & Oracle',
  'تصميم تجربة وواجهة المستخدم UI/UX',
];

export const INSTRUCTOR_STATUS_TABS = [
  { key: 'all', label: 'جميع المحاضرين' },
  { key: 'active', label: 'معتمدون ونشطون' },
  { key: 'teaching', label: 'يدَرّسون حالياً' },
  { key: 'inactive', label: 'غير نشطين / معطلين' },
];

export const DEFAULT_PAGE_SIZE = 6;

export const PER_PAGE_OPTIONS = [
  { label: '6 محاضرين', value: 6 },
  { label: '12 محاضراً', value: 12 },
  { label: '24 محاضراً', value: 24 },
];

/**
 * تنسيق التواريخ بالعربية
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

/**
 * استخراج الأحرف الأولى من اسم المحاضر للأفاتار
 */
export function getInstructorInitials(name) {
  if (!name) return 'م.ح';
  const clean = name.replace(/^(د\.|م\.|أ\.د\.|أستاذ|دكتور|مهندس)\s+/i, '').trim();
  const parts = clean.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] || '') + (parts[1][0] || '');
}

/**
 * شارات حالة الدفعة
 */
export const ROUND_STATUS_CONFIG = {
  Available: {
    label: 'متاحة للتسجيل',
    class: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  Ongoing: {
    label: 'جارية حالياً',
    class: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  Ended: {
    label: 'منتهية ومؤرشفة',
    class: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  },
  Full: {
    label: 'مكتملة العدد',
    class: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
};
