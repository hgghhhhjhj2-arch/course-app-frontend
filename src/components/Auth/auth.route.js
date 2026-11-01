export default [
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('./views/LoginView.vue'),
    meta: { requiresAuth: false, title: 'تسجيل الدخول' },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('./views/RegisterView.vue'),
    meta: { requiresAuth: false, title: 'إنشاء حساب متدرب جديد' },
  },
];
