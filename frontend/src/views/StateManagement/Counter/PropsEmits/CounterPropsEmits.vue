<template>
  <div class="counter-example border border-gray-300 dark:border-gray-600 rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
      1. Props/Emits (Tradicional)
    </h3>

    <CounterParent />

    <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
      <p class="text-sm font-semibold mb-2">✅ Vantagens:</p>
      <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <li>• Fluxo de dados explícito e claro</li>
        <li>• Fácil de entender para iniciantes</li>
        <li>• Bom para componentes reutilizáveis</li>
      </ul>

      <p class="text-sm font-semibold mt-3 mb-2">❌ Desvantagens:</p>
      <ul class="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <li>• Props drilling em hierarquias profundas</li>
        <li>• Emits precisam ser repassados</li>
        <li>• Código verboso para 3+ níveis</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import CounterParent from './CounterParent.vue'
</script>
