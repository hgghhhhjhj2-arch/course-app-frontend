<template>
  <div class="space-y-5 pb-8 max-w-6xl mx-auto" dir="rtl">
    <!-- ================= 1. PAGE HEADER ================= -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-700 text-white flex items-center justify-center shadow-md shadow-primary-700/20 shrink-0 relative">
          <BellRing class="w-6 h-6" />
          <span
            v-if="store.unreadCount > 0"
            class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white dark:ring-slate-900"
          >
            {{ store.unreadCount }}
          </span>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 font-heading">
              مركز الإشعارات والتنبيهات
            </h1>
            <span
              v-if="store.unreadCount > 0"
              class="px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-[10px] font-bold text-primary-700 dark:text-primary-300"
            >
              {{ store.unreadCount }} إشعار جديد
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            متابعة إشعارات الدورات، اعتمادات شؤون الدارسين، حركة البوابات، وتنبيهات المنظومة الفورية
          </p>
        </div>
      </div>

      <!-- Header Action Buttons -->
      <div class="flex items-center gap-2 flex-wrap shrink-0">
        <button
          type="button"
          :disabled="store.unreadCount === 0"
          class="px-3.5 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/50 dark:hover:bg-primary-900/60 border border-primary-200 dark:border-primary-800/80 text-primary-700 dark:text-primary-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          @click="store.markAllAsRead"
        >
          <CheckCheck class="w-4 h-4" />
          <span>تحديد الكل كمقروء</span>
        </button>

        <button
          type="button"
          :disabled="readCount === 0"
          class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          title="حذف الإشعارات المقروءة"
          @click="store.clearAllRead"
        >
          <Trash2 class="w-3.5 h-3.5 text-rose-500" />
          <span class="hidden sm:inline">مسح المقروء</span>
        </button>

        <button
          type="button"
          class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-500 dark:text-slate-400 text-xs font-bold transition-all cursor-pointer"
          title="استعادة الإشعارات الافتراضية"
          @click="store.resetToDefault"
        >
          <RotateCcw class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- ================= 2. KPI / STATS BAR ================= -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <!-- Total -->
      <div class="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 block">إجمالي الإشعارات</span>
          <span class="text-lg font-black text-slate-800 dark:text-slate-100 font-heading">{{ store.notifications.length }}</span>
        </div>
        <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
          <Bell class="w-4 h-4" />
        </div>
      </div>

      <!-- Unread -->
      <div class="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 block">غير مقروءة</span>
          <span class="text-lg font-black text-primary-600 dark:text-primary-400 font-heading">{{ store.unreadCount }}</span>
        </div>
        <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <Mail class="w-4 h-4" />
        </div>
      </div>

      <!-- Urgent -->
      <div class="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 block">تنبيهات عاجلة</span>
          <span class="text-lg font-black text-rose-600 dark:text-rose-400 font-heading">{{ store.urgentCount }}</span>
        </div>
        <div class="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <AlertTriangle class="w-4 h-4" />
        </div>
      </div>

      <!-- Starred -->
      <div class="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 block">المميزة بنجمة</span>
          <span class="text-lg font-black text-amber-500 font-heading">{{ starredCount }}</span>
        </div>
        <div class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
          <Star class="w-4 h-4 fill-amber-400" />
        </div>
      </div>
    </div>

    <!-- ================= 3. FILTER TABS & SEARCH ================= -->
    <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 transition-colors">
      <!-- Top Tabs Row -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 select-none">
        <button
          v-for="cat in categoryTabs"
          :key="cat.id"
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer shrink-0"
          :class="[
            selectedTab === cat.id
              ? 'bg-primary-600 text-white shadow-md shadow-primary-700/20'
              : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
          ]"
          @click="selectedTab = cat.id"
        >
          <component :is="cat.icon" class="w-3.5 h-3.5" />
          <span>{{ cat.label }}</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="[
              selectedTab === cat.id
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            ]"
          >
            {{ getTabCount(cat.id) }}
          </span>
        </button>
      </div>

      <!-- Search & Priority Row -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search class="w-4 h-4" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="بحث في الإشعارات أو الكود المرجعي..."
            class="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all
                   focus:border-primary-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            @click="searchQuery = ''"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Priority Filter Selector -->
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span class="text-xs text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap">درجة الأهمية:</span>
          <select
            v-model="selectedPriority"
            class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-200 font-semibold outline-none focus:border-primary-500"
          >
            <option value="all" class="dark:bg-slate-800">الكل</option>
            <option value="urgent" class="dark:bg-slate-800">عاجل (Urgent)</option>
            <option value="important" class="dark:bg-slate-800">هام (Important)</option>
            <option value="normal" class="dark:bg-slate-800">عادي (Normal)</option>
            <option value="success" class="dark:bg-slate-800">إنجاز (Success)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ================= 4. NOTIFICATIONS LIST ================= -->
    <div class="space-y-3">
      <!-- Notification Card -->
      <div
        v-for="item in filteredNotifications"
        :key="item.id"
        :class="[
          'p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-200 select-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
          item.isRead
            ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            : 'bg-primary-50/40 dark:bg-primary-950/20 border-primary-200/90 dark:border-primary-900/60 shadow-xs ring-1 ring-primary-500/10'
        ]"
      >
        <!-- Right side: Icon + Texts -->
        <div class="flex items-start gap-3.5 w-full sm:w-auto flex-1">
          <!-- Status / Category Icon Badge -->
          <div
            :class="[
              'w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs relative transition-transform',
              getPriorityBadgeStyle(item.priority)
            ]"
          >
            <component :is="getPriorityIcon(item.priority, item.category)" class="w-5 h-5" />
            <!-- Unread Pulse Dot -->
            <span
              v-if="!item.isRead"
              class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-600 ring-2 ring-white dark:ring-slate-900 animate-pulse"
            ></span>
          </div>

          <!-- Notification Contents -->
          <div class="space-y-1 flex-1">
            <!-- Meta row: Category pill + Sender + Time -->
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                :class="getCategoryTagStyle(item.category)"
              >
                {{ getCategoryLabel(item.category) }}
              </span>

              <span class="text-slate-400 dark:text-slate-600 text-xs">•</span>

              <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {{ item.sender }}
              </span>

              <span class="text-slate-400 dark:text-slate-600 text-xs">•</span>

              <span class="text-[10.5px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Clock class="w-3 h-3" />
                <span>{{ item.createdAt }}</span>
              </span>

              <!-- Reference ID if available -->
              <span
                v-if="item.referenceId"
                class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 font-bold mr-auto"
                dir="ltr"
              >
                #{{ item.referenceId }}
              </span>
            </div>

            <!-- Title -->
            <h3
              class="text-sm font-black font-heading leading-snug cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              :class="item.isRead ? 'text-slate-700 dark:text-slate-200' : 'text-slate-900 dark:text-white'"
              @click="openDetails(item)"
            >
              {{ item.title }}
            </h3>

            <!-- Message excerpt -->
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {{ item.message }}
            </p>
          </div>
        </div>

        <!-- Left side: Action Button & Tool Buttons -->
        <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
          <!-- Primary Action Link -->
          <RouterLink
            v-if="item.link"
            :to="item.link"
            class="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/50 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 text-slate-700 dark:text-slate-200 hover:text-primary-700 dark:hover:text-primary-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
            @click="store.markAsRead(item.id)"
          >
            <span>{{ item.actionLabel || 'عرض التفاصيل' }}</span>
            <ArrowLeft class="w-3.5 h-3.5" />
          </RouterLink>

          <!-- Quick Actions: Star, Read/Unread, Delete -->
          <div class="flex items-center gap-1">
            <!-- Star Button -->
            <button
              type="button"
              class="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              :title="item.isStarred ? 'إزالة من المميزة' : 'تمييز بنجمة'"
              @click="store.toggleStarred(item.id)"
            >
              <Star
                class="w-4 h-4"
                :class="item.isStarred ? 'text-amber-500 fill-amber-400' : ''"
              />
            </button>

            <!-- Mark Read/Unread Toggle -->
            <button
              type="button"
              class="p-2 rounded-xl text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              :title="item.isRead ? 'تحديد كغير مقروء' : 'تحديد كمقروء'"
              @click="item.isRead ? store.markAsUnread(item.id) : store.markAsRead(item.id)"
            >
              <MailCheck v-if="item.isRead" class="w-4 h-4 text-emerald-500" />
              <MailOpen v-else class="w-4 h-4 text-primary-600" />
            </button>

            <!-- Delete Button -->
            <button
              type="button"
              class="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="حذف الإشعار"
              @click="store.deleteNotification(item.id)"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- ================= EMPTY STATE ================= -->
      <div
        v-if="filteredNotifications.length === 0"
        class="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-10 text-center space-y-3 transition-colors"
      >
        <div class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
          <BellOff class="w-7 h-7" />
        </div>
        <h4 class="text-sm font-black text-slate-800 dark:text-slate-200 font-heading">
          لا توجد إشعارات تطابق اختيارك
        </h4>
        <p class="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
          {{ searchQuery ? 'لم نجد أي إشعار يطابق كلمة البحث الحالية.' : 'تمت قراءة جميع الإشعارات، أو لا توجد إشعارات في هذا القسم حالياً.' }}
        </p>
        <div class="pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-bold transition-all cursor-pointer hover:bg-primary-100"
            @click="resetFilters"
          >
            عرض كافة الإشعارات
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 5. NOTIFICATION DETAIL MODAL ================= -->
    <div
      v-if="activeDetailModal"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      @click.self="activeDetailModal = null"
    >
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden text-right">
        <!-- Modal Header -->
        <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs',
                getPriorityBadgeStyle(activeDetailModal.priority)
              ]"
            >
              <component :is="getPriorityIcon(activeDetailModal.priority, activeDetailModal.category)" class="w-5 h-5" />
            </div>
            <div>
              <span
                class="px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block"
                :class="getCategoryTagStyle(activeDetailModal.category)"
              >
                {{ getCategoryLabel(activeDetailModal.category) }}
              </span>
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                {{ activeDetailModal.sender }} • {{ activeDetailModal.createdAt }}
              </div>
            </div>
          </div>

          <button
            type="button"
            class="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            @click="activeDetailModal = null"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-4">
          <h2 class="text-base font-black text-slate-900 dark:text-slate-100 font-heading leading-snug">
            {{ activeDetailModal.title }}
          </h2>

          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {{ activeDetailModal.message }}
          </p>

          <div v-if="activeDetailModal.referenceId" class="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 text-xs">
            <span class="text-slate-500 dark:text-slate-400 font-medium">الرقم المرجعي للطلب / السجل:</span>
            <span class="font-mono font-bold text-primary-700 dark:text-primary-300" dir="ltr">
              #{{ activeDetailModal.referenceId }}
            </span>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer hover:bg-slate-50"
            @click="activeDetailModal = null"
          >
            إغلاق
          </button>

          <RouterLink
            v-if="activeDetailModal.link"
            :to="activeDetailModal.link"
            class="px-5 py-2 rounded-xl bg-gradient-to-l from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary-700/20"
            @click="activeDetailModal = null"
          >
            <span>{{ activeDetailModal.actionLabel || 'الانتقال للرابط المرفق' }}</span>
            <ArrowLeft class="w-4 h-4" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import {
  BellRing,
  Bell,
  BellOff,
  CheckCheck,
  Trash2,
  RotateCcw,
  Star,
  Mail,
  MailOpen,
  MailCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  X,
  ArrowLeft,
  FileText,
  Wallet,
  GraduationCap,
  ShieldCheck,
  Server,
  Layers,
} from 'lucide-vue-next';
import { useNotificationsStore } from '@/shared/stores/notificationsStore';

const store = useNotificationsStore();

// ================= TABS DEFINITIONS =================
const categoryTabs = [
  { id: 'all', label: 'الكل', icon: Layers },
  { id: 'unread', label: 'غير مقروءة', icon: Mail },
  { id: 'finance', label: 'السداد والمالية', icon: Wallet },
  { id: 'affairs', label: 'شؤون الدارسين', icon: FileText },
  { id: 'courses', label: 'الدورات والقاعات', icon: GraduationCap },
  { id: 'security', label: 'الأمن والبوابة', icon: ShieldCheck },
  { id: 'system', label: 'النظام والأمان', icon: Server },
  { id: 'starred', label: 'المميزة بنجمة', icon: Star },
];

const selectedTab = ref('all');
const searchQuery = ref('');
const selectedPriority = ref('all');
const activeDetailModal = ref(null);

const readCount = computed(() => {
  return store.notifications.filter((n) => n.isRead).length;
});

const starredCount = computed(() => {
  return store.notifications.filter((n) => n.isStarred).length;
});

function getTabCount(tabId) {
  if (tabId === 'all') return store.notifications.length;
  if (tabId === 'unread') return store.unreadCount;
  if (tabId === 'starred') return starredCount.value;
  return store.notifications.filter((n) => n.category === tabId).length;
}

// ================= FILTERING LOGIC =================
const filteredNotifications = computed(() => {
  return store.notifications.filter((item) => {
    // 1. Tab filter
    if (selectedTab.value === 'unread' && item.isRead) return false;
    if (selectedTab.value === 'starred' && !item.isStarred) return false;
    if (selectedTab.value !== 'all' && selectedTab.value !== 'unread' && selectedTab.value !== 'starred') {
      if (item.category !== selectedTab.value) return false;
    }

    // 2. Priority filter
    if (selectedPriority.value !== 'all' && item.priority !== selectedPriority.value) {
      return false;
    }

    // 3. Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchMsg = item.message?.toLowerCase().includes(q);
      const matchSender = item.sender?.toLowerCase().includes(q);
      const matchRef = item.referenceId?.toLowerCase().includes(q);
      if (!matchTitle && !matchMsg && !matchSender && !matchRef) return false;
    }

    return true;
  });
});

function resetFilters() {
  selectedTab.value = 'all';
  searchQuery.value = '';
  selectedPriority.value = 'all';
}

function openDetails(item) {
  store.markAsRead(item.id);
  activeDetailModal.value = item;
}

// ================= STYLES & BADGES HELPERS =================
function getPriorityBadgeStyle(priority) {
  switch (priority) {
    case 'urgent':
      return 'bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60';
    case 'important':
      return 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60';
    case 'success':
      return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60';
    default:
      return 'bg-primary-100 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-900/60';
  }
}

function getPriorityIcon(priority, category) {
  if (priority === 'urgent') return AlertTriangle;
  if (priority === 'important') return AlertCircle;
  if (priority === 'success') return CheckCircle2;
  if (category === 'security') return ShieldCheck;
  if (category === 'finance') return Wallet;
  if (category === 'courses') return GraduationCap;
  return Bell;
}

function getCategoryLabel(cat) {
  const map = {
    finance: 'سداد ومالية',
    affairs: 'شؤون الدارسين',
    courses: 'الدورات والقاعات',
    security: 'الأمن والبوابة',
    system: 'أمن النظام',
  };
  return map[cat] || 'إشعار عام';
}

function getCategoryTagStyle(cat) {
  const map = {
    finance: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    affairs: 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800',
    courses: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    security: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    system: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };
  return map[cat] || 'bg-slate-100 text-slate-600 border-slate-200';
}
</script>
