<template>
  <v-card color="demo-parent" variant="flat" class="pa-4 rounded">
    <div class="mb-3">
      <v-chip size="small" color="demo-badge" label>
        <span class="font-weight-medium text-caption">CounterParent.vue</span>
      </v-chip>
    </div>

    <div class="mb-4">
      <p class="text-body-2 mb-2">Acessando store diretamente:</p>
      <div class="text-h4 font-weight-bold">{{ counterStore.count }}</div>
    </div>

    <CounterChild />

    <p class="text-caption text-medium-emphasis mt-3">
      Nenhuma prop passada para o filho!
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { useCounterStore } from './useCounterStore'
import CounterChild from './CounterChild.vue'

const counterStore = useCounterStore()
</script>
