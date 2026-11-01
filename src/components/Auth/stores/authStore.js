import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { env } from '@/environment';
import { ROLES, DEFAULT_ROLE_ROUTES } from '@/shared/constants/roles';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(env.tokenKey) || null);
  
  const storedUser = localStorage.getItem(env.userKey);
  let parsedUser = null;
  try {
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    parsedUser = null;
  }

  // مستخدم تجريبي افتراضي لسهولة تصميم ومعاينة الهيدر والسايدبار
  const defaultUser = {
    id: 1,
    fullName: 'المستخدم الحالي',
    email: 'user@institute.local',
    role: ROLES.COMMANDER, // يمكنك تغييره لمعاينة أي دور: Admin, Affairs, Trainee, Security, Commander
  };

  const user = ref(parsedUser || defaultUser);

  const isAuthenticated = computed(() => !!token.value);

  const currentRole = computed(() => user.value?.role || ROLES.COMMANDER);

  const defaultHomePath = computed(() => {
    return DEFAULT_ROLE_ROUTES[currentRole.value] || '/dashboard';
  });

  function setAuth(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
    localStorage.setItem(env.tokenKey, newToken);
    localStorage.setItem(env.userKey, JSON.stringify(newUser));
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem(env.tokenKey);
    localStorage.removeItem(env.userKey);
  }

  return {
    token,
    user,
    isAuthenticated,
    currentRole,
    defaultHomePath,
    setAuth,
    logout,
  };
});
