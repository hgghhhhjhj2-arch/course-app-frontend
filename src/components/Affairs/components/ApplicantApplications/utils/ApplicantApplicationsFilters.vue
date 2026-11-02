<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <!-- حقل البحث -->
      <div class="relative sm:col-span-2">
        <input
          :value="searchQuery"
          type="text"
          placeholder="بحث بالاسم، الرقم القومي (14 رقم)، الهاتف، أو كود الطلب..."
          class="w-full h-10 pr-9 pl-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all font-medium"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
        <Search class="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full cursor-pointer"
          @click="$emit('update:searchQuery', '')"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- فلتر فئة المتدرب (PrimeVue Select) -->
      <div>
        <Select
          :model-value="selectedCategory"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          placeholder="جميع الفئات (مدني / ضباط / شرطة)"
          show-clear
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
          @update:model-value="$emit('update:selectedCategory', $event)"
        />
      </div>

      <!-- فلتر الدورة التدريبية (PrimeVue Select) -->
      <div>
        <Select
          :model-value="selectedCourse"
          :options="courseOptions"
          option-label="label"
          option-value="value"
          placeholder="جميع الدورات المطروحة"
          show-clear
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
          @update:model-value="$emit('update:selectedCourse', $event)"
        />
      </div>
    </div>

    <!-- شريط إحصائي ومحول طريقة العرض -->
    <div class="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px]">
      <div class="flex items-center gap-3">
        <ViewModeToggle
          :model-value="viewMode"
          @update:model-value="$emit('update:viewMode', $event)"
        />

        <div v-if="searchQuery || selectedCategory || selectedCourse" class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Filter class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
          <span>تم العثور على <strong>{{ filteredCount }}</strong> طلب</span>
          <button
            type="button"
            class="text-primary-700 dark:text-primary-400 hover:underline font-bold cursor-pointer mr-1.5"
            @click="$emit('clear-filters')"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      </div>

      <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
        إجمالي النتائج: <strong class="text-slate-800 dark:text-slate-100 font-mono">{{ filteredCount }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import Select from 'primevue/select';
import { Search, X, Filter } from 'lucide-vue-next';
import ViewModeToggle from '@/shared/ui/Buttons/ViewModeToggle.vue';

defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  selectedCategory: {
    type: [String, null],
    default: null,
  },
  selectedCourse: {
    type: [String, null],
    default: null,
  },
  categoryOptions: {
    type: Array,
    default: () => [],
  },
  courseOptions: {
    type: Array,
    default: () => [],
  },
  filteredCount: {
    type: Number,
    default: 0,
  },
  viewMode: {
    type: String,
    default: 'table',
  },
});

defineEmits([
  'update:searchQuery',
  'update:selectedCategory',
  'update:selectedCourse',
  'update:viewMode',
  'clear-filters',
]);
</script>
