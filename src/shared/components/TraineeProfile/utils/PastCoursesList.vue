<template>
  <div class="space-y-4 select-none">
    <div v-if="courses.length === 0" class="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <GraduationCap class="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
      <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300">
        لا توجد دورات تدريبية سابقة
      </h3>
      <p class="text-xs text-slate-400 mt-1">
        لم يسجل للدارس أي دورات مكتملة أو سابقة حتى الآن
      </p>
    </div>

    <div
      v-for="course in courses"
      :key="course.id"
      class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
    >
      <!-- السطر العلوي: اسم الدورة + كود الدفعة + شارة الاكتمال والتقدير -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              {{ course.courseName }}
            </h3>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              الدفعة {{ course.roundNumber }}
            </span>
          </div>
          <div class="text-xs text-slate-400 font-mono">
            كود الطلب السابق: {{ course.code }}
          </div>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <!-- شارة التقدير -->
          <span
            class="px-2.5 py-1 rounded-full text-xs font-black border shadow-2xs"
            :class="getGradeBadge(course.grade).class"
          >
            تقدير {{ course.grade }} ({{ course.gradeScore }})
          </span>

          <!-- شارة الحالة -->
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
            <CheckCircle2 class="w-3.5 h-3.5 text-blue-600" />
            <span>مكتملة ومجتازة</span>
          </span>
        </div>
      </div>

      <!-- تفاصيل الانعقاد والساعات والمحاضر -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <!-- 1. القاعة والمقر -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <Building2 class="w-3.5 h-3.5 text-primary-600" />
            <span>مكان الانعقاد</span>
          </div>
          <strong class="text-slate-800 dark:text-slate-200 font-bold block truncate">
            {{ course.hallName }}
          </strong>
        </div>

        <!-- 2. المحاضر -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <UserCheck class="w-3.5 h-3.5 text-primary-600" />
            <span>المحاضر المسؤول</span>
          </div>
          <strong class="text-slate-800 dark:text-slate-200 font-bold block truncate">
            {{ course.instructorName }}
          </strong>
        </div>

        <!-- 3. تاريخ وفترة الانعقاد -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <Calendar class="w-3.5 h-3.5 text-primary-600" />
            <span>تاريخ وفترة التدريب</span>
          </div>
          <div class="text-slate-800 dark:text-slate-200 font-mono font-bold text-[11px]">
            {{ course.startDate }} إلى {{ course.endDate }}
          </div>
          <div class="text-[10px] text-slate-400 mt-0.5">
            {{ course.totalHours }} ساعة معتمدة
          </div>
        </div>

        <!-- 4. الشهادة المعتمدة -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div class="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
            <Award class="w-3.5 h-3.5 text-primary-600" />
            <span>الشهادة المعتمدة</span>
          </div>
          <div class="text-primary-700 dark:text-primary-400 font-mono font-bold text-xs truncate">
            {{ course.certificateNumber }}
          </div>
          <div class="text-[10px] text-slate-400 mt-0.5">
            صدرت في {{ course.issuedAt }}
          </div>
        </div>
      </div>

      <!-- أسفل الكارت: الحضور النهائي وزر استعراض الشهادة -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="flex items-center gap-4 text-xs">
          <div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <ShieldCheck class="w-4 h-4 text-emerald-600" />
            <span>نسبة الحضور النهائية:</span>
            <strong class="font-black font-mono text-emerald-600 dark:text-emerald-400">
              {{ course.attendanceRate }}% ({{ course.attendedLectures }} من {{ course.totalLectures }})
            </strong>
          </div>
          <div class="text-slate-400 font-mono text-[11px] hidden md:block">
            إيصال السداد: {{ course.receiptNumber }}
          </div>
        </div>

        <button
          type="button"
          class="h-9 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow-sm"
          @click="$emit('open-certificate', course)"
        >
          <Award class="w-4 h-4" />
          <span>استعراض الشهادة المعتمدة</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  GraduationCap,
  Building2,
  UserCheck,
  Calendar,
  Award,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-vue-next';
import { GRADE_BADGES } from '../helpers/traineeProfileConstants';

defineProps({
  courses: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['open-certificate']);

function getGradeBadge(grade) {
  return (
    GRADE_BADGES[grade] || {
      class: 'bg-slate-100 text-slate-800 border-slate-200',
    }
  );
}
</script>
