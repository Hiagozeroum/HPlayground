<template>
  <div class="field-group">
    <label class="block text-sm font-medium mb-1">
      Email *
      <span class="text-xs font-mono text-gray-500 ml-2">(EmailField.vue - Nível 3)</span>
    </label>

    <input
      :value="form?.formData.email"
      @input="handleInput"
      @blur="form?.validateEmail()"
      type="email"
      placeholder="Digite seu email"
      class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      :class="form?.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
    />

    <p v-if="form?.errors.email" class="mt-1 text-xs text-red-600">
      {{ form.errors.email }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

const form = useFormContext()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  form?.updateField('email', target.value)
}
</script>
