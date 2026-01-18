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
          <template #title>Hierarquia de Componentes</template>
          <div class="text-caption font-weight-medium mt-2" style="font-family: monospace">
            <div>FormExample.vue (Root - Provider)</div>
            <div class="ml-4">├─ FormHeader.vue (Consumer)</div>
            <div class="ml-4">├─ FormFields.vue (Consumer)</div>
            <div class="ml-8">│ ├─ NameField.vue (Consumer - nível 3)</div>
            <div class="ml-8">│ ├─ EmailField.vue (Consumer - nível 3)</div>
            <div class="ml-8">│ ├─ AgeField.vue (Consumer - nível 3)</div>
            <div class="ml-8">│ └─ TermsField.vue (Consumer - nível 3)</div>
            <div class="ml-4">└─ FormFooter.vue (Consumer)</div>
          </div>
        </v-alert>

        <!-- Formulário -->
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
              <FormHeader />
              <FormFields />
              <FormFooter />
            </v-card>
          </v-col>
        </v-row>

        <!-- Insights -->
        <v-alert type="success" variant="tonal" class="mt-6">
          <template #title>Por que createInjectionState é ideal aqui?</template>

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
                <strong>Sem props drilling:</strong> Componentes de nível 3 acessam diretamente o
                contexto, sem precisar que FormFields repasse props.
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
                <strong>Testável:</strong> Você pode testar cada campo isoladamente mockando o
                contexto.
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
import FormHeader from './FormHeader.vue'
import FormFields from './FormFields.vue'
import FormFooter from './FormFooter.vue'

useProvideFormContext({ name: 'Nome inicial' }, { validateOnMount: false })
</script>
