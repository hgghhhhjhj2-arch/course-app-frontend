<template>
  <div class="space-y-4">
    <!-- Step Header -->
    <div class="border-b border-slate-100 pb-2 mb-4">
      <h2 class="text-sm font-bold text-slate-800 flex items-center gap-2">
        <User class="w-4 h-4 text-primary-600" />
        البيانات الأساسية لإنشاء الحساب
      </h2>
      <p class="text-[11px] text-slate-400 mt-0.5">أدخل اسمك الرباعي وبيانات الاتصال وكلمة المرور</p>
    </div>

    <!-- Full Name (Arabic 4 names) -->
    <div class="space-y-1 text-right">
      <label class="text-xs font-bold text-slate-700 flex items-center justify-between">
        <span>الاسم الرباعي باللغة العربية <span class="text-rose-500">*</span></span>
        <span class="text-[10.5px] font-normal text-slate-400">مطابق لبطاقة الرقم القومي</span>
      </label>
      <div class="relative">
        <input
          v-model="form.fullName"
          type="text"
          placeholder="محمد أحمد إبراهيم علي"
          class="w-full rounded-xl border border-slate-300 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
        />
      </div>
    </div>

    <!-- Email & Phone Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Email -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700">
          البريد الإلكتروني <span class="text-rose-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail class="w-4 h-4" />
          </div>
          <input
            v-model="form.email"
            type="email"
            placeholder="name@example.com"
            dir="ltr"
            class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                   focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          />
        </div>
      </div>

      <!-- Phone -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700">
          رقم الهاتف للتواصل <span class="text-rose-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Phone class="w-4 h-4" />
          </div>
          <input
            v-model="form.phone"
            type="tel"
            maxlength="11"
            placeholder="01012345678"
            dir="ltr"
            class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                   focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          />
        </div>
      </div>
    </div>

    <!-- Password & Confirm Password Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Password -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700">
          كلمة المرور <span class="text-rose-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock class="w-4 h-4" />
          </div>
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••"
            dir="ltr"
            class="w-full pr-10 pl-11 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                   focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          />
          <button
            type="button"
            class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-primary-700 transition-colors cursor-pointer"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" class="w-4 h-4" />
            <Eye v-else class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="space-y-1 text-right">
        <label class="text-xs font-bold text-slate-700">
          تأكيد كلمة المرور <span class="text-rose-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock class="w-4 h-4" />
          </div>
          <input
            v-model="form.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••"
            dir="ltr"
            class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                   focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          />
        </div>
      </div>
    </div>

    <!-- Profile Photo Upload (Optional) -->
    <div class="space-y-1.5 pt-2">
      <label class="text-xs font-bold text-slate-700 flex items-center justify-between">
        <span>الصورة الشخصية للمتدرب (اختيارية)</span>
        <span class="text-[10.5px] text-slate-400">تظهر لرجل الأمن عند مسح تصريح الدخول</span>
      </label>
      <div class="flex items-center gap-4 p-3 bg-slate-50/80 rounded-2xl border border-dashed border-slate-300">
        <div class="w-14 h-14 rounded-full bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
          <img
            v-if="profilePhotoPreview"
            :src="profilePhotoPreview"
            alt="صورة المتدرب"
            class="w-full h-full object-cover"
          />
          <User v-else class="w-6 h-6 text-slate-400" />
        </div>
        <div class="flex-1">
          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onProfilePhotoChange"
          />
          <label
            for="profile-photo-input"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-300 hover:text-primary-700 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs transition-all"
          >
            <Upload class="w-3.5 h-3.5" />
            <span>{{ profilePhotoPreview ? 'تغيير الصورة' : 'اختر صورة من جهازك' }}</span>
          </label>
          <p class="text-[10.5px] text-slate-400 mt-1">صيغ مدعومة: JPG، PNG (الحد الأقصى 2 ميجابايت)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { User, Mail, Phone, Lock, Eye, EyeOff, Upload } from 'lucide-vue-next';

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  profilePhotoPreview: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['profilePhotoUpload']);
const showPassword = ref(false);

function onProfilePhotoChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  emit('profilePhotoUpload', { file, previewUrl: url });
}
</script>
