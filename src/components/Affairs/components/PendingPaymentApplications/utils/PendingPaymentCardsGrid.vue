<template>
  <div class="space-y-4">
    <div
      v-if="applications.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="app in applications"
        :key="app.id"
        class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group space-y-4"
      >
        <!-- Top: Trainee Info + Code + Category -->
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2.5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300 font-black text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  v-if="app.trainee?.profilePhotoPath"
                  :src="app.trainee.profilePhotoPath"
                  alt="صورة المتدرب"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ getInitials(app.trainee?.fullName) }}</span>
              </div>
              <div class="space-y-0.5">
                <h3 class="text-sm font-black text-slate-800 dark:text-slate-100 font-heading leading-tight line-clamp-1" :title="app.trainee?.fullName">
                  {{ app.trainee?.fullName }}
                </h3>
                <span class="text-[11px] text-slate-400 font-mono block">
                  {{ app.code }}
                </span>
              </div>
            </div>

            <!-- Overdue or Active Badge -->
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0"
              :class="
                isOverdue(app.paymentDueDate)
                  ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
              "
            >
              {{ isOverdue(app.paymentDueDate) ? 'فات موعد سدادها' : 'سارية ضمن المهلة' }}
            </span>
          </div>

          <!-- Course & Round -->
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400 font-medium">الدورة:</span>
              <strong class="text-slate-800 dark:text-slate-100 font-bold truncate max-w-[180px]">
                {{ app.courseRound?.courseName }}
              </strong>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-slate-400">الدفعة والقاعة:</span>
              <span class="font-bold text-primary-700 dark:text-primary-300">
                دفعة {{ app.courseRound?.roundNumber || 1 }} • {{ app.courseRound?.hallName || 'معمل رئيسي' }}
              </span>
            </div>
          </div>

          <!-- Deadline Box -->
          <div
            class="p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold"
            :class="
              isOverdue(app.paymentDueDate)
                ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-900/50 text-rose-800 dark:text-rose-300'
                : 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300'
            "
          >
            <div class="flex items-center gap-1.5 text-[11px]">
              <Clock class="w-3.5 h-3.5" />
              <span>مهلة السداد:</span>
              <span class="font-mono font-bold">{{ formatDate(app.paymentDueDate) }}</span>
            </div>
            <span class="text-[10.5px]">
              {{ getRemainingText(app.paymentDueDate) }}
            </span>
          </div>

          <!-- Phone & Price -->
          <div class="space-y-1 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5 text-slate-400">
                <Phone class="w-3.5 h-3.5" />
                <span>الهاتف:</span>
              </span>
              <span class="font-mono text-slate-800 dark:text-slate-200" dir="ltr">
                {{ app.trainee?.phone || '—' }}
              </span>
            </div>

            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="text-slate-400">المبلغ المطلوب:</span>
              <strong class="font-black text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                {{ formatCurrency(app.courseRound?.price) }}
              </strong>
            </div>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5">
          <button
            type="button"
            class="flex-1 py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
            title="تسجيل إيصال السداد وتحويل الدارس لمقيد بالدورة"
            @click="$emit('recordPayment', app)"
          >
            <Receipt class="w-3.5 h-3.5" />
            <span>تسجيل السداد</span>
          </button>

          <button
            type="button"
            class="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all cursor-pointer"
            title="تمديد مهلة السداد"
            @click="$emit('extendDeadline', app)"
          >
            <CalendarPlus class="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            class="py-2 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all cursor-pointer"
            title="إلغاء إذن السداد لانتهاء المهلة"
            @click="$emit('cancelApplication', app)"
          >
            <XCircle class="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            class="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="عرض التفاصيل"
            @click="$emit('openDetails', app)"
          >
            <Eye class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-2 text-slate-400"
    >
      <Inbox class="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
      <p class="text-xs font-bold">لا توجد طلبات في انتظار السداد تطابق الفلترة الحالية</p>
    </div>
  </div>
</template>

<script setup>
import { Phone, Clock, Receipt, CalendarPlus, XCircle, Eye, Inbox } from 'lucide-vue-next';
import { formatDateOnly, formatEgyptianCurrency } from '../helpers/pendingPaymentConstants';

defineProps({
  applications: {
    type: Array,
    required: true,
  },
});

defineEmits(['openDetails', 'recordPayment', 'extendDeadline', 'cancelApplication']);

function getInitials(name) {
  if (!name) return 'م';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + ' ' + parts[1][0];
  return name.slice(0, 2);
}

function formatDate(dateStr) {
  return formatDateOnly ? formatDateOnly(dateStr) : dateStr;
}

function formatCurrency(val) {
  return formatEgyptianCurrency ? formatEgyptianCurrency(val) : `${val} ج.م`;
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}

function getRemainingText(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `متأخر منذ ${Math.abs(diffDays)} يوم`;
  if (diffDays === 0) return 'ينتهي اليوم';
  return `متبقي ${diffDays} يوم`;
}
</script>
