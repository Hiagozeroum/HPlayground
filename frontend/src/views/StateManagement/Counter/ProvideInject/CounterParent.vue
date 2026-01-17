<template>
  <div class="parent bg-gray-50 dark:bg-gray-800 p-4 rounded">
    <div class="mb-3">
      <span class="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
        CounterParent.vue (PROVIDER)
      </span>
    </div>

    <div class="mb-4">
      <p class="text-sm mb-2">Contexto fornecido aqui:</p>
      <div class="text-2xl font-bold">{{ count }}</div>
    </div>

    <CounterChild />

    <div class="mt-3 text-xs text-gray-500">
      💡 useProvideCounterContext() - fornece o contexto para a árvore
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProvideCounterContext } from './useCounterContext'
import CounterChild from './CounterChild.vue'

// Fornece o contexto para todos os componentes descendentes
// Desestruturação deixa explícito o que está sendo usado
const { count } = useProvideCounterContext()
</script>
