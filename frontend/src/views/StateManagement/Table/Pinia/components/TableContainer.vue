<template>
  <div>
    <v-chip size="x-small" color="demo-badge" label class="mb-4">
      📦 TableContainer.vue (Nível 2 - Pinia)
    </v-chip>

    <v-card elevation="2" color="demo-parent">
      <TableStats />
      <TableFilters />
      <TableContent />
      <TablePagination />
    </v-card>

    <v-alert type="info" variant="tonal" class="mt-4" density="compact">
      ⚠️ IMPORTANTE: Precisa resetar manualmente ao desmontar (onUnmounted)
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import TableStats from './TableStats.vue'
import TableFilters from './TableFilters.vue'
import TableContent from './TableContent.vue'
import TablePagination from './TablePagination.vue'

// 📦 NÍVEL 2: Organiza a estrutura da tabela
// Não precisa receber props - os filhos acessam a store diretamente
</script>
