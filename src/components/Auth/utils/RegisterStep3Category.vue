<template>
  <div class="space-y-5">
    <!-- Step Header -->
    <div class="border-b border-slate-100 pb-2 mb-4">
      <h2 class="text-sm font-bold text-slate-800 flex items-center gap-2">
        <Award class="w-4 h-4 text-primary-600" />
        فئة المتدرب ونسبة الخصم المعتمدة
      </h2>
      <p class="text-[11px] text-slate-400 mt-0.5">حدد فئتك بدقة للاستفادة من أسعار وخصومات معهد نظم المعلومات</p>
    </div>

    <!-- Categories Radio Selection Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label
        v-for="cat in categoryOptions"
        :key="cat.value"
        class="relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between"
        :class="[
          form.category === cat.value
            ? 'border-primary-600 bg-primary-50/40 shadow-xs'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
        ]"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <input
              v-model="form.category"
              type="radio"
              :value="cat.value"
              class="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <span class="text-xs font-bold text-slate-800">{{ cat.label }}</span>
          </div>
          <span
            class="text-[10.5px] font-bold px-2 py-0.5 rounded-full border"
            :class="cat.badgeClass"
          >
            {{ cat.discount }}
          </span>
        </div>
        <p class="text-[10.5px] text-slate-500 mt-2 pr-6">
          {{ cat.desc }}
        </p>
      </label>
    </div>

    <!-- Category Proof Document Upload (Mandatory if non-Civilian) -->
    <div
      v-if="form.category !== 'Civilian'"
      class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3 transition-all"
    >
      <div class="flex items-start gap-2 text-amber-900">
        <ShieldAlert class="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <h3 class="text-xs font-bold">مطلوب إثبات فئة الخصم (كارنيه أو بطاقة علاجية) <span class="text-rose-500">*</span></h3>
          <p class="text-[11px] text-amber-800 mt-0.5">
            يرجى رفع صورة واضحة لكارنيه القوات المسلحة أو الشرطة أو إثبات صلة القرابة لاعتماد الخصم.
          </p>
        </div>
      </div>

      <ImageUploadBox
        label=""
        height-class="h-28"
        :preview="categoryProofPreview"
        placeholder-text="رفع صورة كارنيه / إثبات الفئة"
        sub-text="اضغط للاختيار من جهازك"
        border-class="border-amber-300 hover:border-amber-400 bg-white"
        icon-bg-class="bg-amber-100 text-amber-700"
        @file-change="$emit('categoryProofUpload', $event)"
      />
    </div>

    <!-- Terms & Confirmation Checkbox -->
    <div class="pt-2">
      <label class="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          v-model="form.agreeTerms"
          type="checkbox"
          class="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
        />
        <span class="text-xs text-slate-600 leading-relaxed">
          أقر بصحة جميع البيانات والمستندات المرفقة، وأتحمل المسؤولية القانونية في حال عدم صحتها، كما أوافق على شروط ولوائح معهد نظم المعلومات للقوات المسلحة.
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { Award, ShieldAlert } from 'lucide-vue-next';
import ImageUploadBox from './ImageUploadBox.vue';
import { TRAINEE_CATEGORY_OPTIONS } from '../helpers/authConstants';

defineProps({
  form: {
    type: Object,
    required: true,
  },
  categoryProofPreview: {
    type: String,
    default: '',
  },
});

defineEmits(['categoryProofUpload']);

const categoryOptions = TRAINEE_CATEGORY_OPTIONS;
</script>
