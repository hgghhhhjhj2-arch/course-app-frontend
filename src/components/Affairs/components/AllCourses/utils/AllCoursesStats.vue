<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. إجمالي الدورات بالكتالوج -->
    <AppKpiCard
      title="إجمالي دورات الكتالوج"
      :value="totalCourses"
      badge="كتالوج معتمد"
      badge-class="text-blue-600 dark:text-blue-400 font-bold"
      icon-bg="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
    >
      <template #icon>
        <BookOpen class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 2. دورات نشطة متاحة للانعقاد -->
    <AppKpiCard
      title="دورات نشطة بالكتالوج"
      :value="activeCourses"
      badge="متاحة للتقديم"
      badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
      icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
    >
      <template #icon>
        <CheckCircle2 class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 3. إجمالي دفعات الانعقاد -->
    <AppKpiCard
      title="إجمالي دفعات الانعقاد"
      :value="totalRounds"
      badge="دفعة تدريبية"
      badge-class="text-primary-600 dark:text-primary-400 font-bold"
      icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
    >
      <template #icon>
        <Layers class="w-5 h-5" />
      </template>
    </AppKpiCard>

    <!-- 4. إجمالي المتدربين المسجلين -->
    <AppKpiCard
      title="إجمالي الدارسين المسجلين"
      :value="totalTrainees"
      badge="دارس بالمنظومة"
      badge-class="text-amber-600 dark:text-amber-400 font-bold"
      icon-bg="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
    >
      <template #icon>
        <Users class="w-5 h-5" />
      </template>
    </AppKpiCard>
  </div>
</template>

<script setup>
import { BookOpen, CheckCircle2, Layers, Users } from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  totalCourses: {
    type: Number,
    default: 0,
  },
  activeCourses: {
    type: Number,
    default: 0,
  },
  totalRounds: {
    type: Number,
    default: 0,
  },
  totalTrainees: {
    type: Number,
    default: 0,
  },
});
</script>
