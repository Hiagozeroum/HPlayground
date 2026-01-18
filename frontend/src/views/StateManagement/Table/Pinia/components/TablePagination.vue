<template>
  <v-card-actions>
    <v-chip size="x-small" color="demo-badge" label> 📄 TablePagination.vue (Nível 3) </v-chip>

    <v-spacer />

    <div class="text-caption mr-4">
      Página {{ store.pagination.currentPage }} de {{ store.totalPages }}
    </div>

    <v-btn-group density="compact" variant="outlined" divided>
      <v-btn
        :disabled="store.pagination.currentPage === 1"
        size="small"
        @click="store.goToPage(store.pagination.currentPage - 1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        :disabled="store.pagination.currentPage === store.totalPages"
        size="small"
        @click="store.goToPage(store.pagination.currentPage + 1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-btn-group>
  </v-card-actions>
</template>

<script setup lang="ts">
import { useTableStore } from '../useTableStore'

// 📄 NÍVEL 3: Acessa a store Pinia
const store = useTableStore()
</script>
