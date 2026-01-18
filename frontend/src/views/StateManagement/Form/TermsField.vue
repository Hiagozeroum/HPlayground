<template>
  <div>
    <v-checkbox
      :model-value="formData.terms"
      @update:model-value="(val) => updateField('terms', val)"
      label="Aceito os termos e condições *"
      :error-messages="errors.terms ? [errors.terms] : []"
      color="primary"
      hide-details="auto"
    >
      <template #append>
        <v-chip size="x-small" color="demo-badge" label>
          TermsField.vue
        </v-chip>
      </template>
    </v-checkbox>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// Desestruturação deixa explícito o que está sendo usado
const { formData, errors, updateField } = useFormContext()!
</script>
