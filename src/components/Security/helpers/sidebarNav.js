import { QrCode, ShieldCheck } from 'lucide-vue-next';

export const securityNav = [
  {
    title: 'إدارة البوابة والأمن',
    items: [
      {
        label: 'مسح تصريح الدخول (QR)',
        path: '/security/gate-scan',
        icon: QrCode,
      },
      {
        label: 'سجل حركات الدخول والخروج',
        path: '/security/gate-logs',
        icon: ShieldCheck,
      },
    ],
  },
];

export default securityNav;
