<template>
  <div
    :class="[
      'bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 transition-all',
      hover && 'hover:shadow-md hover:border-slate-300',
    ]"
  >
    <div v-if="$slots.header || title" class="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
      <div>
        <h3 v-if="title" class="font-bold text-slate-800 text-base">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-slate-400 mt-0.5">{{ subtitle }}</p>
      </div>
      <slot name="header-action" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="pt-3.5 mt-4 border-t border-slate-100">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  hover: {
    type: Boolean,
    default: false,
  },
});
</script>
