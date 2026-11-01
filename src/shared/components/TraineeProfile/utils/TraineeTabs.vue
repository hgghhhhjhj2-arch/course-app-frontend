<template>
  <div class="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center gap-1.5 overflow-x-auto custom-scrollbar select-none">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
      :class="
        activeTab === tab.id
          ? 'bg-primary-600 text-white shadow-xs font-black'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
      "
      @click="$emit('update:activeTab', tab.id)"
    >
      <component :is="tab.icon" class="w-4 h-4 shrink-0" />
      <span>{{ tab.label }}</span>
      <span
        v-if="tab.count !== undefined"
        class="px-2 py-0.5 rounded-full text-[10px] font-bold"
        :class="
          activeTab === tab.id
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
        "
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  IdCard,
  Clock,
  GraduationCap,
  DoorOpen,
} from 'lucide-vue-next';

const props = defineProps({
  activeTab: {
    type: String,
    default: 'civil',
  },
  currentCoursesCount: {
    type: Number,
    default: 0,
  },
  pastCoursesCount: {
    type: Number,
    default: 0,
  },
  gateLogsCount: {
    type: Number,
    default: 0,
  },
});

defineEmits(['update:activeTab']);

const tabs = computed(() => [
  {
    id: 'civil',
    label: 'بيانات البطاقة والمستندات',
    icon: IdCard,
  },
  {
    id: 'current',
    label: 'الدورات الجارية حالياً',
    icon: Clock,
    count: props.currentCoursesCount,
  },
  {
    id: 'past',
    label: 'الدورات السابقة والشهادات',
    icon: GraduationCap,
    count: props.pastCoursesCount,
  },
  {
    id: 'gate_logs',
    label: 'سجل حركات مسح البوابة',
    icon: DoorOpen,
    count: props.gateLogsCount,
  },
]);
</script>
