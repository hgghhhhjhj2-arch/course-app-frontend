<template>
  <div class="space-y-1.5 text-right">
    <label v-if="label" class="text-xs font-bold text-slate-700 dark:text-slate-300 block">
      {{ label }} <span v-if="required" class="text-rose-500">*</span>
    </label>

    <div
      :class="[
        'relative rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-3 text-center cursor-pointer overflow-hidden',
        heightClass,
        preview
          ? 'border-primary-400 dark:border-primary-600 bg-slate-50 dark:bg-slate-800/80'
          : borderClass
      ]"
      @click="triggerFileInput"
    >
      <!-- Preview Image -->
      <img
        v-if="preview"
        :src="preview"
        :alt="label"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Placeholder Content -->
      <template v-else>
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center mb-1', iconBgClass]">
          <component :is="iconComponent" class="w-5 h-5" />
        </div>
        <span class="text-xs font-bold text-slate-700 dark:text-slate-200">{{ placeholderText }}</span>
        <span v-if="subText" class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{{ subText }}</span>
      </template>

      <!-- Hover Overlay when preview exists -->
      <div
        v-if="preview"
        class="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-xs"
      >
        <Upload class="w-4 h-4" />
        <span>تغيير الصورة</span>
      </div>

      <!-- Hidden Input -->
      <input
        ref="fileInputRef"
        type="file"
        :accept="accept"
        class="hidden"
        @change="onFileSelected"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Upload, Image } from 'lucide-vue-next';

const props = defineProps({
  label: { type: String, default: '' },
  required: { type: Boolean, default: false },
  preview: { type: String, default: '' },
  heightClass: { type: String, default: 'h-32' },
  placeholderText: { type: String, default: 'رفع الصورة' },
  subText: { type: String, default: '' },
  accept: { type: String, default: 'image/*' },
  borderClass: { type: String, default: 'border-slate-300 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-primary-50/20 dark:hover:bg-primary-950/20' },
  iconBgClass: { type: String, default: 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400' },
  iconComponent: { type: Object, default: () => Image },
});

const emit = defineEmits(['fileChange', 'clear']);
const fileInputRef = ref(null);

function triggerFileInput() {
  if (fileInputRef.value) fileInputRef.value.click();
}

function onFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  emit('fileChange', { file, previewUrl: url });
}
</script>
