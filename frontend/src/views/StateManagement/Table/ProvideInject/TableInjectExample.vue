<template>
  <v-card color="demo-parent" variant="flat" class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <v-chip color="primary" label>
        <v-icon icon="mdi-injection" size="small" class="mr-1" />
        Usando Provide/Inject (createInjectionState)
      </v-chip>
      <v-btn variant="outlined" size="small" @click="clearFilters()">
        Limpar Filtros
      </v-btn>
    </div>

    <!-- Stats -->
    <v-row class="mb-4" dense>
      <v-col cols="3">
        <v-card variant="tonal" color="primary" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Total</div>
          <div class="text-h6 font-weight-bold">{{ stats.total }}</div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal" color="success" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Disponível</div>
          <div class="text-h6 font-weight-bold text-success">{{ stats.available }}</div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal" color="warning" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Baixo</div>
          <div class="text-h6 font-weight-bold text-warning">{{ stats.lowStock }}</div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal" color="error" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Sem estoque</div>
          <div class="text-h6 font-weight-bold text-error">{{ stats.outOfStock }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-row class="mb-4" dense>
      <v-col cols="6">
        <v-text-field
          :model-value="filters.search"
          label="Buscar produto..."
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          @update:model-value="(val) => updateFilter('search', val)"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          :model-value="filters.category"
          :items="categories"
          label="Categoria"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          @update:model-value="(val) => updateFilter('category', val || '')"
        />
      </v-col>
    </v-row>

    <!-- Table -->
    <v-card color="demo-child" variant="flat" class="mb-4">
      <v-table density="compact">
        <thead>
          <tr>
            <th class="cursor-pointer" @click="toggleSort('name')">
              Nome
              <v-icon v-if="sort.field === 'name'" size="small">
                {{ sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </th>
            <th class="cursor-pointer" @click="toggleSort('price')">
              Preço
              <v-icon v-if="sort.field === 'price'" size="small">
                {{ sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </th>
            <th class="cursor-pointer" @click="toggleSort('stock')">
              Estoque
              <v-icon v-if="sort.field === 'stock'" size="small">
                {{ sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>R$ {{ product.price.toFixed(2) }}</td>
            <td>
              <v-chip
                size="small"
                :color="getStatusColor(product.status)"
                variant="tonal"
              >
                {{ product.stock }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Pagination -->
    <div class="d-flex align-center justify-space-between mb-4">
      <span class="text-body-2">
        Página {{ pagination.currentPage }} de {{ totalPages }}
      </span>
      <div class="d-flex ga-2">
        <v-btn
          variant="outlined"
          size="small"
          :disabled="pagination.currentPage === 1"
          @click="goToPage(pagination.currentPage - 1)"
        >
          Anterior
        </v-btn>
        <v-btn
          variant="outlined"
          size="small"
          :disabled="pagination.currentPage === totalPages"
          @click="goToPage(pagination.currentPage + 1)"
        >
          Próxima
        </v-btn>
      </div>
    </div>

    <v-alert type="info" variant="tonal" density="compact">
      <v-icon icon="mdi-lightbulb-on" class="mr-1" />
      Estado é automaticamente limpo quando este componente é desmontado - sem necessidade de reset
      manual!
    </v-alert>
  </v-card>
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
  clearFilters,
} = useTableContext()!

const categories = ['Eletrônicos', 'Periféricos', 'Hardware', 'Armazenamento', 'Mobiliário']

function getStatusColor(status: string) {
  switch (status) {
    case 'available':
      return 'success'
    case 'low_stock':
      return 'warning'
    case 'out_of_stock':
      return 'error'
    default:
      return 'grey'
  }
}

// Note: Não precisa de onUnmounted para limpar - é automático!
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.cursor-pointer:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
