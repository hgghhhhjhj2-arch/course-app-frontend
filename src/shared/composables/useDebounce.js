import { ref, watch } from 'vue';

export function useDebounce(sourceRef, delay = 300) {
  const debouncedValue = ref(sourceRef.value);
  let timeoutId = null;

  watch(sourceRef, (newValue) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
}
