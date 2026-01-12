<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('overview')
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h1 class="text-h3 font-weight-bold mb-2">
            <v-icon icon="mdi-book-open-variant" size="40" color="primary" class="mr-2"></v-icon>
            Storybook
          </h1>
          <p class="text-h6 text-medium-emphasis">
            Ambiente de desenvolvimento para componentes UI isolados
          </p>
        </div>

        <v-tabs v-model="activeTab" color="primary" class="mb-6">
          <v-tab value="overview">Visão Geral</v-tab>
          <v-tab value="commands">Comandos</v-tab>
          <v-tab value="structure">Estrutura</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Overview Tab -->
          <v-window-item value="overview">
            <v-card class="mb-4" elevation="2">
              <v-card-text>
                <h2 class="text-h5 mb-4">O que é Storybook?</h2>
                <p class="mb-4">
                  Storybook é uma ferramenta de desenvolvimento frontend que permite construir
                  componentes UI de forma isolada. É útil para:
                </p>
                <v-list density="comfortable">
                  <v-list-item
                    prepend-icon="mdi-check-circle"
                    title="Desenvolver componentes isoladamente"
                  >
                  </v-list-item>
                  <v-list-item
                    prepend-icon="mdi-check-circle"
                    title="Documentar componentes visualmente"
                  >
                  </v-list-item>
                  <v-list-item
                    prepend-icon="mdi-check-circle"
                    title="Testar diferentes estados dos componentes"
                  >
                  </v-list-item>
                  <v-list-item
                    prepend-icon="mdi-check-circle"
                    title="Compartilhar componentes com o time"
                  >
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <v-card elevation="2">
              <v-card-text>
                <h2 class="text-h5 mb-4">Como usar?</h2>
                <p class="mb-4">Para iniciar o Storybook em modo de desenvolvimento, execute:</p>
                <v-card variant="tonal" color="grey" class="mb-4">
                  <v-card-text class="font-weight-bold">
                    <code>npm run storybook</code>
                  </v-card-text>
                </v-card>
                <p class="mb-4">O Storybook será aberto em <code>http://localhost:6006</code></p>

                <v-btn
                  color="primary"
                  href="http://localhost:6006"
                  target="_blank"
                  size="large"
                  class="mt-4"
                >
                  <v-icon icon="mdi-open-in-new" class="mr-2"></v-icon>
                  Abrir Storybook
                </v-btn>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Commands Tab -->
          <v-window-item value="commands">
            <v-card elevation="2">
              <v-card-text>
                <h2 class="text-h5 mb-4">Comandos Disponíveis</h2>

                <v-list>
                  <v-list-item class="mb-4">
                    <template #prepend>
                      <v-icon color="primary" size="large">mdi-play-circle</v-icon>
                    </template>
                    <v-list-item-title class="text-h6 mb-2">Iniciar Storybook</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-card variant="tonal" color="grey" class="mt-2 pa-3">
                        <code>npm run storybook</code>
                      </v-card>
                      <p class="mt-2">
                        Inicia o servidor de desenvolvimento do Storybook na porta 6006
                      </p>
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-divider class="my-4"></v-divider>

                  <v-list-item class="mb-4">
                    <template #prepend>
                      <v-icon color="success" size="large">mdi-package-variant-closed</v-icon>
                    </template>
                    <v-list-item-title class="text-h6 mb-2">Build Storybook</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-card variant="tonal" color="grey" class="mt-2 pa-3">
                        <code>npm run build-storybook</code>
                      </v-card>
                      <p class="mt-2">Gera build estático do Storybook para deploy</p>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Structure Tab -->
          <v-window-item value="structure">
            <v-card elevation="2">
              <v-card-text>
                <h2 class="text-h5 mb-4">Estrutura de Arquivos</h2>

                <v-card variant="outlined" class="mb-4">
                  <v-card-text>
                    <h3 class="text-h6 mb-2">📁 .storybook/</h3>
                    <p class="mb-2">Pasta de configuração do Storybook</p>
                    <v-list density="compact">
                      <v-list-item> <code>main.ts</code> - Configuração principal </v-list-item>
                      <v-list-item>
                        <code>preview.ts</code> - Configurações de preview
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>

                <v-card variant="outlined" class="mb-4">
                  <v-card-text>
                    <h3 class="text-h6 mb-2">📁 src/stories/</h3>
                    <p class="mb-2">Stories dos componentes</p>
                    <v-list density="compact">
                      <v-list-item> <code>Button.stories.ts</code> - Exemplo de story </v-list-item>
                      <v-list-item> <code>Header.stories.ts</code> - Exemplo de story </v-list-item>
                      <v-list-item> <code>Page.stories.ts</code> - Exemplo de story </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>

                <v-alert type="info" variant="tonal" border="start">
                  <h3 class="text-h6 mb-2">Como criar uma nova story?</h3>
                  <p>
                    Crie um arquivo com extensão <code>.stories.ts</code> ou
                    <code>.stories.vue</code> na pasta <code>src/stories/</code> ou ao lado do seu
                    componente.
                  </p>
                </v-alert>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}

.v-card {
  border-radius: 12px;
}
</style>
