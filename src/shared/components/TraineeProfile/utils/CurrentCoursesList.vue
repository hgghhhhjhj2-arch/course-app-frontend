<template>
  <div class="space-y-4 select-none">
    <div v-if="courses.length === 0" class="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <Clock class="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
      <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300">
        لا توجد دورات قيد الانعقاد حالياً
      </h3>
      <p class="text-xs text-slate-400 mt-1">
        الدارس ليس مقيداً بأي دورة جارية في الوقت الحالي
      </p>
    </div>

    <div
      v-for="course in courses"
      :key="course.id"
      class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
    >
      <!-- السطر العلوي: اسم الدورة + كود الطلب + شارة الحالة -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              {{ course.courseName }}
            </h3>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/80">
              الدفعة {{ course.roundNumber }}
            </span>
          </div>
          <div class="text-xs text-slate-400 font-mono">
            كود الطلب: {{ course.code }}
          </div>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>قيد الانعقاد (جارية)</span>
          </span>
        </div>
      </div>

      <!-- تفاصيل الدورة التدريبية والقاعة والمحاضر -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <!-- 1. القاعة والمقر -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <Building2 class="w-3.5 h-3.5 text-primary-600" />
            <span>مكان ومقر الانعقاد</span>
          </div>
          <strong class="text-slate-800 dark:text-slate-200 font-bold block truncate">
            {{ course.hallName }}
          </strong>
        </div>

        <!-- 2. المحاضر المسؤول -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <UserCheck class="w-3.5 h-3.5 text-primary-600" />
            <span>المحاضر المسؤول</span>
          </div>
          <strong class="text-slate-800 dark:text-slate-200 font-bold block truncate">
            {{ course.instructorName }}
          </strong>
        </div>

        <!-- 3. المواعيد والأيام -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <Calendar class="w-3.5 h-3.5 text-primary-600" />
            <span>أيام وتوقيت المحاضرات</span>
          </div>
          <div class="text-slate-800 dark:text-slate-200 font-bold truncate">
            {{ course.lectureDays.join('، ') }}
          </div>
          <div class="text-[10px] text-slate-400 font-mono mt-0.5">
            {{ course.timeRange }}
          </div>
        </div>

        <!-- 4. مدة الانعقاد -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <Clock class="w-3.5 h-3.5 text-primary-600" />
            <span>فترة الانعقاد الإجمالية</span>
          </div>
          <div class="text-slate-800 dark:text-slate-200 font-mono font-bold text-[11px]">
            {{ course.startDate }} إلى {{ course.endDate }}
          </div>
          <div class="text-[10px] text-slate-400 mt-0.5">
            {{ course.totalHours }} ساعة تدريبية
          </div>
        </div>
      </div>

      <!-- الحضور الأكاديمي وسداد الرسوم والـ QR -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <!-- شريط الحضور -->
        <div class="flex-1 max-w-md space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
              <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
              <span>حضور البوابة المعتمد:</span>
            </span>
            <span class="font-black font-mono text-emerald-600 dark:text-emerald-400">
              {{ course.attendanceRate }}% ({{ course.attendedLectures }} من {{ course.totalLectures }} محاضرة)
            </span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="course.attendanceRate >= 75 ? 'bg-emerald-500' : 'bg-amber-500'"
              :style="{ width: `${course.attendanceRate}%` }"
            ></div>
          </div>
        </div>

        <!-- موقف السداد وزر تصريح الدخول -->
        <div class="flex items-center gap-3">
          <div class="text-right">
            <div class="text-[11px] text-slate-400">
              رقم الإيصال: <span class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ course.receiptNumber }}</span>
            </div>
            <div class="text-xs font-black text-emerald-700 dark:text-emerald-400 font-mono">
              {{ formatEgyptianCurrency(course.paidAmount) }}
            </div>
          </div>

          <button
            type="button"
            class="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            @click="$emit('open-qr', course)"
          >
            <QrCode class="w-4 h-4 text-primary-400" />
            <span>تصريح البوابة</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Clock,
  Building2,
  UserCheck,
  Calendar,
  ShieldCheck,
  QrCode,
} from 'lucide-vue-next';
import { formatEgyptianCurrency } from '../helpers/traineeProfileConstants';

defineProps({
  courses: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['open-qr']);
</script>
