<template>
  <nav v-if="crumbs.length" class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-1" aria-label="Breadcrumb">
    <RouterLink to="/" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">الرئيسية</RouterLink>
    <template v-for="(crumb, idx) in crumbs" :key="crumb.path">
      <span class="text-slate-300 dark:text-slate-600">/</span>
      <span v-if="idx === crumbs.length - 1" class="font-bold text-slate-800 dark:text-slate-200">
        {{ crumb.title }}
      </span>
      <RouterLink v-else :to="crumb.path" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        {{ crumb.title }}
      </RouterLink>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();

const crumbs = computed(() => {
  const matched = route.matched.filter((m) => m.meta?.title);
  return matched.map((m) => ({
    title: m.meta.title,
    path: m.path,
  }));
});
</script>
