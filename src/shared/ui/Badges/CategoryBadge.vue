<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border select-none',
      config.bg || 'bg-slate-100 text-slate-700 border-slate-300'
    ]"
  >
    {{ config.label || category }}
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { TRAINEE_CATEGORY_CONFIG } from '@/shared/constants/statuses';

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const config = computed(() => {
  return TRAINEE_CATEGORY_CONFIG[props.category] || {
    label: props.category,
    bg: 'bg-slate-100 text-slate-700 border-slate-300',
  };
});
</script>
