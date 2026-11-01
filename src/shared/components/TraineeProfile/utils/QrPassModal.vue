<template>
  <div
    v-if="isOpen && course"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-scale-in">
      <!-- ترويسة التصريح الأمني -->
      <div class="p-4 bg-primary-900 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <ShieldCheck class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 class="text-xs font-black font-heading">
              تصريح دخول البوابة الإلكتروني
            </h3>
            <p class="text-[10px] text-primary-200">
              معهد نظم المعلومات للقوات المسلحة
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- محتوى كارت التصريح -->
      <div class="p-5 text-center space-y-4">
        <!-- صورة الدارس -->
        <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-primary-500 overflow-hidden mx-auto shadow-md">
          <img
            v-if="trainee?.profilePhotoPath"
            :src="trainee.profilePhotoPath"
            :alt="trainee.fullName"
            class="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading">
            {{ trainee?.fullName }}
          </h4>
          <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
            الرقم القومي: {{ trainee?.nationalId }}
          </div>
        </div>

        <!-- باركود الـ QR -->
        <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
          <div class="w-40 h-40 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
            <QrCode class="w-32 h-32 text-slate-900" />
          </div>
          <div class="font-mono text-xs font-bold text-primary-700 dark:text-primary-400 mt-2">
            {{ course.qrToken }}
          </div>
        </div>

        <!-- بيانات الدورة المسموح بدخولها -->
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-right space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-slate-500 text-[11px]">الدورة:</span>
            <strong class="text-emerald-800 dark:text-emerald-300 font-bold truncate max-w-[180px]">
              {{ course.courseName }}
            </strong>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 text-[11px]">مقر الانعقاد:</span>
            <strong class="text-slate-800 dark:text-slate-200">{{ course.hallName }}</strong>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 text-[11px]">التوقيت المصرح:</span>
            <strong class="font-mono text-slate-800 dark:text-slate-200">{{ course.timeRange }}</strong>
          </div>
        </div>
      </div>

      <!-- أسفل الكارت -->
      <div class="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center">
        <span class="text-[10px] text-slate-400 font-medium">
          يُبرز هذا الرمز لفرد الأمن عند بوابات الدخول للمعهد
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck, X, QrCode } from 'lucide-vue-next';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Object,
    default: null,
  },
  trainee: {
    type: Object,
    default: null,
  },
});

defineEmits(['close']);
</script>
