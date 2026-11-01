<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. إجمالي الدورات المسجل بها -->
    <AppKpiCard
      title="إجمالي الدورات المسجلة"
      :value="totalCourses"
      badge="سجل التدريب الكلي"
      badge-class="text-blue-600 dark:text-blue-400 font-bold"
      icon-bg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
    >
      <template #icon>
        <BookOpen class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. دورات قيد الانعقاد حالياً -->
    <AppKpiCard
      title="دورات قيد الانعقاد حالياً"
      :value="ongoingCourses"
      badge="ملتحق بها الآن"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <Clock class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. دورات مكتملة ومجتازة -->
    <AppKpiCard
      title="دورات مكتملة ومجتازة"
      :value="completedCourses"
      badge="شهادات معتمدة"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <GraduationCap class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. معدل الحضور العام -->
    <AppKpiCard
      title="معدل الحضور التراكمي"
      :value="`${overallAttendance}%`"
      badge="الانضباط الأكاديمي"
      badge-class="text-amber-600 dark:text-amber-400 font-bold"
      icon-bg="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
    >
      <template #icon>
        <ShieldCheck class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { BookOpen, Clock, GraduationCap, ShieldCheck } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  totalCourses: {
    type: Number,
    default: 0,
  },
  ongoingCourses: {
    type: Number,
    default: 0,
  },
  completedCourses: {
    type: Number,
    default: 0,
  },
  overallAttendance: {
    type: Number,
    default: 0,
  },
});
</script>
