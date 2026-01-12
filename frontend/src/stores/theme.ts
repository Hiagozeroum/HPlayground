import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store para controlar temas
 * Permite alternar entre light/dark mode
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const themeName = computed(() => (isDark.value ? 'darkTheme' : 'customTheme'))

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setTheme(dark: boolean) {
    isDark.value = dark
  }

  return {
    isDark,
    themeName,
    toggleTheme,
    setTheme,
  }
})
