<template>
  <v-card elevation="2" class="h-100">
    <v-card-title class="text-h6 text-primary">
      3. Provide/Inject (createInjectionState)
    </v-card-title>

    <v-card-text>
      <v-tabs v-model="tab" density="compact" class="mb-4">
        <v-tab value="component" prepend-icon="mdi-play-box">Componente</v-tab>
        <v-tab value="tree" prepend-icon="mdi-file-tree">Hierarquia</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="component">
          <CounterParent />
        </v-tabs-window-item>

        <v-tabs-window-item value="tree">
          <div style="border: 1px dashed rgba(0,0,0,0.2); border-radius: 12px; padding: 16px;">
            <CounterProvideInjectTree />
          </div>
        </v-tabs-window-item>
      </v-tabs-window>

      <v-card variant="tonal" color="info" class="mt-4">
        <v-card-text>
          <p class="text-subtitle-2 font-weight-bold mb-2">Vantagens:</p>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Sem props drilling</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Contexto isolado (não global)</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Type-safe automático</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Rastreabilidade (import do composable)</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">SSR-safe</v-list-item-title>
            </v-list-item>
          </v-list>

          <p class="text-subtitle-2 font-weight-bold mt-4 mb-2">Desvantagens:</p>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Precisa de @vueuse/core</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Overkill para casos simples</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-alert type="success" variant="tonal" density="compact" class="mt-4">
            <strong>Melhor abordagem para hierarquias 3+ níveis!</strong>
          </v-alert>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CounterParent from './CounterParent.vue'
import CounterProvideInjectTree from './CounterProvideInjectTree.vue'

const tab = ref<'component' | 'tree'>('component')
</script>
