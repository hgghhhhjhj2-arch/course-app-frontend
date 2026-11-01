import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/shared/ui/Layout/AppLayout.vue';
import { setupRouteGuards } from './guards';

// 1. Modular routes imports from feature modules
import authRoutes from '@/components/Auth/auth.route';
import dashboardRoutes from '@/components/Dashboard/dashboard.route';
import traineeRoutes from '@/components/Trainee/trainee.route';
import affairsRoutes from '@/components/Affairs/affairs.route';
import securityRoutes from '@/components/Security/security.route';
import adminRoutes from '@/components/Admin/admin.route';

const routes = [
  // Protected Routes within Main App Layout
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'HomeRedirect',
        redirect: (to) => {
          // Defaults to dashboard or feature home
          return '/dashboard';
        },
      },
      ...dashboardRoutes,
      ...traineeRoutes,
      ...affairsRoutes,
      ...securityRoutes,
      ...adminRoutes,
      // Shared cross-feature views
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/shared/components/Profile/ProfileView.vue'),
        meta: { title: 'الملف الشخصي' },
      },
    ],
  },

  // Public / Standalone Auth Routes (without Sidebar/Header)
  ...authRoutes,

  // 404 Error Catch-All Page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/shared/ui/ErrorPage.vue'),
    meta: { title: 'الصفحة غير موجودة' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Attach route guards
setupRouteGuards(router);

export default router;
