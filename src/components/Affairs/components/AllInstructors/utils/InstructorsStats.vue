<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. إجمالي المحاضرين -->
    <AppKpiCard
      title="إجمالي هيئة التدريس"
      :value="totalInstructors"
      badge="محاضر مسجل"
      badge-class="text-indigo-600 dark:text-indigo-400 font-bold"
      icon-bg="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
    >
      <template #icon>
        <GraduationCap class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. محاضرون نشطون ومعتمدون -->
    <AppKpiCard
      title="محاضرون نشطون ومعتمدون"
      :value="activeInstructors"
      badge="متاح للتدريس"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <CheckCircle2 class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. محاضرون يدَرّسون حالياً -->
    <AppKpiCard
      title="يدرّسون حالياً بالدفعات"
      :value="teachingNowCount"
      badge="دفعة جارية"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <PlayCircle class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. إجمالي الدفعات المسندة -->
    <AppKpiCard
      title="إجمالي الدفعات المسندة"
      :value="totalRoundsAssigned"
      badge="دفعة تدريبية"
      badge-class="text-amber-600 dark:text-amber-400 font-bold"
      icon-bg="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
    >
      <template #icon>
        <Layers class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { GraduationCap, CheckCircle2, PlayCircle, Layers } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  totalInstructors: {
    type: Number,
    default: 0,
  },
  activeInstructors: {
    type: Number,
    default: 0,
  },
  teachingNowCount: {
    type: Number,
    default: 0,
  },
  totalRoundsAssigned: {
    type: Number,
    default: 0,
  },
});
</script>
