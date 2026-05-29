<template>
  <v-card elevation="2" class="h-100">
    <v-card-title class="text-h6 text-primary">
      2. Pinia Store (Global State)
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
            <CounterPiniaTree />
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
              <v-list-item-title class="text-body-2">Acesso direto de qualquer componente</v-list-item-title>
            </v-list-item>
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
              <v-list-item-title class="text-body-2">DevTools para debug</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Fácil de testar (mock da store)</v-list-item-title>
            </v-list-item>
          </v-list>

          <p class="text-subtitle-2 font-weight-bold mt-4 mb-2">Desvantagens:</p>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Acoplamento global</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Pode ser overkill para casos simples</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Precisa limpar estado ao desmontar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CounterParent from './CounterParent.vue'
import CounterPiniaTree from './CounterPiniaTree.vue'

const tab = ref<'component' | 'tree'>('component')
</script>
