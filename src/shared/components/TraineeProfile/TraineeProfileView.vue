<template>
  <div class="space-y-4 select-none pb-8">
    <!-- 1. ترويسة ملف الدارس وبياناته وصورته وزر العودة وأدوات التنقل السريع -->
    <TraineeHeader
      :trainee="currentTrainee"
      :from-path="fromPath"
      @open-id-card="handleOpenIdCard('front')"
      @print-profile="handlePrintProfile"
      @back="handleBack"
    />

    <!-- 2. بطاقات الإحصائيات الأربعة الموحدة (إجمالي، جارية، مكتملة، نسبة الحضور) -->
    <TraineeKpis
      :total-courses="totalCoursesCount"
      :ongoing-courses="ongoingCoursesCount"
      :completed-courses="pastCoursesCount"
      :overall-attendance="overallAttendanceRate"
    />

    <!-- 3. شريط التبويبات للتنقل بين الأقسام (تبدأ افتراضياً ببيانات البطاقة والمستندات) -->
    <TraineeTabs
      v-model:active-tab="activeTab"
      :current-courses-count="ongoingCoursesCount"
      :past-courses-count="pastCoursesCount"
      :gate-logs-count="gateLogsCount"
    />

    <!-- 4. محتوى التبويب المختار -->
    <div class="space-y-6">
      <!-- أ. تبويب بيانات البطاقة والمستندات المدنية (يفتح افتراضياً كأول قسم) -->
      <template v-if="activeTab === 'civil'">
        <TraineeCivilDetails
          :trainee="currentTrainee"
          @preview-doc="handlePreviewDoc"
        />
      </template>

      <!-- ب. تبويب الدورات التدريبية الجارية حالياً -->
      <template v-else-if="activeTab === 'current'">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>الدورات التدريبية قيد الانعقاد حالياً (الملتحق بها الآن)</span>
            </h2>
            <span class="text-xs font-bold text-slate-400">
              {{ currentTrainee.currentCourses.length }} دورة جارية
            </span>
          </div>

          <CurrentCoursesList
            :courses="currentTrainee.currentCourses"
            @open-qr="handleOpenQr"
          />
        </div>
      </template>

      <!-- ج. تبويب الدورات السابقة والشهادات المعتمدة -->
      <template v-else-if="activeTab === 'past'">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>الدورات التدريبية السابقة المكتملة (سجل التخرج والشهادات المعتمدة)</span>
            </h2>
            <span class="text-xs font-bold text-slate-400">
              {{ currentTrainee.pastCourses.length }} دورات مكتملة
            </span>
          </div>

          <PastCoursesList
            :courses="currentTrainee.pastCourses"
            @open-certificate="handleOpenCert"
          />
        </div>
      </template>

      <!-- د. تبويب سجل حركات مسح البوابة الأمنية -->
      <template v-else-if="activeTab === 'gate_logs'">
        <TraineeGateLogsTable :logs="currentTrainee.gateLogs || []" />
      </template>
    </div>

    <!-- 5. النوافذ المنبثقة (Modals) -->
    <!-- أ. نافذة معاينة مستندات البطاقة الشخصية -->
    <TraineeIdCardModal
      :is-open="isIdCardModalOpen"
      :trainee="currentTrainee"
      :initial-doc="selectedDocType"
      @close="isIdCardModalOpen = false"
    />

    <!-- ب. نافذة الشهادة المعتمدة الرسمية -->
    <TraineeCertificateModal
      :is-open="isCertModalOpen"
      :course="selectedCertCourse"
      :trainee="currentTrainee"
      @close="isCertModalOpen = false"
    />

    <!-- ج. نافذة تصريح دخول البوابة الأمني (QR Pass) -->
    <QrPassModal
      :is-open="isQrModalOpen"
      :course="selectedQrCourse"
      :trainee="currentTrainee"
      @close="isQrModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TraineeHeader from './utils/TraineeHeader.vue';
import TraineeKpis from './utils/TraineeKpis.vue';
import TraineeTabs from './utils/TraineeTabs.vue';
import CurrentCoursesList from './utils/CurrentCoursesList.vue';
import PastCoursesList from './utils/PastCoursesList.vue';
import TraineeCivilDetails from './utils/TraineeCivilDetails.vue';
import TraineeGateLogsTable from './utils/TraineeGateLogsTable.vue';
import TraineeIdCardModal from './utils/TraineeIdCardModal.vue';
import TraineeCertificateModal from './utils/TraineeCertificateModal.vue';
import QrPassModal from './utils/QrPassModal.vue';
import { MOCK_TRAINEES } from './helpers/traineeProfileMockData';

const route = useRoute();
const router = useRouter();

// --- البيانات الأساسية ---
const allTrainees = ref([...MOCK_TRAINEES]);
const activeTraineeId = ref(1);

// التبويب الافتراضي الأول هو بيانات البطاقة والمستندات
const activeTab = ref('civil');

// --- مسار العودة للصفحة السابقة (?from=...) ---
const fromPath = computed(() => {
  return route.query?.from ? decodeURIComponent(route.query.from) : '';
});

// --- المودالات ---
const isIdCardModalOpen = ref(false);
const selectedDocType = ref('front');

const isCertModalOpen = ref(false);
const selectedCertCourse = ref(null);

const isQrModalOpen = ref(false);
const selectedQrCourse = ref(null);

// استخراج المتدرب النشط
const currentTrainee = computed(() => {
  return (
    allTrainees.value.find((t) => t.id === Number(activeTraineeId.value)) ||
    allTrainees.value[0]
  );
});

// الحسابات الإحصائية
const ongoingCoursesCount = computed(() => currentTrainee.value?.currentCourses?.length || 0);
const pastCoursesCount = computed(() => currentTrainee.value?.pastCourses?.length || 0);
const totalCoursesCount = computed(() => ongoingCoursesCount.value + pastCoursesCount.value);
const gateLogsCount = computed(() => currentTrainee.value?.gateLogs?.length || 0);

const overallAttendanceRate = computed(() => {
  const current = currentTrainee.value?.currentCourses || [];
  const past = currentTrainee.value?.pastCourses || [];
  const all = [...current, ...past];
  if (all.length === 0) return 0;
  const sum = all.reduce((acc, c) => acc + (c.attendanceRate || 0), 0);
  return Math.round(sum / all.length);
});

// قراءة المتدرب من الرابط عند التحميل
function syncTraineeFromRoute() {
  const paramId = route.params?.id || route.query?.traineeId;
  if (paramId) {
    const found = allTrainees.value.find((t) => t.id === Number(paramId));
    if (found) {
      activeTraineeId.value = found.id;
    }
  }
}

onMounted(() => {
  syncTraineeFromRoute();
});

watch(
  () => [route.params?.id, route.query?.traineeId],
  () => {
    syncTraineeFromRoute();
  }
);

// الإجراءات
function handleChangeTrainee(newId) {
  activeTraineeId.value = newId;
}

function handleBack() {
  if (fromPath.value) {
    router.push(fromPath.value);
  } else if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/affairs/applications/applicants');
  }
}

function handleOpenIdCard(docType = 'front') {
  selectedDocType.value = docType;
  isIdCardModalOpen.value = true;
}

function handlePreviewDoc(docInfo) {
  if (docInfo.title.includes('ظهر')) {
    selectedDocType.value = 'back';
  } else if (docInfo.title.includes('مؤهل')) {
    selectedDocType.value = 'qualification';
  } else if (docInfo.title.includes('فئة')) {
    selectedDocType.value = 'proof';
  } else {
    selectedDocType.value = 'front';
  }
  isIdCardModalOpen.value = true;
}

function handleOpenCert(course) {
  selectedCertCourse.value = course;
  isCertModalOpen.value = true;
}

function handleOpenQr(course) {
  selectedQrCourse.value = course;
  isQrModalOpen.value = true;
}

function handlePrintProfile() {
  window.print();
}
</script>
