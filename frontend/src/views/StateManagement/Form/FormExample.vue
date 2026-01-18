<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h1 class="text-h4 font-weight-bold mb-2">Exemplo 2: Formulário Multi-nível</h1>
          <p class="text-body-1 text-medium-emphasis">
            Demonstração de createInjectionState para gerenciar formulários complexos com validação
          </p>
        </div>

        <!-- Hierarquia de Componentes -->
        <v-alert type="info" variant="tonal" class="mb-6">
          <template #title>Hierarquia de Componentes (5 níveis)</template>
          <div class="text-caption font-weight-medium mt-2" style="font-family: monospace">
            <div>📦 FormExample.vue (Root - Provider)</div>
            <div class="ml-4">└─ 📄 FormContainer.vue (Consumer - Nível 2)</div>
            <div class="ml-8">├─ 📋 FormHeader.vue (Consumer - Nível 3)</div>
            <div class="ml-8">├─ 📝 FormBody.vue (Consumer - Nível 3)</div>
            <div class="ml-12">└─ 🔢 FormFieldsGroup.vue (Consumer - Nível 4)</div>
            <div class="ml-16">├─ NameField.vue (Consumer - Nível 5)</div>
            <div class="ml-16">├─ EmailField.vue (Consumer - Nível 5)</div>
            <div class="ml-16">├─ AgeField.vue (Consumer - Nível 5)</div>
            <div class="ml-16">└─ TermsField.vue (Consumer - Nível 5)</div>
            <div class="ml-8">└─ ⚡ FormFooter.vue (Consumer - Nível 3)</div>
          </div>
        </v-alert>

        <!-- Formulário -->
        <FormContainer />

        <!-- Insights -->
        <v-alert type="success" variant="tonal" class="mt-6">
          <template #title>🎯 Por que createInjectionState é ideal aqui?</template>

          <v-list density="compact" class="bg-transparent pa-0 mt-2">
            <v-list-item class="px-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">
                <strong>Rastreabilidade:</strong> Cada componente importa explicitamente
                <code>useFormContext()</code> - você sabe exatamente de onde vem o estado.
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">
                <strong>Type-safe:</strong> TypeScript sabe exatamente quais campos e métodos estão
                disponíveis, com autocomplete completo.
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">
                <strong>Sem props drilling:</strong> Componentes de nível 5 acessam diretamente o
                contexto, sem precisar que níveis intermediários repassem props.
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">
                <strong>Contexto isolado:</strong> Diferente de Pinia, o estado só existe enquanto
                FormExample está montado.
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">
                <strong>5 níveis de hierarquia:</strong> Demonstra que mesmo com múltiplos níveis, não há
                degradação ou complexidade - cada componente simplesmente injeta o que precisa.
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-alert>

        <div class="d-flex justify-space-between align-center mt-6">
          <v-btn
            variant="text"
            :to="{ path: '/state-management/counter' }"
            prepend-icon="mdi-arrow-left"
          >
            Anterior: Contador
          </v-btn>

          <v-btn
            color="primary"
            :to="{ path: '/state-management/table' }"
            append-icon="mdi-arrow-right"
          >
            Próximo: Tabela
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useProvideFormContext } from './useFormContext'
import FormContainer from './FormContainer.vue'

// 📦 NÍVEL 1 (ROOT): Provider - cria e fornece o contexto para toda a árvore
useProvideFormContext()
</script>
