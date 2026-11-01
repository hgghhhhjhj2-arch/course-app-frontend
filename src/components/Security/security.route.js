export default [
  {
    path: 'security',
    meta: { roles: ['Security', 'Admin'], title: 'الأمن والحراسة' },
    children: [
      {
        path: '',
        redirect: '/security/gate-scan',
      },
      {
        path: 'gate-scan',
        name: 'GateScan',
        component: () => import('./views/GateScanView.vue'),
        meta: { title: 'مسح تصاريح الـ QR' },
      },
      {
        path: 'gate-logs',
        name: 'SecurityGateLogs',
        component: () => import('./views/GateLogsView.vue'),
        meta: { title: 'سجل حركات اليوم' },
      },
    ],
  },
];
