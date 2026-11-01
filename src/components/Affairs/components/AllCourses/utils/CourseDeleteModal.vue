<template>
  <div
    v-if="isOpen && course"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
      <!-- 1. ترويسة التحذير -->
      <div class="p-5 border-b border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center justify-center">
            <Trash2 class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-black text-rose-900 dark:text-rose-100 font-heading">
              تأكيد حذف الدورة التدريبية
            </h3>
            <p class="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
              كتالوج الدورات المعتمدة بالمعهد
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-xl bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- 2. محتوى التأكيد -->
      <div class="p-5 space-y-4 text-xs">
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          هل أنت متأكد من رغبتك في حذف الدورة التدريبية التالية من الكتالوج؟
        </p>

        <!-- كارت اسم الدورة المستهدفة -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <strong class="font-black text-slate-800 dark:text-slate-100 text-sm block">
            {{ course.name }}
          </strong>
          <div class="text-[11px] text-slate-400 flex items-center gap-2">
            <span>{{ course.categoryArea }}</span>
            <span>•</span>
            <span>{{ course.roundsCount || 0 }} دفعات انعقاد</span>
          </div>
        </div>

        <!-- تنبيه تحذيري -->
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-amber-800 dark:text-amber-300 text-[11px]">
          <AlertTriangle class="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <span>
            تنبيه: سيؤدي الحذف إلى إزالة الدورة من كتالوج التقديم المتاح للدارسين والضباط بالمنظومة.
          </span>
        </div>
      </div>

      <!-- 3. أسفل المودال: أزرار التأكيد والإلغاء -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-end gap-2.5">
        <button
          type="button"
          class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          إلغاء الأمر
        </button>

        <button
          type="button"
          class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          @click="$emit('confirm', course)"
        >
          <Trash2 class="w-4 h-4" />
          <span>تأكيد الحذف نهائياً</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Trash2, X, AlertTriangle } from 'lucide-vue-next';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Object,
    default: null,
  },
});

defineEmits(['close', 'confirm']);
</script>
