/**
 * ثوابت ودوال مساعدة خاصة بصفحة الدورات المنعقدة سابقاً (الأرشيف وسجلات الخريجين)
 * جداول: CourseRounds (Status='Ended'), Courses, Instructors, Halls, Applications
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
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatLectureDays(days) {
  if (!Array.isArray(days) || days.length === 0) return '—';
  return days.map((d) => DAY_OF_WEEK_MAP[d] || d).join(' • ');
}

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
