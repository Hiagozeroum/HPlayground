<template>
  <v-card color="demo-parent" variant="flat" class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <v-chip color="info" label>
        <v-icon icon="mdi-store" size="small" class="mr-1" />
        🏪 TablePiniaExample.vue (Nível 1 - Store Global)
      </v-chip>
      <v-btn variant="outlined" size="small" @click="store.reset()"> Reset </v-btn>
    </div>

    <TableContainer />
  </v-card>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useTableStore } from './useTableStore'
import TableContainer from './components/TableContainer.vue'

// 🏪 NÍVEL 1: Usa store Pinia global
const store = useTableStore()

// IMPORTANTE: Limpar estado ao desmontar quando usado para contexto local!
onUnmounted(() => {
  store.reset()
})
</script>
