<template>
  <div class="table-demo border border-purple-300 dark:border-purple-600 rounded-lg p-4">
    <div class="mb-3 flex items-center justify-between">
      <span class="text-xs font-mono bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
        Usando Provide/Inject (createInjectionState)
      </span>
      <button
        @click="clearFilters()"
        class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Limpar Filtros
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-2 mb-4">
      <div class="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
        <div class="text-lg font-bold">{{ stats.total }}</div>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Disponível</div>
        <div class="text-lg font-bold text-green-600">{{ stats.available }}</div>
      </div>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Baixo</div>
        <div class="text-lg font-bold text-yellow-600">{{ stats.lowStock }}</div>
      </div>
      <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Sem estoque</div>
        <div class="text-lg font-bold text-red-600">{{ stats.outOfStock }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-2 gap-3 mb-4">
      <input
        :value="filters.search"
        @input="e => updateFilter('search', (e.target as HTMLInputElement).value)"
        type="text"
        placeholder="Buscar produto..."
        class="px-3 py-2 border rounded text-sm"
      />

      <select
        :value="filters.category"
        @change="e => updateFilter('category', (e.target as HTMLSelectElement).value)"
        class="px-3 py-2 border rounded text-sm"
      >
        <option value="">Todas as categorias</option>
        <option value="Eletrônicos">Eletrônicos</option>
        <option value="Periféricos">Periféricos</option>
        <option value="Hardware">Hardware</option>
        <option value="Armazenamento">Armazenamento</option>
        <option value="Mobiliário">Mobiliário</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto mb-4">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-2 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" @click="toggleSort('name')">
              Nome {{ sort.field === 'name' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }}
            </th>
            <th class="p-2 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" @click="toggleSort('price')">
              Preço {{ sort.field === 'price' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }}
            </th>
            <th class="p-2 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" @click="toggleSort('stock')">
              Estoque {{ sort.field === 'stock' ? (sort.direction === 'asc' ? '↑' : '↓') : '' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="border-b dark:border-gray-700"
          >
            <td class="p-2">{{ product.name }}</td>
            <td class="p-2">R$ {{ product.price.toFixed(2) }}</td>
            <td class="p-2">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-green-100 text-green-800': product.status === 'available',
                  'bg-yellow-100 text-yellow-800': product.status === 'low_stock',
                  'bg-red-100 text-red-800': product.status === 'out_of_stock'
                }"
              >
                {{ product.stock }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between text-sm">
      <div>
        Página {{ pagination.currentPage }} de {{ totalPages }}
      </div>
      <div class="flex gap-2">
        <button
          @click="goToPage(pagination.currentPage - 1)"
          :disabled="pagination.currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          @click="goToPage(pagination.currentPage + 1)"
          :disabled="pagination.currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>

    <div class="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded text-xs">
      💡 Estado é automaticamente limpo quando este componente é desmontado - sem necessidade de reset manual!
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProvideTableContext, useTableContext } from './useTableContext'

// Provider: cria e fornece o contexto
useProvideTableContext()

// Consumer: consome o contexto (normalmente em componentes filhos, mas aqui no mesmo para demonstração)
// Desestruturação deixa explícito o que está sendo usado
const {
  stats,
  filters,
  sort,
  pagination,
  paginatedProducts,
  totalPages,
  updateFilter,
  toggleSort,
  goToPage,
  clearFilters
} = useTableContext()!

// Note: Não precisa de onUnmounted para limpar - é automático! ✨
</script>
