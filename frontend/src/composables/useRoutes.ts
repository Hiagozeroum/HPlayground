import { computed, ref } from 'vue'
import { routesConfig } from '@/config/routes'
import type { RouteInfo } from '@/types/route'

/**
 * Composable para trabalhar com rotas
 * Fornece funcionalidades de busca e filtragem
 */
export function useRoutes() {
  const searchQuery = ref('')

  const allRoutes = computed(() => routesConfig)

  const visibleRoutes = computed(() => routesConfig.filter((route) => route.showInHome !== false))

  const filteredRoutes = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()

    if (!query) {
      return visibleRoutes.value
    }

    return visibleRoutes.value.filter(
      (route) =>
        route.title.toLowerCase().includes(query) ||
        route.description.toLowerCase().includes(query) ||
        route.path.toLowerCase().includes(query),
    )
  })

  function getRouteByName(name: string): RouteInfo | undefined {
    return routesConfig.find((route) => route.name === name)
  }

  function clearSearch() {
    searchQuery.value = ''
  }

  return {
    searchQuery,
    allRoutes,
    visibleRoutes,
    filteredRoutes,
    getRouteByName,
    clearSearch,
  }
}
