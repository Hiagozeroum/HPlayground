<template>
  <v-card color="demo-parent" variant="flat" class="pa-4 rounded">
    <div class="mb-3">
      <v-chip size="small" color="demo-badge" label>
        <span class="font-weight-medium text-caption">CounterParent.vue</span>
      </v-chip>
    </div>

    <div class="mb-4">
      <p class="text-body-2 mb-2">Estado gerenciado aqui:</p>
      <div class="text-h4 font-weight-bold">{{ count }}</div>
    </div>

    <CounterChild
      :count="count"
      @increment="handleIncrement"
      @decrement="handleDecrement"
      @reset="handleReset"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CounterChild from './CounterChild.vue'

const count = ref(0)

const handleIncrement = () => {
  count.value++
}

const handleDecrement = () => {
  count.value--
}

const handleReset = () => {
  count.value = 0
}
</script>
