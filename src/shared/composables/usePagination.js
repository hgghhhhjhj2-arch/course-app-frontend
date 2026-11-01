import { ref, computed } from 'vue';

export function usePagination(items, initialPerPage = 10) {
  const currentPage = ref(1);
  const perPage = ref(initialPerPage);

  const totalPages = computed(() => {
    const list = items.value || [];
    return Math.max(1, Math.ceil(list.length / perPage.value));
  });

  const paginatedItems = computed(() => {
    const list = items.value || [];
    const start = (currentPage.value - 1) * perPage.value;
    return list.slice(start, start + perPage.value);
  });

  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }

  function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
  }

  function setPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  return {
    currentPage,
    perPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    setPage,
  };
}
