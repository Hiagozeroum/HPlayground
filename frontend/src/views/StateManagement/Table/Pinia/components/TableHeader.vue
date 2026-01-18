<template>
  <thead>
    <tr>
      <th colspan="3" class="text-caption pa-2">
        <v-chip size="x-small" color="demo-badge" label> 📋 TableHeader.vue (Nível 4) </v-chip>
      </th>
    </tr>
    <tr>
      <th class="text-left cursor-pointer" @click="store.toggleSort('name')">
        <div class="d-flex align-center">
          Nome
          <v-icon v-if="store.sort.field === 'name'" size="small" class="ml-1">
            {{ store.sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
          </v-icon>
        </div>
      </th>

      <th class="text-left cursor-pointer" @click="store.toggleSort('price')">
        <div class="d-flex align-center">
          Preço
          <v-icon v-if="store.sort.field === 'price'" size="small" class="ml-1">
            {{ store.sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
          </v-icon>
        </div>
      </th>

      <th class="text-left cursor-pointer" @click="store.toggleSort('stock')">
        <div class="d-flex align-center">
          Estoque
          <v-icon v-if="store.sort.field === 'stock'" size="small" class="ml-1">
            {{ store.sort.direction === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
          </v-icon>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { useTableStore } from '../useTableStore'

// 📋 NÍVEL 4: Acessa a store Pinia
const store = useTableStore()
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}
</style>
