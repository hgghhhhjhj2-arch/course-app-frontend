<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs select-none flex flex-col justify-between">
    <!-- رأس الكارت -->
    <div class="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <AlertCircle class="w-4 h-4" />
        </div>
        <div>
          <h3 class="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base font-heading">
            تنبيهات مهل السداد الحرجة
          </h3>
          <p class="text-[11px] text-slate-400 dark:text-slate-500">
            طلبات قيد المتابعة تتطلب تدخلاً عاجلاً
          </p>
        </div>
      </div>

      <router-link
        to="/affairs/applications/pending-payment"
        class="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>عرض الكل</span>
        <ArrowLeft class="w-3.5 h-3.5" />
      </router-link>
    </div>

    <!-- قائمة التنبيهات المبسطة والمريحة للعين -->
    <div class="space-y-2 pt-1">
      <div
        v-for="alert in alerts.slice(0, 3)"
        :key="alert.id"
        class="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all flex items-center justify-between gap-2"
      >
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 dark:text-slate-100 text-xs truncate max-w-[170px]">
              {{ alert.traineeName }}
            </span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
              :class="
                alert.isOverdue
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60'
              "
            >
              {{ alert.dueText }}
            </span>
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
            {{ alert.courseName }} • {{ alert.phone }}
          </div>
        </div>

        <router-link
          to="/affairs/applications/pending-payment"
          class="h-7 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer shadow-2xs"
        >
          <span>متابعة</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle, ArrowLeft } from 'lucide-vue-next';
import { CRITICAL_PAYMENT_ALERTS } from '../helpers/dashboardMockData';

const alerts = CRITICAL_PAYMENT_ALERTS;
</script>
