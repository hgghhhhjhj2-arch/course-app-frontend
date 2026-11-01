/**
 * بيانات تشغيلية دقيقة وواقعية للوحة معلومات شؤون الدارسين
 */

export const DASHBOARD_STATS = {
  newApplicantsCount: 24,
  pendingPaymentCount: 18,
  activeCoursesCount: 6,
  todayGateAttendanceCount: 142,
  criticalPaymentCount: 4,
  todayLecturesCount: 4,
};

// جدول محاضرات وجلسات اليوم
export const TODAY_SCHEDULED_LECTURES = [
  {
    id: 1,
    courseName: 'الأمن السيبراني واختبار الاختراق CEH v12',
    roundNumber: 14,
    instructorName: 'د. طارق الحسين',
    hallName: 'معمل الأمن السيبراني 204',
    timeText: '09:00 ص - 01:00 م',
    status: 'live',
    statusText: 'جارية الآن',
    enrolledCount: 27,
  },
  {
    id: 2,
    courseName: 'إدارة الشبكات المتقدمة Cisco CCNA 200-301',
    roundNumber: 11,
    instructorName: 'م. إيهاب زكريا',
    hallName: 'معمل سيسكو 105',
    timeText: '10:00 ص - 02:00 م',
    status: 'live',
    statusText: 'جارية الآن',
    enrolledCount: 21,
  },
  {
    id: 3,
    courseName: 'تحليل البيانات المتقدم Python & Power BI',
    roundNumber: 8,
    instructorName: 'م. شريف عبد العظيم',
    hallName: 'قاعة اللواء نجيب 102',
    timeText: '04:00 م - 08:00 م',
    status: 'upcoming',
    statusText: 'تبدأ 04:00 م',
    enrolledCount: 32,
  },
  {
    id: 4,
    courseName: 'التسويق الرقمي وإدارة الحملات الإعلانية',
    roundNumber: 9,
    instructorName: 'أ. داليا رضوان',
    hallName: 'قاعة التدريب B1',
    timeText: '11:00 ص - 03:00 م',
    status: 'live',
    statusText: 'جارية الآن',
    enrolledCount: 24,
  },
];

// مسار تدفق الطلبات الأسبوعي (شؤون الدارسين)
export const WEEKLY_PIPELINE_DATA = {
  labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  applicationsReceived: [18, 25, 21, 32, 28, 15],
  applicationsApproved: [14, 20, 17, 26, 22, 12],
  applicationsPaid: [10, 16, 14, 21, 19, 9],
};

// حركات الدخول المباشرة للبوابة اليوم
export const LIVE_GATE_LOGS = [
  {
    id: 1,
    traineeName: 'محمود عبد الفتاح الصاوي',
    courseName: 'CEH v12 • معمل 204',
    time: '08:52 ص',
    decision: 'Allowed',
    decisionText: 'دخول مصرح',
    reason: 'مسدد ومقيد بالدورة',
    category: 'Civilian',
  },
  {
    id: 2,
    traineeName: 'مروة عصام الدين الشريف',
    courseName: 'Python & Power BI • قاعة 102',
    time: '08:55 ص',
    decision: 'Allowed',
    decisionText: 'دخول مصرح',
    reason: 'مسدد ومقيد بالدورة',
    category: 'MilitaryOfficer',
  },
  {
    id: 3,
    traineeName: 'خالد يوسف إبراهيم بدر',
    courseName: 'Web Full Stack • معمل 301',
    time: '08:58 ص',
    decision: 'Denied',
    decisionText: 'دخول مرفوض',
    reason: 'انقضاء مهلة السداد (غير مسدد)',
    category: 'PoliceOfficerOrFamily',
  },
  {
    id: 4,
    traineeName: 'ندى أسامة عبد الحميد',
    courseName: 'Cisco CCNA • معمل 105',
    time: '09:02 ص',
    decision: 'Allowed',
    decisionText: 'دخول مصرح',
    reason: 'مسدد ومقيد بالدورة',
    category: 'MilitaryFamily',
  },
  {
    id: 5,
    traineeName: 'يوسف علاء الدين العوضي',
    courseName: 'Python & Power BI • قاعة 102',
    time: '09:06 ص',
    decision: 'Allowed',
    decisionText: 'دخول مصرح',
    reason: 'مسدد ومقيد بالدورة',
    category: 'MilitaryOfficer',
  },
];

// تنبيهات مهل السداد الحرجة التي تحتاج متابعة من الشؤون
export const CRITICAL_PAYMENT_ALERTS = [
  {
    id: 104,
    code: 'APP-2026-0852',
    traineeName: 'ريم حسام الدين عبد المجيد',
    courseName: 'Cisco CCNA 200-301',
    phone: '01511223344',
    amount: 2200,
    dueText: 'ينتهي اليوم',
    isOverdue: false,
    severity: 'warning',
  },
  {
    id: 103,
    code: 'APP-2026-0849',
    traineeName: 'محمد كمال عثمان الشرقاوي',
    courseName: 'إدارة المشروعات PMP',
    phone: '01234567890',
    amount: 4500,
    dueText: 'متأخر منذ يوم',
    isOverdue: true,
    severity: 'danger',
  },
  {
    id: 101,
    code: 'APP-2026-0841',
    traineeName: 'أحمد محمود عبد الرحمن',
    courseName: 'الأمن السيبراني CEH',
    phone: '01012345678',
    amount: 3800,
    dueText: 'متأخر منذ 3 أيام',
    isOverdue: true,
    severity: 'danger',
  },
  {
    id: 105,
    code: 'APP-2026-0857',
    traineeName: 'خالد يوسف إبراهيم',
    courseName: 'Web Full Stack',
    phone: '01099887766',
    amount: 2500,
    dueText: 'متأخر منذ 5 أيام',
    isOverdue: true,
    severity: 'danger',
  },
];
