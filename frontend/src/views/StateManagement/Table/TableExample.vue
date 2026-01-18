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

        <!-- Comparação conceitual -->
        <v-row class="mb-6">
          <!-- Pinia -->
          <v-col cols="12" lg="6">
            <v-card elevation="2" class="h-100">
              <v-card-title class="text-info">
                <v-icon icon="mdi-store" class="mr-2" />
                Opção A: Pinia Store
              </v-card-title>

              <v-card-text>
                <p class="text-body-2 mb-3">
                  Store global acessível de qualquer componente da aplicação.
                </p>

                <v-card variant="flat" color="surface-variant" class="mb-4">
                  <v-card-text class="text-caption" style="font-family: monospace">
                    <div>TableRoot.vue</div>
                    <div class="ml-3">const store = useTableStore()</div>
                    <div class="ml-3">├─ TableFilters.vue</div>
                    <div class="ml-6">const store = useTableStore()</div>
                    <div class="ml-3">├─ TableContent.vue</div>
                    <div class="ml-6">const store = useTableStore()</div>
                    <div class="ml-3">└─ TablePagination.vue</div>
                    <div class="ml-6">const store = useTableStore()</div>
                  </v-card-text>
                </v-card>

                <p class="text-subtitle-2 font-weight-bold mb-2">Vantagens:</p>
                <v-list density="compact" class="bg-transparent pa-0 mb-3">
                  <v-list-item v-for="item in piniaVantagens" :key="item" class="px-0 min-h-0">
                    <template #prepend>
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
                    </template>
                    <v-list-item-title class="text-body-2">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>

                <p class="text-subtitle-2 font-weight-bold mb-2">Desvantagens:</p>
                <v-list density="compact" class="bg-transparent pa-0 mb-3">
                  <v-list-item v-for="item in piniaDesvantagens" :key="item" class="px-0 min-h-0">
                    <template #prepend>
                      <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
                    </template>
                    <v-list-item-title class="text-body-2">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-alert type="info" variant="tonal" density="compact">
                  <strong>Quando usar:</strong> Estado que precisa persistir entre rotas ou ser
                  acessado globalmente
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Provide/Inject -->
          <v-col cols="12" lg="6">
            <v-card elevation="2" class="h-100">
              <v-card-title class="text-primary">
                <v-icon icon="mdi-injection" class="mr-2" />
                Opção B: Provide/Inject (createInjectionState)
              </v-card-title>

              <v-card-text>
                <p class="text-body-2 mb-3">
                  Contexto isolado fornecido pelo componente raiz, acessível apenas por seus
                  descendentes.
                </p>

                <v-card variant="flat" color="surface-variant" class="mb-4">
                  <v-card-text class="text-caption" style="font-family: monospace">
                    <div>TableRoot.vue (Provider)</div>
                    <div class="ml-3">useProvideTableContext()</div>
                    <div class="ml-3">├─ TableFilters.vue</div>
                    <div class="ml-6">const ctx = useTableContext()</div>
                    <div class="ml-3">├─ TableContent.vue</div>
                    <div class="ml-6">const ctx = useTableContext()</div>
                    <div class="ml-3">└─ TablePagination.vue</div>
                    <div class="ml-6">const ctx = useTableContext()</div>
                  </v-card-text>
                </v-card>

                <p class="text-subtitle-2 font-weight-bold mb-2">Vantagens:</p>
                <v-list density="compact" class="bg-transparent pa-0 mb-3">
                  <v-list-item v-for="item in injectVantagens" :key="item" class="px-0 min-h-0">
                    <template #prepend>
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
                    </template>
                    <v-list-item-title class="text-body-2">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>

                <p class="text-subtitle-2 font-weight-bold mb-2">Desvantagens:</p>
                <v-list density="compact" class="bg-transparent pa-0 mb-3">
                  <v-list-item v-for="item in injectDesvantagens" :key="item" class="px-0 min-h-0">
                    <template #prepend>
                      <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
                    </template>
                    <v-list-item-title class="text-body-2">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-alert color="primary" variant="tonal" density="compact">
                  <strong>Quando usar:</strong> Estado que vive apenas durante o ciclo de vida do
                  componente raiz
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Demonstração interativa -->
        <v-card elevation="2" class="mb-6">
          <v-card-title>
            <v-icon icon="mdi-flask" class="mr-2" />
            Demonstração Interativa
          </v-card-title>

          <v-card-text>
            <v-btn-toggle v-model="activeTab" mandatory class="mb-4">
              <v-btn value="pinia" color="info">
                <v-icon icon="mdi-store" class="mr-2" />
                Pinia Store
              </v-btn>
              <v-btn value="inject" color="primary">
                <v-icon icon="mdi-injection" class="mr-2" />
                Provide/Inject
              </v-btn>
            </v-btn-toggle>

            <TablePiniaExample v-if="activeTab === 'pinia'" />
            <TableInjectExample v-else />
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

const activeTab = ref<'pinia' | 'inject'>('inject')

const piniaVantagens = [
  'Acesso direto de qualquer lugar',
  'Vue DevTools para debug',
  'Persistência entre rotas (se necessário)',
  'Fácil de testar (mock da store)',
]

const piniaDesvantagens = [
  'Acoplamento global',
  'Precisa resetar estado manualmente',
  'Overhead de store global para contexto local',
]

const injectVantagens = [
  'Contexto automaticamente isolado',
  'Limpeza automática ao desmontar',
  'Rastreabilidade (import explícito)',
  'Type-safe automático',
  'Mais leve (sem overhead de store)',
]

const injectDesvantagens = ['Precisa de @vueuse/core', 'Não tem DevTools nativo']
</script>
