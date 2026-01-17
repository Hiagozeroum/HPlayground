import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store para controlar o estado da Navbar
 * Exemplo de uso:
 * - Controlar drawer lateral em mobile
 * - Mostrar/ocultar navbar
 * - Armazenar título da página atual
 * - Controlar modo rail (miniatura) do drawer
 */
export const useNavbarStore = defineStore('navbar', () => {
  // State
  const drawer = ref(false)
  const rail = ref(false) // false = expandido, true = miniatura
  const title = ref('HPlayground')
  const showNavbar = ref(true)

  // Getters
  const isDrawerOpen = computed(() => drawer.value)
  const isRailMode = computed(() => rail.value)
  const currentTitle = computed(() => title.value)

  // Actions
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function setDrawer(value: boolean) {
    drawer.value = value
  }

  function toggleRail() {
    rail.value = !rail.value
  }

  function setRail(value: boolean) {
    rail.value = value
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
    rail,
    title,
    showNavbar,

    // Getters
    isDrawerOpen,
    isRailMode,
    currentTitle,

    // Actions
    toggleDrawer,
    setDrawer,
    toggleRail,
    setRail,
    setTitle,
    toggleNavbar,
  }
})
