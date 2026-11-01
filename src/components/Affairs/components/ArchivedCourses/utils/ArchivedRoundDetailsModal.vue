<template>
  <div
    v-if="isOpen && round"
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fade-in"
    @click.self="handleClose"
  >
    <div
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl h-[660px] max-h-[92vh] overflow-hidden flex flex-col animate-scale-in"
      role="dialog"
      aria-modal="true"
    >
      <!-- 1. الترويسة -->
      <div class="px-6 py-4.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-primary-50 dark:bg-primary-950/70 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-2xs">
            <FolderCheck class="w-5 h-5" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
                أرشيف وسجل تفاصيل الدفعة المنعقدة سابقاً
              </h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                {{ round.roundCode }}
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {{ round.courseName }} — الدفعة رقم {{ round.roundNumber }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- زر طباعة التقرير الشامل للدفعة -->
          <button
            type="button"
            class="h-8.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            @click="handlePrint"
          >
            <Printer class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
            <span>طباعة التقرير</span>
          </button>

          <!-- زر الإغلاق -->
          <button
            type="button"
            class="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            @click="handleClose"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- شريط التبويبات الداخلية للمودال -->
      <div class="px-6 pt-3 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/60 flex items-center gap-2 overflow-x-auto shrink-0">
        <button
          type="button"
          class="pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          :class="
            modalTab === 'trainees'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          "
          @click="modalTab = 'trainees'"
        >
          <Users class="w-4 h-4" />
          <span>الطلاب الخريجون بالدورة ({{ round.graduatedTrainees?.length || 0 }})</span>
        </button>

        <button
          type="button"
          class="pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          :class="
            modalTab === 'finance'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          "
          @click="modalTab = 'finance'"
        >
          <Wallet class="w-4 h-4" />
          <span>التكلفة والإيرادات المحصلة</span>
        </button>

        <button
          type="button"
          class="pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          :class="
            modalTab === 'instructor'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          "
          @click="modalTab = 'instructor'"
        >
          <GraduationCap class="w-4 h-4" />
          <span>المحاضر وبيانات الانعقاد (من شرح)</span>
        </button>
      </div>

      <!-- 2. محتوى التبويبات -->
      <div class="p-6 flex-1 min-h-0 overflow-y-auto space-y-4 text-xs">
        <!-- ======================= التبويب 1: الطلاب الذين كانوا بالدورة ======================= -->
        <div v-if="modalTab === 'trainees'" class="space-y-3">
          <!-- شريط بحث سريع في كشف الخريجين -->
          <div class="relative">
            <input
              v-model="traineeSearch"
              type="text"
              placeholder="ابحث باسم الخريج، الرقم القومي، رقم الإيصال، أو كود الشهادة..."
              class="w-full h-9.5 pr-9 pl-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            />
            <Search class="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>

          <!-- جدول الخريجين والرسوم المسددة -->
          <div v-if="filteredTrainees.length > 0" class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table class="w-full text-xs text-right">
              <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-black border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th class="p-3">الدارس الخريج</th>
                  <th class="p-3">الرقم القومي</th>
                  <th class="p-3">الفئة المسجلة</th>
                  <th class="p-3">الرسوم وإيصال السداد</th>
                  <th class="p-3 text-center">الحضور والتقييم</th>
                  <th class="p-3">الشهادة المعتمدة</th>
                  <th class="p-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                <tr
                  v-for="t in filteredTrainees"
                  :key="t.id"
                  class="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <!-- اسم الدارس وصورته -->
                  <td class="p-3">
                    <div class="flex items-center gap-2.5">
                      <img
                        v-if="t.profilePhotoPath"
                        :src="t.profilePhotoPath"
                        :alt="t.fullName"
                        class="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div
                        v-else
                        class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold text-xs shrink-0"
                      >
                        {{ t.fullName?.slice(0, 1) }}
                      </div>
                      <div>
                        <strong class="font-bold text-slate-800 dark:text-slate-100 block">
                          {{ t.fullName }}
                        </strong>
                        <span class="text-[10px] text-slate-400">{{ t.occupation }}</span>
                      </div>
                    </div>
                  </td>

                  <!-- الرقم القومي -->
                  <td class="p-3 font-mono text-slate-700 dark:text-slate-300">
                    {{ t.nationalId }}
                  </td>

                  <!-- الفئة -->
                  <td class="p-3 whitespace-nowrap">
                    <span
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                      :class="getCategoryBadge(t.category).class"
                    >
                      {{ getCategoryBadge(t.category).label }}
                    </span>
                  </td>

                  <!-- الرسوم وإيصال السداد -->
                  <td class="p-3 whitespace-nowrap">
                    <div class="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {{ formatCurrency(t.paidAmount) }}
                    </div>
                    <div class="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Receipt class="w-3 h-3 text-slate-400" />
                      <span>{{ t.receiptNumber }}</span>
                    </div>
                  </td>

                  <!-- الحضور والتقدير -->
                  <td class="p-3 text-center whitespace-nowrap font-mono">
                    <div class="font-bold text-slate-800 dark:text-slate-200">
                      {{ t.attendanceRate }}% ({{ t.attendedLectures }} محاضرة)
                    </div>
                    <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {{ t.grade }}
                    </span>
                  </td>

                  <!-- كود الشهادة -->
                  <td class="p-3 whitespace-nowrap font-mono text-[11px]">
                    <div class="text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1">
                      <Award class="w-3 h-3 text-amber-500" />
                      <span>{{ t.certificateCode }}</span>
                    </div>
                    <span class="text-[10px] text-slate-400">بتاريخ: {{ formatDate(t.issueDate) }}</span>
                  </td>

                  <!-- زر استعراض ملف المتدرب -->
                  <td class="p-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      class="h-7.5 px-2.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      @click="openTraineeModal(t)"
                    >
                      <Eye class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                      <span>ملف الدارس</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="p-8 text-center text-xs text-slate-400">
            لا يوجد خريجون مطابقون لنص البحث داخل هذه الدفعة
          </div>
        </div>

        <!-- ======================= التبويب 2: التكلفة والإيرادات ======================= -->
        <div v-else-if="modalTab === 'finance'" class="space-y-4">
          <!-- 4 كروت إحصائية مالية -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span class="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">
                إجمالي الإيرادات المحصلة:
              </span>
              <strong class="text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-200 font-mono block">
                {{ formatCurrency(round.totalRevenue) }}
              </strong>
              <p class="text-[10px] text-emerald-700 dark:text-emerald-400">
                من {{ round.graduatedCount }} دارساً مسدداً للرسوم
              </p>
            </div>

            <div class="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <span class="text-[11px] text-amber-800 dark:text-amber-300 font-bold">
                أتعاب المحاضر التقديرية:
              </span>
              <strong class="text-base sm:text-lg font-black text-amber-900 dark:text-amber-200 font-mono block">
                {{ formatCurrency(round.instructorCost) }}
              </strong>
              <p class="text-[10px] text-amber-700 dark:text-amber-400">
                عن {{ round.totalLectures }} محاضرة تدريبية
              </p>
            </div>

            <div class="p-3.5 rounded-2xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 space-y-1">
              <span class="text-[11px] text-primary-800 dark:text-primary-300 font-bold">
                صافي العائد للمعهد:
              </span>
              <strong class="text-base sm:text-lg font-black text-primary-900 dark:text-primary-200 font-mono block">
                {{ formatCurrency(round.netRevenue) }}
              </strong>
              <p class="text-[10px] text-primary-700 dark:text-primary-400">
                نسبة ربحية الدفعة: {{ Math.round((round.netRevenue / round.totalRevenue) * 100) }}%
              </p>
            </div>
          </div>

          <!-- تفصيل الإيرادات حسب فئة المتدربين وفق الـ ERD -->
          <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
            <h4 class="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Coins class="w-4 h-4 text-primary-600" />
              <span>تفصيل التحصيل المالي حسب فئات الدارسين:</span>
            </h4>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-[10px] text-slate-400 block">فئة مدني</span>
                <strong class="font-mono text-slate-800 dark:text-slate-200 font-bold text-xs">
                  {{ formatCurrency(round.revenueByCategory?.Civilian) }}
                </strong>
              </div>

              <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-[10px] text-slate-400 block">ضباط القوات المسلحة</span>
                <strong class="font-mono text-primary-700 dark:text-primary-300 font-bold text-xs">
                  {{ formatCurrency(round.revenueByCategory?.MilitaryOfficer) }}
                </strong>
              </div>

              <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-[10px] text-slate-400 block">عائلات ضباط ق.م</span>
                <strong class="font-mono text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                  {{ formatCurrency(round.revenueByCategory?.MilitaryFamily) }}
                </strong>
              </div>

              <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-[10px] text-slate-400 block">ضباط الشرطة وعائلاتهم</span>
                <strong class="font-mono text-blue-700 dark:text-blue-300 font-bold text-xs">
                  {{ formatCurrency(round.revenueByCategory?.PoliceOfficerOrFamily) }}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================= التبويب 3: المحاضر وتفاصيل الانعقاد ======================= -->
        <div v-else-if="modalTab === 'instructor'" class="space-y-4">
          <!-- كارت المحاضر الذي شرح -->
          <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100">
                <GraduationCap class="w-5 h-5 text-emerald-600" />
                <span>المحاضر المعتمد الذي تولى التدريس:</span>
              </div>
              <div class="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold font-mono text-[11px]">
                <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>تقييم المحاضر: {{ round.instructor?.rating }} / 5</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span class="text-slate-400 text-[11px] block">اسم المحاضر:</span>
                <strong class="text-sm font-black text-slate-800 dark:text-slate-100">
                  {{ round.instructor?.name }}
                </strong>
              </div>

              <div>
                <span class="text-slate-400 text-[11px] block">التخصص الأكاديمي:</span>
                <span class="font-bold text-slate-700 dark:text-slate-300">
                  {{ round.instructor?.specialty }}
                </span>
              </div>

              <div>
                <span class="text-slate-400 text-[11px] block">رقم هاتف التواصل:</span>
                <span class="font-mono text-slate-700 dark:text-slate-300">
                  {{ round.instructor?.phone }}
                </span>
              </div>

              <div>
                <span class="text-slate-400 text-[11px] block">حالة الاعتماد بالمنظومة:</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400">
                  عضو هيئة تدريس معتمد ونشط
                </span>
              </div>
            </div>
          </div>

          <!-- كارت القاعة ومكان الانعقاد -->
          <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 space-y-3">
            <div class="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100">
              <MapPin class="w-5 h-5 text-primary-600" />
              <span>مقر وقاعة الانعقاد بالمعهد:</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span class="text-slate-400 text-[11px] block">اسم القاعة أو المعمل:</span>
                <strong class="font-bold text-slate-800 dark:text-slate-100">
                  {{ round.hall?.name }}
                </strong>
              </div>

              <div>
                <span class="text-slate-400 text-[11px] block">نوع المكان:</span>
                <span class="font-bold text-slate-700 dark:text-slate-300">
                  {{ round.hall?.type === 'Lab' ? 'معمل حاسب آلي تخصصي' : 'قاعة محاضرات كبرى' }}
                </span>
              </div>

              <div>
                <span class="text-slate-400 text-[11px] block">أقصى سعة استيعابية:</span>
                <span class="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {{ round.hall?.maxCapacity }} مقعد
                </span>
              </div>
            </div>
          </div>

          <!-- تفاصيل الفترة الزمنية والمحاضرات المنفذة -->
          <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
            <h4 class="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CalendarCheck class="w-4 h-4 text-blue-600" />
              <span>الجدول الزمني المنفذ والمحاضرات:</span>
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-slate-400 text-[11px]">فترة الانعقاد:</span>
                <div class="font-mono font-bold text-slate-800 dark:text-slate-200">
                  من {{ formatDate(round.startDate) }} إلى {{ formatDate(round.endDate) }}
                </div>
              </div>

              <div>
                <span class="text-slate-400 text-[11px]">مواعيد المحاضرات اليومية:</span>
                <div class="font-mono font-bold text-slate-800 dark:text-slate-200">
                  من {{ round.startTime }} إلى {{ round.endTime }} ({{ lectureDuration }})
                </div>
              </div>

              <div>
                <span class="text-slate-400 text-[11px]">أيام الأسبوع المعتمدة:</span>
                <div class="font-bold text-slate-800 dark:text-slate-200">
                  {{ formatDays(round.lectureDays) }}
                </div>
              </div>

              <div>
                <span class="text-slate-400 text-[11px]">إجمالي المحاضرات ونسبة الحضور:</span>
                <div class="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {{ round.totalLectures }} محاضرة كاملة • متوسط حضور {{ round.averageAttendance }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. الأزرار السفلية -->
      <div class="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 shrink-0">
        <button
          type="button"
          class="h-9 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          @click="handlePrint"
        >
          <Printer class="w-4 h-4" />
          <span>طباعة تقرير الدفعة الشامل</span>
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
import { ref, computed } from 'vue';
import {
  FolderCheck,
  X,
  Printer,
  Users,
  Wallet,
  GraduationCap,
  Search,
  Receipt,
  Award,
  Eye,
  Coins,
  Star,
  MapPin,
  CalendarCheck,
} from 'lucide-vue-next';
import {
  formatEgyptianCurrency,
  formatDate,
  formatLectureDays,
  calculateLectureDuration,
} from '../helpers/archivedCoursesConstants';

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

const emit = defineEmits(['close', 'open-trainee-profile']);

const modalTab = ref('trainees'); // 'trainees' | 'finance' | 'instructor'
const traineeSearch = ref('');

const traineesList = computed(() => {
  return props.round?.graduatedTrainees || [];
});

const filteredTrainees = computed(() => {
  if (!traineeSearch.value) return traineesList.value;
  const q = traineeSearch.value.trim().toLowerCase();
  return traineesList.value.filter((t) => {
    const name = t.fullName?.toLowerCase() || '';
    const nid = t.nationalId || '';
    const rec = t.receiptNumber?.toLowerCase() || '';
    const cert = t.certificateCode?.toLowerCase() || '';
    return name.includes(q) || nid.includes(q) || rec.includes(q) || cert.includes(q);
  });
});

const lectureDuration = computed(() => {
  return calculateLectureDuration(props.round?.startTime, props.round?.endTime);
});

function formatCurrency(val) {
  return formatEgyptianCurrency(val);
}

function formatDays(days) {
  return formatLectureDays(days);
}

function getCategoryBadge(cat) {
  const map = {
    Civilian: { label: 'مدني', class: 'bg-slate-100 text-slate-700 border-slate-200' },
    MilitaryOfficer: { label: 'ضابط ق.م', class: 'bg-primary-50 text-primary-800 border-primary-200' },
    MilitaryFamily: { label: 'عائلات ق.م', class: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    PoliceOfficerOrFamily: { label: 'شرطة', class: 'bg-blue-50 text-blue-800 border-blue-200' },
  };
  return map[cat] || { label: cat || 'مدني', class: 'bg-slate-100 text-slate-700 border-slate-200' };
}

function openTraineeModal(trainee) {
  const logCompatible = {
    trainee: {
      userId: trainee.id,
      fullName: trainee.fullName,
      nationalId: trainee.nationalId,
      phone: trainee.phone,
      email: trainee.email,
      category: trainee.category,
      occupation: trainee.occupation,
      governorate: trainee.governorate,
      profilePhotoPath: trainee.profilePhotoPath,
      nationalIdFrontPhotoPath: trainee.nationalIdFrontPhotoPath,
      nationalIdBackPhotoPath: trainee.nationalIdBackPhotoPath,
    },
    courseRound: {
      courseName: props.round.courseName,
      roundNumber: props.round.roundNumber,
      instructorName: props.round.instructor?.name,
      hallName: props.round.hall?.name,
      startDate: props.round.startDate,
      endDate: props.round.endDate,
    },
    decision: 'Allowed',
    scannedAt: new Date().toISOString(),
  };

  emit('open-trainee-profile', logCompatible);
}

function handleClose() {
  emit('close');
}

function handlePrint() {
  window.print();
}
</script>
