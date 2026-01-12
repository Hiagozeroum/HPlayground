import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store para controlar o estado da Navbar
 * Exemplo de uso:
 * - Controlar drawer lateral em mobile
 * - Mostrar/ocultar navbar
 * - Armazenar título da página atual
 */
export const useNavbarStore = defineStore('navbar', () => {
  // State
  const drawer = ref(false)
  const title = ref('HPlayground')
  const showNavbar = ref(true)

  // Getters
  const isDrawerOpen = computed(() => drawer.value)
  const currentTitle = computed(() => title.value)

  // Actions
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function setDrawer(value: boolean) {
    drawer.value = value
  }

  function setTitle(newTitle: string) {
    title.value = newTitle
  }

  function toggleNavbar() {
    showNavbar.value = !showNavbar.value
  }

  return {
    // State
    drawer,
    title,
    showNavbar,

    // Getters
    isDrawerOpen,
    currentTitle,

    // Actions
    toggleDrawer,
    setDrawer,
    setTitle,
    toggleNavbar,
  }
})
