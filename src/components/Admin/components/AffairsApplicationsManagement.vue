<template>
  <div class="space-y-4 select-none pb-6">

    <!-- ===== 1. رأس الصفحة ===== -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/90 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading">
            إدارة شؤون الدارسين والطلبات
          </h1>
          <span class="px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/70 border border-primary-200 dark:border-primary-800/80 text-[11px] font-bold text-primary-700 dark:text-primary-300">
            {{ filteredApplications.length }} طلب
          </span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          متابعة ومراجعة طلبات التسجيل في الدورات وإدارة حالات السداد وتقييد المتدربين
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="h-9 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          @click="resetToInitial"
        >
          <RotateCcw class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" />
          <span>تحديث</span>
        </button>

        <button
          type="button"
          class="h-9 px-3.5 rounded-xl bg-[#3B5431] hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          @click="openModal()"
        >
          <Plus class="w-3.5 h-3.5" />
          <span>إضافة طلب جديد</span>
        </button>
      </div>
    </div>

    <!-- ===== 2. بطاقات الإحصائيات السريعة ===== -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <AppKpiCard
        title="إجمالي الطلبات"
        :value="applications.length"
        badge="طلب مسجل"
        badge-class="text-primary-600 dark:text-primary-400 font-bold"
        icon-bg="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
      >
        <template #icon><ClipboardList class="w-5 h-5" /></template>
      </AppKpiCard>

      <AppKpiCard
        title="المقيدون بالدورات"
        :value="enrolledCount"
        badge="مقيد"
        badge-class="text-emerald-600 dark:text-emerald-400 font-bold"
        icon-bg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
      >
        <template #icon><UserCheck class="w-5 h-5" /></template>
      </AppKpiCard>

      <AppKpiCard
        title="في انتظار السداد"
        :value="waitingPaymentCount"
        badge="تحتاج متابعة"
        badge-class="text-amber-600 dark:text-amber-400 font-bold"
        icon-bg="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
      >
        <template #icon><CreditCard class="w-5 h-5" /></template>
      </AppKpiCard>

      <AppKpiCard
        title="الطلبات المرفوضة"
        :value="rejectedCount"
        badge="خارج النظام"
        badge-class="text-rose-500 font-bold"
        icon-bg="bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
      >
        <template #icon><XCircle class="w-5 h-5" /></template>
      </AppKpiCard>
    </div>

    <!-- ===== 3. شريط الفلاتر والبحث ===== -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- حقل البحث النصي -->
        <div class="relative sm:col-span-2">
          <input
            :value="searchQuery"
            type="text"
            placeholder="بحث باسم المتدرب، الدورة، أو معرف الطلب..."
            class="w-full h-10 pr-9 pl-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all font-medium"
            @input="searchQuery = $event.target.value"
          />
          <Search class="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full cursor-pointer"
            @click="searchQuery = ''"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- فلتر الحالة (PrimeVue Select) -->
        <Select
          v-model="selectedStatus"
          :options="statusOptions"
          option-label="label"
          option-value="value"
          placeholder="جميع الحالات"
          show-clear
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
        />

        <!-- فلتر الفئة (PrimeVue Select) -->
        <Select
          v-model="selectedCategory"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          placeholder="جميع الفئات"
          show-clear
          class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
        />
      </div>

      <!-- شريط الفلاتر النشطة -->
      <div
        v-if="searchQuery || selectedStatus || selectedCategory"
        class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]"
      >
        <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Filter class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
          <span>تم العثور على <strong>{{ filteredApplications.length }}</strong> طلب يطابق الفلترة الحالية</span>
        </div>
        <button
          type="button"
          class="text-primary-700 dark:text-primary-400 hover:underline font-bold cursor-pointer"
          @click="clearFilters"
        >
          إعادة ضبط الفلاتر
        </button>
      </div>
    </div>

    <!-- ===== 4. الجدول + الباجينيشن في حاوية موحدة ===== -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <AppTable
        :columns="columns"
        :data="paginatedApplications"
        :is-filtered="Boolean(searchQuery || selectedStatus || selectedCategory)"
        empty-title="لا توجد طلبات تطابق معايير البحث الحالية"
        empty-text="جرّب مسح نص البحث أو إعادة ضبط خيارات الفلترة لعرض كافة الطلبات"
        @clear-filters="clearFilters"
      >
        <!-- معرف ووقت الطلب -->
        <template #applicationId="{ row }">
          <div class="font-mono font-bold text-primary-700 dark:text-primary-400">
            {{ row.applicationId }}
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
            <Clock class="w-3 h-3" />
            <span>{{ formatDate(row.paymentDate) }}</span>
          </div>
        </template>

        <!-- بيانات المتدرب -->
        <template #trainee="{ row }">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              <span class="text-xs font-bold text-primary-700 dark:text-primary-300">
                {{ getInitials(row.trainee.name) }}
              </span>
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[180px]" :title="row.trainee.name">
                {{ row.trainee.name }}
              </div>
            </div>
          </div>
        </template>

        <!-- فئة المتدرب -->
        <template #category="{ row }">
          <span
            class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs"
            :class="getCategoryConfig(row.trainee.category).bg"
          >
            {{ getCategoryConfig(row.trainee.category).label }}
          </span>
          <div class="text-[10px] text-slate-400 mt-0.5">
            {{ getCategoryConfig(row.trainee.category).discount }}
          </div>
        </template>

        <!-- الدورة والجولة -->
        <template #course="{ row }">
          <div class="font-bold text-slate-800 dark:text-slate-200 max-w-[200px] truncate" :title="row.course.title">
            {{ row.course.title }}
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            {{ row.course.round }}
          </div>
        </template>

        <!-- الحالة -->
        <template #status="{ row }">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
            :class="getStatusConfig(row.status).bg"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
            {{ getStatusConfig(row.status).label }}
          </span>
        </template>

        <!-- المبلغ -->
        <template #amount="{ row }">
          <div class="font-black text-slate-800 dark:text-slate-100 font-heading">
            {{ formatCurrency(row.amount) }}
          </div>
          <span class="text-[10px] text-slate-400">سعر الفئة المعتمد</span>
        </template>

        <!-- الإجراءات -->
        <template #actions="{ row }">
          <div class="flex items-center justify-center gap-1.5">
            <button
              type="button"
              class="h-8 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="عرض التفاصيل"
              @click="openDetails(row)"
            >
              <Eye class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span>تفاصيل</span>
            </button>

            <button
              type="button"
              class="h-8 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="تعديل بيانات الطلب"
              @click="openModal(row)"
            >
              <Edit class="w-3.5 h-3.5" />
              <span class="hidden md:inline">تعديل</span>
            </button>

            <button
              type="button"
              class="h-8 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="حذف الطلب"
              @click="deleteApp(row)"
            >
              <Trash2 class="w-3.5 h-3.5 text-rose-500" />
              <span class="hidden md:inline">حذف</span>
            </button>
          </div>
        </template>
      </AppTable>

      <!-- الباجينيشن المشترك -->
      <AppPagination
        v-if="filteredApplications.length > 0"
        v-model:current-page="currentPage"
        v-model:items-per-page="itemsPerPage"
        :total-items="filteredApplications.length"
        :per-page-options="perPageOptions"
        item-label="طلب"
      />
    </div>

    <!-- ===== Toast Feedback ===== -->
    <div
      v-if="feedbackMessage.text"
      class="fixed bottom-6 left-6 z-50 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border text-xs font-bold"
      :class="
        feedbackMessage.type === 'success'
          ? 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
          : 'bg-rose-50 dark:bg-rose-950/90 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800'
      "
    >
      <CheckCircle2 v-if="feedbackMessage.type === 'success'" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      <XCircle v-else class="w-5 h-5 text-rose-600 dark:text-rose-400" />
      <span>{{ feedbackMessage.text }}</span>
      <button type="button" class="mr-2 text-slate-400 hover:text-slate-600 cursor-pointer" @click="feedbackMessage.text = ''">
        <X class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- ===== 5. مودال التفاصيل ===== -->
    <BaseModal v-model="isDetailsOpen" title="تفاصيل الطلب" max-width="md">
      <template v-if="selectedApp">
        <div class="space-y-4">
          <div class="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">المتدرب</p>
              <h4 class="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">{{ selectedApp.trainee.name }}</h4>
              <p class="text-xs font-mono text-slate-400 mt-0.5">{{ selectedApp.applicationId }}</p>
            </div>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border shrink-0"
              :class="getCategoryConfig(selectedApp.trainee.category).bg"
            >
              {{ getCategoryConfig(selectedApp.trainee.category).label }}
            </span>
          </div>

          <dl class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm">
            <dt class="text-slate-400 text-xs font-semibold">الدورة:</dt>
            <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ selectedApp.course.title }}</dd>

            <dt class="text-slate-400 text-xs font-semibold">الجولة:</dt>
            <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ selectedApp.course.round }}</dd>

            <dt class="text-slate-400 text-xs font-semibold">الحالة:</dt>
            <dd>
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                :class="getStatusConfig(selectedApp.status).bg"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
                {{ getStatusConfig(selectedApp.status).label }}
              </span>
            </dd>

            <dt class="text-slate-400 text-xs font-semibold">تاريخ السداد:</dt>
            <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ formatDate(selectedApp.paymentDate) }}</dd>

            <dt class="text-slate-400 text-xs font-semibold">المبلغ المدفوع:</dt>
            <dd class="font-mono font-bold text-slate-900 dark:text-slate-100">{{ formatCurrency(selectedApp.amount) }}</dd>

            <dt class="text-slate-400 text-xs font-semibold">فئة التسعير:</dt>
            <dd class="text-slate-600 dark:text-slate-300 text-xs">{{ getCategoryConfig(selectedApp.trainee.category).discount }}</dd>
          </dl>
        </div>
      </template>
      <template #footer>
        <BaseButton variant="secondary" size="sm" @click="isDetailsOpen = false">إغلاق</BaseButton>
        <BaseButton variant="outline" size="sm" @click="isDetailsOpen = false; openModal(selectedApp)">
          <template #icon-start><Edit class="w-3.5 h-3.5 ml-1" /></template>
          تعديل الطلب
        </BaseButton>
      </template>
    </BaseModal>

    <!-- ===== 6. مودال الإضافة والتعديل ===== -->
    <BaseModal
      v-model="isModalOpen"
      :title="isEditing ? 'تعديل بيانات الطلب' : 'إضافة طلب جديد'"
      max-width="md"
    >
      <form id="appForm" class="space-y-4" @submit.prevent="saveApplication">
        <BaseInput
          v-model="formData.trainee.name"
          label="اسم المتدرب"
          placeholder="مثال: محمد أحمد علي"
          required
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-slate-600">
              فئة المتدرب <span class="text-rose-500">*</span>
            </label>
            <Select
              v-model="formData.trainee.category"
              :options="categoryOptions"
              option-label="label"
              option-value="value"
              placeholder="اختر الفئة"
              class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-slate-600">
              حالة الطلب <span class="text-rose-500">*</span>
            </label>
            <Select
              v-model="formData.status"
              :options="statusOptions"
              option-label="label"
              option-value="value"
              placeholder="اختر الحالة"
              class="w-full text-xs font-bold rounded-xl h-10 flex items-center"
            />
          </div>
        </div>

        <BaseInput
          v-model="formData.course.title"
          label="اسم الدورة"
          placeholder="مثال: برمجة تطبيقات الويب"
          required
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.course.round"
            label="رمز الجولة"
            placeholder="مثال: جولة 1 - 2026"
            required
          />
          <BaseInput
            v-model.number="formData.amount"
            type="number"
            label="المبلغ المدفوع (ريال)"
            placeholder="0"
          />
        </div>

        <BaseInput v-model="formData.paymentDate" type="date" label="تاريخ السداد" />
      </form>

      <template #footer>
        <BaseButton variant="secondary" size="sm" @click="isModalOpen = false">إلغاء</BaseButton>
        <BaseButton variant="primary" size="sm" class="!bg-[#3B5431] text-white" type="submit" form="appForm">
          حفظ البيانات
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  ClipboardList, UserCheck, CreditCard, XCircle, CheckCircle2,
  Plus, Search, X, Filter, RotateCcw, Clock, Eye, Edit, Trash2,
} from 'lucide-vue-next';

// PrimeVue — نفس الاستخدام في ActiveCoursesFilters و AppPagination
import Select from 'primevue/select';

// Shared UI Components
import AppKpiCard    from '@/shared/ui/Cards/AppKpiCard.vue';
import AppTable      from '@/shared/ui/Table/AppTable.vue';
import AppPagination from '@/shared/ui/Table/AppPagination.vue';
import BaseModal     from '@/shared/ui/Modals/BaseModal.vue';
import BaseButton    from '@/shared/ui/Buttons/BaseButton.vue';
import BaseInput     from '@/shared/ui/Inputs/BaseInput.vue';

// Shared Constants
import {
  APPLICATION_STATUS_CONFIG,
  TRAINEE_CATEGORY_CONFIG,
} from '@/shared/constants/statuses';

// ─── Helpers ────────────────────────────────────────────────────────────────
function getStatusConfig(key) {
  return APPLICATION_STATUS_CONFIG[key] || {
    label: key,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
  };
}

function getCategoryConfig(key) {
  return TRAINEE_CATEGORY_CONFIG[key] || {
    label: key,
    discount: '—',
    bg: 'bg-slate-100 text-slate-700 border-slate-300',
  };
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function formatCurrency(value) {
  if (!value && value !== 0) return '—';
  return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'SAR' }).format(value);
}

function getInitials(name) {
  if (!name) return 'م';
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
}

// ─── Seed Data ───────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  {
    id: 1, applicationId: 'APP-2026-001',
    trainee: { name: 'محمد أحمد علي',       category: 'MilitaryOfficer' },
    course:  { title: 'برمجة تطبيقات الويب',          round: 'جولة 1 - 2026' },
    status: 'PendingReview',  paymentDate: '2026-10-15', amount: 0,
  },
  {
    id: 2, applicationId: 'APP-2026-002',
    trainee: { name: 'سارة خالد محمود',      category: 'Civilian' },
    course:  { title: 'شبكات الحاسوب والبنية التحتية', round: 'جولة 2 - 2026' },
    status: 'WaitingPayment', paymentDate: '2026-10-20', amount: 2000,
  },
  {
    id: 3, applicationId: 'APP-2026-003',
    trainee: { name: 'خالد عمر الشريف',      category: 'MilitaryOfficer' },
    course:  { title: 'قواعد البيانات المتقدمة',       round: 'جولة 1 - 2026' },
    status: 'Enrolled',       paymentDate: '2026-09-30', amount: 900,
  },
  {
    id: 4, applicationId: 'APP-2026-004',
    trainee: { name: 'ليلى فاروق حسن',       category: 'MilitaryFamily' },
    course:  { title: 'تحليل الأنظمة والتصميم',       round: 'جولة 3 - 2026' },
    status: 'Rejected',       paymentDate: '',           amount: 0,
  },
  {
    id: 5, applicationId: 'APP-2026-005',
    trainee: { name: 'عمر محمد الزيداني',    category: 'Civilian' },
    course:  { title: 'إدارة المشاريع PMP',             round: 'جولة 2 - 2026' },
    status: 'PendingReview',  paymentDate: '2026-11-01', amount: 2200,
  },
  {
    id: 6, applicationId: 'APP-2026-006',
    trainee: { name: 'فاطمة سعد العلي',      category: 'PoliceOfficerOrFamily' },
    course:  { title: 'أمن المعلومات السيبراني',        round: 'جولة 1 - 2026' },
    status: 'WaitingPayment', paymentDate: '2026-10-28', amount: 1750,
  },
  {
    id: 7, applicationId: 'APP-2026-007',
    trainee: { name: 'أحمد يوسف الغامدي',   category: 'MilitaryOfficer' },
    course:  { title: 'الذكاء الاصطناعي وتعلم الآلة',  round: 'جولة 2 - 2026' },
    status: 'Enrolled',       paymentDate: '2026-10-10', amount: 1250,
  },
  {
    id: 8, applicationId: 'APP-2026-008',
    trainee: { name: 'نورة راشد العتيبي',    category: 'MilitaryFamily' },
    course:  { title: 'برمجة تطبيقات الويب',          round: 'جولة 1 - 2026' },
    status: 'PaymentMissed',  paymentDate: '',           amount: 0,
  },
];

// ─── State ────────────────────────────────────────────────────────────────────
const applications   = ref([...INITIAL_DATA]);
const isRefreshing   = ref(false);

const searchQuery      = ref('');
const selectedStatus   = ref(null);
const selectedCategory = ref(null);

const currentPage  = ref(1);
const itemsPerPage = ref(5);

const isModalOpen   = ref(false);
const isDetailsOpen = ref(false);
const isEditing     = ref(false);
const selectedApp   = ref(null);

const feedbackMessage = ref({ text: '', type: 'success' });
let feedbackTimer = null;

// ─── Select Options ───────────────────────────────────────────────────────────
const statusOptions = [
  { value: 'PendingReview',  label: 'قيد المراجعة' },
  { value: 'WaitingPayment', label: 'في انتظار السداد' },
  { value: 'PaymentMissed',  label: 'فات ميعاد السداد' },
  { value: 'Enrolled',       label: 'مقيد بالدورة' },
  { value: 'Completed',      label: 'انتهت الدورة' },
  { value: 'Rejected',       label: 'مرفوض' },
];

const categoryOptions = [
  { value: 'Civilian',              label: 'مدني (سعر كامل)' },
  { value: 'MilitaryOfficer',       label: 'ضباط القوات المسلحة (خصم 50%)' },
  { value: 'MilitaryFamily',        label: 'عائلات ضباط ق.م (خصم 30%)' },
  { value: 'PoliceOfficerOrFamily', label: 'ضباط الشرطة وعائلاتهم (خصم 30%)' },
];

const perPageOptions = [
  { label: '5 طلبات',  value: 5 },
  { label: '10 طلبات', value: 10 },
  { label: '20 طلب',   value: 20 },
];

// ─── Table Columns ────────────────────────────────────────────────────────────
const columns = [
  { key: 'applicationId', label: 'رقم الطلب',      cellClass: 'whitespace-nowrap' },
  { key: 'trainee',       label: 'المتدرب' },
  { key: 'category',      label: 'الفئة',           cellClass: 'whitespace-nowrap' },
  { key: 'course',        label: 'الدورة / الجولة' },
  { key: 'status',        label: 'الحالة',          cellClass: 'whitespace-nowrap' },
  { key: 'amount',        label: 'المبلغ',          cellClass: 'whitespace-nowrap' },
  { key: 'actions',       label: 'الإجراءات',       align: 'center', cellClass: 'whitespace-nowrap' },
];

// ─── Computed: KPI ────────────────────────────────────────────────────────────
const enrolledCount       = computed(() => applications.value.filter(a => a.status === 'Enrolled').length);
const waitingPaymentCount = computed(() => applications.value.filter(a => a.status === 'WaitingPayment').length);
const rejectedCount       = computed(() => applications.value.filter(a => a.status === 'Rejected').length);

// ─── Computed: Filter + Pagination ───────────────────────────────────────────
const filteredApplications = computed(() => {
  return applications.value.filter((app) => {
    if (selectedStatus.value && app.status !== selectedStatus.value) return false;
    if (selectedCategory.value && app.trainee.category !== selectedCategory.value) return false;
    if (searchQuery.value?.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      if (
        !app.trainee.name.toLowerCase().includes(q) &&
        !app.course.title.toLowerCase().includes(q) &&
        !app.applicationId.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });
});

const paginatedApplications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredApplications.value.slice(start, start + itemsPerPage.value);
});

// ─── Actions ──────────────────────────────────────────────────────────────────
function showFeedback(text, type = 'success') {
  feedbackMessage.value = { text, type };
  if (feedbackTimer) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => { feedbackMessage.value.text = ''; }, 4500);
}

function clearFilters() {
  searchQuery.value = '';
  selectedStatus.value = null;
  selectedCategory.value = null;
  currentPage.value = 1;
}

function resetToInitial() {
  isRefreshing.value = true;
  setTimeout(() => {
    applications.value = [...INITIAL_DATA];
    clearFilters();
    isRefreshing.value = false;
    showFeedback('تم تحديث قائمة الطلبات بنجاح', 'success');
  }, 400);
}

function openDetails(app) {
  selectedApp.value = app;
  isDetailsOpen.value = true;
}

const formData = ref({
  id: null, applicationId: '',
  trainee: { name: '', category: 'Civilian' },
  course:  { title: '', round: '' },
  status: 'PendingReview', paymentDate: '', amount: 0,
});

function openModal(app = null) {
  if (app) {
    isEditing.value = true;
    formData.value = {
      ...app,
      trainee: { ...app.trainee },
      course:  { ...app.course },
    };
  } else {
    isEditing.value = false;
    formData.value = {
      id: null,
      applicationId: `APP-2026-${String(applications.value.length + 1).padStart(3, '0')}`,
      trainee: { name: '', category: 'Civilian' },
      course:  { title: '', round: '' },
      status: 'PendingReview', paymentDate: '', amount: 0,
    };
  }
  isModalOpen.value = true;
}

function saveApplication() {
  if (!formData.value.trainee.name || !formData.value.course.title) return;

  if (isEditing.value && formData.value.id) {
    const idx = applications.value.findIndex(a => a.id === formData.value.id);
    if (idx !== -1) applications.value[idx] = { ...formData.value };
    showFeedback(`تم تعديل بيانات طلب «${formData.value.trainee.name}» بنجاح`, 'success');
  } else {
    const newId = applications.value.length ? Math.max(...applications.value.map(a => a.id)) + 1 : 1;
    applications.value.unshift({ ...formData.value, id: newId });
    showFeedback(`تم إضافة طلب «${formData.value.trainee.name}» بنجاح`, 'success');
  }

  isModalOpen.value = false;
}

function deleteApp(app) {
  applications.value = applications.value.filter(a => a.id !== app.id);
  showFeedback(`تم حذف طلب «${app.trainee.name}»`, 'error');
}
</script>
