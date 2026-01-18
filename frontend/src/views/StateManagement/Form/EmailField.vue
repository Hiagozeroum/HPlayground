<template>
  <div>
    <v-text-field
      :model-value="formData.email"
      @update:model-value="(val) => updateField('email', val)"
      @blur="validateEmail"
      label="Email *"
      placeholder="Digite seu email"
      type="email"
      :error-messages="errors.email ? [errors.email] : []"
      variant="outlined"
      density="comfortable"
      color="primary"
    >
      <template #append-inner>
        <v-chip size="x-small" color="demo-badge" label>
          EmailField.vue
        </v-chip>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// Desestruturação deixa explícito o que está sendo usado
const { formData, errors, updateField, validateEmail } = useFormContext()!
</script>
