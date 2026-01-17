<template>
  <div class="table-page p-6">
    <header class="mb-6">
      <h1 class="text-3xl font-bold mb-2">Exemplo 3: Tabela Complexa</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Comparação entre Pinia Store e Provide/Inject para gerenciar estado de tabela com filtros, ordenação e paginação
      </p>
    </header>

    <!-- Comparação conceitual -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Pinia -->
      <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
          Opção A: Pinia Store
        </h3>

        <div class="mb-4">
          <p class="text-sm mb-3">
            Store global acessível de qualquer componente da aplicação.
          </p>

          <div class="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
            <div>TableRoot.vue</div>
            <div class="ml-3">const store = useTableStore()</div>
            <div class="ml-3">├─ TableFilters.vue</div>
            <div class="ml-6">const store = useTableStore()</div>
            <div class="ml-3">├─ TableContent.vue</div>
            <div class="ml-6">const store = useTableStore()</div>
            <div class="ml-3">└─ TablePagination.vue</div>
            <div class="ml-6">const store = useTableStore()</div>
          </div>
        </div>

        <div class="space-y-2 text-sm">
          <div>
            <strong class="text-green-600 dark:text-green-400">✅ Vantagens:</strong>
            <ul class="ml-4 mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Acesso direto de qualquer lugar</li>
              <li>• Vue DevTools para debug</li>
              <li>• Persistência entre rotas (se necessário)</li>
              <li>• Fácil de testar (mock da store)</li>
            </ul>
          </div>

          <div>
            <strong class="text-red-600 dark:text-red-400">❌ Desvantagens:</strong>
            <ul class="ml-4 mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Acoplamento global</li>
              <li>• Precisa resetar estado manualmente</li>
              <li>• Overhead de store global para contexto local</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
          <strong>Quando usar:</strong> Estado que precisa persistir entre rotas ou ser acessado globalmente
        </div>
      </div>

      <!-- Provide/Inject -->
      <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
          Opção B: Provide/Inject (createInjectionState)
        </h3>

        <div class="mb-4">
          <p class="text-sm mb-3">
            Contexto isolado fornecido pelo componente raiz, acessível apenas por seus descendentes.
          </p>

          <div class="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
            <div>TableRoot.vue (Provider)</div>
            <div class="ml-3">useProvideTableContext()</div>
            <div class="ml-3">├─ TableFilters.vue</div>
            <div class="ml-6">const ctx = useTableContext()</div>
            <div class="ml-3">├─ TableContent.vue</div>
            <div class="ml-6">const ctx = useTableContext()</div>
            <div class="ml-3">└─ TablePagination.vue</div>
            <div class="ml-6">const ctx = useTableContext()</div>
          </div>
        </div>

        <div class="space-y-2 text-sm">
          <div>
            <strong class="text-green-600 dark:text-green-400">✅ Vantagens:</strong>
            <ul class="ml-4 mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Contexto automaticamente isolado</li>
              <li>• Limpeza automática ao desmontar</li>
              <li>• Rastreabilidade (import explícito)</li>
              <li>• Type-safe automático</li>
              <li>• Mais leve (sem overhead de store)</li>
            </ul>
          </div>

          <div>
            <strong class="text-red-600 dark:text-red-400">❌ Desvantagens:</strong>
            <ul class="ml-4 mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Precisa de @vueuse/core</li>
              <li>• Não tem DevTools nativo</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded text-xs">
          <strong>Quando usar:</strong> Estado que vive apenas durante o ciclo de vida do componente raiz
        </div>
      </div>
    </div>

    <!-- Demonstração interativa -->
    <div class="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold mb-4">🧪 Demonstração Interativa</h3>

      <div class="tabs mb-4">
        <button
          @click="activeTab = 'pinia'"
          :class="activeTab === 'pinia' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'"
          class="px-4 py-2 rounded-l-lg transition-colors"
        >
          Pinia Store
        </button>
        <button
          @click="activeTab = 'inject'"
          :class="activeTab === 'inject' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'"
          class="px-4 py-2 rounded-r-lg transition-colors"
        >
          Provide/Inject
        </button>
      </div>

      <TablePiniaExample v-if="activeTab === 'pinia'" />
      <TableInjectExample v-else />
    </div>

    <!-- Conclusão -->
    <div class="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
      <h3 class="text-lg font-semibold mb-3">🎯 Conclusão e Recomendação</h3>

      <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong class="text-purple-600 dark:text-purple-400">Para este exemplo de tabela:</strong>
          <p class="mt-1">
            <strong>createInjectionState é a melhor escolha</strong> porque:
          </p>
          <ul class="ml-6 mt-1 space-y-1 list-disc">
            <li>O estado da tabela não precisa persistir entre rotas</li>
            <li>Isolamento automático evita bugs de estado compartilhado</li>
            <li>Limpeza automática ao desmontar o componente</li>
            <li>Hierarquia de 4 níveis (Root → Filters/Content/Pagination → Componentes internos)</li>
          </ul>
        </div>

        <div>
          <strong class="text-blue-600 dark:text-blue-400">Use Pinia Store quando:</strong>
          <ul class="ml-6 mt-1 space-y-1 list-disc">
            <li>Precisa acessar o estado de múltiplas páginas/rotas</li>
            <li>Quer persistir filtros entre navegações</li>
            <li>Precisa de cache global de dados da API</li>
            <li>Quer usar Vue DevTools para debug avançado</li>
          </ul>
        </div>

        <div class="mt-4 p-4 bg-white dark:bg-gray-900 rounded border-l-4 border-purple-600">
          <strong>💡 Regra prática:</strong>
          <p class="mt-1">
            Se o estado vive e morre com o componente raiz → <strong>createInjectionState</strong><br>
            Se o estado precisa persistir globalmente → <strong>Pinia Store</strong>
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-between items-center">
      <RouterLink
        to="/state-management/form"
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
      >
        ← Anterior: Formulário
      </RouterLink>

      <RouterLink
        to="/state-management"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
      >
        Voltar aos Exemplos
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import TablePiniaExample from './Pinia/TablePiniaExample.vue'
import TableInjectExample from './ProvideInject/TableInjectExample.vue'

const activeTab = ref<'pinia' | 'inject'>('inject')
</script>
