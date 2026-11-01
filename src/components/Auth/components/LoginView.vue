<template>
  <AuthCardLayout
    max-width-class="max-w-[430px]"
    subtitle="منظومة إدارة الدورات التدريبية"
    security-note="المنظومة تعمل داخل شبكة المعهد فقط — جميع الاتصالات مؤمنة"
  >
    <!-- Form Body -->
    <form class="p-6 sm:p-7 space-y-4" @submit.prevent="handleLogin">
      <!-- Email Field -->
      <div class="space-y-1.5 text-right">
        <label for="login-email" class="text-xs font-bold text-slate-600 flex items-center gap-1.5">
          <Mail class="w-3.5 h-3.5 text-slate-400" />
          البريد الإلكتروني
        </label>
        <div class="relative">
          <input
            id="login-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="example@isi.edu.eg"
            dir="ltr"
            class="w-full rounded-xl border border-slate-300 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                   focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div class="space-y-1.5 text-right">
        <label for="login-password" class="text-xs font-bold text-slate-600 flex items-center gap-1.5">
          <Lock class="w-3.5 h-3.5 text-slate-400" />
          كلمة المرور
        </label>
        <div class="relative">
          <input
            id="login-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            dir="ltr"
            class="w-full rounded-xl border border-slate-300 bg-slate-50/60 px-4 py-2.5 pl-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all
                   focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:shadow-xs"
          />
          <button
            type="button"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" class="w-4 h-4" />
            <Eye v-else class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Remember Me -->
      <div class="flex items-center justify-between pt-0.5">
        <label class="flex items-center gap-2 cursor-pointer select-none group">
          <input
            v-model="form.rememberMe"
            type="checkbox"
            class="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
          />
          <span class="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">تذكرني على هذا الجهاز</span>
        </label>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMsg"
        class="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
      >
        <AlertCircle class="w-4 h-4 shrink-0" />
        <span>{{ errorMsg }}</span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-3 bg-gradient-to-l from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800
               text-white font-bold rounded-xl text-sm transition-all duration-200 cursor-pointer
               shadow-lg shadow-primary-700/20 hover:shadow-primary-700/30
               active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed
               flex items-center justify-center gap-2"
      >
        <svg
          v-if="isLoading"
          class="animate-spin w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <LogIn v-else class="w-4 h-4" />
        <span>{{ isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}</span>
      </button>
    </form>

    <!-- Card Footer: Register Link -->
    <div class="px-6 sm:px-7 pb-6">
      <div class="relative flex items-center justify-center mb-4">
        <span class="absolute inset-x-0 h-px bg-slate-200"></span>
        <span class="relative bg-white px-3 text-[11px] text-slate-400 font-semibold">أو</span>
      </div>

      <RouterLink
        to="/auth/register"
        class="w-full py-2.5 border-2 border-slate-200 hover:border-primary-300 hover:bg-primary-50/50
               text-slate-700 hover:text-primary-700 font-bold rounded-xl text-xs transition-all cursor-pointer
               flex items-center justify-center gap-2"
      >
        <UserPlus class="w-4 h-4" />
        إنشاء حساب متدرب جديد
      </RouterLink>
    </div>

    <!-- Quick Demo Role Selector (Helper) -->
    <div class="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px]">
      <span class="text-slate-400 font-medium">تجربة دور:</span>
      <div class="flex items-center gap-1">
        <button
          v-for="r in mockRoles"
          :key="r.role"
          type="button"
          class="px-2 py-0.5 rounded-lg bg-white border border-slate-200 hover:border-primary-400 hover:text-primary-700 text-slate-600 font-semibold text-[10px] transition-all cursor-pointer shadow-2xs"
          @click="quickLogin(r)"
        >
          {{ r.label }}
        </button>
      </div>
    </div>
  </AuthCardLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { LogIn, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-vue-next';
import AuthCardLayout from '../utils/AuthCardLayout.vue';
import { useAuthStore } from '../stores/authStore';
import { ROLES } from '@/shared/constants/roles';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
});

const showPassword = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');

const mockRoles = [
  { role: ROLES.TRAINEE, label: 'متدرب', email: 'trainee@isi.edu.eg', name: 'أحمد محمود علي' },
  { role: ROLES.AFFAIRS, label: 'شؤون', email: 'affairs@isi.gov.eg', name: 'مقدم / كريم حمدي' },
  { role: ROLES.SECURITY, label: 'أمن', email: 'security@isi.gov.eg', name: 'نقيب / حسام الدين' },
  { role: ROLES.COMMANDER, label: 'قائد', email: 'commander@isi.gov.eg', name: 'عميد / باسم صبرى خليل' },
  { role: ROLES.ADMIN, label: 'مدير', email: 'admin@isi.gov.eg', name: 'مسؤول النظام' },
];

function quickLogin(r) {
  form.value.email = r.email;
  form.value.password = '1234';
  executeLogin(r.role, r.name, r.email);
}

function handleLogin() {
  errorMsg.value = '';

  if (!form.value.email || !form.value.password) {
    errorMsg.value = 'يرجى إدخال البريد الإلكتروني وكلمة المرور.';
    return;
  }

  let matchedRole = ROLES.TRAINEE;
  let userName = 'متدرب';

  const found = mockRoles.find((m) => m.email.toLowerCase() === form.value.email.toLowerCase());
  if (found) {
    matchedRole = found.role;
    userName = found.name;
  } else if (form.value.email.includes('admin')) {
    matchedRole = ROLES.ADMIN;
    userName = 'مدير النظام';
  }

  executeLogin(matchedRole, userName, form.value.email);
}

function executeLogin(role, fullName, email) {
  isLoading.value = true;
  errorMsg.value = '';

  setTimeout(() => {
    isLoading.value = false;

    authStore.setAuth('mock-jwt-token-isi', {
      id: 1,
      fullName: fullName,
      email: email,
      role: role,
    });

    const redirectPath = route.query.redirect || authStore.defaultHomePath;
    router.push(redirectPath);
  }, 600);
}
</script>
