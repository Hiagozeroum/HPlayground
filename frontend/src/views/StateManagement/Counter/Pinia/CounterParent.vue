<template>
  <div class="parent bg-gray-50 dark:bg-gray-800 p-4 rounded">
    <div class="mb-3">
      <span class="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
        CounterParent.vue
      </span>
    </div>

    <div class="mb-4">
      <p class="text-sm mb-2">Acessando store diretamente:</p>
      <div class="text-2xl font-bold">{{ counterStore.count }}</div>
    </div>

    <CounterChild />

    <div class="mt-3 text-xs text-gray-500">
      💡 Nenhuma prop passada para o filho!
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from './useCounterStore'
import CounterChild from './CounterChild.vue'

const counterStore = useCounterStore()
</script>
