<template>
  <div>
    <v-checkbox
      :model-value="formData.terms"
      label="Aceito os termos e condições *"
      :error-messages="errors.terms ? [errors.terms] : []"
      color="primary"
      hide-details="auto"
      @update:model-value="(val) => updateField('terms', val)"
    >
      <template #append>
        <v-chip size="x-small" color="demo-badge" label> TermsField.vue (Nível 5) </v-chip>
      </template>
    </v-checkbox>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// ☑️ NÍVEL 5: Consumer - campo individual que injeta o contexto
// Desestruturação deixa explícito o que está sendo usado
const { formData, errors, updateField } = useFormContext()!
</script>
