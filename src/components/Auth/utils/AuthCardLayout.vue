<template>
  <div class="min-h-screen w-full bg-[#f4f8fa] dark:bg-slate-950 flex items-center justify-center p-3 sm:p-6 relative overflow-hidden select-none transition-colors duration-300" dir="rtl">
    <!-- ================= FLOATING THEME SWITCHER BUTTON ================= -->
    <div class="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
      <button
        type="button"
        class="h-10 px-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
        :title="theme === 'dark' ? 'التحويل للوضع الفاتح' : 'التحويل للوضع الداكن'"
        @click="toggleTheme"
      >
        <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
        <Moon v-else class="w-4 h-4 text-slate-600 dark:text-slate-300" />
        <span class="text-xs font-bold hidden sm:inline">
          {{ theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن' }}
        </span>
      </button>
    </div>

    <!-- ================= BACKGROUND LAYER ================= -->
    <!-- Architectural / Technical Square Grids -->
    <div
      class="absolute inset-0 pointer-events-none opacity-70 dark:opacity-20 transition-opacity duration-300"
      style="
        background-image:
          linear-gradient(to right, rgba(15, 87, 118, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 87, 118, 0.08) 1px, transparent 1px);
        background-size: 32px 32px;
      "
    ></div>

    <!-- Radial Mask to soften grid edges -->
    <div
      class="absolute inset-0 pointer-events-none transition-all duration-300 opacity-80 dark:opacity-90"
      :style="{
        background: theme === 'dark'
          ? 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(2, 6, 23, 0.95) 100%)'
          : 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(244, 248, 250, 0.75) 100%)'
      }"
    ></div>

    <!-- Soft Ambient Glow Orbs -->
    <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-400/20 dark:bg-primary-600/10 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-400/15 dark:bg-amber-500/10 blur-3xl pointer-events-none"></div>

    <!-- ================= MAIN CARD CONTAINER ================= -->
    <div :class="['w-full relative z-10 my-4 sm:my-8 transition-all', maxWidthClass]">
      <!-- Rounded Card with Layered Shadow -->
      <div
        class="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_50px_-10px_rgba(15,87,118,0.18)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-slate-900/[0.04] dark:ring-slate-800/80 overflow-hidden transition-colors duration-300"
      >
        <!-- Card Header: Logo & Institute Branding -->
        <div class="pt-8 pb-5 px-6 sm:px-8 text-center bg-gradient-to-b from-primary-50/60 via-slate-50/30 to-white dark:from-slate-800/80 dark:via-slate-900/50 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
          <!-- Logo -->
          <div class="flex justify-center mb-3">
            <img
              src="@/assets/logo.png"
              alt="شعار معهد نظم المعلومات - القوات المسلحة"
              class="w-20 h-20 sm:w-22 sm:h-22 object-contain drop-shadow-md transition-transform hover:scale-105 duration-300"
            />
          </div>

          <!-- Titles -->
          <h1 class="text-xl font-black text-slate-800 dark:text-slate-100 font-heading leading-snug tracking-tight">
            معهد نظم المعلومات
          </h1>
          <p class="text-xs font-bold text-primary-700 dark:text-primary-400 mt-0.5">القوات المسلحة</p>

          <!-- Subtitle line -->
          <div class="flex items-center justify-center gap-2.5 mt-2.5">
            <span class="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-semibold">{{ subtitle }}</span>
            <span class="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
          </div>

          <!-- Slot for extra header content (e.g. Stepper) -->
          <slot name="header-extra" />
        </div>

        <!-- Main Card Body -->
        <slot />
      </div>

      <!-- Security Note Footer -->
      <div class="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-400 dark:text-slate-500 text-center">
        <ShieldCheck class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>{{ securityNote }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck, Sun, Moon } from 'lucide-vue-next';
import { useTheme } from '@/shared/composables/useTheme';

const { theme, toggleTheme } = useTheme();

defineProps({
  maxWidthClass: {
    type: String,
    default: 'max-w-[430px]',
  },
  subtitle: {
    type: String,
    default: 'منظومة إدارة الدورات التدريبية',
  },
  securityNote: {
    type: String,
    default: 'المنظومة تعمل داخل شبكة المعهد فقط — جميع الاتصالات مؤمنة',
  },
});
</script>
