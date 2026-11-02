<template>
  <div v-if="rounds.length === 0" class="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400">
      <Archive class="w-8 h-8" />
    </div>
    <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
      لا توجد دورات سابقة مطابقة لمعايير البحث
    </h3>
    <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
      جرّب تعديل خيارات التصفية أو مسح نص البحث لعرض الأرشيف
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
      v-for="row in rounds"
      :key="row.id"
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <!-- شريط علوي -->
      <div class="absolute top-0 right-0 left-0 h-1 bg-slate-400 dark:bg-slate-600"></div>

      <div>
        <!-- رأس الكارت: اسم الدورة + الدفعة + كود الدفعة -->
        <div class="pb-3 border-b border-slate-100 dark:border-slate-800/80 space-y-1.5">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0 flex-1">
              <strong class="font-black text-slate-800 dark:text-slate-100 text-sm block truncate" :title="row.courseName">
                {{ row.courseName }}
              </strong>
              <div class="flex items-center gap-2 mt-1">
                <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold">
                  دفعة {{ row.roundNumber }}
                </span>
                <span class="text-[10px] text-slate-400 font-mono">
                  {{ row.roundCode }}
                </span>
              </div>
            </div>

            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
              منتهية ومؤرشفة
            </span>
          </div>
        </div>

        <!-- معلومات المحاضر والقاعة -->
        <div class="p-3 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <!-- المحاضر -->
          <div class="flex items-center justify-between gap-2">
            <span class="text-slate-500 dark:text-slate-400">المحاضر:</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 truncate max-w-[170px]">
              <GraduationCap class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{{ row.instructor?.name }}</span>
            </span>
          </div>

          <!-- القاعة التدريبية -->
          <div class="flex items-center justify-between gap-2">
            <span class="text-slate-500 dark:text-slate-400">المكان:</span>
            <span class="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 shrink-0" />
              <span>{{ row.hall?.name }}</span>
              <span
                class="px-1.5 py-0.2 rounded text-[10px] font-bold border"
                :class="
                  row.hall?.type === 'Lab'
                    ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                    : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                "
              >
                {{ row.hall?.type === 'Lab' ? 'معمل' : 'قاعة' }}
              </span>
            </span>
          </div>
        </div>

        <!-- فترة الانعقاد والمحاضرات المنفذة -->
        <div class="p-2.5 mb-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-1.5 text-xs">
          <div class="flex items-center justify-between font-mono text-[11px] text-slate-700 dark:text-slate-300 font-bold">
            <span>{{ formatDate(row.startDate) }}</span>
            <span class="text-slate-400 font-sans">إلى</span>
            <span>{{ formatDate(row.endDate) }}</span>
          </div>
          <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 pt-0.5">
            <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>تم إنجاز {{ row.totalLectures }} محاضرة كاملة بنجاح</span>
          </div>
        </div>

        <!-- الخريجون والإيرادات وحضور البوابة -->
        <div class="space-y-2 text-xs px-1 mb-2">
          <!-- الخريجون -->
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Users class="w-3.5 h-3.5 text-primary-600" />
              <span>الخريجون المعتمدون:</span>
            </span>
            <span class="font-mono font-bold text-slate-800 dark:text-slate-200">
              {{ row.graduatedCount }} خريج
            </span>
          </div>

          <!-- الإيرادات المحصلة -->
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400">الإيراد المحصل:</span>
            <strong class="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              {{ formatEgyptianCurrency(row.totalRevenue) }}
            </strong>
          </div>

          <!-- حضور البوابة -->
          <div class="flex items-center justify-between">
            <span class="text-slate-500 dark:text-slate-400">متوسط حضور البوابة:</span>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {{ row.averageAttendance }}%
            </span>
          </div>
        </div>
      </div>

      <!-- الإجراءات -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
        <button
          type="button"
          class="w-full h-9 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-sm"
          title="معاينة تفاصيل الدفعة، الطلاب الخريجين، والإيرادات والتكاليف"
          @click="$emit('open-details', row)"
        >
          <FolderCheck class="w-4 h-4" />
          <span>تفاصيل الدفعة والدارسين</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  GraduationCap,
  MapPin,
  CheckCircle2,
  Users,
  FolderCheck,
  Archive,
  RotateCcw,
} from 'lucide-vue-next';
import {
  formatDate,
  formatEgyptianCurrency,
} from '../helpers/archivedCoursesConstants';

defineProps({
  rounds: {
    type: Array,
    default: () => [],
  },
  isFiltered: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['open-details', 'clear-filters']);
</script>
