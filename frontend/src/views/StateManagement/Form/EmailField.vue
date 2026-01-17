<template>
  <div class="field-group">
    <label class="block text-sm font-medium mb-1">
      Email *
      <span class="text-xs font-mono text-gray-500 ml-2">(EmailField.vue - Nível 3)</span>
    </label>

    <input
      :value="formData.email"
      @input="handleInput"
      @blur="validateEmail"
      type="email"
      placeholder="Digite seu email"
      class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      :class="errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
    />

    <p v-if="errors.email" class="mt-1 text-xs text-red-600">
      {{ errors.email }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// Desestruturação deixa explícito o que está sendo usado
const { formData, errors, updateField, validateEmail } = useFormContext()!

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  updateField('email', target.value)
}
</script>
