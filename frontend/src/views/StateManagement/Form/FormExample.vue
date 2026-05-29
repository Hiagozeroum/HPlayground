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

        <!-- Tabs: Formulário / Hierarquia -->
        <v-tabs v-model="tab" class="mb-4" density="compact">
          <v-tab value="form" prepend-icon="mdi-form-select">Formulário</v-tab>
          <v-tab value="tree" prepend-icon="mdi-file-tree">Hierarquia</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="form">
            <FormContainer />
          </v-tabs-window-item>

          <v-tabs-window-item value="tree">
            <div class="whiteboard">
              <ComponentTree />
            </div>
          </v-tabs-window-item>
        </v-tabs-window>

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
import { ref } from 'vue'
import { useProvideFormContext } from './useFormContext'
import FormContainer from './FormContainer.vue'
import ComponentTree from './ComponentTree.vue'

const tab = ref<'form' | 'tree'>('form')

// 📦 NÍVEL 1 (ROOT): Provider - cria e fornece o contexto para toda a árvore
useProvideFormContext()
</script>

<style scoped>
/* "Whiteboard": painel pontilhado que emoldura o diagrama */
.whiteboard {
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.25);
  border-radius: 12px;
  padding: 16px;
  background:
    radial-gradient(rgba(var(--v-theme-on-surface), 0.06) 1px, transparent 1px) 0 0 / 16px 16px;
}

.tree-scroll {
  overflow-x: auto;
  padding: 8px 4px;
}

/* Árvore top-down clássica usando ul/li + conectores via ::before/::after */
.tree,
.tree ul {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
}

.tree ul {
  margin-top: 28px;
}

.tree li {
  position: relative;
  padding: 28px 12px 0;
  text-align: center;
}

/* Linha vertical descendo de cada filho até o conector horizontal */
.tree li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 28px;
  background: rgba(var(--v-theme-on-surface), 0.25);
}

/* Linha horizontal ligando os irmãos */
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(var(--v-theme-on-surface), 0.25);
}

/* Remove metades do conector nas pontas e some com tudo no nó raiz */
.tree li:first-child::after {
  left: 50%;
}
.tree li:last-child::after {
  right: 50%;
}
.tree li:only-child::after,
.tree > li::before,
.tree > li::after {
  display: none;
}

/* Card outlined estilo "post-it" desenhado no quadro */
.node-card {
  border: 1.5px solid currentColor;
  border-radius: 10px;
  padding: 6px 12px;
  background: rgb(var(--v-theme-surface));
  white-space: nowrap;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.node-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.node-emoji {
  font-size: 1.15rem;
  line-height: 1;
}

.node-role {
  font-size: 0.65rem;
  opacity: 0.7;
}

/* Cores por nível (a borda usa currentColor) */
.node--indigo {
  color: rgb(var(--v-theme-indigo, 63 81 181));
}
.node--blue {
  color: rgb(var(--v-theme-blue, 33 150 243));
}
.node--cyan {
  color: rgb(var(--v-theme-cyan, 0 188 212));
}
.node--teal {
  color: rgb(var(--v-theme-teal, 0 150 136));
}
.node--green {
  color: rgb(var(--v-theme-green, 76 175 80));
}
</style>
