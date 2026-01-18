<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h1 class="text-h4 font-weight-bold mb-2">Exemplos de Gerenciamento de Estado Vue 3</h1>
          <p class="text-body-1 text-medium-emphasis">
            Comparação prática de diferentes abordagens para gerenciar estado em hierarquias de componentes
          </p>
        </div>

        <v-row>
          <!-- Exemplo 1: Contador -->
          <v-col cols="12" md="6" lg="4">
            <v-card
              :to="{ path: '/state-management/counter' }"
              elevation="2"
              hover
              class="h-100"
            >
              <v-card-text>
                <div class="d-flex align-center mb-4">
                  <v-avatar color="info" size="48" class="mr-4">
                    <span class="text-h5">🔢</span>
                  </v-avatar>
                  <span class="text-h6">Contador</span>
                </div>

                <p class="text-body-2 text-medium-emphasis mb-3">
                  Comparação lado a lado das 3 abordagens principais
                </p>

                <v-list density="compact" class="bg-transparent pa-0">
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Props/Emits
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Pinia Store
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Provide/Inject
                    </v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-chip color="info" size="small" class="mt-4" label>
                  Hierarquia: 2 níveis
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Exemplo 2: Formulário -->
          <v-col cols="12" md="6" lg="4">
            <v-card
              :to="{ path: '/state-management/form' }"
              elevation="2"
              hover
              class="h-100"
            >
              <v-card-text>
                <div class="d-flex align-center mb-4">
                  <v-avatar color="primary" size="48" class="mr-4">
                    <span class="text-h5">📝</span>
                  </v-avatar>
                  <span class="text-h6">Formulário Multi-nível</span>
                </div>

                <p class="text-body-2 text-medium-emphasis mb-3">
                  Implementação com createInjectionState
                </p>

                <v-list density="compact" class="bg-transparent pa-0">
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Validação em tempo real
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Múltiplos campos
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Type-safe
                    </v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-chip color="primary" size="small" class="mt-4" label>
                  Hierarquia: 3-4 níveis
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Exemplo 3: Tabela -->
          <v-col cols="12" md="6" lg="4">
            <v-card
              :to="{ path: '/state-management/table' }"
              elevation="2"
              hover
              class="h-100"
            >
              <v-card-text>
                <div class="d-flex align-center mb-4">
                  <v-avatar color="success" size="48" class="mr-4">
                    <span class="text-h5">📊</span>
                  </v-avatar>
                  <span class="text-h6">Tabela Complexa</span>
                </div>

                <p class="text-body-2 text-medium-emphasis mb-3">
                  Pinia vs Provide/Inject
                </p>

                <v-list density="compact" class="bg-transparent pa-0">
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Filtros
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Paginação
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="px-0 min-h-0">
                    <v-list-item-title class="text-body-2">
                      <v-icon icon="mdi-check" color="success" size="small" class="mr-1" />
                      Ordenação
                    </v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-chip color="success" size="small" class="mt-4" label>
                  Hierarquia: 4+ níveis
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-6">
          <template #title>
            <v-icon icon="mdi-book-open-variant" class="mr-2" />
            Documentação Técnica
          </template>
          <p class="text-body-2 mt-2">
            Para entender as decisões arquiteturais e comparações detalhadas, consulte:
          </p>
          <code class="text-caption">/estudos/gerenciamento-estados/comparacao-abordagens.md</code>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>
