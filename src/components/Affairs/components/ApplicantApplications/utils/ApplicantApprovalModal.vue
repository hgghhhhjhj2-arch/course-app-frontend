<template>
  <div
    v-if="isOpen && application"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-fade-in"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden text-right transition-all"
      dir="rtl"
    >
      <!-- رأس المودال -->
      <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-emerald-50/40 dark:bg-emerald-950/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold shadow-xs">
            <CheckCircle2 class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              الموافقة على طلب الالتحاق
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              نقل الطلب لحالة «في انتظار سداد الرسوم» وإصدار تصريح السداد
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- محتوى النموذج -->
      <div class="p-5 space-y-4 text-xs">
        <!-- ملخص المتقدم والدورة -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-400">اسم المتقدم:</span>
            <span class="font-bold text-slate-800 dark:text-slate-100">{{ application.trainee?.fullName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">الدورة المختارة:</span>
            <span class="font-bold text-slate-700 dark:text-slate-200">{{ application.courseRound?.courseName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">الرسوم المستحقة للخزينة:</span>
            <span class="font-black text-emerald-600 dark:text-emerald-400">{{ formatEgyptianCurrency(application.courseRound?.price) }}</span>
          </div>
        </div>

        <!-- حقل تحديد مهلة السداد (PaymentDueDate) -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            تاريخ استحقاق السداد (آخر موعد لزيارة الخزينة):
            <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="dueDate"
            type="date"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-xs"
          />
          <!-- أزرار الاختيار السريع للمهلة -->
          <div class="flex items-center gap-1.5 pt-1">
            <span class="text-[11px] text-slate-400">خيارات سريعة:</span>
            <button
              type="button"
              class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-emerald-700 text-[10px] font-bold transition-colors cursor-pointer"
              @click="setQuickDueDate(3)"
            >
              بعد 3 أيام
            </button>
            <button
              type="button"
              class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-emerald-700 text-[10px] font-bold transition-colors cursor-pointer"
              @click="setQuickDueDate(5)"
            >
              بعد 5 أيام
            </button>
            <button
              type="button"
              class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-emerald-700 text-[10px] font-bold transition-colors cursor-pointer"
              @click="setQuickDueDate(7)"
            >
              بعد أسبوع
            </button>
          </div>
        </div>

        <!-- ملاحظات إضافية للمتدرب -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            ملاحظات أو توجيهات للمتدرب (اختياري):
          </label>
          <textarea
            v-model="notes"
            rows="2"
            placeholder="مثال: يرجى إحضار أصل المؤهل والبطاقة عند التوجه للخزينة..."
            class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-xs resize-none"
          ></textarea>
        </div>

        <!-- تنبيه توضيحي -->
        <div class="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed flex items-start gap-2">
          <Info class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span>بمجرد التأكيد، سيتم إصدار تصريح دخول إلكتروني مؤقت (QR Token) سارٍ للمتدرب في يوم السداد فقط للعبور من البوابة ودفع الرسوم في خزينة المعهد.</span>
        </div>
      </div>

      <!-- تذييل المودال -->
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
          class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
          @click="handleConfirm"
        >
          <CheckCircle2 class="w-4 h-4" />
          <span>تأكيد القبول والانتقال للسداد</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { X, CheckCircle2, Info } from 'lucide-vue-next';
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
