<template>
  <div class="space-y-3">
    <!-- 1. شريط تبويبات قرار الدخول (الكل / مصرح به / مرفوض) -->
    <div class="p-1.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/60 rounded-xl w-full sm:w-auto">
        <!-- تبويب الكل -->
        <button
          type="button"
          class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          :class="
            decisionFilter === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          "
          @click="$emit('update:decisionFilter', 'all')"
        >
          <span>كافة الحركات</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              decisionFilter === 'all'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
            "
          >
            {{ totalCount }}
          </span>
        </button>

        <!-- تبويب مصرح بالدخول (Allowed) -->
        <button
          type="button"
          class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          :class="
            decisionFilter === 'Allowed'
              ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-2xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
          "
          @click="$emit('update:decisionFilter', 'Allowed')"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>دخول مصرح به</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              decisionFilter === 'Allowed'
                ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
            "
          >
            {{ allowedCount }}
          </span>
        </button>

        <!-- تبويب دخول مرفوض (Denied) -->
        <button
          type="button"
          class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          :class="
            decisionFilter === 'Denied'
              ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-2xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
          "
          @click="$emit('update:decisionFilter', 'Denied')"
        >
          <span class="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse"></span>
          <span>دخول مرفوض</span>
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              decisionFilter === 'Denied'
                ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
            "
          >
            {{ deniedCount }}
          </span>
        </button>
      </div>

      <div class="text-xs text-slate-500 dark:text-slate-400 px-2 font-medium hidden md:block">
        الحركات المعروضة: <strong class="text-slate-800 dark:text-slate-200">{{ filteredCount }}</strong>
      </div>
    </div>

    <!-- 2. شريط البحث والفلترة -->
    <div class="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs flex flex-col md:flex-row gap-3">
      <!-- حقل البحث النصي -->
      <div class="relative flex-1">
        <Search class="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          :value="searchQuery"
          type="text"
          placeholder="ابحث بالاسم، الرقم القومي، كود الـ QR، اسم فرد الأمن، أو الدورة..."
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

      <!-- فلتر البوابة الأمنية (PrimeVue Select) -->
      <div class="w-full md:w-52">
        <Select
          :model-value="selectedGate"
          :options="gateOptions"
          option-label="label"
          option-value="value"
          placeholder="تصفية حسب البوابة..."
          :show-clear="true"
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
          @update:model-value="$emit('update:selectedGate', $event)"
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

const props = defineProps({
  decisionFilter: {
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
  selectedGate: {
    type: String,
    default: null,
  },
  courseOptions: {
    type: Array,
    default: () => [],
  },
  gateOptions: {
    type: Array,
    default: () => [],
  },
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
  filteredCount: {
    type: Number,
    default: 0,
  },
});

defineEmits([
  'update:decisionFilter',
  'update:searchQuery',
  'update:selectedCourse',
  'update:selectedGate',
  'clear-filters',
]);

const hasActiveFilters = computed(() => {
  return (
    Boolean(props.searchQuery) ||
    props.selectedCourse !== null ||
    props.selectedGate !== null ||
    props.decisionFilter !== 'all'
  );
});
</script>
