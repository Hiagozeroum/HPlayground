<template>
  <div class="parent bg-gray-50 dark:bg-gray-800 p-4 rounded">
    <div class="mb-3">
      <span class="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
        CounterParent.vue
      </span>
    </div>

    <div class="mb-4">
      <p class="text-sm mb-2">Estado gerenciado aqui:</p>
      <div class="text-2xl font-bold">{{ count }}</div>
    </div>

    <CounterChild
      :count="count"
      @increment="handleIncrement"
      @decrement="handleDecrement"
      @reset="handleReset"
    />
  </div>
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
