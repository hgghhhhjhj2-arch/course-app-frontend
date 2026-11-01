<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-in">
      <!-- ترويسة المودال -->
      <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <IdCard class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading">
              مستندات الهوية والبطاقة الشخصية
            </h3>
            <p class="text-[11px] text-slate-400">
              الدارس: {{ trainee?.fullName }}
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center cursor-pointer"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- تبويبات المستندات -->
      <div class="px-4 pt-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <button
          type="button"
          class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          :class="activeDoc === 'front' ? 'bg-primary-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'"
          @click="activeDoc = 'front'"
        >
          وجه البطاقة
        </button>
        <button
          type="button"
          class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          :class="activeDoc === 'back' ? 'bg-primary-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'"
          @click="activeDoc = 'back'"
        >
          ظهر البطاقة
        </button>
        <button
          type="button"
          class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          :class="activeDoc === 'qualification' ? 'bg-primary-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'"
          @click="activeDoc = 'qualification'"
        >
          المؤهل الدراسي
        </button>
        <button
          v-if="trainee?.categoryProofPhotoPath"
          type="button"
          class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          :class="activeDoc === 'proof' ? 'bg-primary-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'"
          @click="activeDoc = 'proof'"
        >
          إثبات الفئة
        </button>
      </div>

      <!-- مساحة عرض الصورة -->
      <div class="p-5 overflow-y-auto flex items-center justify-center bg-slate-100/60 dark:bg-slate-950/40 min-h-[320px]">
        <div class="max-w-full max-h-[500px] rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <img
            :src="currentImageUrl"
            :alt="currentTitle"
            class="max-w-full max-h-[480px] object-contain"
          />
        </div>
      </div>

      <!-- أسفل المودال -->
      <div class="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-800/40">
        <span class="text-xs font-bold text-slate-600 dark:text-slate-300">
          {{ currentTitle }}
        </span>
        <button
          type="button"
          class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          إغلاق
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { IdCard, X } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  trainee: {
    type: Object,
    default: null,
  },
  initialDoc: {
    type: String,
    default: 'front',
  },
});

defineEmits(['close']);

const activeDoc = ref(props.initialDoc || 'front');

watch(
  () => props.initialDoc,
  (val) => {
    if (val) activeDoc.value = val;
  }
);

const currentImageUrl = computed(() => {
  if (!props.trainee) return '';
  switch (activeDoc.value) {
    case 'back':
      return props.trainee.nationalIdBackPhotoPath || props.trainee.nationalIdFrontPhotoPath;
    case 'qualification':
      return props.trainee.qualificationPhotoPath || props.trainee.nationalIdFrontPhotoPath;
    case 'proof':
      return props.trainee.categoryProofPhotoPath || props.trainee.nationalIdFrontPhotoPath;
    case 'front':
    default:
      return props.trainee.nationalIdFrontPhotoPath;
  }
});

const currentTitle = computed(() => {
  switch (activeDoc.value) {
    case 'back':
      return 'ظهر بطاقة الرقم القومي المدون به المهنة والحالة';
    case 'qualification':
      return 'شهادة المؤهل الدراسي المعتمدة';
    case 'proof':
      return 'كارنيه إثبات الفئة / صلة القرابة للخصم المعتمد';
    case 'front':
    default:
      return 'وجه بطاقة الرقم القومي المدون به الاسم والرقم القومي';
  }
});
</script>
