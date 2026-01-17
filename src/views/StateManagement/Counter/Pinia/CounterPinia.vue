<template>
  <div class="counter-example border border-gray-300 dark:border-gray-600 rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
      2. Pinia Store (Global State)
    </h3>

    <CounterParent />

    <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
      <p class="text-sm font-semibold mb-2">✅ Vantagens:</p>
      <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <li>• Acesso direto de qualquer componente</li>
        <li>• Sem props drilling</li>
        <li>• DevTools para debug</li>
        <li>• Fácil de testar (mock da store)</li>
      </ul>

      <p class="text-sm font-semibold mt-3 mb-2">❌ Desvantagens:</p>
      <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <li>• Acoplamento global</li>
        <li>• Pode ser overkill para casos simples</li>
        <li>• Precisa limpar estado ao desmontar (contexto local)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import CounterParent from './CounterParent.vue'
</script>
