<template>
  <div class="state-management-examples">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4">Exemplos de Gerenciamento de Estado Vue 3</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Comparação prática de diferentes abordagens para gerenciar estado em hierarquias de componentes
      </p>
    </header>

    <div class="examples-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Exemplo 1: Contador -->
      <RouterLink to="/state-management/counter" class="example-card">
        <div class="card p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex items-center mb-4">
            <div class="icon-badge bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
              <span class="text-2xl">🔢</span>
            </div>
            <h2 class="text-xl font-semibold">Contador</h2>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Comparação lado a lado das 3 abordagens principais
          </p>
          <ul class="text-xs space-y-1 text-gray-500">
            <li>✓ Props/Emits</li>
            <li>✓ Pinia Store</li>
            <li>✓ Provide/Inject</li>
          </ul>
          <div class="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Hierarquia: 2 níveis
          </div>
        </div>
      </RouterLink>

      <!-- Exemplo 2: Formulário -->
      <RouterLink to="/state-management/form" class="example-card">
        <div class="card p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex items-center mb-4">
            <div class="icon-badge bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
              <span class="text-2xl">📝</span>
            </div>
            <h2 class="text-xl font-semibold">Formulário Multi-nível</h2>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Implementação com createInjectionState
          </p>
          <ul class="text-xs space-y-1 text-gray-500">
            <li>✓ Validação em tempo real</li>
            <li>✓ Múltiplos campos</li>
            <li>✓ Type-safe</li>
          </ul>
          <div class="mt-4 text-xs font-semibold text-purple-600 dark:text-purple-400">
            Hierarquia: 3-4 níveis
          </div>
        </div>
      </RouterLink>

      <!-- Exemplo 3: Tabela -->
      <RouterLink to="/state-management/table" class="example-card">
        <div class="card p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex items-center mb-4">
            <div class="icon-badge bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
              <span class="text-2xl">📊</span>
            </div>
            <h2 class="text-xl font-semibold">Tabela Complexa</h2>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Pinia vs Provide/Inject
          </p>
          <ul class="text-xs space-y-1 text-gray-500">
            <li>✓ Filtros</li>
            <li>✓ Paginação</li>
            <li>✓ Ordenação</li>
          </ul>
          <div class="mt-4 text-xs font-semibold text-green-600 dark:text-green-400">
            Hierarquia: 4+ níveis
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="docs-link mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold mb-2">📚 Documentação Técnica</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Para entender as decisões arquiteturais e comparações detalhadas, consulte:
      </p>
      <code class="text-xs bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded">
        /estudos/gerenciamento-estados/comparacao-abordagens.md
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.example-card {
  text-decoration: none;
  color: inherit;
  display: block;
}

.example-card:hover .card {
  transform: translateY(-2px);
}

.card {
  transition: all 0.3s ease;
}
</style>
