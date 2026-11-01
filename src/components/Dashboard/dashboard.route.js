export default [
  {
    path: 'dashboard',
    meta: { roles: ['Commander', 'Admin'], title: 'لوحة القيادة والمؤشرات' },
    children: [
      {
        path: '',
        name: 'DashboardOverview',
        component: () => import('./views/DashboardView.vue'),
        meta: { title: 'المؤشرات العامة' },
      },
      {
        path: 'halls-map',
        name: 'DashboardHallsMap',
        component: () => import('./views/HallsMapView.vue'),
        meta: { title: 'مخطط القاعات اليوم' },
      },
      {
        path: 'geography',
        name: 'DashboardGeography',
        component: () => import('./views/GeographyView.vue'),
        meta: { title: 'التوزيع الجغرافي للمتدربين' },
      },
    ],
  },
];
