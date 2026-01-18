<template>
  <v-card elevation="2" class="h-100">
    <v-card-title class="text-h6 text-primary">
      1. Props/Emits (Tradicional)
    </v-card-title>

    <v-card-text>
      <CounterParent />

      <v-card variant="tonal" color="info" class="mt-4">
        <v-card-text>
          <p class="text-subtitle-2 font-weight-bold mb-2">Vantagens:</p>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Fluxo de dados explícito e claro</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Fácil de entender para iniciantes</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-check" color="success" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Bom para componentes reutilizáveis</v-list-item-title>
            </v-list-item>
          </v-list>

          <p class="text-subtitle-2 font-weight-bold mt-4 mb-2">Desvantagens:</p>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Props drilling em hierarquias profundas</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Emits precisam ser repassados</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 min-h-0">
              <template #prepend>
                <v-icon icon="mdi-close" color="error" size="small" class="mr-2" />
              </template>
              <v-list-item-title class="text-body-2">Código verboso para 3+ níveis</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import CounterParent from './CounterParent.vue'
</script>
