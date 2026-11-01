<template>
  <div>
    <!-- خلفية معتمة للموبايل -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
      @click="$emit('close')"
    ></div>

    <!-- حاوية القائمة الجانبية (Sidebar) - بدون overflow-x-hidden حتى لا يقص زر الحافة -->
    <aside
      :class="[
        'bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col select-none transition-all duration-300 ease-in-out relative',
        // العرض حسب حالة الطي / الفتح
        isCollapsed ? 'w-20' : 'w-64 lg:w-72',
        // للموبايل: Fixed overlay | للديسك توب: داخل فلو الصفحة تحت الهيدر
        'fixed inset-y-0 right-0 z-50 lg:static lg:z-auto lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 shrink-0',
        isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- زر طي / فتح القائمة على حافة السايدبار (Edge Toggle Button - Desktop) -->
      <button
        type="button"
        class="hidden lg:flex absolute -left-3.5 top-5 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center text-slate-500 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md cursor-pointer z-50 transition-transform duration-200 hover:scale-110"
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

      <!-- 1. الجزء العلوي: الصورة الشخصية (دائرة في الحالتين) + الاسم + الرول -->
      <div
        :class="[
          'flex flex-col items-center text-center border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-slate-50/60 to-white dark:from-slate-900/90 dark:to-slate-900 transition-all duration-300',
          isCollapsed ? 'py-3 px-2' : 'py-4 px-5'
        ]"
      >
        <!-- صورة المستخدم: دائرة كاملة في كلا الحالتين -->
        <div class="relative transition-all duration-300">
          <div
            :class="[
              'p-0.5 shadow-md bg-gradient-to-tr from-primary-600 to-primary-700 rounded-full transition-all duration-300',
              isCollapsed ? 'w-11 h-11' : 'w-16 h-16'
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
                :class="isCollapsed ? 'text-xs' : 'text-lg'"
              >
                {{ userInitials }}
              </div>
            </div>
          </div>

          <!-- مؤشر الحالة النشطة -->
          <span
            :class="[
              'absolute rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 transition-all',
              isCollapsed ? 'bottom-0 left-0 w-2.5 h-2.5' : 'bottom-0.5 left-0.5 w-3.5 h-3.5'
            ]"
          ></span>
        </div>

        <!-- الاسم والرول (يظهران بسلاسة عند فتح السايدبار) -->
        <div
          class="transition-all duration-200"
          :class="isCollapsed ? 'opacity-0 h-0 overflow-hidden pointer-events-none mt-0' : 'opacity-100 mt-2.5'"
        >
          <h2 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading leading-tight max-w-[200px] truncate">
            {{ authStore.user?.fullName || 'مستخدم المنظومة' }}
          </h2>
          <div class="mt-1.5">
            <span class="inline-block px-3 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-900/80 text-[11px] font-bold text-primary-800 dark:text-primary-300">
              {{ roleLabel }}
            </span>
          </div>
        </div>
      </div>

      <!-- 2. السكشن الأساسي: روابط صفحات النظام (موقع الأيقونة ثابت تماماً) -->
      <nav class="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar px-3 py-3 overflow-x-hidden">
        <div v-for="group in navGroups" :key="group.title" class="mb-3">
          <!-- عنوان المجموعة -->
          <span
            v-if="group.title"
            class="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 block mb-2 transition-all duration-200 whitespace-nowrap"
            :class="isCollapsed ? 'opacity-0 h-0 my-0 overflow-hidden pointer-events-none' : 'opacity-100'"
          >
            {{ group.title }}
          </span>

          <div class="space-y-1">
            <RouterLink
              v-for="item in group.items"
              :key="item.path"
              :to="item.path"
              :title="isCollapsed ? item.label : ''"
              :class="[
                'flex items-center h-11 rounded-xl transition-all duration-200 cursor-pointer group select-none relative',
                isCollapsed ? 'justify-center px-0' : 'px-3 gap-3',
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-800 border border-primary-200 ring-1 ring-primary-500/20 dark:bg-slate-800 dark:border-primary-500/50 dark:ring-1 dark:ring-primary-500/30 dark:text-white shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
              ]"
              @click="$emit('close')"
            >
              <!-- الأيقونة: في المنتصف تماماً عند الإغلاق -->
              <component
                :is="item.icon"
                class="w-5 h-5 shrink-0 transition-colors"
                :class="[
                  isActive(item.path)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
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

      <!-- 3. الجزء السفلي: الإشعارات أولاً ثم الإعدادات تحتها (متوسطن عند الإغلاق) -->
      <div
        class="border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/50 p-3 space-y-1 overflow-x-hidden"
      >
        <!-- الإشعارات (فوق الإعدادات) -->
        <RouterLink
          to="/affairs/attendance"
          :title="isCollapsed ? 'مركز الإشعارات' : ''"
          :class="[
            'flex items-center h-10 rounded-xl transition-all duration-200 cursor-pointer relative group select-none',
            isCollapsed ? 'justify-center px-0' : 'px-3 gap-3',
            isActive('/affairs/attendance')
              ? 'bg-primary-50 text-primary-800 border border-primary-200 ring-1 ring-primary-500/20 dark:bg-slate-800 dark:border-primary-500/50 dark:ring-1 dark:ring-primary-500/30 dark:text-white shadow-2xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
          ]"
          @click="$emit('close')"
        >
          <div class="relative flex items-center justify-center">
            <Bell
              class="w-4 h-4 transition-colors"
              :class="isActive('/affairs/attendance') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'"
            />
            <span
              v-if="isCollapsed"
              class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900"
            ></span>
          </div>
          <span
            v-if="!isCollapsed"
            class="truncate text-xs font-bold whitespace-nowrap flex-1"
          >
            مركز الإشعارات
          </span>
          <span
            v-if="!isCollapsed"
            class="w-2 h-2 rounded-full bg-amber-500 shrink-0 mr-auto"
          ></span>
        </RouterLink>

        <!-- الإعدادات والملف الشخصي (تحت الإشعارات) -->
        <RouterLink
          to="/profile"
          :title="isCollapsed ? 'الإعدادات والملف الشخصي' : ''"
          :class="[
            'flex items-center h-10 rounded-xl transition-all duration-200 cursor-pointer group select-none',
            isCollapsed ? 'justify-center px-0' : 'px-3 gap-3',
            isActive('/profile')
              ? 'bg-primary-50 text-primary-800 border border-primary-200 ring-1 ring-primary-500/20 dark:bg-slate-800 dark:border-primary-500/50 dark:ring-1 dark:ring-primary-500/30 dark:text-white shadow-2xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
          ]"
          @click="$emit('close')"
        >
          <div class="flex items-center justify-center">
            <Settings
              class="w-4 h-4 transition-colors"
              :class="isActive('/profile') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'"
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
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  QrCode,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Award,
  Settings,
  Bell,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-vue-next';
import { useAuthStore } from '@/components/Auth/stores/authStore';
import { ROLES, ROLE_LABELS } from '@/shared/constants/roles';

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
  return route.path.startsWith(path);
}

const navGroups = computed(() => {
  const role = authStore.user?.role;
  const groups = [];

  // Commander (القائد)
  if (role === ROLES.COMMANDER) {
    groups.push({
      title: 'لوحة القيادة والمؤشرات',
      items: [
        { label: 'المؤشرات العامة', path: '/dashboard', icon: LayoutDashboard },
        { label: 'مخطط القاعات التفاعلي', path: '/dashboard/halls-map', icon: Building2 },
        { label: 'التوزيع الجغرافي للمتدربين', path: '/dashboard/geography', icon: Users },
      ],
    });
  }

  // Affairs (شؤون الدارسين)
  if (role === ROLES.AFFAIRS) {
    groups.push({
      title: 'شؤون الدارسين والدورات',
      items: [
        { label: 'طلبات الالتحاق والسداد', path: '/affairs/applications', icon: FileText },
        { label: 'كتالوج الدورات والدفعات', path: '/affairs/courses', icon: BookOpen },
        { label: 'هيئة التدريس والمحاضرون', path: '/affairs/instructors', icon: Users },
        { label: 'سجلات الحضور والغياب', path: '/affairs/attendance', icon: CalendarCheck },
        { label: 'سجل حركات البوابة', path: '/affairs/gate-logs', icon: ShieldCheck },
      ],
    });
  }

  // Trainee (المتدرب)
  if (role === ROLES.TRAINEE) {
    groups.push({
      title: 'بوابة خدمات المتدرب',
      items: [
        { label: 'طلباتي وتصاريح الدخول (QR)', path: '/trainee/applications', icon: QrCode },
        { label: 'كتالوج الدورات المتاحة', path: '/trainee/courses', icon: BookOpen },
        { label: 'شهاداتي المعتمدة', path: '/trainee/certificates', icon: Award },
      ],
    });
  }

  // Security (الأمن)
  if (role === ROLES.SECURITY) {
    groups.push({
      title: 'إدارة البوابة والأمن',
      items: [
        { label: 'مسح تصريح الدخول (QR)', path: '/security/gate-scan', icon: QrCode },
        { label: 'سجل حركات الدخول والخروج', path: '/security/gate-logs', icon: ShieldCheck },
      ],
    });
  }

  // Admin (مسؤول النظام)
  if (role === ROLES.ADMIN) {
    groups.push({
      title: 'لوحة تحكم مسؤول النظام',
      items: [
        { label: 'إدارة حسابات المستخدمين', path: '/admin/users', icon: Users },
        { label: 'القاعات والمعامل التدريبية', path: '/admin/halls', icon: Building2 },
        { label: 'سجل تدقيق العمليات (Audit Logs)', path: '/admin/audit-logs', icon: ShieldCheck },
      ],
    });
  }

  // معاينة عامة في حال عدم تحديد الدور
  if (!role) {
    groups.push({
      title: 'روابط النظام العامة',
      items: [
        { label: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
        { label: 'شؤون الدارسين', path: '/affairs/applications', icon: FileText },
        { label: 'المتدرب', path: '/trainee/applications', icon: QrCode },
        { label: 'البوابة', path: '/security/gate-scan', icon: ShieldCheck },
        { label: 'مسؤول النظام', path: '/admin/users', icon: Users },
      ],
    });
  }

  return groups;
});
</script>
