<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <span class="text-xs font-semibold text-slate-500">{{ title }}</span>
      <span class="text-2xl font-black text-slate-800 tracking-tight">{{ value }}</span>
      <span v-if="subtitle" class="text-xs text-slate-400">{{ subtitle }}</span>
    </div>
    <div
      v-if="$slots.icon"
      :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
        iconBg || 'bg-primary-50 text-primary-600'
      ]"
    >
      <slot name="icon" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  iconBg: {
    type: String,
    default: '',
  },
});
</script>
