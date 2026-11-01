<template>
  <div class="space-y-4 select-none pb-8 animate-fade-in">
    <!-- 1. شريط التنقل العلوي وزر العودة -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <!-- زر العودة لقائمة المحاضرين -->
        <button
          type="button"
          class="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          @click="$emit('back')"
        >
          <ArrowRight class="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span>العودة لقائمة المحاضرين</span>
        </button>

        <div class="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        <div>
          <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading flex items-center gap-2">
            <span>ملف وسجل المحاضر:</span>
            <span class="text-primary-600 dark:text-primary-400">{{ instructor.name }}</span>
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            عرض بيانات التواصل وتفاصيل الدورات التدريبية السابقة والجارية المسندة إليه
          </p>
        </div>
      </div>

      <!-- أزرار الإجراءات السريعة بالأعلى -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="h-9 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          @click="handlePrint"
        >
          <Printer class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
          <span>طباعة السجل</span>
        </button>

        <button
          type="button"
          class="h-9 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          @click="$emit('open-edit', instructor)"
        >
          <Pencil class="w-3.5 h-3.5" />
          <span>تعديل البيانات</span>
        </button>
      </div>
    </div>

    <!-- 2. كارت الملف الشخصي وبيانات التواصل -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm dark:shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-black text-base shrink-0 shadow-2xs">
            {{ getInstructorInitials(instructor.name) }}
          </div>

          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-base font-black text-slate-800 dark:text-slate-100 font-heading">
                {{ instructor.name }}
              </h2>
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs"
                :class="
                  instructor.isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200'
                "
              >
                {{ instructor.isActive ? 'عضو هيئة تدريس معتمد' : 'معطل مؤقتاً' }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span class="px-2.5 py-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                {{ instructor.specialty }}
              </span>
              <span>•</span>
              <span class="font-mono text-slate-400">
                كود: INS-{{ String(instructor.id).padStart(3, '0') }}
              </span>
            </div>
          </div>
        </div>

        <!-- بيانات التواصل السريعة -->
        <div class="flex flex-wrap items-center gap-4 text-xs">
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2.5">
            <Phone class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <div>
              <span class="text-[10px] text-slate-400 block font-bold">رقم الهاتف:</span>
              <strong class="font-mono text-slate-800 dark:text-slate-100 text-xs dir-ltr block">
                {{ instructor.phone }}
              </strong>
            </div>
          </div>

          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2.5">
            <Mail class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <div>
              <span class="text-[10px] text-slate-400 block font-bold">البريد الإلكتروني:</span>
              <span class="font-mono text-slate-800 dark:text-slate-100 text-xs block font-bold">
                {{ instructor.email || '—' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. مؤشرات الأداء والدفعات للمحاضر (KPIs) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span class="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <Layers class="w-3.5 h-3.5 text-primary-600" />
            <span>إجمالي الدفعات المسندة:</span>
          </span>
          <div class="text-base font-black text-slate-800 dark:text-slate-100 font-mono">
            {{ instructor.roundsTaught?.length || 0 }} دفعة
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span class="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <PlayCircle class="w-3.5 h-3.5 text-emerald-600" />
            <span>الدفعات الجارية حالياً:</span>
          </span>
          <div class="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {{ ongoingRoundsCount }} دفعة
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span class="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <History class="w-3.5 h-3.5 text-amber-600" />
            <span>الدورات المنعقدة سابقاً:</span>
          </span>
          <div class="text-base font-black text-slate-700 dark:text-slate-200 font-mono">
            {{ pastRoundsCount }} دورة منتهية
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span class="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <GraduationCap class="w-3.5 h-3.5 text-blue-600" />
            <span>إجمالي الخريجين:</span>
          </span>
          <div class="text-base font-black text-primary-600 dark:text-primary-400 font-mono">
            {{ totalGraduates }} دارساً
          </div>
        </div>
      </div>
    </div>

    <!-- 4. حاوية جدول سجل الدورات السابقة والجارية (الدفعات التدريبية) -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm dark:shadow-xl overflow-hidden">
      <!-- شريط العنوان والفلترة الداخلية لسجل الدورات -->
      <div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/50">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-950/70 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-400">
            <BookOpen class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading">
              سجل الدورات السابقة والجارية المسندة للمحاضر
            </h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              كشف تفصيلي بجميع الدفعات والقاعات وفترات الانعقاد وأعداد المتدربين
            </p>
          </div>
        </div>

        <!-- أزرار التصفية الفرعية السريعة -->
        <div class="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            class="h-8 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            :class="
              roundFilter === 'all'
                ? 'bg-primary-600 text-white font-black shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            "
            @click="roundFilter = 'all'"
          >
            الكل ({{ (instructor.roundsTaught || []).length }})
          </button>

          <button
            type="button"
            class="h-8 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            :class="
              roundFilter === 'past'
                ? 'bg-primary-600 text-white font-black shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            "
            @click="roundFilter = 'past'"
          >
            السابقة المنتهية ({{ pastRoundsCount }})
          </button>

          <button
            type="button"
            class="h-8 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            :class="
              roundFilter === 'ongoing'
                ? 'bg-primary-600 text-white font-black shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            "
            @click="roundFilter = 'ongoing'"
          >
            الجارية والمتاحة ({{ ongoingRoundsCount + availableRoundsCount }})
          </button>
        </div>
      </div>

      <!-- جدول الدورات والدفعات -->
      <div v-if="filteredRounds.length > 0" class="overflow-x-auto">
        <table class="w-full text-xs text-right">
          <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-black border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="p-3.5">الدورة التدريبية والدفعة</th>
              <th class="p-3.5">مقر وقاعة الانعقاد</th>
              <th class="p-3.5">فترة الانعقاد</th>
              <th class="p-3.5 text-center">الدارسون</th>
              <th class="p-3.5 text-center">متوسط الحضور</th>
              <th class="p-3.5 text-center">حالة الدفعة</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            <tr
              v-for="round in filteredRounds"
              :key="round.id"
              class="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
            >
              <!-- الدورة ورقم الدفعة -->
              <td class="p-3.5">
                <strong class="text-slate-800 dark:text-slate-100 block font-bold text-xs sm:text-sm">
                  {{ round.courseName }}
                </strong>
                <div class="flex items-center gap-2 mt-1">
                  <span class="px-2 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold">
                    الدفعة رقم {{ round.roundNumber }}
                  </span>
                  <span class="text-[10px] text-slate-400 font-mono">
                    {{ round.roundCode }}
                  </span>
                </div>
              </td>

              <!-- مقر وقاعة الانعقاد -->
              <td class="p-3.5 whitespace-nowrap text-slate-700 dark:text-slate-300">
                <div class="flex items-center gap-1.5 font-bold">
                  <MapPin class="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>{{ round.hallName }}</span>
                </div>
              </td>

              <!-- فترة الانعقاد -->
              <td class="p-3.5 whitespace-nowrap font-mono text-slate-600 dark:text-slate-300">
                <div class="font-bold">
                  من {{ formatDate(round.startDate) }}
                </div>
                <div class="text-[11px] text-slate-400 mt-0.5">
                  إلى {{ formatDate(round.endDate) }}
                </div>
              </td>

              <!-- عدد الدارسين -->
              <td class="p-3.5 text-center whitespace-nowrap">
                <strong class="font-mono text-slate-800 dark:text-slate-100 font-bold text-xs">
                  {{ round.traineesCount }}
                </strong>
                <span class="text-[10px] text-slate-400 mr-1">دارساً</span>
              </td>

              <!-- نسبة الحضور -->
              <td class="p-3.5 text-center whitespace-nowrap font-mono font-bold">
                <span
                  :class="
                    round.averageAttendance >= 95
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : round.averageAttendance > 0
                        ? 'text-slate-700 dark:text-slate-300'
                        : 'text-slate-400'
                  "
                >
                  {{ round.averageAttendance > 0 ? round.averageAttendance + '%' : '—' }}
                </span>
              </td>

              <!-- شارة حالة الدفعة -->
              <td class="p-3.5 text-center whitespace-nowrap">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold border shadow-2xs"
                  :class="ROUND_STATUS_CONFIG[round.status]?.class || 'bg-slate-100 text-slate-600'"
                >
                  {{ ROUND_STATUS_CONFIG[round.status]?.label || round.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- في حال عدم وجود دورات في الفلتر المختار -->
      <div
        v-else
        class="p-12 text-center border-t border-slate-100 dark:border-slate-800 space-y-2 text-slate-400"
      >
        <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <BookOpen class="w-5 h-5" />
        </div>
        <p class="text-xs font-bold text-slate-600 dark:text-slate-300">
          لا توجد دورات تدريبية مطابقة للتصنيف المختار
        </p>
        <button
          type="button"
          class="text-xs text-primary-600 hover:underline font-bold cursor-pointer"
          @click="roundFilter = 'all'"
        >
          عرض جميع الدورات المسندة
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  ArrowRight,
  Printer,
  Pencil,
  Phone,
  Mail,
  Layers,
  PlayCircle,
  History,
  GraduationCap,
  BookOpen,
  MapPin,
} from 'lucide-vue-next';
import {
  formatDate,
  getInstructorInitials,
  ROUND_STATUS_CONFIG,
} from '../helpers/instructorsConstants';

const props = defineProps({
  instructor: {
    type: Object,
    required: true,
  },
});

defineEmits(['back', 'open-edit']);

const roundFilter = ref('all'); // 'all' | 'past' | 'ongoing'

const ongoingRoundsCount = computed(() => {
  return (props.instructor?.roundsTaught || []).filter((r) => r.status === 'Ongoing').length;
});

const availableRoundsCount = computed(() => {
  return (props.instructor?.roundsTaught || []).filter((r) => r.status === 'Available').length;
});

const pastRoundsCount = computed(() => {
  return (props.instructor?.roundsTaught || []).filter((r) => r.status === 'Ended').length;
});

const totalGraduates = computed(() => {
  return (props.instructor?.roundsTaught || []).reduce(
    (sum, r) => sum + (r.traineesCount || 0),
    0,
  );
});

const filteredRounds = computed(() => {
  const list = props.instructor?.roundsTaught || [];
  if (roundFilter.value === 'past') {
    return list.filter((r) => r.status === 'Ended');
  }
  if (roundFilter.value === 'ongoing') {
    return list.filter((r) => r.status === 'Ongoing' || r.status === 'Available');
  }
  return list;
});

function handlePrint() {
  window.print();
}
</script>
