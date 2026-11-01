export default [
  {
    path: 'trainee',
    meta: { roles: ['Trainee', 'Admin'], title: 'خدمات المتدرب' },
    children: [
      {
        path: '',
        redirect: '/trainee/applications',
      },
      {
        path: 'applications',
        name: 'TraineeApplications',
        component: () => import('./components/TraineeApplicationsView.vue'),
        meta: { title: 'طلباتي وتصاريح الدخول' },
      },
      {
        path: 'courses',
        name: 'TraineeCourses',
        component: () => import('./components/TraineeCoursesView.vue'),
        meta: { title: 'دورات الانعقاد المتاحة' },
      },
      {
        path: 'certificates',
        name: 'TraineeCertificates',
        component: () => import('./components/TraineeCertificatesView.vue'),
        meta: { title: 'شهاداتي المعتمدة' },
      },
    ],
  },
];
