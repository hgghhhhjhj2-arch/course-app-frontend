<template>
  <div class="space-y-5 select-none pb-8">
    <!-- 1. ترويسة لوحة معلومات شؤون الدارسين -->
    <DashboardHeader
      :is-refreshing="isRefreshing"
      @refresh="handleRefresh"
    />

    <!-- 2. بطاقات المؤشرات الأربعة الموحدة (نفس الـ KPIs المطلوبة بدقة) -->
    <DashboardKpis :stats="stats" />

    <!-- 3. الصف الرئيسي للرسوم البيانية والعمليات التشغيلية للشؤون -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <!-- منحنى تدفق الطلبات الأسبوعي (شؤون الدارسين) -->
      <div class="lg:col-span-7">
        <DashboardPipelineChart />
      </div>

      <!-- جدول محاضرات وجلسات اليوم المنعقدة بالقاعات -->
      <div class="lg:col-span-5">
        <DashboardTodayLectures />
      </div>
    </div>

    <!-- 4. التنبيهات التشغيلية اللحظية (مهل السداد وحركات البوابة) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- تنبيهات مهل السداد الحرجة (اليوم ومتأخرة) -->
      <DashboardPaymentAlerts />

      <!-- حركات الدخول المباشرة للبوابة اليوم (سجل أمني مباشر) -->
      <DashboardLiveGateFeed />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// استيراد المكونات الفرعية المنظمة من utils
import DashboardHeader from './utils/DashboardHeader.vue';
import DashboardKpis from './utils/DashboardKpis.vue';
import DashboardPipelineChart from './utils/DashboardPipelineChart.vue';
import DashboardTodayLectures from './utils/DashboardTodayLectures.vue';
import DashboardPaymentAlerts from './utils/DashboardPaymentAlerts.vue';
import DashboardLiveGateFeed from './utils/DashboardLiveGateFeed.vue';

// استيراد البيانات من helpers
import { DASHBOARD_STATS } from './helpers/dashboardMockData';

const stats = ref({ ...DASHBOARD_STATS });
const isRefreshing = ref(false);

function handleRefresh() {
  isRefreshing.value = true;
  setTimeout(() => {
    stats.value = { ...DASHBOARD_STATS };
    isRefreshing.value = false;
  }, 400);
}
</script>
