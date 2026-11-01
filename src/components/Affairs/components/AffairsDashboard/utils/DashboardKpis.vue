<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. طلبات المتقدمين -->
    <AppKpiCard
      title="طلبات المتقدمين"
      :value="stats.newApplicantsCount"
      badge="طلب جديد"
      badge-class="text-blue-600 dark:text-blue-400 font-bold"
      icon-bg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
    >
      <template #icon>
        <FileText class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. في انتظار الدفع -->
    <AppKpiCard
      title="في انتظار الدفع"
      :value="stats.pendingPaymentCount"
      badge="قيد المتابعة"
      badge-class="text-amber-600 dark:text-amber-400 font-bold"
      icon-bg="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
    >
      <template #icon>
        <Clock class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. الدورات المنعقدة حالياً -->
    <AppKpiCard
      title="الدورات المنعقدة حالياً"
      :value="stats.activeCoursesCount"
      badge="دورة نشطة"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <PlayCircle class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. حضور اليوم للبوابة -->
    <AppKpiCard
      title="حضور اليوم للبوابة"
      :value="stats.todayGateAttendanceCount"
      badge="حركة مسجلة"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <DoorOpen class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { FileText, Clock, PlayCircle, DoorOpen } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>
