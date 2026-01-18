<template>
  <v-card color="demo-child" variant="flat" class="pa-4 mt-3">
    <div class="mb-3">
      <v-chip size="small" color="demo-badge" label>
        <span class="font-weight-medium text-caption">CounterChild.vue</span>
      </v-chip>
    </div>

    <div class="mb-4">
      <p class="text-body-2 mb-2">Store acessada diretamente:</p>
      <div class="text-h5 font-weight-bold text-primary">
        {{ counterStore.count }}
      </div>
    </div>

    <div class="d-flex ga-2">
      <v-btn color="error" size="small" @click="counterStore.decrement()">
        -
      </v-btn>
      <v-btn color="success" size="small" @click="counterStore.increment()">
        +
      </v-btn>
      <v-btn color="secondary" size="small" @click="counterStore.reset()">
        Reset
      </v-btn>
    </div>

    <p class="text-caption text-medium-emphasis mt-3">
      Actions chamadas diretamente: counterStore.increment()
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { useCounterStore } from './useCounterStore'

const counterStore = useCounterStore()
</script>
