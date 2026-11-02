<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-xs font-semibold text-slate-700 dark:text-slate-300">
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>
    <div class="relative flex items-center">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full rounded-xl border bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none',
          error
            ? 'border-rose-400 dark:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-950/40'
            : 'border-slate-300 dark:border-slate-700 focus:border-[#3B5431] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#3B5431]/20',
          disabled && 'bg-slate-50 dark:bg-slate-800 cursor-not-allowed opacity-75',
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
    </div>
    <span v-if="error" class="text-xs font-medium text-rose-500 dark:text-rose-400">{{ error }}</span>
    <span v-else-if="hint" class="text-xs text-slate-400 dark:text-slate-500">{{ hint }}</span>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue', 'blur']);
</script>
