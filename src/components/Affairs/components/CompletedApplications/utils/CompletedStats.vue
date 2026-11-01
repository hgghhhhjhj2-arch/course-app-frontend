<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. إجمالي الدارسين المقيدين -->
    <AppKpiCard
      title="إجمالي الدارسين المقيدين"
      :value="totalCount"
      badge="سداد معتمد"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <UserCheck class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. الدورات النشطة حالياً -->
    <AppKpiCard
      title="الدورات المنعقدة حالياً"
      :value="activeRoundsCount"
      badge="دفعة نشطة"
      badge-class="text-blue-600 dark:text-blue-400 font-bold"
      icon-bg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
    >
      <template #icon>
        <PlayCircle class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. الرسوم المحصلة فعلياً -->
    <AppKpiCard
      title="الرسوم المحصلة"
      :value="formatEgyptianCurrency(totalCollectedRevenue)"
      badge="إيصالات الخزينة"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <Wallet class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. متوسط نسبة الحضور بالبوابة -->
    <AppKpiCard
      title="متوسط نسبة الحضور"
      :value="`${averageAttendance}%`"
      badge="سجل البوابة"
      badge-class="text-amber-600 dark:text-amber-400 font-bold"
      icon-bg="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
    >
      <template #icon>
        <QrCode class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { UserCheck, PlayCircle, Wallet, QrCode } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';
import { formatEgyptianCurrency } from '../helpers/completedConstants';

defineProps({
  totalCount: {
    type: Number,
    default: 0,
  },
  activeRoundsCount: {
    type: Number,
    default: 0,
  },
  totalCollectedRevenue: {
    type: Number,
    default: 0,
  },
  averageAttendance: {
    type: Number,
    default: 0,
  },
});
</script>
