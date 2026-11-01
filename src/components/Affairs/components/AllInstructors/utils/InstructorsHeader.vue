<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
    <div class="space-y-1">
      <div class="flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-2xs">
          <GraduationCap class="w-5 h-5" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading">
              دليل وسجلات المحاضرين المعتمدين
            </h1>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-mono">
              {{ totalCount }} محاضراً
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            شؤون الدارسين • إدارة وتوثيق بيانات هيئة التدريس وسجل الدورات التدريبية المعتمدة وفق جدول Instructors
          </p>
        </div>
      </div>
    </div>

    <!-- الإجراءات السريعة بالأعلى -->
    <div class="flex items-center gap-2 self-start sm:self-auto">
      <!-- زر تحديث البيانات -->
      <button
        type="button"
        class="h-9 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        :disabled="isRefreshing"
        @click="$emit('refresh')"
      >
        <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" />
        <span class="hidden sm:inline">تحديث</span>
      </button>

      <!-- زر طباعة دليل المحاضرين -->
      <button
        type="button"
        class="h-9 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        @click="$emit('print-directory')"
      >
        <Printer class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
        <span class="hidden sm:inline">طباعة الدليل</span>
      </button>

      <!-- زر إضافة محاضر جديد -->
      <button
        type="button"
        class="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-emerald-500/20"
        @click="$emit('open-create')"
      >
        <UserPlus class="w-4 h-4" />
        <span>إضافة محاضر جديد</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { GraduationCap, RefreshCw, Printer, UserPlus } from 'lucide-vue-next';

defineProps({
  totalCount: {
    type: Number,
    default: 0,
  },
  activeCount: {
    type: Number,
    default: 0,
  },
  isRefreshing: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['refresh', 'print-directory', 'open-create']);
</script>
