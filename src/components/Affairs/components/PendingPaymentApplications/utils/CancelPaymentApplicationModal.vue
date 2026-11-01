<template>
  <div
    v-if="isOpen && application"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
      <!-- ترويسة المودال -->
      <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/40">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center">
            <XCircle class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              إلغاء طلب السداد
            </h3>
            <p class="text-xs text-rose-600 dark:text-rose-400 mt-0.5 font-medium">
              سيتم إلغاء قيد المتقدم وتحرير المقعد المحجوز بالدورة
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

      <!-- محتوى المودال -->
      <form class="p-5 space-y-4 text-xs" @submit.prevent="handleConfirm">
        <!-- كارت ملخص بيانات الطلب -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-slate-400 font-medium">المتقدم:</span>
            <span class="font-bold text-slate-800 dark:text-slate-100">{{ application.trainee?.fullName }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400 font-medium">الدورة التدريبية:</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">{{ application.courseRound?.courseName }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400 font-medium">كود الطلب:</span>
            <span class="font-mono font-bold text-primary-700 dark:text-primary-400">{{ application.code }}</span>
          </div>
        </div>

        <!-- أسباب الإلغاء الشائعة -->
        <div class="space-y-2">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            حدد سبب الإلغاء <span class="text-rose-500">*</span>
          </label>
          <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <label
              v-for="reason in COMMON_CANCELLATION_REASONS"
              :key="reason"
              class="flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer select-none"
              :class="
                selectedReason === reason
                  ? 'border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/40 text-slate-800 dark:text-slate-100 font-bold'
                  : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'
              "
            >
              <input
                v-model="selectedReason"
                type="radio"
                name="cancellationReason"
                :value="reason"
                class="mt-0.5 text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <span class="leading-relaxed">{{ reason }}</span>
            </label>
          </div>
        </div>

        <!-- ملاحظات إضافية -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            ملاحظات أو توضيحات إضافية (اختياري)
          </label>
          <textarea
            v-model="customNote"
            rows="2"
            placeholder="اكتب أي ملاحظات إضافية بخصوص سبب الإلغاء..."
            class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
          ></textarea>
        </div>

        <!-- تنبيه تحذيري -->
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <AlertTriangle class="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>سيتم إبطال رمز QR المخصص لدخول الخزينة، ولن يتمكن المتقدم من السداد بهذا الطلب.</span>
        </div>

        <!-- أزرار الإجراء -->
        <div class="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors cursor-pointer"
            @click="$emit('close')"
          >
            تراجع
          </button>
          <button
            type="submit"
            :disabled="!selectedReason"
            class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-black flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-rose-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle class="w-4 h-4" />
            <span>تأكيد إلغاء الطلب</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { XCircle, X, AlertTriangle } from 'lucide-vue-next';
import { COMMON_CANCELLATION_REASONS } from '../helpers/pendingPaymentConstants';

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

const selectedReason = ref(COMMON_CANCELLATION_REASONS[0]);
const customNote = ref('');

watch(
  () => props.application,
  () => {
    selectedReason.value = COMMON_CANCELLATION_REASONS[0];
    customNote.value = '';
  },
  { immediate: true }
);

function handleConfirm() {
  if (!selectedReason.value) return;
  const finalReason = customNote.value.trim()
    ? `${selectedReason.value} - ${customNote.value.trim()}`
    : selectedReason.value;

  emit('confirm', {
    applicationId: props.application.id,
    reason: finalReason,
  });
}
</script>
