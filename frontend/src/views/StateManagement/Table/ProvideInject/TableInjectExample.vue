<template>
  <v-card color="demo-parent" variant="flat" class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <v-chip color="primary" label>
        <v-icon icon="mdi-injection" size="small" class="mr-1" />
        🎯 TableInjectExample.vue (Nível 1 - Provider) - {{ allProducts.length }}
      </v-chip>
    </div>

    <TableContainer />
  </v-card>
</template>

<script setup lang="ts">
import { useProvideTableContext } from './useTableContext'
import TableContainer from './components/TableContainer.vue'

// 🎯 NÍVEL 1 (ROOT): Provider - cria e fornece o contexto para toda a árvore
const { allProducts } = useProvideTableContext()

// Poderia simplesmente fazer o provide também.
// useProvideTableContext()
</script>
