import { ref } from 'vue';

const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
const initialTheme = savedTheme || 'light';
const theme = ref(initialTheme);

if (typeof document !== 'undefined') {
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme.value);
    } catch (e) {
      // ignore
    }
  }

  return {
    theme,
    toggleTheme,
  };
}
