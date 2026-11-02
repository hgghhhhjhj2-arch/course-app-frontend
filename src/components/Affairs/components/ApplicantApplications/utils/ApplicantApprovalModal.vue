<template>
  <div
    v-if="isOpen && application"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-fade-in"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden text-right transition-all"
      dir="rtl"
    >
      <!-- رأس المودال -->
      <div class="px-5 py-4 border-b border-emerald-100 dark:border-emerald-950/40 flex items-center justify-between shrink-0 bg-emerald-50/50 dark:bg-emerald-950/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold shadow-xs shrink-0">
            <CheckCircle2 class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              الموافقة على طلب الالتحاق وإصدار إذن السداد
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              مراجعة المقاعد الشاغرة وتحديد مهلة سداد الرسوم بالخزينة
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer transition-all hover:scale-105 border border-slate-200/60 dark:border-slate-700"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- محتوى النموذج قابل للتمرير -->
      <div class="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
        <!-- 1. ملخص المتقدم والدورة المختارة -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="space-y-0.5 sm:col-span-1">
            <span class="text-slate-400 text-[11px] block">اسم المتقدم:</span>
            <div class="font-bold text-slate-800 dark:text-slate-100 truncate" :title="application.trainee?.fullName">
              {{ application.trainee?.fullName }}
            </div>
            <div class="text-[10px] text-slate-400 font-mono">
              {{ application.code || ('#' + application.id) }}
            </div>
          </div>

          <div class="space-y-0.5 sm:col-span-1">
            <span class="text-slate-400 text-[11px] block">الدورة المختارة:</span>
            <div class="font-bold text-slate-700 dark:text-slate-200 truncate" :title="application.courseRound?.courseName">
              {{ application.courseRound?.courseName }}
            </div>
            <div class="text-[10px] text-primary-600 dark:text-primary-400 font-semibold">
              دفعة {{ application.courseRound?.roundNumber || 1 }}
            </div>
          </div>

          <div class="space-y-0.5 sm:col-span-1">
            <span class="text-slate-400 text-[11px] block">الرسوم المستحقة للخزينة:</span>
            <div class="font-black text-emerald-600 dark:text-emerald-400 text-sm font-heading">
              {{ formatEgyptianCurrency(application.courseRound?.price) }}
            </div>
            <span class="text-[10px] text-slate-400">سعر الفئة المعتمد</span>
          </div>
        </div>

        <!-- 2. كارت موقف السعة الاستيعابية والمقاعد الشاغرة (المطلب الرئيسي) -->
        <div
          class="p-4 rounded-2xl border transition-all"
          :class="seatStatus.cardClass"
        >
          <!-- رأس الكارت والشارة -->
          <div class="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b" :class="seatStatus.dividerClass">
            <div class="flex items-center gap-2">
              <Armchair class="w-4 h-4" :class="seatStatus.iconClass" />
              <span class="font-black text-slate-800 dark:text-slate-100 text-xs">
                موقف السعة والمقاعد الشاغرة بالدفعة
              </span>
            </div>

            <div
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs"
              :class="seatStatus.badgeClass"
            >
              <span class="w-2 h-2 rounded-full animate-pulse" :class="seatStatus.dotColor"></span>
              <span>{{ seatStatus.badgeText }}</span>
            </div>
          </div>

          <!-- الصناديق الرقمية الثلاثية -->
          <div class="grid grid-cols-3 gap-2.5 my-3">
            <!-- 1. السعة المعتمدة -->
            <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 text-center shadow-2xs">
              <div class="flex items-center justify-center gap-1 text-slate-400 text-[10px] mb-1">
                <Users class="w-3 h-3" />
                <span>السعة المعتمدة</span>
              </div>
              <div class="font-black text-slate-800 dark:text-slate-100 text-sm font-mono">
                {{ capacity }} <span class="text-[10px] font-normal text-slate-400">مقعد</span>
              </div>
            </div>

            <!-- 2. المسدد فعلياً -->
            <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 text-center shadow-2xs">
              <div class="flex items-center justify-center gap-1 text-slate-400 text-[10px] mb-1">
                <CheckCircle2 class="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>المسدد فعلياً</span>
              </div>
              <div class="font-black text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                {{ enrolledCount }} <span class="text-[10px] font-normal text-slate-400">متدرب</span>
              </div>
            </div>

            <!-- 3. المقاعد الشاغرة المتبقية -->
            <div
              class="p-2.5 rounded-xl border text-center shadow-2xs"
              :class="seatStatus.remainingBoxClass"
            >
              <div class="flex items-center justify-center gap-1 text-[10px] mb-1" :class="seatStatus.remainingLabelClass">
                <Armchair class="w-3 h-3" />
                <span>المقاعد الشاغرة</span>
              </div>
              <div class="font-black text-sm font-mono" :class="seatStatus.remainingTextClass">
                {{ remainingSeats }} <span class="text-[10px] font-normal opacity-75">مقعد</span>
              </div>
            </div>
          </div>

          <!-- شريط تقدم نسبة ملء القاعة بالسداد الفعلي -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              <span>نسبة السداد الفعلي بالقاعة:</span>
              <span class="font-mono font-bold">{{ fillPercentage }}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-700/80 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                :class="seatStatus.barColor"
                :style="{ width: `${fillPercentage}%` }"
              ></div>
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-400 mt-1">
              <span>تم سداد {{ enrolledCount }} من أصل {{ capacity }} مقعداً</span>
              <span v-if="pendingCount > 0" class="text-amber-600 dark:text-amber-400 font-semibold">
                ({{ pendingCount }} متقدمين لديهم إذن سداد سارٍ حالياً)
              </span>
            </div>
          </div>

          <!-- توضيح قاعدة أسبقية السداد في الخزينة -->
          <div class="mt-3 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 flex items-start gap-2">
            <Info class="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
            <div>
              <strong class="font-bold text-slate-800 dark:text-slate-100">قاعدة أسبقية السداد بالخزينة:</strong>
              الموافقة على الطلب تمنح المتدرب إذن سداد ومهلة محددة، <span class="text-primary-700 dark:text-primary-300 font-bold">بينما حجز المقعد الفعلي يتم فقط فور سداد الرسوم بالخزينة بأسبقية الدفع</span> حتى اكتمال سعة الـ ({{ capacity }} مقعداً). يمكنك الموافقة حتى لو تجاوز عدد الطلبات سعة القاعة.
            </div>
          </div>
        </div>

        <!-- 3. حقل تحديد مهلة السداد (PaymentDueDate) -->
        <div class="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
          <div class="flex items-center justify-between">
            <label class="block font-bold text-slate-800 dark:text-slate-200 text-xs">
              تاريخ استحقاق السداد (آخر موعد لزيارة الخزينة):
              <span class="text-rose-500">*</span>
            </label>
            <span v-if="dueDate" class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              {{ formatSelectedDueDate }}
            </span>
          </div>

          <input
            v-model="dueDate"
            type="date"
            :min="todayDateString"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-xs"
          />

          <!-- أزرار الاختيار السريع للمهلة -->
          <div class="flex items-center gap-1.5 pt-0.5 flex-wrap">
            <span class="text-[11px] text-slate-400 ml-1">مهلة سريعة:</span>
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
              @click="setQuickDueDate(2)"
            >
              بعد يومين (+2)
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
              @click="setQuickDueDate(3)"
            >
              بعد 3 أيام (+3)
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
              @click="setQuickDueDate(5)"
            >
              بعد 5 أيام (+5)
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
              @click="setQuickDueDate(7)"
            >
              بعد أسبوع (+7)
            </button>
          </div>
        </div>

        <!-- 4. ملاحظات إضافية للمتدرب -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            ملاحظات أو توجيهات للمتدرب (تظهر في إخطار القبول):
          </label>
          <textarea
            v-model="notes"
            rows="2"
            placeholder="مثال: يرجى إحضار أصل بطاقة الرقم القومي والمؤهل الدراسي عند زيارة الخزينة (مواعيد العمل من 9 صباحاً حتى 2 ظهراً)..."
            class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-xs resize-none"
          ></textarea>
        </div>

        <!-- 5. تنبيه تصريح الدخول المؤقت -->
        <div class="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-[11px] text-emerald-900 dark:text-emerald-300 leading-relaxed flex items-start gap-2">
          <Ticket class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span>فور الاعتماد، يُنشأ تصريح عبور إلكتروني مؤقت (QR Access Token) سارٍ للمتدرب حتى تاريخ الاستحقاق للسماح له بالدخول من بوابة المعهد والتوجه للخزينة.</span>
        </div>
      </div>

      <!-- تذييل المودال وأزرار الإجراءات -->
      <div class="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-slate-800/80">
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
          @click="$emit('close')"
        >
          إلغاء
        </button>

        <button
          type="button"
          :disabled="!dueDate"
          class="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
          :class="
            remainingSeats <= 0
              ? 'bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-700'
              : 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700'
          "
          @click="handleConfirm"
        >
          <CheckCircle2 class="w-4 h-4" />
          <span v-if="remainingSeats > 0">تأكيد الموافقة وإصدار إذن السداد</span>
          <span v-else>تأكيد الموافقة (إذن سداد - قائمة انتظار)</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  X,
  CheckCircle2,
  Info,
  Users,
  Armchair,
  Ticket,
} from 'lucide-vue-next';
import { formatEgyptianCurrency } from '../helpers/applicantConstants';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  application: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'confirm']);

const dueDate = ref('');
const notes = ref('');

// تاريخ اليوم بصيغة YYYY-MM-DD لمنع اختيار تاريخ قديم
const todayDateString = computed(() => {
  return new Date().toISOString().split('T')[0];
});

// الحسابات الخاصة بالسعة الاستيعابية والمقاعد الشاغرة
const capacity = computed(() => {
  return Number(props.application?.courseRound?.capacity) || 25;
});

const enrolledCount = computed(() => {
  return Number(props.application?.courseRound?.enrolledCount) || 0;
});

const pendingCount = computed(() => {
  return Number(props.application?.courseRound?.pendingPaymentCount ?? 3);
});

// المقاعد الشاغرة المتبقية
const remainingSeats = computed(() => {
  return Math.max(0, capacity.value - enrolledCount.value);
});

// نسبة امتلاء القاعة بالسداد الفعلي
const fillPercentage = computed(() => {
  if (capacity.value <= 0) return 0;
  return Math.min(100, Math.round((enrolledCount.value / capacity.value) * 100));
});

// تفاصيل حالة المقاعد والألوان والتنبيهات
const seatStatus = computed(() => {
  if (remainingSeats.value === 0) {
    return {
      type: 'full',
      badgeText: 'السعة مكتملة سداداً (0 مقعد شاغر)',
      cardClass: 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50',
      dividerClass: 'border-rose-100 dark:border-rose-900/40',
      iconClass: 'text-rose-600 dark:text-rose-400',
      dotColor: 'bg-rose-500',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
      remainingBoxClass: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
      remainingLabelClass: 'text-rose-600 dark:text-rose-400',
      remainingTextClass: 'text-rose-700 dark:text-rose-300',
      barColor: 'bg-rose-500',
    };
  }

  if (remainingSeats.value <= 5) {
    return {
      type: 'urgent',
      badgeText: `أوشكت على الاكتمال (متبقي ${remainingSeats.value} مقاعد فقط)`,
      cardClass: 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50',
      dividerClass: 'border-amber-100 dark:border-amber-900/40',
      iconClass: 'text-amber-600 dark:text-amber-400',
      dotColor: 'bg-amber-500',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
      remainingBoxClass: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
      remainingLabelClass: 'text-amber-600 dark:text-amber-400',
      remainingTextClass: 'text-amber-700 dark:text-amber-300',
      barColor: 'bg-amber-500',
    };
  }

  return {
    type: 'available',
    badgeText: `متاح ${remainingSeats.value} مقعد شاغر من أصل ${capacity.value}`,
    cardClass: 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50',
    dividerClass: 'border-emerald-100 dark:border-emerald-900/40',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    dotColor: 'bg-emerald-500',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
    remainingBoxClass: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
    remainingLabelClass: 'text-emerald-600 dark:text-emerald-400',
    remainingTextClass: 'text-emerald-700 dark:text-emerald-300',
    barColor: 'bg-emerald-500',
  };
});

// نص منسق لتاريخ المهلة المحدد
const formatSelectedDueDate = computed(() => {
  if (!dueDate.value) return '';
  try {
    const d = new Date(dueDate.value + 'T00:00:00');
    return d.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dueDate.value;
  }
});

// تعيين تاريخ افتراضي (بعد 3 أيام من اليوم)
function setDefaultDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  dueDate.value = d.toISOString().split('T')[0];
  notes.value = '';
}

function setQuickDueDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  dueDate.value = d.toISOString().split('T')[0];
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) setDefaultDueDate();
  }
);

function handleConfirm() {
  if (!dueDate.value) return;
  emit('confirm', {
    applicationId: props.application?.id,
    dueDate: dueDate.value,
    notes: notes.value,
  });
}
</script>
