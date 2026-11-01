<template>
  <div class="space-y-3 select-none">
    <!-- السطر الأول: تبويبات الفلترة السريعة والبحث النصي -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <!-- أزرار التبويبات السريعة -->
      <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="h-8.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          :class="
            activeTab === tab.key
              ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          "
          @click="selectTab(tab.key)"
        >
          <span>{{ tab.label }}</span>
          <span
            class="px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold"
            :class="
              activeTab === tab.key
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
            "
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- حقل البحث النصي السريع -->
      <div class="relative w-full md:w-80">
        <input
          :value="searchQuery"
          type="text"
          placeholder="ابحث باسم الدورة، المحاضر، أو القاعة..."
          class="w-full h-9.5 pr-9 pl-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
        <Search class="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          @click="$emit('update:searchQuery', '')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- السطر الثاني: الفلاتر المنسدلة (المحاضر والقاعة) وزر مسح التصفية -->
    <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <!-- فلتر الدورة الأساسية -->
        <Select
          :model-value="selectedCourse"
          :options="courseOptions"
          option-label="label"
          option-value="value"
          placeholder="جميع الدورات المعتمدة"
          show-clear
          class="w-52 text-xs font-bold rounded-xl h-9 flex items-center"
          @update:model-value="$emit('update:selectedCourse', $event)"
        />

        <!-- فلتر المحاضر الذي شرح -->
        <Select
          :model-value="selectedInstructor"
          :options="instructorOptions"
          option-label="label"
          option-value="value"
          placeholder="جميع المحاضرين"
          show-clear
          class="w-52 text-xs font-bold rounded-xl h-9 flex items-center"
          @update:model-value="$emit('update:selectedInstructor', $event)"
        />

        <!-- زر مسح الفلاتر إذا وُجد فلتر نشط -->
        <button
          v-if="hasActiveFilters"
          type="button"
          class="h-9 px-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          @click="$emit('clear-filters')"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span>مسح التصفية</span>
        </button>
      </div>

      <!-- عداد النتائج المطابقة -->
      <div class="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
        <span>عرض</span>
        <strong class="font-mono text-slate-800 dark:text-slate-100 font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
          {{ filteredCount }}
        </strong>
        <span>من إجمالي {{ totalCount }} دورة منتهية</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Select from 'primevue/select';
import { Search, X, RotateCcw } from 'lucide-vue-next';

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  activeTab: {
    type: String,
    default: 'all',
  },
  selectedCourse: {
    type: String,
    default: null,
  },
  selectedInstructor: {
    type: String,
    default: null,
  },
  courseOptions: {
    type: Array,
    default: () => [],
  },
  instructorOptions: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  highAttendanceCount: {
    type: Number,
    default: 0,
  },
  filteredCount: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  'update:searchQuery',
  'update:activeTab',
  'update:selectedCourse',
  'update:selectedInstructor',
  'clear-filters',
]);

const tabs = computed(() => [
  { key: 'all', label: 'جميع الدورات المنتهية', count: props.totalCount },
  { key: 'high', label: 'أعلى حضوراً (95%+)', count: props.highAttendanceCount },
]);

const hasActiveFilters = computed(() => {
  return (
    Boolean(props.searchQuery) ||
    props.activeTab !== 'all' ||
    props.selectedCourse !== null ||
    props.selectedInstructor !== null
  );
});

function selectTab(key) {
  emit('update:activeTab', key);
}
</script>
