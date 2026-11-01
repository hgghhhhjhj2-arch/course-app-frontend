<template>
  <div class="flex flex-col items-center justify-center p-8 text-slate-500">
    <div
      class="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin mb-3"
      :class="sizeClass"
    ></div>
    <p v-if="text" class="text-sm font-medium">{{ text }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: 'جاري التحميل...',
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
});

const sizeClass = computed(() => {
  return {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-14 h-14 border-4',
  }[props.size];
});
</script>
