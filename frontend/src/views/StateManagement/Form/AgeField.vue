<template>
  <div class="field-group">
    <label class="block text-sm font-medium mb-1">
      Idade *
      <span class="text-xs font-mono text-gray-500 ml-2">(AgeField.vue - Nível 3)</span>
    </label>

    <input
      :value="formData.age"
      @input="handleInput"
      @blur="validateAge"
      type="number"
      placeholder="Digite sua idade"
      min="18"
      max="120"
      class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      :class="errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
    />

    <p v-if="errors.age" class="mt-1 text-xs text-red-600">
      {{ errors.age }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// Desestruturação deixa explícito o que está sendo usado
const { formData, errors, updateField, validateAge } = useFormContext()!

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  updateField('age', target.value)
}
</script>
