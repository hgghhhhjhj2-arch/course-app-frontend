<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/90 dark:border-slate-800">
    <div>
      <div class="flex items-center gap-2">
        <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading">
          طلبات المتقدمين
        </h1>
        <span class="px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/70 border border-primary-200 dark:border-primary-800/80 text-[11px] font-bold text-primary-700 dark:text-primary-300">
          {{ totalCount }} طلب قيد المراجعة
        </span>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        شؤون الدارسين • فحص ومراجعة طلبات الالتحاق بالدورات التدريبية والتحقق من المستندات وفئات الخصم
      </p>
    </div>

    <!-- أزرار الإجراءات السريعة -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="h-9 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        title="تحديث القائمة"
        @click="$emit('refresh')"
      >
        <RotateCcw class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" />
        <span>تحديث</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { RotateCcw } from 'lucide-vue-next';

defineProps({
  totalCount: {
    type: Number,
    default: 0,
  },
  isRefreshing: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['refresh']);
</script>
