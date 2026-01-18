<template>
  <v-card color="demo-parent" variant="flat" class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <v-chip color="info" label>
        <v-icon icon="mdi-store" size="small" class="mr-1" />
        Usando Pinia Store
      </v-chip>
      <v-btn variant="outlined" size="small" @click="store.reset()">
        Reset
      </v-btn>
    </div>

    <!-- Stats -->
    <v-row class="mb-4" dense>
      <v-col cols="3">
        <v-card variant="tonal" color="info" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Total</div>
          <div class="text-h6 font-weight-bold">{{ store.stats.total }}</div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal" color="success" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Disponível</div>
          <div class="text-h6 font-weight-bold text-success">{{ store.stats.available }}</div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal" color="warning" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Baixo</div>
          <div class="text-h6 font-weight-bold text-warning">{{ store.stats.lowStock }}</div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card variant="tonal" color="error" class="pa-3 text-center">
          <div class="text-caption text-medium-emphasis">Sem estoque</div>
          <div class="text-h6 font-weight-bold text-error">{{ store.stats.outOfStock }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-row class="mb-4" dense>
      <v-col cols="6">
        <v-text-field
          :model-value="store.filters.search"
          label="Buscar produto..."
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          @update:model-value="(val) => store.updateFilter('search', val)"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          :model-value="store.filters.category"
          :items="categories"
          label="Categoria"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          @update:model-value="(val) => store.updateFilter('category', val || '')"
        />
      </v-col>
    </v-row>

    <!-- Table -->
    <v-card color="demo-child" variant="flat" class="mb-4">
      <v-table density="compact">
        <thead>
          <tr>
            <th class="cursor-pointer" @click="store.toggleSort('name')">
              Nome
              <v-icon v-if="store.sort.field === 'name'" size="small">
                {{ store.sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </th>
            <th class="cursor-pointer" @click="store.toggleSort('price')">
              Preço
              <v-icon v-if="store.sort.field === 'price'" size="small">
                {{ store.sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </th>
            <th class="cursor-pointer" @click="store.toggleSort('stock')">
              Estoque
              <v-icon v-if="store.sort.field === 'stock'" size="small">
                {{ store.sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in store.paginatedProducts" :key="product.id">
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
    <div class="d-flex align-center justify-space-between">
      <span class="text-body-2">
        Página {{ store.pagination.currentPage }} de {{ store.totalPages }}
      </span>
      <div class="d-flex ga-2">
        <v-btn
          variant="outlined"
          size="small"
          :disabled="store.pagination.currentPage === 1"
          @click="store.goToPage(store.pagination.currentPage - 1)"
        >
          Anterior
        </v-btn>
        <v-btn
          variant="outlined"
          size="small"
          :disabled="store.pagination.currentPage === store.totalPages"
          @click="store.goToPage(store.pagination.currentPage + 1)"
        >
          Próxima
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useTableStore } from './useTableStore'

const store = useTableStore()

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

// IMPORTANTE: Limpar estado ao desmontar quando usado para contexto local!
onUnmounted(() => {
  store.reset()
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.cursor-pointer:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
