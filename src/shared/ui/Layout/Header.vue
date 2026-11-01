<template>
  <header class="h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs select-none transition-colors duration-200">
    <!-- الجزء الأيمن: زر الموبايل + اللوجو + اسم المعهد + العنوان الفرعي -->
    <div class="flex items-center gap-2.5 sm:gap-3">
      <!-- زر تبديل القائمة للموبايل فقط -->
      <button
        type="button"
        class="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
        aria-label="تبديل القائمة"
        @click="$emit('toggle-sidebar')"
      >
        <Menu class="w-5 h-5" />
      </button>

      <!-- اللوجو والعناوين -->
      <div class="flex items-center gap-2.5 sm:gap-3">
        <img
          src="@/assets/logo.png"
          alt="شعار معهد نظم المعلومات - القوات المسلحة"
          class="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-xs"
        />
        <div class="flex flex-col text-right leading-tight">
          <div class="flex items-center gap-1.5">
            <span class="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 font-heading">
              معهد نظم المعلومات
            </span>
            <span class="text-[11px] sm:text-xs font-bold text-primary-700 dark:text-primary-400">
              القوات المسلحة
            </span>
          </div>
          <span class="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 hidden sm:block">
            منظومة إدارة الدورات التدريبية
          </span>
        </div>
      </div>
    </div>

    <!-- الجزء الأيسر: الدارك مود، الإشعارات، وتسجيل الخروج في أقصى اليسار -->
    <div class="flex items-center gap-1 sm:gap-1.5">
      <!-- 1. أيقونة الدارك مود -->
      <button
        type="button"
        class="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50/70 dark:hover:bg-slate-800 transition-all cursor-pointer"
        :title="theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الليلي'"
        @click="toggleTheme"
      >
        <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
        <Moon v-else class="w-4 h-4 text-slate-600 dark:text-slate-300" />
      </button>

      <!-- 2. أيقونة الإشعارات (على يمين تسجيل الخروج) -->
      <div class="relative">
        <button
          type="button"
          class="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50/70 dark:hover:bg-slate-800 transition-all cursor-pointer relative"
          title="الإشعارات"
          @click="showNotifications = !showNotifications"
        >
          <Bell class="w-4 h-4" />
          <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
        </button>

        <!-- قائمة الإشعارات المنسدلة -->
        <div
          v-if="showNotifications"
          class="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fade-in text-right"
        >
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-100">التنبيهات والإشعارات</span>
            <span class="text-[10px] bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 font-bold px-2 py-0.5 rounded-full">3 جديدة</span>
          </div>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50/40 dark:hover:bg-slate-800 transition-colors text-xs space-y-0.5 cursor-pointer">
              <p class="font-bold text-slate-700 dark:text-slate-200">تم اعتماد مواعيد دورة الأمن السيبراني</p>
              <span class="text-[10px] text-slate-400 dark:text-slate-500">منذ 15 دقيقة • شؤون الدارسين</span>
            </div>
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50/40 dark:hover:bg-slate-800 transition-colors text-xs space-y-0.5 cursor-pointer">
              <p class="font-bold text-slate-700 dark:text-slate-200">طلب تسجيل متدرب جديد قيد المراجعة</p>
              <span class="text-[10px] text-slate-400 dark:text-slate-500">منذ ساعة • البوابة</span>
            </div>
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50/40 dark:hover:bg-slate-800 transition-colors text-xs space-y-0.5 cursor-pointer">
              <p class="font-bold text-slate-700 dark:text-slate-200">تذكير بسداد رسوم دورة الذكاء الاصطناعي</p>
              <span class="text-[10px] text-slate-400 dark:text-slate-500">اليوم 09:30 ص</span>
            </div>
          </div>
          <div class="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              class="text-[11px] font-bold text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 cursor-pointer"
              @click="showNotifications = false"
            >
              إغلاق القائمة
            </button>
          </div>
        </div>
      </div>

      <!-- فاصل عمودي خفيف -->
      <span class="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1"></span>

      <!-- 3. أيقونة تسجيل الخروج (أخر حاجة ع الشمال) -->
      <button
        type="button"
        class="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer flex items-center gap-1.5"
        title="تسجيل الخروج"
        @click="handleLogout"
      >
        <LogOut class="w-4 h-4 text-rose-500" />
        <span class="text-xs font-bold text-rose-600 dark:text-rose-400 hidden md:inline">خروج</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, LogOut, Bell, Sun, Moon } from 'lucide-vue-next';
import { useAuthStore } from '@/components/Auth/stores/authStore';
import { useTheme } from '@/shared/composables/useTheme';

defineEmits(['toggle-sidebar']);

const router = useRouter();
const authStore = useAuthStore();
const { theme, toggleTheme } = useTheme();

const showNotifications = ref(false);

function handleLogout() {
  authStore.logout();
  router.push('/auth/login');
}
</script>
