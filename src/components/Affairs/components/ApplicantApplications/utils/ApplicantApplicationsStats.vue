<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. إجمالي الطلبات قيد المراجعة -->
    <AppKpiCard
      title="طلبات قيد المراجعة"
      :value="totalUnderReview"
      badge="طلب جديد"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <FileText class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. طلبات الفئة المدنية -->
    <AppKpiCard
      title="فئة مدنية"
      :value="civilianCount"
      badge="متقدم"
      badge-class="text-slate-400 font-bold"
      icon-bg="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
    >
      <template #icon>
        <Users class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. فئات القوات المسلحة والشرطة -->
    <AppKpiCard
      title="قوات مسلحة وشرطة"
      :value="militaryAndPoliceCount"
      badge="خصم فئات"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <ShieldCheck class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. المعتمدة اليوم -->
    <AppKpiCard
      title="المعتمدة اليوم"
      :value="approvedTodayCount"
      badge="بانتظار الدفع"
      badge-class="text-blue-600 dark:text-blue-400 font-bold"
      icon-bg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
    >
      <template #icon>
        <CheckCircle2 class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { FileText, Users, ShieldCheck, CheckCircle2 } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  totalUnderReview: {
    type: Number,
    default: 0,
  },
  civilianCount: {
    type: Number,
    default: 0,
  },
  militaryAndPoliceCount: {
    type: Number,
    default: 0,
  },
  approvedTodayCount: {
    type: Number,
    default: 0,
  },
});
</script>
