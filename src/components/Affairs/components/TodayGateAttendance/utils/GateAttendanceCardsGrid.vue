<template>
  <div v-if="logs.length === 0" class="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400">
      <ShieldAlert class="w-8 h-8" />
    </div>
    <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
      لا توجد حركات مسح مطابقة لمعايير البحث
    </h3>
    <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
      جرّب تغيير تبويب قرار الدخول أو مسح نص البحث لعرض كافة حركات البوابة لليوم
    </p>
    <button
      v-if="isFiltered"
      type="button"
      class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2"
      @click="$emit('clear-filters')"
    >
      <RotateCcw class="w-3.5 h-3.5" />
      <span>إعادة ضبط الفلاتر</span>
    </button>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <div
      v-for="row in logs"
      :key="row.id"
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <!-- شريط الحالة العلوي -->
      <div
        class="absolute top-0 right-0 left-0 h-1"
        :class="row.decision === 'Allowed' ? 'bg-emerald-500' : 'bg-rose-500'"
      ></div>

      <div>
        <!-- رأس الكارت: توقيت المسح + شارة القرار -->
        <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div class="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            <Clock class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 shrink-0" />
            <span>{{ formatTimeOnly(row.scannedAt) }}</span>
            <span class="text-[10px] text-slate-400 font-sans font-normal">({{ formatDateOnly(row.scannedAt) }})</span>
          </div>

          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs"
            :class="
              row.decision === 'Allowed'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800/80'
            "
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="row.decision === 'Allowed' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'"
            ></span>
            <span>{{ row.decision === 'Allowed' ? 'دخول مصرح' : 'دخول مرفوض' }}</span>
          </span>
        </div>

        <!-- بيانات الدارس -->
        <div class="flex items-start gap-3 my-3">
          <div class="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
            <img
              v-if="row.trainee?.profilePhotoPath"
              :src="row.trainee.profilePhotoPath"
              :alt="row.trainee.fullName"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-xs font-bold text-primary-700 dark:text-primary-300">
              {{ getInitials(row.trainee?.fullName) }}
            </span>
          </div>

          <div class="min-w-0 flex-1">
            <button
              type="button"
              class="font-bold text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 text-sm truncate text-right cursor-pointer transition-colors block w-full"
              :title="`عرض تفاصيل وسجل الدارس ${row.trainee?.fullName}`"
              @click="$emit('open-details', row)"
            >
              {{ row.trainee?.fullName }}
            </button>
            <div class="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              {{ row.trainee?.nationalId }}
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              {{ row.trainee?.phone }}
            </div>
          </div>
        </div>

        <!-- تفاصيل الدورة والقاعة -->
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs mb-3">
          <div class="flex items-center justify-between gap-2">
            <span class="text-slate-500 dark:text-slate-400">الدورة التدريبية:</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-left truncate max-w-[170px]" :title="row.courseRound?.courseName">
              {{ row.courseRound?.courseName }}
            </span>
          </div>

          <div class="flex items-center justify-between gap-2">
            <span class="text-slate-500 dark:text-slate-400">القاعة / الدفعة:</span>
            <span class="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
              <Building2 class="w-3 h-3 text-slate-400 shrink-0" />
              <span>{{ row.courseRound?.hallName }}</span>
              <span>•</span>
              <span>الدفعة {{ row.courseRound?.roundNumber }}</span>
            </span>
          </div>

          <div class="flex items-center justify-between gap-2">
            <span class="text-slate-500 dark:text-slate-400">رمز تصريح الـ QR:</span>
            <span class="font-mono text-[11px] font-bold text-primary-700 dark:text-primary-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              {{ row.qrToken }}
            </span>
          </div>
        </div>

        <!-- سبب القرار الأمني -->
        <div class="mb-3">
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1">سبب القرار المسجل:</div>
          <div
            class="p-2 rounded-lg text-xs leading-relaxed"
            :class="
              row.decision === 'Allowed'
                ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                : 'bg-rose-50/70 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/50 font-medium'
            "
          >
            {{ row.reason }}
          </div>
        </div>

        <!-- فرد الأمن والبوابة -->
        <div class="flex items-center justify-between gap-2 text-xs py-2 px-1 border-t border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-1">
            <Shield class="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{{ row.officer?.gateName }}</span>
          </span>
          <span class="font-medium text-slate-700 dark:text-slate-300">
            فرد الأمن: {{ row.officer?.name }}
          </span>
        </div>
      </div>

      <!-- الإجراءات -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
        <button
          type="button"
          class="w-full h-9 rounded-xl bg-slate-100 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-300 border border-slate-200/80 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          @click="$emit('open-details', row)"
        >
          <Eye class="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span>تفاصيل الحركة وسجل المتدرب</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Clock,
  Building2,
  Shield,
  ShieldAlert,
  Eye,
  RotateCcw,
} from 'lucide-vue-next';
import {
  formatTimeOnly,
  formatDateOnly,
} from '../helpers/gateAttendanceConstants';

defineProps({
  logs: {
    type: Array,
    default: () => [],
  },
  isFiltered: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['open-details', 'clear-filters']);

function getInitials(name) {
  if (!name) return 'م';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + ' ' + parts[1][0];
  return name.slice(0, 2);
}
</script>
