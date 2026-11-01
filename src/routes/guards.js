import { useAuthStore } from '@/components/Auth/stores/authStore';
import { env } from '@/environment';

/**
 * Authentication and Role-Based Access Control Guard
 */
export function setupRouteGuards(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    // Token check: either in store or localStorage
    const isAuthenticated = authStore.isAuthenticated || !!localStorage.getItem(env.tokenKey);

    // Dynamic document title update
    const appTitle = env.appTitle;
    document.title = to.meta?.title ? `${to.meta.title} | ${appTitle}` : appTitle;

    // 1. Check if route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ path: '/auth/login', query: { redirect: to.fullPath } });
    }

    // 2. Prevent authenticated users from visiting /auth/login unnecessarily
    if (to.path === '/auth/login' && isAuthenticated) {
      return next({ path: authStore.defaultHomePath });
    }

    // 3. Role-Based Access Control
    if (to.meta.roles && to.meta.roles.length > 0) {
      const currentRole = authStore.currentRole;
      if (!to.meta.roles.includes(currentRole)) {
        return next({ path: authStore.defaultHomePath });
      }
    }

    next();
  });
}
