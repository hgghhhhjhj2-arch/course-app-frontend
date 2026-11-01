export default [
  {
    path: 'affairs',
    meta: { roles: ['Affairs', 'Admin'], title: 'شؤون الدارسين' },
    children: [
      {
        path: '',
        redirect: '/affairs/applications',
      },
      {
        path: 'applications',
        name: 'AffairsApplications',
        component: () => import('./views/AffairsApplicationsView.vue'),
        meta: { title: 'إدارة الطلبات والسداد' },
      },
      {
        path: 'courses',
        name: 'AffairsCourses',
        component: () => import('./views/AffairsCoursesView.vue'),
        meta: { title: 'الدورات ودفعات الانعقاد' },
      },
      {
        path: 'instructors',
        name: 'AffairsInstructors',
        component: () => import('./views/AffairsInstructorsView.vue'),
        meta: { title: 'إدارة المحاضرين' },
      },
      {
        path: 'attendance',
        name: 'AffairsAttendance',
        component: () => import('./views/AffairsAttendanceView.vue'),
        meta: { title: 'سجل الحضور والغياب' },
      },
      {
        path: 'gate-logs',
        name: 'AffairsGateLogs',
        component: () => import('./views/AffairsGateLogsView.vue'),
        meta: { title: 'سجل البوابة والتدقيق' },
      },
    ],
  },
];
