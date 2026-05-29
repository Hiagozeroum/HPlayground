<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h1 class="text-h4 font-weight-bold mb-2">Exemplo 3: Tabela Complexa</h1>
          <p class="text-body-1 text-medium-emphasis">
            Comparação entre Pinia Store e Provide/Inject para gerenciar estado de tabela com
            filtros, ordenação e paginação
          </p>
        </div>

        <!-- Demonstração interativa -->
        <v-card elevation="2" class="mb-6">
          <v-card-title>
            <v-icon icon="mdi-flask" class="mr-2" />
            Demonstração Interativa
          </v-card-title>

          <v-card-text>
            <div class="d-flex align-center flex-wrap mb-4" style="gap: 24px;">
              <v-btn-toggle v-model="activeTab" mandatory>
                <v-btn value="pinia" color="info">
                  <v-icon icon="mdi-store" class="mr-2" />
                  Pinia Store
                </v-btn>
                <v-btn value="inject" color="primary">
                  <v-icon icon="mdi-injection" class="mr-2" />
                  Provide/Inject
                </v-btn>
              </v-btn-toggle>

              <v-tabs v-model="demoView" density="compact">
                <v-tab value="component" prepend-icon="mdi-monitor">Componente</v-tab>
                <v-tab value="tree" prepend-icon="mdi-file-tree">Hierarquia</v-tab>
              </v-tabs>
            </div>

            <v-tabs-window v-model="demoView">
              <v-tabs-window-item value="component">
                <TablePiniaExample v-if="activeTab === 'pinia'" />
                <TableInjectExample v-else />
              </v-tabs-window-item>

              <v-tabs-window-item value="tree">
                <div class="whiteboard">
                  <TablePiniaTree v-if="activeTab === 'pinia'" />
                  <TableInjectTree v-else />
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>

        <!-- Conclusão -->
        <v-alert type="warning" variant="tonal">
          <template #title>Conclusão e Recomendação</template>

          <div class="mt-3">
            <p class="text-body-2 mb-2">
              <strong class="text-primary">Para este exemplo de tabela:</strong>
              <strong>createInjectionState é a melhor escolha</strong> porque:
            </p>
            <v-list density="compact" class="bg-transparent pa-0 mb-4">
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • O estado da tabela não precisa persistir entre rotas
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Isolamento automático evita bugs de estado compartilhado
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Limpeza automática ao desmontar o componente
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Hierarquia de 4 níveis (Root → Filters/Content/Pagination → Componentes
                  internos)
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <p class="text-body-2 mb-2">
              <strong class="text-info">Use Pinia Store quando:</strong>
            </p>
            <v-list density="compact" class="bg-transparent pa-0 mb-4">
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Precisa acessar o estado de múltiplas páginas/rotas
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Quer persistir filtros entre navegações
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Precisa de cache global de dados da API
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0 min-h-0">
                <v-list-item-title class="text-body-2">
                  • Quer usar Vue DevTools para debug avançado
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card variant="flat" color="primary">
              <v-card-text>
                <strong>Regra prática:</strong><br />
                Se o estado vive e morre com o componente raiz →
                <strong>createInjectionState</strong><br />
                Se o estado precisa persistir globalmente → <strong>Pinia Store</strong>
              </v-card-text>
            </v-card>
          </div>
        </v-alert>

        <div class="d-flex justify-space-between align-center mt-6">
          <v-btn
            variant="text"
            :to="{ path: '/state-management/form' }"
            prepend-icon="mdi-arrow-left"
          >
            Anterior: Formulário
          </v-btn>

          <v-btn color="primary" :to="{ path: '/state-management' }" prepend-icon="mdi-arrow-left">
            Voltar aos Exemplos
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TablePiniaExample from './Pinia/TablePiniaExample.vue'
import TableInjectExample from './ProvideInject/TableInjectExample.vue'
import TablePiniaTree from './Pinia/TablePiniaTree.vue'
import TableInjectTree from './ProvideInject/TableInjectTree.vue'

const activeTab = ref<'pinia' | 'inject'>('inject')
const demoView = ref<'component' | 'tree'>('component')
</script>

<style scoped>
.whiteboard {
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.25);
  border-radius: 12px;
  padding: 16px;
  background:
    radial-gradient(rgba(var(--v-theme-on-surface), 0.06) 1px, transparent 1px) 0 0 / 16px 16px;
}
</style>
