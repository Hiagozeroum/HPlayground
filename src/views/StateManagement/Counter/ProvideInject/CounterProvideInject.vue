<template>
  <div class="counter-example border border-gray-300 dark:border-gray-600 rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
      3. Provide/Inject (createInjectionState)
    </h3>

    <CounterParent />

    <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
      <p class="text-sm font-semibold mb-2">✅ Vantagens:</p>
      <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <li>• Sem props drilling</li>
        <li>• Contexto isolado (não global)</li>
        <li>• Type-safe automático</li>
        <li>• Rastreabilidade (import do composable)</li>
        <li>• SSR-safe</li>
      </ul>

      <p class="text-sm font-semibold mt-3 mb-2">❌ Desvantagens:</p>
      <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <li>• Precisa de biblioteca externa (@vueuse/core)</li>
        <li>• Mais abstrato para iniciantes</li>
      </ul>

      <p class="text-sm font-semibold mt-3 mb-2 text-green-600 dark:text-green-400">
        🎯 Melhor abordagem para hierarquias 3+ níveis!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CounterParent from './CounterParent.vue'
</script>
