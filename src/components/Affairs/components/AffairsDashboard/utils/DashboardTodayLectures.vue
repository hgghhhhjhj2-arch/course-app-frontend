<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs select-none flex flex-col justify-between">
    <!-- رأس الكارت -->
    <div class="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <GraduationCap class="w-4 h-4" />
          </div>
          <h3 class="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base font-heading">
            جدول محاضرات اليوم
          </h3>
        </div>
        <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
          متابعة مباشرة للدورات الجارية بالقاعات والمعامل ومواعيد انعقادها
        </p>
      </div>

      <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
        {{ lectures.length }} جلسات مجدولة
      </span>
    </div>

    <!-- قائمة المحاضرات المجدولة لليوم -->
    <div class="space-y-2.5 py-1">
      <div
        v-for="lecture in lectures"
        :key="lecture.id"
        class="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
      >
        <!-- تفاصيل الدورة والقاعة والمحاضر -->
        <div class="space-y-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px]" :title="lecture.courseName">
              {{ lecture.courseName }}
            </span>
            <span class="px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-700/80 text-[10px] font-bold text-slate-700 dark:text-slate-300">
              الدفعة {{ lecture.roundNumber }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
            <!-- القاعة -->
            <span class="flex items-center gap-1">
              <Building2 class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 shrink-0" />
              <strong class="text-slate-600 dark:text-slate-300 font-medium">{{ lecture.hallName }}</strong>
            </span>
            <span>•</span>
            <!-- المحاضر -->
            <span class="flex items-center gap-1">
              <User class="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{{ lecture.instructorName }}</span>
            </span>
            <span>•</span>
            <!-- عدد الدارسين -->
            <span class="flex items-center gap-1">
              <Users class="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{{ lecture.enrolledCount }} دارس</span>
            </span>
          </div>
        </div>

        <!-- التوقيت وحالة الجلسة -->
        <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700/60">
          <!-- شارة الحالة الحية (جارية الآن / تبدأ قريباً) -->
          <span
            class="px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 border"
            :class="
              lecture.status === 'live'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80'
                : 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/80'
            "
          >
            <span
              v-if="lecture.status === 'live'"
              class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
            ></span>
            <span>{{ lecture.statusText }}</span>
          </span>

          <!-- التوقيت الدقيق -->
          <span class="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <Clock class="w-3 h-3 text-slate-400" />
            <span>{{ lecture.timeText }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GraduationCap, Building2, User, Users, Clock } from 'lucide-vue-next';
import { TODAY_SCHEDULED_LECTURES } from '../helpers/dashboardMockData';

const lectures = TODAY_SCHEDULED_LECTURES;
</script>
