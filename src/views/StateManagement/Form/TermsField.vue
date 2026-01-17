<template>
  <div class="field-group">
    <label class="flex items-start gap-2 cursor-pointer">
      <input
        :checked="form?.formData.terms"
        @change="handleChange"
        type="checkbox"
        class="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
      />
      <span class="text-sm">
        Aceito os termos e condições *
        <span class="text-xs font-mono text-gray-500 block">(TermsField.vue - Nível 3)</span>
      </span>
    </label>

    <p v-if="form?.errors.terms" class="mt-1 ml-6 text-xs text-red-600">
      {{ form.errors.terms }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

const form = useFormContext()

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  form?.updateField('terms', target.checked)
}
</script>
