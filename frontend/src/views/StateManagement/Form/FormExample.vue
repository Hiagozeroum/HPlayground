<template>
  <div class="form-page p-6">
    <header class="mb-6">
      <h1 class="text-3xl font-bold mb-2">Exemplo 2: Formulário Multi-nível</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Demonstração de createInjectionState para gerenciar formulários complexos com validação
      </p>
    </header>

    <!-- Breadcrumb de hierarquia -->
    <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
      <h3 class="text-sm font-semibold mb-2">📊 Hierarquia de Componentes:</h3>
      <div class="text-xs font-mono text-gray-700 dark:text-gray-300">
        <div>FormExample.vue (Root - Provider)</div>
        <div class="ml-4">├─ FormHeader.vue (Consumer)</div>
        <div class="ml-4">├─ FormFields.vue (Consumer)</div>
        <div class="ml-8">│  ├─ NameField.vue (Consumer - nível 3)</div>
        <div class="ml-8">│  ├─ EmailField.vue (Consumer - nível 3)</div>
        <div class="ml-8">│  ├─ AgeField.vue (Consumer - nível 3)</div>
        <div class="ml-8">│  └─ TermsField.vue (Consumer - nível 3)</div>
        <div class="ml-4">└─ FormFooter.vue (Consumer)</div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-2xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <FormHeader />

        <FormFields />

        <FormFooter />
      </div>
    </div>

    <!-- Insights -->
    <div class="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <h3 class="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">
        🎯 Por que createInjectionState é ideal aqui?
      </h3>

      <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong>✅ Rastreabilidade:</strong> Cada componente importa explicitamente <code class="bg-gray-100 dark:bg-gray-900 px-1 rounded">useFormContext()</code>
          - você sabe exatamente de onde vem o estado.
        </div>

        <div>
          <strong>✅ Type-safe:</strong> TypeScript sabe exatamente quais campos e métodos estão disponíveis, com autocomplete completo.
        </div>

        <div>
          <strong>✅ Sem props drilling:</strong> Componentes de nível 3 (NameField, EmailField, etc) acessam diretamente o contexto,
          sem precisar que FormFields repasse props.
        </div>

        <div>
          <strong>✅ Contexto isolado:</strong> Diferente de Pinia, o estado só existe enquanto FormExample está montado.
          Perfeito para formulários que não precisam persistir globalmente.
        </div>

        <div>
          <strong>✅ Testável:</strong> Você pode testar cada campo isoladamente mockando o contexto.
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-between items-center">
      <RouterLink
        to="/state-management/counter"
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
      >
        ← Anterior: Contador
      </RouterLink>

      <RouterLink
        to="/state-management/table"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
      >
        Próximo: Tabela →
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProvideFormContext } from './useFormContext'
import FormHeader from './FormHeader.vue'
import FormFields from './FormFields.vue'
import FormFooter from './FormFooter.vue'

// Provider: fornece o contexto para toda a árvore de componentes
useProvideFormContext()
</script>
