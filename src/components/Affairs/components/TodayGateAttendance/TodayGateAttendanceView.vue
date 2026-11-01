<template>
  <div class="space-y-4 select-none pb-6">
    <!-- 1. ترويسة الصفحة مع عداد الحركات وزر التحديث وتاريخ اليوم -->
    <GateAttendanceHeader
      :total-count="logs.length"
      :is-refreshing="isRefreshing"
      @refresh="handleRefresh"
    />

    <!-- 2. بطاقات الإحصائيات الأربعة المتناسقة مع ديزاين النظام -->
    <GateAttendanceStats
      :total-count="totalCount"
      :allowed-count="allowedCount"
      :denied-count="deniedCount"
      :adherence-rate="adherenceRate"
    />

    <!-- 3. شريط تبويبات القرار الأمني وفلاتر الدورة والبوابة والبحث -->
    <GateAttendanceFilters
      v-model:decision-filter="decisionFilter"
      v-model:search-query="searchQuery"
      v-model:selected-course="selectedCourse"
      v-model:selected-gate="selectedGate"
      :course-options="courseOptions"
      :gate-options="gateOptions"
      :total-count="totalCount"
      :allowed-count="allowedCount"
      :denied-count="deniedCount"
      :filtered-count="filteredLogs.length"
      @clear-filters="clearFilters"
    />

    <!-- 4. حاوية الجدول الرئيسي والباجينيشن -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl overflow-hidden">
      <!-- جدول الحركات المعتمد على AppTable -->
      <GateAttendanceTable
        :logs="paginatedLogs"
        :is-filtered="hasActiveFilters"
        @open-details="openDetails"
        @clear-filters="clearFilters"
      />

      <!-- شريط الباجينيشن العام AppPagination -->
      <AppPagination
        v-if="filteredLogs.length > 0"
        v-model:current-page="currentPage"
        v-model:items-per-page="itemsPerPage"
        :total-items="filteredLogs.length"
        :per-page-options="perPageOptions"
        item-label="حركة مسح"
      />
    </div>

    <!-- 5. نافذة بيانات وسجل الدارس الموحدة من shared -->
    <TraineeDetailsModal
      :is-open="isDetailsModalOpen"
      :log="selectedLog"
      @close="closeDetailsModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import GateAttendanceHeader from './utils/GateAttendanceHeader.vue';
import GateAttendanceStats from './utils/GateAttendanceStats.vue';
import GateAttendanceFilters from './utils/GateAttendanceFilters.vue';
import GateAttendanceTable from './utils/GateAttendanceTable.vue';
import TraineeDetailsModal from '@/shared/ui/Modals/TraineeDetailsModal.vue';
import AppPagination from '@/shared/ui/Table/AppPagination.vue';
import { INITIAL_GATE_LOGS } from './helpers/gateAttendanceMockData';

// --- الحالة الأساسية للبيانات ---
const logs = ref([...INITIAL_GATE_LOGS]);
const isRefreshing = ref(false);

// --- الفلاتر والبحث ---
const decisionFilter = ref('all'); // 'all' | 'Allowed' | 'Denied'
const searchQuery = ref('');
const selectedCourse = ref(null);
const selectedGate = ref(null);

// --- الترقيم (Pagination) ---
const currentPage = ref(1);
const itemsPerPage = ref(5);
const perPageOptions = [
  { label: '5 حركات', value: 5 },
  { label: '10 حركات', value: 10 },
  { label: '20 حركة', value: 20 },
  { label: '50 حركة', value: 50 },
];

// --- المودال ---
const selectedLog = ref(null);
const isDetailsModalOpen = ref(false);

// --- الحسابات الإحصائية (KPIs) ---
const totalCount = computed(() => logs.value.length);
const allowedCount = computed(() => logs.value.filter((l) => l.decision === 'Allowed').length);
const deniedCount = computed(() => logs.value.filter((l) => l.decision === 'Denied').length);
const adherenceRate = computed(() => {
  if (totalCount.value === 0) return 0;
  return Math.round((allowedCount.value / totalCount.value) * 100);
});

// --- خيارات القوائم المنسدلة ---
const courseOptions = computed(() => {
  const map = new Map();
  logs.value.forEach((l) => {
    if (l.courseRound?.courseName) {
      map.set(l.courseRound.courseName, l.courseRound.courseName);
    }
  });
  return Array.from(map.values()).map((name) => ({ label: name, value: name }));
});

const gateOptions = computed(() => {
  const map = new Map();
  logs.value.forEach((l) => {
    if (l.officer?.gateName) {
      map.set(l.officer.gateName, l.officer.gateName);
    }
  });
  return Array.from(map.values()).map((gate) => ({ label: gate, value: gate }));
});

const hasActiveFilters = computed(() => {
  return (
    Boolean(searchQuery.value) ||
    selectedCourse.value !== null ||
    selectedGate.value !== null ||
    decisionFilter.value !== 'all'
  );
});

// --- تصفية السجلات ---
const filteredLogs = computed(() => {
  return logs.value.filter((log) => {
    // 1. فلتر قرار الدخول
    if (decisionFilter.value !== 'all' && log.decision !== decisionFilter.value) {
      return false;
    }

    // 2. فلتر الدورة
    if (selectedCourse.value && log.courseRound?.courseName !== selectedCourse.value) {
      return false;
    }

    // 3. فلتر البوابة
    if (selectedGate.value && log.officer?.gateName !== selectedGate.value) {
      return false;
    }

    // 4. البحث النصي
    if (searchQuery.value) {
      const q = searchQuery.value.trim().toLowerCase();
      const name = log.trainee?.fullName?.toLowerCase() || '';
      const nid = log.trainee?.nationalId || '';
      const phone = log.trainee?.phone || '';
      const qr = log.qrToken?.toLowerCase() || '';
      const course = log.courseRound?.courseName?.toLowerCase() || '';
      const officer = log.officer?.name?.toLowerCase() || '';
      const reason = log.reason?.toLowerCase() || '';

      if (
        !name.includes(q) &&
        !nid.includes(q) &&
        !phone.includes(q) &&
        !qr.includes(q) &&
        !course.includes(q) &&
        !officer.includes(q) &&
        !reason.includes(q)
      ) {
        return false;
      }
    }

    return true;
  });
});

// --- السجلات المعروضة في الصفحة الحالية ---
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredLogs.value.slice(start, start + itemsPerPage.value);
});

// إعادة الصفحة الأولى تلقائياً عند تغيير أي فلتر
watch(
  [decisionFilter, searchQuery, selectedCourse, selectedGate, itemsPerPage],
  () => {
    currentPage.value = 1;
  }
);

// --- الإجراءات والدوال ---
function clearFilters() {
  decisionFilter.value = 'all';
  searchQuery.value = '';
  selectedCourse.value = null;
  selectedGate.value = null;
  currentPage.value = 1;
}

function handleRefresh() {
  isRefreshing.value = true;
  setTimeout(() => {
    logs.value = [...INITIAL_GATE_LOGS];
    isRefreshing.value = false;
  }, 450);
}

function openDetails(log) {
  selectedLog.value = log;
  isDetailsModalOpen.value = true;
}

function closeDetailsModal() {
  isDetailsModalOpen.value = false;
  selectedLog.value = null;
}
</script>
