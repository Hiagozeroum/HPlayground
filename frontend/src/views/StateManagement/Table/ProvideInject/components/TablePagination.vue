<template>
  <v-card-actions>
    <v-chip size="x-small" color="demo-badge" label> 📄 TablePagination.vue (Nível 3) </v-chip>

    <v-spacer />

    <div class="text-caption mr-4">
      Página {{ pagination.currentPage }} de {{ totalPages }}
    </div>

    <v-btn-group density="compact" variant="outlined" divided>
      <v-btn
        :disabled="pagination.currentPage === 1"
        size="small"
        @click="goToPage(pagination.currentPage - 1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        :disabled="pagination.currentPage === totalPages"
        size="small"
        @click="goToPage(pagination.currentPage + 1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-btn-group>
  </v-card-actions>
</template>

<script setup lang="ts">
import { useTableContext } from '../useTableContext'

// 📄 NÍVEL 3: Consumer - controles de paginação
const { pagination, totalPages, goToPage } = useTableContext()!
</script>
