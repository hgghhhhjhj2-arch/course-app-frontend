<template>
  <div
    v-if="isOpen && application"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-in">
      <!-- ترويسة المودال -->
      <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-primary-50 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 flex items-center justify-center">
            <UserCheck class="w-5 h-5" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
                تفاصيل طلب سداد الرسوم
              </h3>
              <span class="font-mono text-xs font-bold text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/70 px-2 py-0.5 rounded-md border border-primary-200 dark:border-primary-800">
                {{ application.code }}
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              مراجعة بيانات المتقدم، الدورة، حالة الاستحقاق، ومستندات التحقق
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
        <!-- 1. شريط حالة مهلة السداد -->
        <div
          class="p-3.5 rounded-2xl border flex items-center justify-between"
          :class="getDueInfo(application.paymentDueDate).badgeClass"
        >
          <div class="flex items-center gap-2.5">
            <CalendarClock class="w-5 h-5 shrink-0" />
            <div>
              <div class="font-bold text-sm">
                {{ getDueInfo(application.paymentDueDate).statusText }}
              </div>
              <div class="text-[11px] opacity-80 mt-0.5">
                تاريخ الاستحقاق المحدد: {{ formatDateOnly(application.paymentDueDate) }}
              </div>
            </div>
          </div>
          <div class="text-left font-mono text-[11px]">
            رمز السداد: <strong>{{ application.qrToken }}</strong>
          </div>
        </div>

        <!-- 2. كارت بيانات المتدرب الشخصية -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <h4 class="font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-700">
            <User class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>بيانات المتقدم الأساسية</span>
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-200">
            <div>
              <span class="text-slate-400 block text-[11px]">الاسم الكامل:</span>
              <strong class="text-sm font-bold">{{ application.trainee?.fullName }}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">الرقم القومي:</span>
              <span class="font-mono font-bold">{{ application.trainee?.nationalId }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">رقم الهاتف:</span>
              <span class="font-mono font-bold">{{ application.trainee?.phone }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">البريد الإلكتروني:</span>
              <span class="font-mono">{{ application.trainee?.email || '—' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">الوظيفة بالبطاقة:</span>
              <span>{{ application.trainee?.occupation || '—' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">المحافظة والعنوان:</span>
              <span>{{ application.trainee?.governorate }} - {{ application.trainee?.address }}</span>
            </div>
          </div>
        </div>

        <!-- 3. كارت تفاصيل الدورة والرسوم -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <h4 class="font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-700">
            <GraduationCap class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>الدورة التدريبية ومواعيد المحاضرات</span>
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-200">
            <div>
              <span class="text-slate-400 block text-[11px]">اسم الدورة:</span>
              <strong class="font-bold">{{ application.courseRound?.courseName }}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">المحاضر والقاعة:</span>
              <span>{{ application.courseRound?.instructorName }} • {{ application.courseRound?.hallName }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">تاريخ الانعقاد:</span>
              <span>من {{ formatDateOnly(application.courseRound?.startDate) }} حتى {{ formatDateOnly(application.courseRound?.endDate) }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">الرسوم المقررة للسداد:</span>
              <span class="text-sm font-black text-primary-700 dark:text-primary-300 font-heading">
                {{ formatEgyptianCurrency(application.courseRound?.price) }}
              </span>
            </div>
          </div>
        </div>

        <!-- 4. المرفقات والمستندات -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
          <h4 class="font-black text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 pb-1">
            <FileText class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>المستندات المرفقة بالطلب</span>
          </h4>

          <div class="flex flex-wrap items-center gap-2 pt-1">
            <a
              v-if="application.qualificationPhotoPath"
              :href="application.qualificationPhotoPath"
              target="_blank"
              class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-primary-700 dark:text-primary-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink class="w-3.5 h-3.5" />
              <span>شهادة المؤهل الدراسي</span>
            </a>
            <a
              v-if="application.trainee?.categoryProofPhotoPath"
              :href="application.trainee.categoryProofPhotoPath"
              target="_blank"
              class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink class="w-3.5 h-3.5" />
              <span>كارنيه إثبات الفئة</span>
            </a>
          </div>
        </div>
      </div>

      <!-- أسفل المودال: أزرار الإجراءات السريعة -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <button
          type="button"
          class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          إغلاق النافذة
        </button>

        <div class="flex items-center gap-2">
          <!-- زر تحديد موعد جديد -->
          <button
            type="button"
            class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-amber-500/20"
            @click="$emit('reschedule', application)"
          >
            <CalendarClock class="w-4 h-4" />
            <span>تحديد موعد جديد</span>
          </button>

          <!-- زر إلغاء الطلب -->
          <button
            type="button"
            class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-rose-600/20"
            @click="$emit('cancel', application)"
          >
            <XCircle class="w-4 h-4" />
            <span>إلغاء الطلب</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserCheck,
  X,
  CalendarClock,
  User,
  GraduationCap,
  FileText,
  ExternalLink,
  XCircle,
} from 'lucide-vue-next';
import {
  formatDateOnly,
  formatEgyptianCurrency,
  getPaymentDueStatus,
} from '../helpers/pendingPaymentConstants';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  application: {
    type: Object,
    default: null,
  },
});

defineEmits(['close', 'reschedule', 'cancel']);

function getDueInfo(dateStr) {
  return getPaymentDueStatus(dateStr);
}
</script>
