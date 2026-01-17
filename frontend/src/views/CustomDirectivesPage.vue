<script setup lang="ts">
import { ref, computed } from 'vue'

const dynamicText = ref('Texto dinâmico')

// Para exemplos avançados
const shortText = ref('Curto')
const longText = ref('Este é um texto muito longo que certamente vai passar do limite')
const maxLengthValue = ref(20)

const tooltipWithMaxLength = computed(() => ({
  text: 'Este tooltip só aparece quando o texto é maior que o maxLength!',
  maxLength: maxLengthValue.value,
}))

const isTooltipDisabled = ref(false)
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
          <v-alert type="info" variant="tonal">
            Em vez de usar <code>&lt;v-tooltip&gt;</code>, você pode usar
            <code>v-h-tooltip="text"</code> diretamente em qualquer elemento!
          </v-alert>
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
                  <pre
                    class="code-block"
                  ><code>&lt;v-btn v-h-tooltip="'Tooltip!'" color="primary"&gt;
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
                    <v-btn v-h-tooltip.top="'Tooltip no topo'" variant="outlined" color="primary">
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
                    <v-btn v-h-tooltip.right="'Tooltip à direita'" variant="outlined" color="error">
                      Right
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre
                    class="code-block"
                  ><code>&lt;v-btn v-h-tooltip.top="'Top'"&gt;Top&lt;/v-btn&gt;
&lt;v-btn v-h-tooltip.bottom="'Bottom'"&gt;Bottom&lt;/v-btn&gt;
&lt;v-btn v-h-tooltip.left="'Left'"&gt;Left&lt;/v-btn&gt;
&lt;v-btn v-h-tooltip.right="'Right'"&gt;Right&lt;/v-btn&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-4">4. Opções Avançadas - Objeto de Configuração</h3>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>Novidade!</strong> Agora você pode passar um objeto com opções em vez de
              apenas uma string. Isso permite validações e condições para mostrar o tooltip.
            </v-alert>

            <!-- MaxLength -->
            <v-row class="mb-6">
              <v-col cols="12">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">4.1 - MaxLength Condicional</h4>
                <p class="text-body-2 mb-3">
                  O tooltip só aparece se o texto do elemento tiver mais caracteres que o valor de
                  <code>maxLength</code>.
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <v-slider
                    v-model="maxLengthValue"
                    :min="5"
                    :max="70"
                    :step="5"
                    :label="`MaxLength ${maxLengthValue}`"
                    thumb-label
                    class="mb-4"
                  ></v-slider>

                  <div class="d-flex flex-column gap-3">
                    <div>
                      <v-chip v-h-tooltip="tooltipWithMaxLength" color="success" class="text-wrap">
                        {{ longText }}
                      </v-chip>
                      <span>
                        {{ longText.length }}
                      </span>
                    </div>
                    <v-chip v-h-tooltip="tooltipWithMaxLength" color="warning" class="text-wrap">
                      {{ shortText }}
                    </v-chip>
                  </div>

                  <v-alert type="success" variant="tonal" class="mt-4">
                    <small>
                      <strong>Texto longo:</strong> {{ longText.length }} caracteres<br />
                      <strong>Texto curto:</strong> {{ shortText.length }} caracteres<br />
                      <strong>MaxLength atual:</strong> {{ maxLengthValue }}<br /><br />
                      Tooltip só aparece se: <code>tamanho do texto > maxLength</code>
                    </small>
                  </v-alert>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>const tooltipOptions = {
  text: 'Tooltip aqui!',
  maxLength: 20
}

&lt;v-chip v-h-tooltip="tooltipOptions"&gt;
  Texto longo...
&lt;/v-chip&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <!-- TruncatedOnly -->
            <v-row class="mb-6">
              <v-col cols="12">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">
                  4.2 - Truncated Only (Auto-truncamento!)
                </h4>
                <p class="text-body-2 mb-3">
                  Aplica estilos de truncamento automaticamente e mostra o tooltip apenas quando o
                  texto está truncado. <strong>Você não precisa mais adicionar classes CSS!</strong>
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <div class="d-flex flex-column gap-3">
                    <div
                      v-h-tooltip="{
                        text: 'Este texto está truncado! Por isso o tooltip aparece.',
                        truncatedOnly: true,
                      }"
                      class="pa-3 bg-blue-lighten-5 rounded"
                      style="max-width: 250px"
                    >
                      Este é um texto muito longo que vai ser truncado com ellipsis
                    </div>

                    <div
                      v-h-tooltip="{
                        text: 'Este NÃO vai aparecer pois não tem overflow',
                        truncatedOnly: true,
                      }"
                      class="pa-3 bg-green-lighten-5 rounded"
                      style="max-width: 250px"
                    >
                      Texto curto
                    </div>
                  </div>

                  <v-alert type="info" variant="tonal" class="mt-4">
                    <small>
                      A directive aplica automaticamente:
                      <code>white-space: nowrap</code>, <code>overflow: hidden</code>,
                      <code>text-overflow: ellipsis</code>
                    </small>
                  </v-alert>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>&lt;!-- Sem classes CSS de truncamento! --&gt;
&lt;div
  v-h-tooltip="{
    text: 'Truncado!',
    truncatedOnly: true
  }"
  style="max-width: 250px"
&gt;
  Texto longo...
&lt;/div&gt;</code></pre>
                  <v-divider class="my-3"></v-divider>
                  <p class="text-caption text-success">
                    ✅ A directive aplica os estilos automaticamente!
                  </p>
                  <p class="text-caption text-success">
                    ✅ Framework-agnostic (funciona em qualquer projeto)
                  </p>
                  <p class="text-caption text-success">
                    ✅ Restaura estilos originais quando desmontado
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <!-- Disabled -->
            <v-row class="mb-6">
              <v-col cols="12">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">4.3 - Tooltip Desabilitado</h4>
                <p class="text-body-2 mb-3">
                  Você pode desabilitar o tooltip dinamicamente usando a opção
                  <code>disabled</code>.
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <v-switch
                    v-model="isTooltipDisabled"
                    label="Desabilitar Tooltip"
                    color="error"
                    class="mb-4"
                  ></v-switch>

                  <v-btn
                    v-h-tooltip="{
                      text: 'Este tooltip pode ser desabilitado!',
                      disabled: isTooltipDisabled,
                    }"
                    color="primary"
                  >
                    Passe o mouse aqui
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>const isDisabled = ref(false)

&lt;v-btn v-h-tooltip="{
  text: 'Tooltip',
  disabled: isDisabled
}"&gt;
  Hover me
&lt;/v-btn&gt;</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <!-- Combinando opções -->
            <v-row class="mb-6">
              <v-col cols="12">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">4.4 - Combinando Opções</h4>
                <p class="text-body-2 mb-3">
                  Você pode combinar múltiplas opções e ainda usar modifiers para posição!
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4">
                  <v-btn
                    v-h-tooltip.bottom="{
                      text: 'Tooltip completo: bottom position + maxLength validation',
                      maxLength: 5,
                    }"
                    color="purple"
                    class="text-wrap"
                  >
                    Este botão tem um texto longo o suficiente para mostrar o tooltip!
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="tonal" color="grey-lighten-4" class="pa-4">
                  <p class="text-caption mb-2">Código:</p>
                  <pre class="code-block"><code>&lt;v-btn v-h-tooltip.bottom="{
  text: 'Tooltip!',
  maxLength: 5
}"&gt;
  Texto longo aqui
&lt;/v-btn&gt;</code></pre>
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

            <h3 class="text-h6 mb-3 mt-6">Opções Disponíveis</h3>
            <v-list density="compact">
              <v-list-item
                prepend-icon="mdi-text"
                title="text: string"
                subtitle="Texto que será exibido no tooltip"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-ruler"
                title="maxLength?: number"
                subtitle="Mostra tooltip apenas se o conteúdo do elemento tiver mais caracteres que este valor"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-text-box-outline"
                title="truncatedOnly?: boolean"
                subtitle="Aplica estilos de truncamento automaticamente e mostra tooltip apenas quando o texto está truncado"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-close-circle"
                title="disabled?: boolean"
                subtitle="Desabilita o tooltip dinamicamente"
              ></v-list-item>
            </v-list>

            <v-alert type="success" variant="tonal" class="mt-6">
              <strong>Dica:</strong> Confira o código em <code>src/directives/tooltip.ts</code> para
              ver a implementação completa!
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
