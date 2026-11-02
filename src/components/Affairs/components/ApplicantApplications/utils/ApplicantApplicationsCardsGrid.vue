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
              <div class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/70 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-primary-700 dark:text-primary-300 font-black text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
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
                  {{ app.code || ('#APP-' + app.id) }}
                </span>
              </div>
            </div>

            <!-- Category Badge -->
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0"
              :class="getCategoryBadgeClass(app.trainee?.category)"
            >
              {{ getCategoryLabel(app.trainee?.category) }}
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
              <span class="text-slate-400">الدفعة:</span>
              <span class="font-bold text-primary-700 dark:text-primary-300">
                دفعة {{ app.courseRound?.roundNumber || 1 }}
              </span>
            </div>
          </div>

          <!-- Phone & National ID & Price -->
          <div class="space-y-1.5 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5 text-slate-400">
                <CreditCard class="w-3.5 h-3.5" />
                <span>الرقم القومي:</span>
              </span>
              <span class="font-mono text-slate-800 dark:text-slate-200" dir="ltr">
                {{ app.trainee?.nationalId || '—' }}
              </span>
            </div>

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
              <span class="text-slate-400">الرسوم المقررة:</span>
              <strong class="font-black text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                {{ formatEgyptianCurrency(app.courseRound?.price) }}
              </strong>
            </div>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <button
            type="button"
            class="flex-1 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
            title="موافقة وتحديد موعد السداد"
            @click="$emit('openApproval', app)"
          >
            <CheckCircle2 class="w-3.5 h-3.5" />
            <span>موافقة</span>
          </button>

          <button
            type="button"
            class="py-2 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
            title="رفض الطلب"
            @click="$emit('openRejection', app)"
          >
            <XCircle class="w-3.5 h-3.5" />
            <span>رفض</span>
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
      <p class="text-xs font-bold">لا توجد طلبات تطابق الفلترة الحالية</p>
    </div>
  </div>
</template>

<script setup>
import { Phone, CreditCard, CheckCircle2, XCircle, Eye, Inbox } from 'lucide-vue-next';
import { formatEgyptianCurrency } from '../helpers/applicantConstants';

defineProps({
  applications: {
    type: Array,
    required: true,
  },
});

defineEmits(['openDetails', 'openApproval', 'openRejection']);

function getInitials(name) {
  if (!name) return 'م';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + ' ' + parts[1][0];
  return name.slice(0, 2);
}

function getCategoryLabel(cat) {
  const map = {
    Civilian: 'مدني',
    MilitaryOfficer: 'ضابط ق.م',
    MilitaryFamily: 'عائلات ضباط',
    PoliceOfficerOrFamily: 'شرطة',
  };
  return map[cat] || cat || 'عام';
}

function getCategoryBadgeClass(cat) {
  switch (cat) {
    case 'Civilian':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
    case 'MilitaryOfficer':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    case 'MilitaryFamily':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
    case 'PoliceOfficerOrFamily':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  }
}
</script>
