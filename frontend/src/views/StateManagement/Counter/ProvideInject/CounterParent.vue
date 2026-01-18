<template>
  <v-card color="demo-parent" variant="flat" class="pa-4 rounded">
    <div class="mb-3">
      <v-chip size="small" color="demo-badge" label>
        <span class="font-weight-medium text-caption">CounterParent.vue (PROVIDER)</span>
      </v-chip>
    </div>

    <div class="mb-4">
      <p class="text-body-2 mb-2">Contexto fornecido aqui:</p>
      <div class="text-h4 font-weight-bold">{{ count }}</div>
    </div>

    <CounterChild />

    <p class="text-caption text-medium-emphasis mt-3">
      useProvideCounterContext() - fornece o contexto para a árvore
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { useProvideCounterContext } from './useCounterContext'
import CounterChild from './CounterChild.vue'

// Fornece o contexto para todos os componentes descendentes
// Desestruturação deixa explícito o que está sendo usado
const { count } = useProvideCounterContext()
</script>
