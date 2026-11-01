export default [
  {
    path: 'admin',
    meta: { roles: ['Admin'], title: 'إدارة النظام' },
    children: [
      {
        path: '',
        redirect: '/admin/users',
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('./views/AdminUsersView.vue'),
        meta: { title: 'إدارة حسابات الموظفين' },
      },
      {
        path: 'halls',
        name: 'AdminHalls',
        component: () => import('./views/AdminHallsView.vue'),
        meta: { title: 'إدارة القاعات والمعامل' },
      },
      {
        path: 'audit-logs',
        name: 'AdminAuditLogs',
        component: () => import('./views/AdminAuditLogsView.vue'),
        meta: { title: 'سجل تدقيق النظام' },
      },
    ],
  },
];
