<template>
  <header
    class="h-16 w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl px-3.5 sm:px-6 flex items-center justify-between shadow-sm dark:shadow-2xl select-none transition-all duration-300 shrink-0 relative z-30"
  >
    <!-- الجزء الأيمن: زر الموبايل + اللوجو + اسم المعهد + رول/شعار القوات المسلحة -->
    <div class="flex items-center gap-2.5 sm:gap-3.5">
      <!-- زر تبديل القائمة للموبايل (رقاقة دائرية متناسقة مع السايدبار) -->
      <button
        type="button"
        class="lg:hidden w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all cursor-pointer shadow-xs"
        aria-label="تبديل القائمة"
        @click="$emit('toggle-sidebar')"
      >
        <Menu class="w-5 h-5" />
      </button>

      <!-- اللوجو والعناوين -->
      <div class="flex items-center gap-3">
        <!-- إطار دائري للوجو متناسق مع صورة البروفايل بالسايدبار -->
        <div class="w-11 h-11 rounded-full p-1 bg-gradient-to-tr from-primary-600/15 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-500/5 border border-primary-200/60 dark:border-primary-800/60 flex items-center justify-center shadow-xs shrink-0">
          <img
            src="@/assets/logo.png"
            alt="شعار معهد نظم المعلومات - القوات المسلحة"
            class="w-8 h-8 object-contain drop-shadow-xs"
          />
        </div>

        <div class="flex flex-col text-right leading-tight">
          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 font-heading">
              معهد نظم المعلومات
            </span>
            <!-- شارة كبسولية للقوات المسلحة متطابقة مع شارات السايدبار -->
            <span class="px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-900/80 text-[10px] sm:text-[11px] font-bold text-primary-800 dark:text-primary-300 shadow-2xs">
              القوات المسلحة
            </span>
          </div>
          <span class="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 hidden sm:block">
            منظومة إدارة الدورات التدريبية
          </span>
        </div>
      </div>
    </div>

    <!-- الجزء الأيسر: الدارك مود، الإشعارات، وتسجيل الخروج (رقاقات دائرية وكبسولية) -->
    <div class="flex items-center gap-2">
      <!-- 1. أيقونة الدارك مود (رقاقة دائرية) -->
      <button
        type="button"
        class="w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-amber-500 dark:hover:text-amber-400 transition-all cursor-pointer shadow-xs border border-transparent dark:border-slate-800"
        :title="theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الليلي'"
        @click="toggleTheme"
      >
        <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
        <Moon v-else class="w-4 h-4 text-slate-600" />
      </button>

      <!-- 2. أيقونة الإشعارات (رقاقة دائرية مع شارة تنبيه) -->
      <div class="relative">
        <button
          type="button"
          class="w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all cursor-pointer shadow-xs border border-transparent dark:border-slate-800 relative"
          title="الإشعارات"
          @click="showNotifications = !showNotifications"
        >
          <Bell class="w-4 h-4" />
          <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
        </button>

        <!-- قائمة الإشعارات المنسدلة (كبسولة منحنية الحواف) -->
        <div
          v-if="showNotifications"
          class="absolute left-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-3.5 z-50 animate-fade-in text-right"
        >
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-100">التنبيهات والإشعارات</span>
            <span class="text-[10px] bg-primary-50 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 font-bold px-2.5 py-0.5 rounded-full border border-primary-100 dark:border-primary-900/60">3 جديدة</span>
          </div>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <div class="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50/40 dark:hover:bg-slate-800 transition-colors text-xs space-y-0.5 cursor-pointer">
              <p class="font-bold text-slate-700 dark:text-slate-200">تم اعتماد مواعيد دورة الأمن السيبراني</p>
              <span class="text-[10px] text-slate-400 dark:text-slate-500">منذ 15 دقيقة • شؤون الدارسين</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50/40 dark:hover:bg-slate-800 transition-colors text-xs space-y-0.5 cursor-pointer">
              <p class="font-bold text-slate-700 dark:text-slate-200">طلب تسجيل متدرب جديد قيد المراجعة</p>
              <span class="text-[10px] text-slate-400 dark:text-slate-500">منذ ساعة • البوابة</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50/40 dark:hover:bg-slate-800 transition-colors text-xs space-y-0.5 cursor-pointer">
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
      <span class="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></span>

      <!-- 3. زر تسجيل الخروج (كبسولة دائرية بأناقة بالغة في أقصى اليسار) -->
      <button
        type="button"
        class="h-10 px-3.5 rounded-full bg-rose-50/70 hover:bg-rose-100/90 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center gap-2 cursor-pointer transition-all shadow-xs"
        title="تسجيل الخروج"
        @click="handleLogout"
      >
        <LogOut class="w-4 h-4 text-rose-500" />
        <span class="text-xs font-bold hidden sm:inline">خروج</span>
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
