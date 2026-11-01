import { LayoutDashboard, Building2, Users } from 'lucide-vue-next';

export const dashboardNav = [
  {
    title: 'لوحة القيادة والمؤشرات',
    items: [
      {
        label: 'المؤشرات العامة',
        path: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'مخطط القاعات التفاعلي',
        path: '/dashboard/halls-map',
        icon: Building2,
      },
      {
        label: 'التوزيع الجغرافي للمتدربين',
        path: '/dashboard/geography',
        icon: Users,
      },
    ],
  },
];

export default dashboardNav;
