<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
    <div>
      <div class="flex items-center gap-2.5">
        <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading">
          حضور البوابة اليوم
        </h1>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
          {{ totalCount }} حركة مسجلة
        </span>
        <span class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>تحديث لحظي مباشر</span>
        </span>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        شؤون الدارسين • رصد حركات الدخول الأمنية اليومية، تدقيق مسح الـ QR عند البوابات، وسجل الانضباط
      </p>
    </div>

    <div class="flex items-center gap-2 self-start sm:self-auto">
      <!-- تاريخ اليوم -->
      <div class="h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700">
        <Calendar class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
        <span>{{ todayFormatted }}</span>
      </div>

      <!-- زر التحديث -->
      <button
        type="button"
        class="h-9 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs disabled:opacity-50 shrink-0"
        :disabled="isRefreshing"
        @click="$emit('refresh')"
      >
        <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" />
        <span>تحديث</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Calendar, RefreshCw } from 'lucide-vue-next';

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

const todayFormatted = computed(() => {
  return new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});
</script>
