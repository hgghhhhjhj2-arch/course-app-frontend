<template>
  <div
    v-if="isOpen && log"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-in">
      <!-- ترويسة المودال مع بانر القرار الأمني -->
      <div
        class="p-5 border-b flex items-center justify-between shrink-0"
        :class="
          log.decision === 'Allowed'
            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80'
            : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80'
        "
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-2xl flex items-center justify-center border"
            :class="
              log.decision === 'Allowed'
                ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                : 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-700'
            "
          >
            <CheckCircle2 v-if="log.decision === 'Allowed'" class="w-5 h-5" />
            <XCircle v-else class="w-5 h-5" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
                تقرير مسح تصريح البوابة
              </h3>
              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                :class="
                  log.decision === 'Allowed'
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border-rose-300'
                "
              >
                {{ log.decision === 'Allowed' ? 'دخول مصرح به' : 'دخول مرفوض' }}
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              سجل تدقيق حركة الدخول من البوابة • {{ formatTimeOnly(log.scannedAt) }}
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- محتوى التمرير -->
      <div class="p-5 space-y-4 overflow-y-auto custom-scrollbar text-xs">
        <!-- 1. كارت تفاصيل قرار فرد الأمن والسبب -->
        <div
          class="p-4 rounded-2xl border space-y-2"
          :class="
            log.decision === 'Allowed'
              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60'
              : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-800/60'
          "
        >
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400 font-medium">السبب المسجل للقرار:</span>
            <span
              class="font-black text-xs"
              :class="log.decision === 'Allowed' ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'"
            >
              {{ log.reason }}
            </span>
          </div>
          <div class="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
            <span class="text-slate-500 dark:text-slate-400 font-medium">فرد الأمن المسؤول عن المسح:</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">{{ log.officer?.name }} ({{ log.officer?.gateName }})</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400 font-medium">رمز تصريح الـ QR الممسوح:</span>
            <span class="font-mono font-bold text-primary-700 dark:text-primary-400">{{ log.qrToken }}</span>
          </div>
        </div>

        <!-- 2. كارت بيانات الدارس / المتقدم -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <h4 class="font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-700">
            <User class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>بيانات الدارس / صاحب التصريح</span>
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-200">
            <div>
              <span class="text-slate-400 block text-[11px]">الاسم الكامل:</span>
              <strong class="font-bold text-slate-800 dark:text-slate-100 text-sm">{{ log.trainee?.fullName }}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">الرقم القومي:</span>
              <span class="font-mono font-bold">{{ log.trainee?.nationalId }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">رقم الهاتف:</span>
              <span class="font-mono font-bold">{{ log.trainee?.phone }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">الفئة المعتمدة:</span>
              <span
                class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border"
                :class="getCategoryBadge(log.trainee?.category).class"
              >
                {{ getCategoryBadge(log.trainee?.category).label }}
              </span>
            </div>
          </div>
        </div>

        <!-- 3. كارت بيانات الدورة والقاعة التدريبية -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <h4 class="font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-700">
            <GraduationCap class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>الدورة التدريبية ومقر الانعقاد</span>
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-200">
            <div>
              <span class="text-slate-400 block text-[11px]">اسم الدورة:</span>
              <strong class="font-bold">{{ log.courseRound?.courseName }}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">مكان الانعقاد:</span>
              <span class="flex items-center gap-1 font-bold">
                <Building2 class="w-3.5 h-3.5 text-primary-600 shrink-0" />
                <span>{{ log.courseRound?.hallName }}</span>
              </span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">المحاضر المسؤول:</span>
              <span>{{ log.courseRound?.instructorName }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">توقيت المحاضرة:</span>
              <span class="font-mono">{{ log.courseRound?.timeRange }}</span>
            </div>
          </div>
        </div>

        <!-- 4. الموقف الأكاديمي والمالي وسجل الحضور -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <h4 class="font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-700">
            <ShieldCheck class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>الموقف الأكاديمي وسجل الحضور الكلي</span>
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700 dark:text-slate-200">
            <div>
              <span class="text-slate-400 block text-[11px]">حالة القيد:</span>
              <span class="font-bold">{{ log.academicStanding?.statusText }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">إيصال السداد:</span>
              <span class="font-mono font-bold">{{ log.academicStanding?.receiptNumber || 'غير مسدد' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">نسبة الحضور حتى الآن:</span>
              <span class="font-black text-emerald-700 dark:text-emerald-400 text-xs">
                {{ log.academicStanding?.attendanceRate }}% ({{ log.academicStanding?.attendedLectures }} من {{ log.academicStanding?.totalLectures }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- أسفل المودال -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-center justify-end shrink-0">
        <button
          type="button"
          class="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          إغلاق النافذة
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircle2,
  XCircle,
  X,
  User,
  GraduationCap,
  Building2,
  ShieldCheck,
} from 'lucide-vue-next';
import {
  APPLICANT_CATEGORIES,
  formatTimeOnly,
} from '../helpers/gateAttendanceConstants';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  log: {
    type: Object,
    default: null,
  },
});

defineEmits(['close']);

function getCategoryBadge(cat) {
  return (
    APPLICANT_CATEGORIES[cat] || {
      label: cat || 'مدني',
      class: 'bg-slate-100 text-slate-700 border-slate-200',
    }
  );
}
</script>
