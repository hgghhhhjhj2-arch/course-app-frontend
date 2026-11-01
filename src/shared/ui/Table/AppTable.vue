<template>
  <div class="w-full overflow-hidden">
    <div class="overflow-x-auto custom-scrollbar">
      <table class="w-full text-right text-xs">
        <!-- ترويسة الجدول -->
        <thead>
          <tr class="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold select-none">
            <th
              v-for="col in columns"
              :key="col.key"
              class="py-3.5 px-4 font-black"
              :class="[
                col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left' : 'text-right',
                col.headerClass || ''
              ]"
            >
              <slot :name="`header-${col.key}`" :col="col">
                {{ col.label }}
              </slot>
            </th>
          </tr>
        </thead>

        <!-- جسم الجدول -->
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <!-- حالة التحميل -->
          <tr v-if="loading">
            <td :colspan="columns.length" class="py-12 text-center text-slate-400">
              <slot name="loading">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div class="w-7 h-7 border-2 border-slate-200 dark:border-slate-700 border-t-primary-600 rounded-full animate-spin"></div>
                  <span class="text-xs font-bold text-slate-500 dark:text-slate-400">جاري تحميل البيانات...</span>
                </div>
              </slot>
            </td>
          </tr>

          <!-- حالة عدم وجود بيانات -->
          <tr v-else-if="!data || data.length === 0">
            <td :colspan="columns.length" class="py-12 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
                    <Inbox class="w-6 h-6" />
                  </div>
                  <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {{ emptyTitle }}
                  </h4>
                  <p class="text-xs text-slate-400 mt-1 max-w-sm">
                    {{ emptyText }}
                  </p>
                  <button
                    v-if="isFiltered"
                    type="button"
                    class="mt-3 px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-bold hover:bg-primary-100 dark:hover:bg-primary-900/60 transition-colors cursor-pointer"
                    @click="$emit('clear-filters')"
                  >
                    إلغاء الفلاتر
                  </button>
                </div>
              </slot>
            </td>
          </tr>

          <!-- صفوف البيانات -->
          <tr
            v-for="(row, idx) in data"
            :key="row.id || idx"
            class="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors group"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="py-3.5 px-4"
              :class="[
                col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left' : 'text-right',
                col.cellClass || ''
              ]"
            >
              <slot :name="col.key" :row="row" :value="row[col.key]" :index="idx">
                {{ row[col.key] ?? '—' }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Inbox } from 'lucide-vue-next';

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyTitle: {
    type: String,
    default: 'لا توجد بيانات مطابقة حالياً',
  },
  emptyText: {
    type: String,
    default: 'جرّب مسح نص البحث أو إعادة ضبط خيارات الفلترة لعرض كافة البيانات',
  },
  isFiltered: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['clear-filters']);
</script>
