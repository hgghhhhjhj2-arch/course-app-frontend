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
        component: () => import('./views/TraineeApplicationsView.vue'),
        meta: { title: 'طلباتي وتصاريح الدخول' },
      },
      {
        path: 'courses',
        name: 'TraineeCourses',
        component: () => import('./views/TraineeCoursesView.vue'),
        meta: { title: 'دورات الانعقاد المتاحة' },
      },
      {
        path: 'certificates',
        name: 'TraineeCertificates',
        component: () => import('./views/TraineeCertificatesView.vue'),
        meta: { title: 'شهاداتي المعتمدة' },
      },
    ],
  },
];
