<template>
  <v-card-text>
    <v-chip size="x-small" color="demo-badge" label class="mb-2">
      🔍 TableFilters.vue (Nível 3)
    </v-chip>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="filters.search"
          label="Buscar produto..."
          variant="outlined"
          density="compact"
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          @update:model-value="(val) => updateFilter('search', val || '')"
        />
      </v-col>

      <v-col cols="12" md="4">
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

      <v-col cols="12" md="2">
        <v-btn block color="secondary" variant="outlined" @click="clearFilters">
          Limpar
        </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import { useTableContext } from '../useTableContext'

// 🔍 NÍVEL 3: Consumer - gerencia filtros
const { filters, updateFilter, clearFilters } = useTableContext()!

const categories = [
  'Todos',
  'Eletrônicos',
  'Periféricos',
  'Armazenamento',
  'Hardware',
  'Mobiliário',
]
</script>
