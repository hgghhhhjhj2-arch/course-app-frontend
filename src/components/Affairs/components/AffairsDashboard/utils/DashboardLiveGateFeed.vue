<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs select-none flex flex-col justify-between">
    <!-- رأس الكارت -->
    <div class="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <DoorOpen class="w-4 h-4" />
        </div>
        <div>
          <h3 class="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base font-heading">
            حركات الحضور المباشرة للبوابة
          </h3>
          <p class="text-[11px] text-slate-400 dark:text-slate-500">
            تحديث لحظي لعمليات مسح تصاريح الـ QR
          </p>
        </div>
      </div>

      <router-link
        to="/affairs/gate-attendance/today"
        class="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>سجل البوابة</span>
        <ArrowLeft class="w-3.5 h-3.5" />
      </router-link>
    </div>

    <!-- قائمة الحركات اللحظية المبسطة -->
    <div class="space-y-2 pt-1">
      <div
        v-for="log in logs.slice(0, 3)"
        :key="log.id"
        class="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all flex items-center justify-between gap-3 text-xs"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            :class="
              log.decision === 'Allowed'
                ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400'
            "
          >
            <CheckCircle2 v-if="log.decision === 'Allowed'" class="w-4 h-4" />
            <XCircle v-else class="w-4 h-4" />
          </div>

          <div class="min-w-0">
            <div class="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px]">
              {{ log.traineeName }}
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
              {{ log.courseName }}
            </div>
          </div>
        </div>

        <div class="flex flex-col items-end shrink-0">
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="
              log.decision === 'Allowed'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
            "
          >
            {{ log.decisionText }}
          </span>
          <span class="text-[10px] text-slate-400 font-mono mt-1">{{ log.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DoorOpen, ArrowLeft, CheckCircle2, XCircle } from 'lucide-vue-next';
import { LIVE_GATE_LOGS } from '../helpers/dashboardMockData';

const logs = LIVE_GATE_LOGS;
</script>
