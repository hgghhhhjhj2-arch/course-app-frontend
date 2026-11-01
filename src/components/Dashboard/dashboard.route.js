export default [
  {
    path: 'dashboard',
    meta: { roles: ['Commander', 'Admin'], title: 'لوحة القيادة والمؤشرات' },
    children: [
      {
        path: '',
        name: 'DashboardOverview',
        component: () => import('./components/DashboardView.vue'),
        meta: { title: 'المؤشرات العامة' },
      },
      {
        path: 'halls-map',
        name: 'DashboardHallsMap',
        component: () => import('./components/HallsMapView.vue'),
        meta: { title: 'مخطط القاعات اليوم' },
      },
      {
        path: 'geography',
        name: 'DashboardGeography',
        component: () => import('./components/GeographyView.vue'),
        meta: { title: 'التوزيع الجغرافي للمتدربين' },
      },
    ],
  },
];
