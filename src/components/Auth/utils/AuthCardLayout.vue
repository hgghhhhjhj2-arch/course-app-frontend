<template>
  <div class="min-h-screen w-full bg-[#f4f8fa] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden select-none" dir="rtl">
    <!-- ================= BACKGROUND LAYER ================= -->
    <!-- Architectural / Technical Square Grids -->
    <div
      class="absolute inset-0 pointer-events-none opacity-70"
      style="
        background-image:
          linear-gradient(to right, rgba(15, 87, 118, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 87, 118, 0.08) 1px, transparent 1px);
        background-size: 32px 32px;
      "
    ></div>

    <!-- Radial Mask to soften grid edges -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(244, 248, 250, 0.75) 100%);"
    ></div>

    <!-- Soft Ambient Glow Orbs -->
    <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"></div>

    <!-- ================= MAIN CARD CONTAINER ================= -->
    <div :class="['w-full relative z-10 my-4 sm:my-8 transition-all', maxWidthClass]">
      <!-- Rounded Card with Layered Shadow -->
      <div
        class="bg-white rounded-[28px] border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(15,87,118,0.18)] ring-1 ring-slate-900/[0.04] overflow-hidden"
      >
        <!-- Card Header: Logo & Institute Branding -->
        <div class="pt-8 pb-5 px-6 sm:px-8 text-center bg-gradient-to-b from-primary-50/60 via-slate-50/30 to-white border-b border-slate-100">
          <!-- Logo -->
          <div class="flex justify-center mb-3">
            <img
              src="@/assets/logo.png"
              alt="شعار معهد نظم المعلومات - القوات المسلحة"
              class="w-20 h-20 sm:w-22 sm:h-22 object-contain drop-shadow-md transition-transform hover:scale-105 duration-300"
            />
          </div>

          <!-- Titles -->
          <h1 class="text-xl font-black text-slate-800 font-heading leading-snug tracking-tight">
            معهد نظم المعلومات
          </h1>
          <p class="text-xs font-bold text-primary-700 mt-0.5">القوات المسلحة</p>

          <!-- Subtitle line -->
          <div class="flex items-center justify-center gap-2.5 mt-2.5">
            <span class="h-px w-8 bg-slate-200"></span>
            <span class="text-xs text-slate-500 font-semibold">{{ subtitle }}</span>
            <span class="h-px w-8 bg-slate-200"></span>
          </div>

          <!-- Slot for extra header content (e.g. Stepper) -->
          <slot name="header-extra" />
        </div>

        <!-- Main Card Body -->
        <slot />
      </div>

      <!-- Security Note Footer -->
      <div class="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-400 text-center">
        <ShieldCheck class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>{{ securityNote }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck } from 'lucide-vue-next';

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
