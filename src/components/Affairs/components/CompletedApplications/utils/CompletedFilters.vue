<template>
  <div class="space-y-3">
    <!-- 1. شريط التبويبات السريعة لحالة الدارس (الكل / مقيد بالدورة / أتم التدريب) -->
    <div class="p-1.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/60 rounded-xl w-full sm:w-auto">
        <!-- الكل -->
        <button
          type="button"
          class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          :class="
            statusFilter === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          "
          @click="$emit('update:statusFilter', 'all')"
        >
          <span>كافة الطلبات المكتملة</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              statusFilter === 'all'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
            "
          >
            {{ totalCount }}
          </span>
        </button>

        <!-- مقيد بالدورة (Enrolled) -->
        <button
          type="button"
          class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          :class="
            statusFilter === 'Enrolled'
              ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-2xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
          "
          @click="$emit('update:statusFilter', 'Enrolled')"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>مقيد بالدورة</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              statusFilter === 'Enrolled'
                ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
            "
          >
            {{ enrolledCount }}
          </span>
        </button>

        <!-- أتم التدريب (CourseEnded) -->
        <button
          type="button"
          class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          :class="
            statusFilter === 'CourseEnded'
              ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 shadow-2xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
          "
          @click="$emit('update:statusFilter', 'CourseEnded')"
        >
          <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
          <span>أتم التدريب</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              statusFilter === 'CourseEnded'
                ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
            "
          >
            {{ endedCount }}
          </span>
        </button>
      </div>

      <!-- محول طريقة العرض وعداد النتائج -->
      <div class="flex items-center gap-3">
        <ViewModeToggle
          :model-value="viewMode"
          @update:model-value="$emit('update:viewMode', $event)"
        />
        <div class="text-xs text-slate-500 dark:text-slate-400 px-2 font-medium hidden md:block">
          الدارسون المعروضون: <strong class="text-slate-800 dark:text-slate-200">{{ filteredCount }}</strong>
        </div>
      </div>
    </div>

    <!-- 2. شريط البحث وقوائم التصفية التفصيلية -->
    <div class="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs flex flex-col md:flex-row gap-3">
      <!-- حقل البحث النصي -->
      <div class="relative flex-1">
        <Search class="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          :value="searchQuery"
          type="text"
          placeholder="ابحث بالاسم، الرقم القومي، كود الطلب، رقم الإيصال، أو الهاتف..."
          class="w-full h-10 pr-10 pl-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          @click="$emit('update:searchQuery', '')"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- فلتر الدورة التدريبية (PrimeVue Select) -->
      <div class="w-full md:w-60">
        <Select
          :model-value="selectedCourse"
          :options="courseOptions"
          option-label="label"
          option-value="value"
          placeholder="تصفية حسب الدورة..."
          :show-clear="true"
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
          @update:model-value="$emit('update:selectedCourse', $event)"
        />
      </div>

      <!-- فلتر فئة المتقدم (PrimeVue Select) -->
      <div class="w-full md:w-52">
        <Select
          :model-value="selectedCategory"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          placeholder="تصفية حسب الفئة..."
          :show-clear="true"
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
          @update:model-value="$emit('update:selectedCategory', $event)"
        />
      </div>

      <!-- زر تفريغ الفلاتر -->
      <button
        v-if="hasActiveFilters"
        type="button"
        class="h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
        title="تفريغ كافة خيارات البحث والفلترة"
        @click="$emit('clear-filters')"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        <span>تفريغ الفلاتر</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Search, X, RotateCcw } from 'lucide-vue-next';
import Select from 'primevue/select';
import ViewModeToggle from '@/shared/ui/Buttons/ViewModeToggle.vue';

const props = defineProps({
  viewMode: {
    type: String,
    default: 'table',
  },
  statusFilter: {
    type: String,
    default: 'all',
  },
  searchQuery: {
    type: String,
    default: '',
  },
  selectedCourse: {
    type: String,
    default: null,
  },
  selectedCategory: {
    type: String,
    default: null,
  },
  courseOptions: {
    type: Array,
    default: () => [],
  },
  categoryOptions: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  enrolledCount: {
    type: Number,
    default: 0,
  },
  endedCount: {
    type: Number,
    default: 0,
  },
  filteredCount: {
    type: Number,
    default: 0,
  },
});

defineEmits([
  'update:viewMode',
  'update:statusFilter',
  'update:searchQuery',
  'update:selectedCourse',
  'update:selectedCategory',
  'clear-filters',
]);

const hasActiveFilters = computed(() => {
  return (
    Boolean(props.searchQuery) ||
    props.selectedCourse !== null ||
    props.selectedCategory !== null ||
    props.statusFilter !== 'all'
  );
});
</script>
