<template>
  <div class="child bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 mt-3">
    <div class="mb-3">
      <span class="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
        CounterChild.vue
      </span>
    </div>

    <div class="mb-4">
      <p class="text-sm mb-2">Props recebida:</p>
      <div class="text-xl font-semibold text-purple-600 dark:text-purple-400">
        {{ count }}
      </div>
    </div>

    <div class="flex gap-2">
      <button
        @click="$emit('decrement')"
        class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
      >
        -
      </button>
      <button
        @click="$emit('increment')"
        class="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
      >
        +
      </button>
      <button
        @click="$emit('reset')"
        class="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
      >
        Reset
      </button>
    </div>

    <div class="mt-3 text-xs text-gray-500">
      💡 Emits: increment, decrement, reset
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: number
}>()

defineEmits<{
  increment: []
  decrement: []
  reset: []
}>()
</script>
