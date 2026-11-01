<template>
  <div
    v-if="isOpen && round"
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fade-in"
    @click.self="handleClose"
  >
    <div
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in"
      role="dialog"
      aria-modal="true"
    >
      <!-- 1. الترويسة -->
      <div class="px-6 py-4.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
            <Info class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              بيانات وجدول دورة الانعقاد الجارية
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              تفاصيل الدفعة التشغيلية والقاعة والمحاضر وفق نموذج CourseRounds
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          @click="handleClose"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- 2. المحتوى -->
      <div class="p-6 space-y-4 max-h-[calc(85vh-130px)] overflow-y-auto text-xs">
        <!-- اسم الدورة ورقم الدفعة -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span
              class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
              :class="
                round.status === 'Available'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              "
            >
              {{ round.status === 'Available' ? 'دورة انعقاد مفتوحة للتسجيل (تبدأ قريباً)' : 'دورة انعقاد جارية حالياً' }}
            </span>
            <span class="text-[11px] text-slate-400 font-mono">
              كود الدفعة: CR-{{ round.courseId }}-{{ round.roundNumber }}
            </span>
          </div>
          <h2 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
            {{ round.courseName }}
          </h2>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 font-medium">
            <span>الدفعة رقم: <strong>{{ round.roundNumber }}</strong></span>
            <span>•</span>
            <span>السعة المقررة: <strong>{{ round.capacity }} دارساً</strong></span>
            <span>•</span>
            <span>المقيدون فعلياً: <strong class="text-emerald-600 dark:text-emerald-400">{{ round.enrolledCount }} دارساً</strong></span>
          </div>
        </div>

        <!-- كروت المحاضر والقاعة -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- كارت المحاضر -->
          <div class="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 space-y-1.5">
            <div class="flex items-center gap-2 text-slate-500 font-bold text-[11px]">
              <GraduationCap class="w-4 h-4 text-emerald-600" />
              <span>المحاضر المعتمد:</span>
            </div>
            <strong class="text-xs font-black text-slate-800 dark:text-slate-100 block">
              {{ round.instructor?.name }}
            </strong>
            <p class="text-[11px] text-slate-400">
              {{ round.instructor?.specialty }}
            </p>
            <p class="text-[11px] text-slate-500 font-mono flex items-center gap-1 pt-1">
              <Phone class="w-3 h-3 text-slate-400" />
              <span>{{ round.instructor?.phone }}</span>
            </p>
          </div>

          <!-- كارت القاعة -->
          <div class="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 space-y-1.5">
            <div class="flex items-center gap-2 text-slate-500 font-bold text-[11px]">
              <MapPin class="w-4 h-4 text-primary-600" />
              <span>مقر ومكان الانعقاد:</span>
            </div>
            <strong class="text-xs font-black text-slate-800 dark:text-slate-100 block">
              {{ round.hall?.name }}
            </strong>
            <div class="flex items-center gap-2 pt-1 text-[11px]">
              <span
                class="px-2 py-0.2 rounded-md font-bold border"
                :class="
                  round.hall?.type === 'Lab'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                "
              >
                {{ round.hall?.type === 'Lab' ? 'معمل تدريب' : 'قاعة محاضرات' }}
              </span>
              <span class="text-slate-400 font-mono">
                السعة القصوى: {{ round.hall?.maxCapacity }} مقعد
              </span>
            </div>
          </div>
        </div>

        <!-- كارت التوقيت والجدول الأسبوعي -->
        <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
            <div class="flex items-center gap-2 font-black text-slate-700 dark:text-slate-200">
              <Clock class="w-4 h-4 text-amber-500" />
              <span>الجدول الزمني ومواعيد المحاضرات</span>
            </div>
            <span class="text-[11px] text-slate-500 font-bold font-mono">
              مدة المحاضرة: {{ lectureDuration }}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="space-y-1">
              <span class="text-slate-400 text-[11px]">فترة الانعقاد:</span>
              <div class="font-mono font-bold text-slate-800 dark:text-slate-200">
                من {{ formatDate(round.startDate) }} إلى {{ formatDate(round.endDate) }}
              </div>
            </div>

            <div class="space-y-1">
              <span class="text-slate-400 text-[11px]">توقيت المحاضرة اليومي:</span>
              <div class="font-mono font-bold text-slate-800 dark:text-slate-200">
                من {{ round.startTime }} إلى {{ round.endTime }}
              </div>
            </div>

            <div class="sm:col-span-2 space-y-1">
              <span class="text-slate-400 text-[11px]">أيام المحاضرات في الأسبوع:</span>
              <div class="font-bold text-slate-800 dark:text-slate-200">
                {{ formatDays(round.lectureDays) }}
              </div>
            </div>
          </div>
        </div>

        <!-- ملخص نسبة الإنجاز أو حالة التسجيل -->
        <div
          v-if="round.status === 'Available'"
          class="p-4 rounded-2xl bg-gradient-to-tr from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/70 dark:border-blue-800/60 space-y-2.5"
        >
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-700 dark:text-slate-200">
              نسبة حجز المقاعد المتاحة بالدفعة:
            </span>
            <strong class="font-mono font-black text-blue-700 dark:text-blue-300">
              {{ Math.round(((round.enrolledCount || 0) / (round.capacity || 25)) * 100) }}% ({{ round.enrolledCount }} من {{ round.capacity }} مقعد)
            </strong>
          </div>

          <!-- شريط الحجز -->
          <div class="w-full h-2.5 rounded-full bg-white dark:bg-slate-800 overflow-hidden border border-blue-200/60 dark:border-blue-800/60">
            <div
              class="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
              :style="{ width: `${Math.min(100, Math.round(((round.enrolledCount || 0) / (round.capacity || 25)) * 100))}%` }"
            ></div>
          </div>

          <div class="flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium pt-1">
            <span>تاريخ الانطلاق: <strong class="text-slate-800 dark:text-slate-200">{{ formatDate(round.startDate) }}</strong></span>
            <span class="font-bold text-amber-700 dark:text-amber-300">
              آخر موعد لتلقي الطلبات: {{ formatDate(round.lastApplicationDate) }}
            </span>
          </div>
        </div>

        <div
          v-else
          class="p-4 rounded-2xl bg-gradient-to-tr from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/30 dark:to-blue-950/30 border border-emerald-200/70 dark:border-emerald-800/60 space-y-2.5"
        >
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-700 dark:text-slate-200">
              مستوى التقدم الدراسي المنقضي:
            </span>
            <strong class="font-mono font-black text-emerald-700 dark:text-emerald-300">
              {{ progressPercent }}%
            </strong>
          </div>

          <!-- شريط التقدم -->
          <div class="w-full h-2.5 rounded-full bg-white dark:bg-slate-800 overflow-hidden border border-emerald-200/60 dark:border-emerald-800/60">
            <div
              class="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>

          <div class="flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium pt-1">
            <span>انقضى {{ round.completedLectures || 8 }} محاضرات من إجمالي {{ round.totalLectures || 16 }} محاضرة</span>
            <span class="font-bold text-emerald-700 dark:text-emerald-300">
              متوسط التزام البوابة: {{ round.attendanceRate }}%
            </span>
          </div>
        </div>
      </div>

      <!-- 3. الأزرار السفلية -->
      <div class="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
        <button
          type="button"
          class="h-9 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          @click="$emit('open-trainees', round)"
        >
          <Users class="w-4 h-4" />
          <span>استعراض كشف الدارسين ({{ round.enrolledCount }})</span>
        </button>

        <button
          type="button"
          class="h-9 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          @click="handleClose"
        >
          إغلاق
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  Info,
  X,
  GraduationCap,
  MapPin,
  Clock,
  Users,
  Phone,
} from 'lucide-vue-next';
import {
  formatLectureDays,
  calculateLectureDuration,
  calculateProgress,
  formatDate,
} from '../helpers/activeCoursesConstants';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'open-trainees']);

const lectureDuration = computed(() => {
  return calculateLectureDuration(props.round?.startTime, props.round?.endTime);
});

const progressPercent = computed(() => {
  return calculateProgress(props.round?.startDate, props.round?.endDate);
});

function formatDays(days) {
  return formatLectureDays(days);
}

function handleClose() {
  emit('close');
}
</script>
