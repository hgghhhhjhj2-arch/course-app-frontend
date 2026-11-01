<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
    <!-- 1. الدورات المنعقدة والجارية حالياً -->
    <AppKpiCard
      title="دفعات جارية حالياً (Ongoing)"
      :value="ongoingRounds"
      label="دفعة دراسية"
      status-text="بدأت الدراسة وتُعقد محاضراتها"
      status-type="success"
      :icon="PlayCircle"
      variant="default"
    />

    <!-- 2. دورات مفتوحة للتسجيل وتبدأ قريباً -->
    <AppKpiCard
      title="مفتوحة للتسجيل (Available)"
      :value="availableRounds"
      label="دفعة مجدولة"
      status-text="تستقبل طلبات المتدربين الجدد"
      status-type="info"
      :icon="CalendarPlus"
      variant="primary"
    />

    <!-- 3. محاضرات اليوم المجدولة -->
    <AppKpiCard
      title="محاضرات اليوم المجدولة"
      :value="todayLectures"
      label="محاضرة اليوم"
      status-text="وفق جدول CourseLectureDays"
      :status-type="todayLectures > 0 ? 'warning' : 'default'"
      :icon="CalendarCheck"
      variant="warning"
    />

    <!-- 4. إجمالي الدارسين المقيدين -->
    <AppKpiCard
      title="إجمالي الدارسين المقيدين"
      :value="totalTrainees"
      label="دارساً مسجلاً"
      status-text="بالدفعات الجارية والقادمة"
      status-type="default"
      :icon="Users"
      variant="default"
    />
  </div>
</template>

<script setup>
import {
  PlayCircle,
  CalendarPlus,
  CalendarCheck,
  Users,
} from 'lucide-vue-next';
import AppKpiCard from '@/shared/ui/Cards/AppKpiCard.vue';

defineProps({
  totalRounds: {
    type: Number,
    default: 0,
  },
  ongoingRounds: {
    type: Number,
    default: 0,
  },
  availableRounds: {
    type: Number,
    default: 0,
  },
  todayLectures: {
    type: Number,
    default: 0,
  },
  totalTrainees: {
    type: Number,
    default: 0,
  },
  averageAttendance: {
    type: Number,
    default: 0,
  },
});
</script>
