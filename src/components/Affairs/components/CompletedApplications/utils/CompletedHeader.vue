<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
    <div>
      <div class="flex items-center gap-2.5">
        <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading">
          طلبات مكتملة ومقيدة
        </h1>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
          {{ totalCount }} دارس مسجل
        </span>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        شؤون الدارسين • أرشيف الدارسين المقبولين نهائياً، متابعة إيصالات السداد، وتصاريح دخول البوابة
      </p>
    </div>

    <!-- زر التحديث السريع -->
    <button
      type="button"
      class="h-9 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto disabled:opacity-50"
      :disabled="isRefreshing"
      @click="$emit('refresh')"
    >
      <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" />
      <span>تحديث السجل</span>
    </button>
  </div>
</template>

<script setup>
import { RefreshCw } from 'lucide-vue-next';

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
