<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border select-none',
      config.bg || 'bg-slate-100 text-slate-700 border-slate-200'
    ]"
  >
    <span class="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
    {{ config.label || status }}
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { APPLICATION_STATUS_CONFIG } from '@/shared/constants/statuses';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const config = computed(() => {
  return APPLICATION_STATUS_CONFIG[props.status] || {
    label: props.status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
  };
});
</script>
