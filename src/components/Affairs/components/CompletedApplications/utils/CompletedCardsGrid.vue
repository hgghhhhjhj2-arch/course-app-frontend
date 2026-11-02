<template>
  <div class="space-y-4">
    <div
      v-if="applications.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="app in applications"
        :key="app.id"
        class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group space-y-4"
      >
        <!-- Top Info -->
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2.5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  v-if="app.trainee?.profilePhotoPath"
                  :src="app.trainee.profilePhotoPath"
                  alt="صورة المتدرب"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ getInitials(app.trainee?.fullName) }}</span>
              </div>
              <div class="space-y-0.5">
                <h3 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading leading-tight line-clamp-1" :title="app.trainee?.fullName">
                  {{ app.trainee?.fullName }}
                </h3>
                <span class="text-[11px] text-slate-400 font-mono block">
                  {{ app.code }}
                </span>
              </div>
            </div>

            <!-- Status Badge -->
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0"
              :class="
                app.status === 'Enrolled'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
              "
            >
              {{ app.status === 'Enrolled' ? 'مقيد بالدورة' : 'أتم التدريب' }}
            </span>
          </div>

          <!-- Course & Hall -->
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400 font-medium">الدورة:</span>
              <strong class="text-slate-800 dark:text-slate-100 font-bold truncate max-w-[180px]">
                {{ app.courseRound?.courseName }}
              </strong>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-slate-400">الدفعة والقاعة:</span>
              <span class="font-bold text-primary-700 dark:text-primary-300">
                دفعة {{ app.courseRound?.roundNumber || 1 }} • {{ app.courseRound?.hallName || 'معمل رئيسي' }}
              </span>
            </div>
          </div>

          <!-- Receipt & QR Pass Box -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block">رقم الإيصال:</span>
              <strong class="font-mono text-emerald-700 dark:text-emerald-300 text-xs">
                {{ app.receiptNumber || 'REC-88421' }}
              </strong>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block">المبلغ المسدد:</span>
              <strong class="font-mono text-slate-800 dark:text-slate-100 text-xs">
                {{ formatCurrency(app.paidAmount || app.courseRound?.price) }}
              </strong>
            </div>
          </div>

          <!-- Attendance Rate Bar -->
          <div class="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400 text-[11px] flex items-center gap-1">
                <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
                <span>نسبة الحضور:</span>
              </span>
              <span class="font-bold font-mono text-xs" :class="getAttendanceColor(app.attendanceRate)">
                {{ app.attendanceRate || 90 }}% ({{ app.attendedLecturesCount || 10 }}/{{ app.totalScheduledLectures || 12 }})
              </span>
            </div>
            <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="getAttendanceBarColor(app.attendanceRate)"
                :style="{ width: `${app.attendanceRate || 90}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5">
          <button
            type="button"
            class="flex-1 py-2 px-2.5 rounded-xl bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/60 dark:hover:bg-primary-900/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
            title="عرض ملف وسجل المتدرب الكامل"
            @click="$emit('openTrainee', app)"
          >
            <UserCheck class="w-3.5 h-3.5" />
            <span>ملف الدارس</span>
          </button>

          <button
            type="button"
            class="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="طباعة إيصال السداد المعتمد"
            @click="$emit('printReceipt', app)"
          >
            <Printer class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">إيصال</span>
          </button>

          <button
            type="button"
            class="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="عرض تصريح البوابة الإلكتروني"
            @click="$emit('viewPass', app)"
          >
            <QrCode class="w-3.5 h-3.5 text-primary-600" />
            <span class="hidden sm:inline">تصريح</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-2 text-slate-400"
    >
      <Inbox class="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
      <p class="text-xs font-bold">لا توجد طلبات مكتملة تطابق الفلترة الحالية</p>
    </div>
  </div>
</template>

<script setup>
import { UserCheck, Printer, QrCode, CheckCircle2, Inbox } from 'lucide-vue-next';
import { formatEgyptianCurrency } from '../helpers/completedConstants';

defineProps({
  applications: {
    type: Array,
    required: true,
  },
});

defineEmits(['openTrainee', 'printReceipt', 'viewPass']);

function getInitials(name) {
  if (!name) return 'م';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + ' ' + parts[1][0];
  return name.slice(0, 2);
}

function formatCurrency(val) {
  return formatEgyptianCurrency ? formatEgyptianCurrency(val) : `${val} ج.م`;
}

function getAttendanceColor(rate) {
  const r = rate || 90;
  if (r >= 85) return 'text-emerald-600 dark:text-emerald-400';
  if (r >= 75) return 'text-amber-600 dark:text-amber-400';
  return 'text-rose-600 dark:text-rose-400';
}

function getAttendanceBarColor(rate) {
  const r = rate || 90;
  if (r >= 85) return 'bg-emerald-500';
  if (r >= 75) return 'bg-amber-500';
  return 'bg-rose-500';
}
</script>
