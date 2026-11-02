<template>
  <div class="space-y-4">
    <!-- Step Header -->
    <div class="border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
      <h2 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <CreditCard class="w-4 h-4 text-primary-600 dark:text-primary-400" />
        بيانات ومستندات بطاقة الرقم القومي
      </h2>
      <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">وفقاً لاشتراطات معهد نظم المعلومات للقوات المسلحة</p>
    </div>

    <!-- National ID Number (14 digits) -->
    <div class="space-y-1 text-right">
      <label class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>الرقم القومي (14 رقم) <span class="text-rose-500">*</span></span>
        <span v-if="extractedInfoNotice" class="text-[10.5px] text-primary-700 dark:text-primary-400 font-semibold">
          {{ extractedInfoNotice }}
        </span>
      </label>
      <div class="relative">
        <input
          v-model="form.nationalId"
          type="text"
          maxlength="14"
          placeholder="29901010101234"
          dir="ltr"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm font-mono tracking-wider text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          @input="$emit('nationalIdInput')"
        />
      </div>
    </div>

    <!-- National ID Front & Back Photo Uploads Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
      <!-- Front Photo -->
      <ImageUploadBox
        label="صورة وجه البطاقة"
        :required="true"
        :preview="frontPhotoPreview"
        placeholder-text="رفع وجه البطاقة"
        sub-text="صورة واضحة للبيانات"
        @file-change="$emit('frontPhotoUpload', $event)"
      />

      <!-- Back Photo -->
      <ImageUploadBox
        label="صورة ظهر البطاقة"
        :required="true"
        :preview="backPhotoPreview"
        placeholder-text="رفع ظهر البطاقة"
        sub-text="صورة واضحة للوظيفة والحالة"
        @file-change="$emit('backPhotoUpload', $event)"
      />
    </div>

    <!-- Date of Birth & Gender Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Date of Birth -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          تاريخ الميلاد <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.dateOfBirth"
          type="date"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        />
      </div>

      <!-- Gender -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          النوع <span class="text-rose-500">*</span>
        </label>
        <select
          v-model="form.gender"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        >
          <option value="Male" class="dark:bg-slate-800">ذكر</option>
          <option value="Female" class="dark:bg-slate-800">أنثى</option>
        </select>
      </div>
    </div>

    <!-- Religion & Marital Status Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Religion -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          الديانة <span class="text-rose-500">*</span>
        </label>
        <select
          v-model="form.religion"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        >
          <option value="Muslim" class="dark:bg-slate-800">مسلم</option>
          <option value="Christian" class="dark:bg-slate-800">مسيحي</option>
          <option value="Other" class="dark:bg-slate-800">أخرى</option>
        </select>
      </div>

      <!-- Marital Status -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          الحالة الاجتماعية <span class="text-rose-500">*</span>
        </label>
        <select
          v-model="form.maritalStatus"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        >
          <option value="Single" class="dark:bg-slate-800">أعزب / آنسة</option>
          <option value="Married" class="dark:bg-slate-800">متزوج / متزوجة</option>
          <option value="Divorced" class="dark:bg-slate-800">مطلق / مطلقة</option>
          <option value="Widowed" class="dark:bg-slate-800">أرمل / أرملة</option>
        </select>
      </div>
    </div>

    <!-- Occupation & Expiry Date Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Occupation -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          المهنة المدونة بالبطاقة <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.occupation"
          type="text"
          placeholder="طالب / مهندس / موظف..."
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        />
      </div>

      <!-- National ID Expiry Date -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          تاريخ سريان / انتهاء البطاقة <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.nationalIdExpiryDate"
          type="date"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        />
      </div>
    </div>

    <!-- Governorate & Detailed Address Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Governorate -->
      <div class="space-y-1 text-right sm:col-span-1">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          المحافظة <span class="text-rose-500">*</span>
        </label>
        <select
          v-model="form.governorate"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        >
          <option value="" disabled class="dark:bg-slate-800">اختر المحافظة</option>
          <option v-for="gov in EGYPTIAN_GOVERNORATES" :key="gov" :value="gov" class="dark:bg-slate-800">
            {{ gov }}
          </option>
        </select>
      </div>

      <!-- Address -->
      <div class="space-y-1 text-right sm:col-span-2">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
          العنوان المدون بالبطاقة <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.address"
          type="text"
          placeholder="رقم العقار، اسم الشارع، الحي/المنطقة"
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all
                 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreditCard } from 'lucide-vue-next';
import ImageUploadBox from './ImageUploadBox.vue';
import { EGYPTIAN_GOVERNORATES } from '../helpers/authConstants';

defineProps({
  form: {
    type: Object,
    required: true,
  },
  frontPhotoPreview: {
    type: String,
    default: '',
  },
  backPhotoPreview: {
    type: String,
    default: '',
  },
  extractedInfoNotice: {
    type: String,
    default: '',
  },
});

defineEmits(['nationalIdInput', 'frontPhotoUpload', 'backPhotoUpload']);
</script>
