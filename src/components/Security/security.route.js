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
        component: () => import('./components/GateScanView.vue'),
        meta: { title: 'مسح تصاريح الـ QR' },
      },
      {
        path: 'gate-logs',
        name: 'SecurityGateLogs',
        component: () => import('./components/GateLogsView.vue'),
        meta: { title: 'سجل حركات اليوم' },
      },
    ],
  },
];
