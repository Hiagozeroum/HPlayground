<template>
  <div class="table-demo border border-blue-300 dark:border-blue-600 rounded-lg p-4">
    <div class="mb-3 flex items-center justify-between">
      <span class="text-xs font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
        Usando Pinia Store
      </span>
      <button
        @click="store.reset()"
        class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Reset
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-2 mb-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
        <div class="text-lg font-bold">{{ store.stats.total }}</div>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Disponível</div>
        <div class="text-lg font-bold text-green-600">{{ store.stats.available }}</div>
      </div>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Baixo</div>
        <div class="text-lg font-bold text-yellow-600">{{ store.stats.lowStock }}</div>
      </div>
      <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded text-center">
        <div class="text-xs text-gray-600 dark:text-gray-400">Sem estoque</div>
        <div class="text-lg font-bold text-red-600">{{ store.stats.outOfStock }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-2 gap-3 mb-4">
      <input
        :value="store.filters.search"
        @input="e => store.updateFilter('search', (e.target as HTMLInputElement).value)"
        type="text"
        placeholder="Buscar produto..."
        class="px-3 py-2 border rounded text-sm"
      />

      <select
        :value="store.filters.category"
        @change="e => store.updateFilter('category', (e.target as HTMLSelectElement).value)"
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
            <th class="p-2 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" @click="store.toggleSort('name')">
              Nome {{ store.sort.field === 'name' ? (store.sort.direction === 'asc' ? '↑' : '↓') : '' }}
            </th>
            <th class="p-2 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" @click="store.toggleSort('price')">
              Preço {{ store.sort.field === 'price' ? (store.sort.direction === 'asc' ? '↑' : '↓') : '' }}
            </th>
            <th class="p-2 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" @click="store.toggleSort('stock')">
              Estoque {{ store.sort.field === 'stock' ? (store.sort.direction === 'asc' ? '↑' : '↓') : '' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in store.paginatedProducts"
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
        Página {{ store.pagination.currentPage }} de {{ store.totalPages }}
      </div>
      <div class="flex gap-2">
        <button
          @click="store.goToPage(store.pagination.currentPage - 1)"
          :disabled="store.pagination.currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          @click="store.goToPage(store.pagination.currentPage + 1)"
          :disabled="store.pagination.currentPage === store.totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useTableStore } from './useTableStore'

const store = useTableStore()

// IMPORTANTE: Limpar estado ao desmontar quando usado para contexto local!
onUnmounted(() => {
  store.reset()
})
</script>
