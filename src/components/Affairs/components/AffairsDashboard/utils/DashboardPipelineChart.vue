<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs select-none flex flex-col justify-between">
    <!-- رأس الكارت -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
      <div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <TrendingUp class="w-4 h-4" />
          </div>
          <h3 class="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base font-heading">
            مسار تدفق طلبات الالتحاق والسداد الأسبوعي
          </h3>
        </div>
        <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
          متابعة بسيطة ومباشرة لحجم الطلبات الواردة مقارنة بالمسددة بالخزينة
        </p>
      </div>

      <!-- مؤشرات الألوان المخصصة (Custom Legend) -->
      <div class="flex items-center gap-4 text-xs font-bold self-start sm:self-auto">
        <div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <span class="w-3 h-1 rounded-full bg-blue-500"></span>
          <span>الطلبات الواردة</span>
        </div>
        <div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <span class="w-3 h-1 rounded-full bg-emerald-500"></span>
          <span>المسددة بالخزينة</span>
        </div>
      </div>
    </div>

    <!-- مساحة الرسم البياني المنحني الانسيابي (Area / Curved Line) -->
    <div class="relative w-full h-56 sm:h-64 pt-2">
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Chart from 'primevue/chart';
import { TrendingUp } from 'lucide-vue-next';
import { getChartTheme } from '../helpers/dashboardConstants';
import { WEEKLY_PIPELINE_DATA } from '../helpers/dashboardMockData';

const isDark = ref(false);
let observer = null;

function checkDarkMode() {
  isDark.value = document.documentElement.classList.contains('dark');
}

onMounted(() => {
  checkDarkMode();
  observer = new MutationObserver(checkDarkMode);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const chartData = computed(() => {
  return {
    labels: WEEKLY_PIPELINE_DATA.labels,
    datasets: [
      {
        label: 'الطلبات الواردة',
        borderColor: '#3b82f6',
        backgroundColor: isDark.value ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.08)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        data: WEEKLY_PIPELINE_DATA.applicationsReceived,
      },
      {
        label: 'المسددة بالخزينة',
        borderColor: '#10b981',
        backgroundColor: isDark.value ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        data: WEEKLY_PIPELINE_DATA.applicationsPaid,
      },
    ],
  };
});

const chartOptions = computed(() => {
  const theme = getChartTheme(isDark.value);

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        rtl: true,
        textDirection: 'rtl',
        backgroundColor: isDark.value ? '#1e293b' : '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#f1f5f9',
        borderColor: isDark.value ? '#334155' : '#1e293b',
        borderWidth: 1,
        padding: 8,
        usePointStyle: true,
        titleFont: {
          family: 'Cairo, Tajawal, system-ui',
          size: 11,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Cairo, Tajawal, system-ui',
          size: 11,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.textMutedColor,
          font: {
            family: 'Cairo, Tajawal, system-ui',
            size: 11,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: theme.textMutedColor,
          font: {
            family: 'Cairo, Tajawal, system-ui',
            size: 10,
          },
          stepSize: 10,
        },
        grid: {
          color: theme.gridColor,
        },
        border: {
          display: false,
        },
      },
    },
  };
});
</script>
