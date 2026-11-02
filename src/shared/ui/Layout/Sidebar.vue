<template>
  <div>
    <!-- خلفية معتمة للموبايل -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
      @click="$emit('close')"
    ></div>

    <!-- حاوية القائمة الجانبية (Sidebar) - كبسولة عائمة بتصميم Pill Dock مستوحى من اللوحة الحديثة -->
    <aside
      :class="[
        'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col select-none transition-all duration-300 ease-in-out relative',
        // العرض حسب حالة الطي / الفتح
        isCollapsed ? 'w-20' : 'w-64 lg:w-72',
        // كبسولة عائمة بحواف راونديد ثلاثية
        'rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-2xl h-full shrink-0',
        // للموبايل: Fixed overlay | للديسك توب: داخل فلو الصفحة
        'fixed inset-y-3 right-3 z-50 lg:static lg:z-auto',
        isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-[120%] lg:translate-x-0'
      ]"
    >
      <!-- زر طي / فتح القائمة على حافة السايدبار (Edge Toggle Button - Desktop) -->
      <button
        type="button"
        class="hidden lg:flex absolute -left-3.5 top-6 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center text-slate-500 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md cursor-pointer z-50 transition-transform duration-200 hover:scale-110"
        :title="isCollapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'"
        @click="$emit('toggle-collapse')"
      >
        <ChevronRight v-if="!isCollapsed" class="w-4 h-4" />
        <ChevronLeft v-else class="w-4 h-4" />
      </button>

      <!-- زر إغلاق للموبايل فقط -->
      <button
        type="button"
        class="lg:hidden absolute top-3 left-3 p-1.5 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer z-20"
        aria-label="إغلاق القائمة"
        @click="$emit('close')"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- 1. الجزء العلوي: الصورة الشخصية (دائرة) + الاسم + الرول (قابل للضغط للانتقال للإعدادات) -->
      <RouterLink
        to="/settings"
        :title="isCollapsed ? 'الملف الشخصي والإعدادات' : 'تعديل الملف الشخصي والإعدادات'"
        :class="[
          'group/user flex flex-col items-center text-center border-b border-slate-100 dark:border-slate-800/80 transition-all duration-300 shrink-0 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/30',
          isCollapsed ? 'py-4 px-2' : 'py-4 px-4'
        ]"
        @click="$emit('close')"
      >
        <!-- صورة المستخدم (دائرة كاملة أنيقة كرمز أساسي مثل الأيقونة العلوية في الصورة) -->
        <div class="relative transition-all duration-300">
          <div
            :class="[
              'p-0.5 shadow-md bg-gradient-to-tr from-primary-600 to-primary-700 rounded-full transition-all duration-300 group-hover/user:scale-105',
              isCollapsed ? 'w-11 h-11' : 'w-14 h-14'
            ]"
          >
            <div
              class="w-full h-full bg-white dark:bg-slate-800 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300"
            >
              <img
                v-if="authStore.user?.profilePhotoPath"
                :src="authStore.user.profilePhotoPath"
                alt="الصورة الشخصية"
                class="w-full h-full object-cover rounded-full"
              />
              <div
                v-else
                class="w-full h-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 flex items-center justify-center font-black transition-all rounded-full"
                :class="isCollapsed ? 'text-xs' : 'text-base'"
              >
                {{ userInitials }}
              </div>
            </div>
          </div>

          <!-- مؤشر الحالة النشطة -->
          <span
            :class="[
              'absolute rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 transition-all',
              isCollapsed ? 'bottom-0 left-0 w-2.5 h-2.5' : 'bottom-0.5 left-0.5 w-3 h-3'
            ]"
          ></span>
        </div>

        <!-- الاسم والرول (يظهران بسلاسة عند فتح السايدبار) -->
        <div
          class="transition-all duration-200"
          :class="isCollapsed ? 'opacity-0 h-0 overflow-hidden pointer-events-none mt-0' : 'opacity-100 mt-2'"
        >
          <h2 class="text-sm font-black text-slate-800 dark:text-slate-100 group-hover/user:text-primary-600 dark:group-hover/user:text-primary-400 font-heading leading-tight max-w-[200px] truncate transition-colors">
            {{ authStore.user?.fullName || 'مستخدم المنظومة' }}
          </h2>
          <div class="mt-1">
            <span class="inline-block px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-900/80 text-[10px] font-bold text-primary-800 dark:text-primary-300">
              {{ roleLabel }}
            </span>
          </div>
        </div>
      </RouterLink>

      <!-- 2. السكشن الأساسي: رقاقات الأيقونات الدائرية المستوحاة من الصورة -->
      <nav class="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar px-2.5 py-3 overflow-x-hidden">
        <div v-for="group in navGroups" :key="group.title" class="mb-3">
          <!-- عنوان المجموعة -->
          <span
            v-if="group.title"
            class="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 block mb-2 transition-all duration-200 whitespace-nowrap"
            :class="isCollapsed ? 'opacity-0 h-0 my-0 overflow-hidden pointer-events-none' : 'opacity-100'"
          >
            {{ group.title }}
          </span>

          <div class="space-y-1.5">
            <RouterLink
              v-for="item in group.items"
              :key="item.path"
              :to="item.path"
              :title="isCollapsed ? item.label : ''"
              :class="[
                'flex items-center transition-colors duration-150 cursor-pointer group select-none relative outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border',
                isCollapsed
                  ? 'w-11 h-11 rounded-full mx-auto justify-center'
                  : 'w-full h-11 px-2 rounded-2xl gap-2.5',
                isActive(item.path)
                  ? isCollapsed
                    ? 'bg-primary-50 text-primary-800 border-primary-300 dark:bg-slate-800 dark:border-primary-500/60 dark:text-white shadow-sm font-bold'
                    : 'bg-primary-50 text-primary-800 border-primary-200 dark:bg-slate-800 dark:border-primary-500/50 dark:text-white shadow-2xs font-bold'
                  : isCollapsed
                    ? 'border-transparent bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              ]"
              @click="$emit('close')"
            >
              <!-- في حالة الفتح: أيقونة داخل رقاقة دائرية | في حالة الغلق: الأيقونة في المنتصف تماماً -->
              <div
                v-if="!isCollapsed"
                :class="[
                  'w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors',
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-500/25 text-primary-700 dark:text-primary-300'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                ]"
              >
                <component :is="item.icon" class="w-4 h-4 shrink-0" />
              </div>
              <component
                v-else
                :is="item.icon"
                class="w-5 h-5 shrink-0 transition-colors"
                :class="[
                  isActive(item.path)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                ]"
              />

              <!-- نص الرابط (يظهر فقط عند فتح السايد) -->
              <span
                v-if="!isCollapsed"
                class="truncate text-sm font-bold whitespace-nowrap flex-1"
              >
                {{ item.label }}
              </span>
            </RouterLink>
          </div>
        </div>
      </nav>

      <!-- 3. الجزء السفلي: الإشعارات أولاً ثم الإعدادات تحتها (كبسولات دائرية) -->
      <div
        class="border-t border-slate-100 dark:border-slate-800/80 p-3 space-y-1.5 overflow-x-hidden shrink-0"
      >
        <!-- الإشعارات (فوق الإعدادات) -->
        <RouterLink
          to="/notifications"
          :title="isCollapsed ? 'مركز الإشعارات' : ''"
          :class="[
            'flex items-center transition-colors duration-150 cursor-pointer relative group select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border',
            isCollapsed
              ? 'w-11 h-11 rounded-full mx-auto justify-center'
              : 'w-full h-10 px-2 rounded-2xl gap-2.5',
            isActive('/notifications')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-800 border-primary-300 dark:bg-slate-800 dark:border-primary-500/60 dark:text-white shadow-sm font-bold'
                : 'bg-primary-50 text-primary-800 border-primary-200 dark:bg-slate-800 dark:border-primary-500/50 dark:text-white shadow-2xs font-bold'
              : isCollapsed
                ? 'border-transparent bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
          ]"
          @click="$emit('close')"
        >
          <!-- الأيقونة في وضع الفتح vs الغلق -->
          <div
            v-if="!isCollapsed"
            :class="[
              'w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-colors',
              isActive('/notifications')
                ? 'bg-primary-100 dark:bg-primary-500/25 text-primary-700 dark:text-primary-300'
                : 'bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
            ]"
          >
            <Bell class="w-3.5 h-3.5" />
          </div>
          <div v-else class="relative flex items-center justify-center">
            <Bell
              class="w-5 h-5 transition-colors"
              :class="isActive('/notifications') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
            />
            <span
              v-if="notificationsStore.unreadCount > 0"
              class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"
            ></span>
          </div>

          <span
            v-if="!isCollapsed"
            class="truncate text-xs font-bold whitespace-nowrap flex-1"
          >
            مركز الإشعارات
          </span>
          <span
            v-if="!isCollapsed && notificationsStore.unreadCount > 0"
            class="px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-black text-[10px] shrink-0 mr-auto"
          >
            {{ notificationsStore.unreadCount }}
          </span>
        </RouterLink>

        <!-- الإعدادات والملف الشخصي (تحت الإشعارات) -->
        <RouterLink
          to="/settings"
          :title="isCollapsed ? 'الإعدادات والملف الشخصي' : ''"
          :class="[
            'flex items-center transition-colors duration-150 cursor-pointer group select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border',
            isCollapsed
              ? 'w-11 h-11 rounded-full mx-auto justify-center'
              : 'w-full h-10 px-2 rounded-2xl gap-2.5',
            isActive('/settings') || isActive('/profile')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-800 border-primary-300 dark:bg-slate-800 dark:border-primary-500/60 dark:text-white shadow-sm font-bold'
                : 'bg-primary-50 text-primary-800 border-primary-200 dark:bg-slate-800 dark:border-primary-500/50 dark:text-white shadow-2xs font-bold'
              : isCollapsed
                ? 'border-transparent bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
          ]"
          @click="$emit('close')"
        >
          <div
            v-if="!isCollapsed"
            :class="[
              'w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-colors',
              isActive('/settings') || isActive('/profile')
                ? 'bg-primary-100 dark:bg-primary-500/25 text-primary-700 dark:text-primary-300'
                : 'bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
            ]"
          >
            <Settings class="w-3.5 h-3.5" />
          </div>
          <div v-else class="flex items-center justify-center">
            <Settings
              class="w-5 h-5 transition-colors"
              :class="isActive('/settings') || isActive('/profile') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
            />
          </div>
          <span
            v-if="!isCollapsed"
            class="truncate text-xs font-bold whitespace-nowrap flex-1"
          >
            الإعدادات والملف الشخصي
          </span>
        </RouterLink>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import {
  Settings,
  Bell,
  ChevronRight,
  ChevronLeft,
  X,
  LayoutDashboard,
  FileText,
  Users,
  QrCode,
  ShieldCheck,
} from 'lucide-vue-next';
import { useAuthStore } from '@/components/Auth/stores/authStore';
import { useNotificationsStore } from '@/shared/stores/notificationsStore';
import { ROLES, ROLE_LABELS } from '@/shared/constants/roles';

// استيراد إعدادات السايدبار المقسمة لكل كمبوننت / دومين
import { affairsNav } from '@/components/Affairs/helpers/sidebarNav';
import { adminNav } from '@/components/Admin/helpers/sidebarNav';
import { dashboardNav } from '@/components/Dashboard/helpers/sidebarNav';
import { securityNav } from '@/components/Security/helpers/sidebarNav';
import { traineeNav } from '@/components/Trainee/helpers/sidebarNav';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close', 'toggle-collapse']);

const route = useRoute();
const authStore = useAuthStore();
const notificationsStore = useNotificationsStore();

const roleLabel = computed(() => {
  return ROLE_LABELS[authStore.user?.role] || authStore.user?.role || 'مستخدم النظام';
});

const userInitials = computed(() => {
  const name = authStore.user?.fullName?.trim() || 'م';
  const parts = name.split(/\s+/);
  if (parts.length >= 2) {
    return parts[0][0] + ' ' + parts[1][0];
  }
  return name.slice(0, 2);
});

function isActive(path) {
  if (path === '/') return route.path === '/';
  return route.path === path;
}

const navGroups = computed(() => {
  const role = authStore.user?.role;

  // شؤون الدارسين
  if (role === ROLES.AFFAIRS) {
    return affairsNav;
  }

  // Commander (القائد / لوحة التحكم)
  if (role === ROLES.COMMANDER) {
    return dashboardNav;
  }

  // Trainee (المتدرب)
  if (role === ROLES.TRAINEE) {
    return traineeNav;
  }

  // Security (الأمن)
  if (role === ROLES.SECURITY) {
    return securityNav;
  }

  // Admin (مسؤول النظام)
  if (role === ROLES.ADMIN) {
    return adminNav;
  }

  // معاينة عامة في حال عدم تحديد الدور
  return [
    {
      title: 'روابط النظام العامة',
      items: [
        { label: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
        { label: 'شؤون الدارسين', path: '/affairs/dashboard', icon: FileText },
        { label: 'المتدرب', path: '/trainee/applications', icon: QrCode },
        { label: 'البوابة', path: '/security/gate-scan', icon: ShieldCheck },
        { label: 'مسؤول النظام', path: '/admin/users', icon: Users },
      ],
    },
  ];
});
</script>
