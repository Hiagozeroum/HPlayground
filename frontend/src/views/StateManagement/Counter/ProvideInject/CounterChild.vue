<template>
  <v-card color="demo-child" variant="flat" class="pa-4 mt-3">
    <div class="mb-3">
      <v-chip size="small" color="demo-badge" label>
        <span class="font-weight-medium text-caption">CounterChild.vue (CONSUMER)</span>
      </v-chip>
    </div>

    <div class="mb-4">
      <p class="text-body-2 mb-2">Contexto injetado:</p>
      <div class="text-h5 font-weight-bold text-primary">
        {{ count }}
      </div>
    </div>

    <div class="d-flex ga-2">
      <v-btn color="error" size="small" @click="decrement()">
        -
      </v-btn>
      <v-btn color="success" size="small" @click="increment()">
        +
      </v-btn>
      <v-btn color="secondary" size="small" @click="reset()">
        Reset
      </v-btn>
    </div>

    <p class="text-caption text-medium-emphasis mt-3">
      useCounterContext() - consome o contexto fornecido pelo pai
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { useCounterContext } from './useCounterContext'

// Consome o contexto fornecido pelo componente ancestral
// Desestruturação deixa explícito o que está sendo usado
const { count, increment, decrement, reset } = useCounterContext()!
</script>
