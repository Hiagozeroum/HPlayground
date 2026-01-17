<template>
  <div class="counter-page p-6">
    <header class="mb-6">
      <h1 class="text-3xl font-bold mb-2">Exemplo 1: Contador</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Comparação lado a lado de 3 abordagens para gerenciar estado em hierarquias de componentes
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Props/Emits -->
      <CounterPropsEmits />

      <!-- Pinia Store -->
      <CounterPinia />

      <!-- Provide/Inject -->
      <CounterProvideInject />
    </div>

    <div class="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
      <h3 class="text-lg font-semibold mb-3">🎓 Lições Aprendidas</h3>

      <div class="space-y-3 text-sm">
        <div>
          <strong class="text-purple-600 dark:text-purple-400">Props/Emits:</strong>
          <p class="text-gray-700 dark:text-gray-300">
            Melhor para hierarquias simples (1-2 níveis). Explícito e fácil de entender, mas fica verboso com mais níveis.
          </p>
        </div>

        <div>
          <strong class="text-purple-600 dark:text-purple-400">Pinia Store:</strong>
          <p class="text-gray-700 dark:text-gray-300">
            Ótimo para estado global ou contextos locais muito complexos (4+ níveis). Acesso direto de qualquer lugar, mas pode gerar acoplamento.
          </p>
        </div>

        <div>
          <strong class="text-purple-600 dark:text-purple-400">Provide/Inject (createInjectionState):</strong>
          <p class="text-gray-700 dark:text-gray-300">
            🎯 <strong>Melhor abordagem para hierarquias de 3+ níveis.</strong> Combina rastreabilidade, type-safety e isolamento de contexto.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-between items-center">
      <RouterLink
        to="/state-management"
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
      >
        ← Voltar para exemplos
      </RouterLink>

      <RouterLink
        to="/state-management/form"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
      >
        Próximo: Formulário →
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CounterPropsEmits from './PropsEmits/CounterPropsEmits.vue'
import CounterPinia from './Pinia/CounterPinia.vue'
import CounterProvideInject from './ProvideInject/CounterProvideInject.vue'
</script>
