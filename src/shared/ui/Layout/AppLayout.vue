<template>
  <div class="h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col p-2.5 sm:p-3 lg:p-3 gap-2.5 sm:gap-3 lg:gap-3 font-sans select-none transition-colors duration-200 overflow-hidden" dir="rtl">
    <!-- 1. الهيدر العلوي كبسولة عائمة بنفس تصميم السايدبار -->
    <Header
      :is-collapsed="isCollapsed"
      @toggle-sidebar="handleToggleSidebar"
    />

    <!-- 2. الجزء السفلي: القائمة الجانبية (يمين) + منطقة المحتوى الرئيسية (يسار) بتصميم كبسولات عائمة متطابقة -->
    <div class="flex-1 flex relative gap-2.5 sm:gap-3 lg:gap-3 min-h-0 overflow-hidden">
      <!-- القائمة الجانبية كبسولة عائمة (Sidebar Floating Capsule) -->
      <Sidebar
        :is-open="isMobileOpen"
        :is-collapsed="isCollapsed"
        @toggle-collapse="isCollapsed = !isCollapsed"
        @close="isMobileOpen = false"
      />

      <!-- المنطقة الرئيسية كبسولة محتوى متطابقة الحواف (Main Content Area) -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#f1f5f9] dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden transition-colors duration-200 h-full">
        <!-- شريط المسار (Breadcrumbs) -->
        <div class="px-5 sm:px-7 pt-4 pb-1 shrink-0">
          <Breadcrumbs />
        </div>

        <!-- منطقة عرض محتوى الصفحات (Router View) -->
        <main class="flex-1 px-5 sm:px-7 pb-6 pt-2 overflow-y-auto">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import Breadcrumbs from './Breadcrumbs.vue';

const isCollapsed = ref(false);
const isMobileOpen = ref(false);

function handleToggleSidebar() {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    isMobileOpen.value = !isMobileOpen.value;
  } else {
    isCollapsed.value = !isCollapsed.value;
  }
}
</script>
