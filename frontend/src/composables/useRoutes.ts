import { computed, ref } from 'vue'
import { routesConfig, routeGroups } from '@/config/routes'
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

  // Agrupa rotas filtradas por categoria (para exibição na Home)
  const filteredRouteGroups = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()

    return routeGroups
      .map((group) => {
        // Se o nome do grupo bate com a busca, mostra todas as rotas visíveis do grupo
        const groupNameMatches = query && group.name.toLowerCase().includes(query)

        return {
          ...group,
          routes: group.routes.filter((r) => {
            if (r.showInHome === false) return false
            if (groupNameMatches) return true
            if (!query) return true

            return (
              r.title.toLowerCase().includes(query) ||
              r.description.toLowerCase().includes(query) ||
              r.path.toLowerCase().includes(query)
            )
          }),
        }
      })
      .filter((group) => group.routes.length > 0)
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
    filteredRouteGroups,
    getRouteByName,
    clearSearch,
  }
}
