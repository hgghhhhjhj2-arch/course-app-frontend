<template>
  <div class="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 select-none">
    <button
      type="button"
      class="h-8 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
      :class="
        isTable
          ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xs font-black'
          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
      "
      title="عرض كجدول بيانات"
      @click="setMode('table')"
    >
      <LayoutList class="w-3.5 h-3.5" />
      <span class="hidden sm:inline">جدول</span>
    </button>

    <button
      type="button"
      class="h-8 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
      :class="
        isGrid
          ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xs font-black'
          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
      "
      title="عرض كبطاقات شبكية"
      @click="setMode('grid')"
    >
      <LayoutGrid class="w-3.5 h-3.5" />
      <span class="hidden sm:inline">كروت</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { LayoutList, LayoutGrid } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: String,
    default: 'table', // 'table' | 'grid' | 'cards'
  },
});

const emit = defineEmits(['update:modelValue']);

const isTable = computed(() => props.modelValue === 'table');
const isGrid = computed(() => props.modelValue === 'grid' || props.modelValue === 'cards');

function setMode(mode) {
  emit('update:modelValue', mode);
}
</script>
