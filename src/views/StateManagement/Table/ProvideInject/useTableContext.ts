import { createInjectionState } from '@vueuse/core'
import { ref, computed } from 'vue'
import type { Product, Filters, Pagination, SortConfig, SortField } from '../types'
import { MOCK_PRODUCTS } from '../mockData'

/**
 * Composable de contexto de tabela usando createInjectionState
 *
 * Quando usar createInjectionState para contexto local:
 * - Hierarquia de 3+ níveis
 * - Estado que não precisa persistir globalmente
 * - Quer rastreabilidade e type-safety
 * - Componente composto (Table com filtros, paginação, etc)
 *
 * Vantagens sobre Pinia:
 * - Contexto automaticamente isolado (limpo ao desmontar)
 * - Mais leve (sem overhead de store global)
 * - Rastreabilidade explícita (import do composable)
 */
export const [useProvideTableContext, useTableContext] = createInjectionState(
  () => {
    // Estado
    const allProducts = ref<Product[]>([...MOCK_PRODUCTS])
    const isLoading = ref(false)

    const filters = ref<Filters>({
      search: '',
      category: '',
      status: ''
    })

    const sort = ref<SortConfig>({
      field: null,
      direction: 'asc'
    })

    const pagination = ref<Pagination>({
      currentPage: 1,
      pageSize: 5,
      total: 0
    })

    // Computed - Produtos filtrados
    const filteredProducts = computed(() => {
      let result = [...allProducts.value]

      // Filtro de busca
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        result = result.filter(p =>
          p.name.toLowerCase().includes(search)
        )
      }

      // Filtro de categoria
      if (filters.value.category && filters.value.category !== 'Todos') {
        result = result.filter(p => p.category === filters.value.category)
      }

      // Filtro de status
      if (filters.value.status) {
        result = result.filter(p => p.status === filters.value.status)
      }

      return result
    })

    // Computed - Produtos ordenados
    const sortedProducts = computed(() => {
      if (!sort.value.field) return filteredProducts.value

      return [...filteredProducts.value].sort((a, b) => {
        const aValue = a[sort.value.field!]
        const bValue = b[sort.value.field!]

        let comparison = 0
        if (aValue < bValue) comparison = -1
        if (aValue > bValue) comparison = 1

        return sort.value.direction === 'asc' ? comparison : -comparison
      })
    })

    // Computed - Produtos paginados
    const paginatedProducts = computed(() => {
      const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
      const end = start + pagination.value.pageSize
      return sortedProducts.value.slice(start, end)
    })

    // Computed - Total de páginas
    const totalPages = computed(() => {
      return Math.ceil(sortedProducts.value.length / pagination.value.pageSize)
    })

    // Computed - Estatísticas
    const stats = computed(() => ({
      total: filteredProducts.value.length,
      available: filteredProducts.value.filter(p => p.status === 'available').length,
      lowStock: filteredProducts.value.filter(p => p.status === 'low_stock').length,
      outOfStock: filteredProducts.value.filter(p => p.status === 'out_of_stock').length
    }))

    // Métodos
    function updateFilter<K extends keyof Filters>(field: K, value: Filters[K]) {
      filters.value[field] = value
      pagination.value.currentPage = 1 // Reset para primeira página ao filtrar
      updatePaginationTotal()
    }

    function toggleSort(field: SortField) {
      if (sort.value.field === field) {
        // Alterna direção
        sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
      } else {
        // Nova coluna
        sort.value.field = field
        sort.value.direction = 'asc'
      }
    }

    function goToPage(page: number) {
      if (page >= 1 && page <= totalPages.value) {
        pagination.value.currentPage = page
      }
    }

    function updatePageSize(size: number) {
      pagination.value.pageSize = size
      pagination.value.currentPage = 1
      updatePaginationTotal()
    }

    function updatePaginationTotal() {
      pagination.value.total = sortedProducts.value.length
    }

    function clearFilters() {
      filters.value = {
        search: '',
        category: '',
        status: ''
      }
      pagination.value.currentPage = 1
      updatePaginationTotal()
    }

    // Inicializa total
    updatePaginationTotal()

    return {
      // Estado
      allProducts,
      isLoading,
      filters,
      sort,
      pagination,

      // Computed
      filteredProducts,
      sortedProducts,
      paginatedProducts,
      totalPages,
      stats,

      // Métodos
      updateFilter,
      toggleSort,
      goToPage,
      updatePageSize,
      clearFilters
    }
  }
)
