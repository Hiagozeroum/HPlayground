<script setup lang="ts">
import { ref } from 'vue'

const tooltipText = ref('Este é um tooltip customizado!')
const dynamicText = ref('Texto dinâmico')
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h1 class="text-h3 font-weight-bold mb-2">
            <v-icon icon="mdi-tooltip-text" size="40" color="primary" class="mr-2"></v-icon>
            Custom Directives - Tooltips
          </h1>
          <p class="text-h6 text-medium-emphasis">
            Aprenda a criar e usar custom directives no Vue 3
          </p>
        </div>

        <!-- Seção de Introdução -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h5">O que são Custom Directives?</v-card-title>
          <v-card-text>
            <p class="mb-4">
              Custom Directives são uma forma de reutilizar lógica que envolve manipulação DOM de baixo
              nível. Elas permitem que você crie atributos personalizados que podem ser aplicados a
              elementos HTML.
            </p>
            <v-alert type="info" variant="tonal">
              <strong>Exemplo:</strong> Em vez de usar <code>&lt;v-tooltip&gt;</code>, você pode usar
              <code>v-h-tooltip="text"</code> diretamente em qualquer elemento!
            </v-alert>
          </v-card-text>
        </v-card>

        <!-- Seção de Exemplos -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h5">Exemplos de Uso</v-card-title>
          <v-card-text>
            <h3 class="text-h6 mb-4">1. Tooltip Básico</h3>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <p class="mb-4">Passe o mouse sobre o botão:</p>
                  <v-btn v-h-tooltip="'Eu sou um tooltip customizado!'" color="primary">
                    Botão com Tooltip
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>&lt;v-btn v-h-tooltip="'Tooltip!'" color="primary"&gt;
  Botão com Tooltip
&lt;/v-btn&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-4">2. Tooltip com Texto Reativo</h3>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <v-text-field
                    v-model="dynamicText"
                    label="Altere o texto do tooltip"
                    class="mb-4"
                  ></v-text-field>
                  <v-chip v-h-tooltip="dynamicText" color="secondary" size="large">
                    Passe o mouse aqui
                  </v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>&lt;v-chip v-h-tooltip="dynamicText"&gt;
  Passe o mouse aqui
&lt;/v-chip&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-4">3. Tooltip em Diferentes Posições</h3>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <div class="d-flex flex-column gap-3">
                    <v-btn
                      v-h-tooltip.top="'Tooltip no topo'"
                      variant="outlined"
                      color="primary"
                    >
                      Top
                    </v-btn>
                    <v-btn
                      v-h-tooltip.bottom="'Tooltip embaixo'"
                      variant="outlined"
                      color="secondary"
                    >
                      Bottom
                    </v-btn>
                    <v-btn
                      v-h-tooltip.left="'Tooltip à esquerda'"
                      variant="outlined"
                      color="success"
                    >
                      Left
                    </v-btn>
                    <v-btn
                      v-h-tooltip.right="'Tooltip à direita'"
                      variant="outlined"
                      color="error"
                    >
                      Right
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>&lt;v-btn v-h-tooltip.top="'Top'"&gt;Top&lt;/v-btn&gt;
&lt;v-btn v-h-tooltip.bottom="'Bottom'"&gt;Bottom&lt;/v-btn&gt;
&lt;v-btn v-h-tooltip.left="'Left'"&gt;Left&lt;/v-btn&gt;
&lt;v-btn v-h-tooltip.right="'Right'"&gt;Right&lt;/v-btn&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-4">4. Tooltip com Componente HTooltip</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <p class="mb-4">Usando o componente wrapper:</p>
                  <HTooltip text="Este tooltip usa o componente HTooltip!">
                    <v-btn color="accent"> Botão com HTooltip </v-btn>
                  </HTooltip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>&lt;HTooltip text="Tooltip!"&gt;
  &lt;v-btn color="accent"&gt;Botão&lt;/v-btn&gt;
&lt;/HTooltip&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Seção de Documentação -->
        <v-card elevation="2">
          <v-card-title class="text-h5">Como Funciona?</v-card-title>
          <v-card-text>
            <h3 class="text-h6 mb-3">Estrutura da Custom Directive</h3>
            <v-card variant="tonal" color="grey-lighten-4" class="pa-4 mb-4">
              <pre class="code-block"><code>// directives/tooltip.ts
export const vHTooltip = {
  mounted(el, binding) {
    // Lógica quando o elemento é montado
  },
  updated(el, binding) {
    // Lógica quando o valor muda
  },
  unmounted(el) {
    // Limpeza quando o elemento é removido
  }
}</code></pre>
            </v-card>

            <h3 class="text-h6 mb-3 mt-6">Lifecycle Hooks Disponíveis</h3>
            <v-list density="compact">
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="created"
                subtitle="Chamado antes dos atributos do elemento serem aplicados"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="beforeMount"
                subtitle="Chamado antes do elemento ser inserido no DOM"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="mounted"
                subtitle="Chamado quando o elemento é inserido no DOM"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="beforeUpdate"
                subtitle="Chamado antes do componente pai atualizar"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="updated"
                subtitle="Chamado após o componente pai atualizar"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="beforeUnmount"
                subtitle="Chamado antes do elemento ser removido"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-circle-small"
                title="unmounted"
                subtitle="Chamado quando o elemento é removido do DOM"
              ></v-list-item>
            </v-list>

            <v-alert type="success" variant="tonal" class="mt-6">
              <strong>Dica:</strong> Confira o código em
              <code>src/directives/tooltip.ts</code> para ver a implementação completa!
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gap-3 {
  gap: 12px;
}

.code-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}

.code-block code {
  background-color: transparent;
  padding: 0;
}
</style>
