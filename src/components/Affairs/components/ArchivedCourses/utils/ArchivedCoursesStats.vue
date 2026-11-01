<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. الدورات المنعقدة سابقاً -->
    <AppKpiCard
      title="الدورات المنعقدة سابقاً"
      :value="totalRounds"
      label="دورة منتهية ومؤرشفة"
      status-text="حالة الانعقاد Ended"
      status-type="default"
      :icon="History"
      variant="default"
    />

    <!-- 2. إجمالي الخريجين المعتمدين -->
    <AppKpiCard
      title="إجمالي الخريجين المعتمدين"
      :value="totalGraduates"
      label="خريجاً أتموا التدريب"
      status-text="شهادات معتمدة صادرة"
      status-type="success"
      :icon="GraduationCap"
      variant="success"
    />

    <!-- 3. إجمالي الإيرادات المحصلة -->
    <AppKpiCard
      title="إجمالي الرسوم المحصلة"
      :value="formatCurrency(totalRevenue)"
      label="إيرادات الخزينة بالدفعة"
      status-text="وفق إيصالات السداد بالـ ERD"
      status-type="primary"
      :icon="Wallet"
      variant="primary"
    />

    <!-- 4. متوسط نسبة الحضور التراكمية -->
    <AppKpiCard
      title="متوسط نسبة الحضور والتخرج"
      :value="`${averageAttendance}%`"
      label="التزام البوابات"
      status-text="محسوبة من GateLogs"
      :status-type="averageAttendance >= 95 ? 'success' : 'default'"
      :icon="CheckCircle2"
      variant="default"
    />
  </div>
</template>

<script setup>
import {
  History,
  GraduationCap,
  Wallet,
  CheckCircle2,
} from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';
import { formatEgyptianCurrency } from '../helpers/archivedCoursesConstants';

defineProps({
  totalRounds: {
    type: Number,
    default: 0,
  },
  totalGraduates: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  averageAttendance: {
    type: Number,
    default: 0,
  },
});

function formatCurrency(val) {
  return formatEgyptianCurrency(val);
}
</script>
