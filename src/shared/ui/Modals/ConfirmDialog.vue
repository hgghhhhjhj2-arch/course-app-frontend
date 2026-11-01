<template>
  <BaseModal
    :model-value="modelValue"
    :title="title"
    max-width="sm"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <p class="text-sm text-slate-600 mb-2">{{ message }}</p>

    <template #footer>
      <BaseButton variant="secondary" size="sm" @click="$emit('update:modelValue', false)">
        {{ cancelText }}
      </BaseButton>
      <BaseButton :variant="confirmVariant" size="sm" :loading="loading" @click="$emit('confirm')">
        {{ confirmText }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from '../Buttons/BaseButton.vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'تأكيد الإجراء',
  },
  message: {
    type: String,
    default: 'هل أنت متأكد من رغبتك في إتمام هذا الإجراء؟',
  },
  confirmText: {
    type: String,
    default: 'تأكيد',
  },
  cancelText: {
    type: String,
    default: 'إلغاء',
  },
  confirmVariant: {
    type: String,
    default: 'danger',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue', 'confirm']);
</script>
