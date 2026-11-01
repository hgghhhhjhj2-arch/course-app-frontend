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
      <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-rose-50/50 dark:bg-rose-950/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold shadow-xs">
            <XCircle class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              رفض طلب الالتحاق
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              تحديد سبب الرفض وإشعار المتقدم لإمكانية إعادة التقديم
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
        <!-- ملخص الطلب -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
          <div class="flex justify-between">
            <span class="text-slate-400">اسم المتقدم:</span>
            <span class="font-bold text-slate-800 dark:text-slate-100">{{ application.trainee?.fullName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">رقم الطلب:</span>
            <span class="font-mono font-bold text-slate-700 dark:text-slate-200">{{ application.code }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">الدورة:</span>
            <span class="font-bold text-slate-700 dark:text-slate-200">{{ application.courseRound?.courseName }}</span>
          </div>
        </div>

        <!-- أسباب شائعة للاختيار السريع -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            أسباب شائعة للرفض (اختر سبب للتعبئة السريعة):
          </label>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="(reason, idx) in COMMON_REJECTION_REASONS"
              :key="idx"
              type="button"
              class="px-2.5 py-1 rounded-xl text-[11px] font-medium border text-right transition-all cursor-pointer"
              :class="
                rejectionReason === reason
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              "
              @click="rejectionReason = reason"
            >
              {{ reason }}
            </button>
          </div>
        </div>

        <!-- نص سبب الرفض المخصص -->
        <div class="space-y-1.5">
          <label class="block font-bold text-slate-700 dark:text-slate-200">
            نص سبب الرفض المدون بالمنظومة:
            <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="rejectionReason"
            rows="3"
            placeholder="اكتب سبب الرفض بالتفصيل ليظهر للمتقدم في حسابه..."
            class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all text-xs resize-none"
          ></textarea>
        </div>

        <!-- تحذير -->
        <div class="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2">
          <AlertCircle class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>تنبيه: سيتم نقل الطلب نهائياً لقائمة الطلبات المرفوضة، وسيتمكن المتقدم من الاطلاع على هذا السبب لتصحيح المستندات وإعادة التقديم لاحقاً.</span>
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
          :disabled="!rejectionReason.trim()"
          class="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
          @click="handleConfirm"
        >
          <XCircle class="w-4 h-4" />
          <span>تأكيد رفض الطلب</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { X, XCircle, AlertCircle } from 'lucide-vue-next';
import { COMMON_REJECTION_REASONS } from '../helpers/applicantConstants';

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

const rejectionReason = ref('');

watch(
  () => props.isOpen,
  (val) => {
    if (val) rejectionReason.value = '';
  }
);

function handleConfirm() {
  if (!rejectionReason.value.trim()) return;
  emit('confirm', {
    applicationId: props.application?.id,
    reason: rejectionReason.value.trim(),
  });
}
</script>
