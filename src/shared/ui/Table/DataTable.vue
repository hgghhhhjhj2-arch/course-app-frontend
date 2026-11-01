<template>
  <div class="w-full flex flex-col gap-3">
    <!-- Search and Actions Bar -->
    <div v-if="searchable || $slots.actions" class="flex flex-wrap items-center justify-between gap-3">
      <div v-if="searchable" class="relative max-w-xs w-full">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <table class="w-full text-right text-xs">
        <thead class="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3.5"
              :class="col.headerClass || ''"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          <tr v-if="loading">
            <td :colspan="columns.length" class="py-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center gap-2">
                <div class="w-6 h-6 border-2 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
                <span>جاري تحميل البيانات...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="!filteredData.length">
            <td :colspan="columns.length" class="py-12 text-center text-slate-400 font-medium">
              {{ emptyText }}
            </td>
          </tr>
          <tr
            v-for="(row, idx) in paginatedData"
            :key="row.id || idx"
            class="hover:bg-slate-50/80 transition-colors"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3.5"
              :class="col.cellClass || ''"
            >
              <slot :name="col.key" :row="row" :value="row[col.key]">
                {{ row[col.key] ?? '—' }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div
      v-if="paginated && totalPages > 1"
      class="flex items-center justify-between px-2 text-xs text-slate-500"
    >
      <span>عرض {{ (page - 1) * perPage + 1 }} إلى {{ Math.min(page * perPage, filteredData.length) }} من أصل {{ filteredData.length }}</span>
      <div class="flex items-center gap-1.5">
        <button
          :disabled="page <= 1"
          class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          @click="page--"
        >
          السابق
        </button>
        <span class="px-2 font-semibold text-slate-700">{{ page }} / {{ totalPages }}</span>
        <button
          :disabled="page >= totalPages"
          class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          @click="page++"
        >
          التالي
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true, // [{ key: 'id', label: '#' }]
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: 'لا توجد بيانات متاحة حالياً.',
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'بحث...',
  },
  paginated: {
    type: Boolean,
    default: true,
  },
  perPage: {
    type: Number,
    default: 10,
  },
});

const searchQuery = ref('');
const page = ref(1);

const filteredData = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return props.data || [];
  }
  const q = searchQuery.value.toLowerCase().trim();
  return (props.data || []).filter((item) => {
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(q)
    );
  });
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredData.value.length / props.perPage));
});

const paginatedData = computed(() => {
  if (!props.paginated) return filteredData.value;
  const start = (page.value - 1) * props.perPage;
  return filteredData.value.slice(start, start + props.perPage);
});
</script>
