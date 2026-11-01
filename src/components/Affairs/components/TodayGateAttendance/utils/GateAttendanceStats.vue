<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. إجمالي حركات المسح اليوم -->
    <AppKpiCard
      title="إجمالي حركات المسح اليوم"
      :value="totalCount"
      badge="حركة مسجلة"
      badge-class="text-blue-600 dark:text-blue-400 font-bold"
      icon-bg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
    >
      <template #icon>
        <DoorOpen class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. دخول مصرح به -->
    <AppKpiCard
      title="دخول مصرح به"
      :value="allowedCount"
      badge="مصرح بالدخول"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <CheckCircle2 class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. دخول مرفوض / مخالفات -->
    <AppKpiCard
      title="دخول مرفوض"
      :value="deniedCount"
      badge="مرفوض الدخول"
      badge-class="text-rose-600 dark:text-rose-400 font-bold"
      icon-bg="bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
    >
      <template #icon>
        <XCircle class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. نسبة الانضباط الأمني -->
    <AppKpiCard
      title="نسبة الانضباط اليومي"
      :value="`${adherenceRate}%`"
      badge="تصاريح صالحة"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <ShieldCheck class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { DoorOpen, CheckCircle2, XCircle, ShieldCheck } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  totalCount: {
    type: Number,
    default: 0,
  },
  allowedCount: {
    type: Number,
    default: 0,
  },
  deniedCount: {
    type: Number,
    default: 0,
  },
  adherenceRate: {
    type: Number,
    default: 0,
  },
});
</script>
