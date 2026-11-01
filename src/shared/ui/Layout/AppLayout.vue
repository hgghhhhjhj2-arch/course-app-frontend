<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans select-none transition-colors duration-200" dir="rtl">
    <!-- 1. الهيدر العلوي بكامل عرض الشاشة (Full Width Header) -->
    <Header
      :is-collapsed="isCollapsed"
      @toggle-sidebar="handleToggleSidebar"
    />

    <!-- 2. الجزء السفلي: القائمة الجانبية (يمين) + منطقة المحتوى الرئيسية (يسار) -->
    <div class="flex-1 flex relative overflow-hidden">
      <!-- القائمة الجانبية (Sidebar) -->
      <Sidebar
        :is-open="isMobileOpen"
        :is-collapsed="isCollapsed"
        @toggle-collapse="isCollapsed = !isCollapsed"
        @close="isMobileOpen = false"
      />

      <!-- الحاوية الخارجية للمحتوى مع هوامش خفيفة عن الهيدر والسايدبار -->
      <div class="flex-1 flex flex-col p-2.5 sm:p-3.5 lg:p-3 min-w-0 transition-all duration-300">
        <!-- المنطقة الرئيسية (Main Area): خلفية رمادية فاتحة في الفاتح وداكنة في الدارك مود -->
        <div class="flex-1 bg-[#f1f5f9] dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col overflow-y-auto transition-colors duration-200">
          <!-- شريط المسار (Breadcrumbs) -->
          <div class="px-5 sm:px-7 pt-4 pb-1">
            <Breadcrumbs />
          </div>

          <!-- منطقة عرض محتوى الصفحات (Router View) -->
          <main class="flex-1 px-5 sm:px-7 pb-6 pt-2">
            <RouterView />
          </main>
        </div>
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
