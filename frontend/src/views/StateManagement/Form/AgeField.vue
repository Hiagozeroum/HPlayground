<template>
  <div>
    <v-text-field
      :model-value="formData.age"
      label="Idade *"
      placeholder="Digite sua idade"
      type="number"
      min="18"
      max="120"
      :error-messages="errors.age ? [errors.age] : []"
      variant="outlined"
      density="comfortable"
      color="primary"
      @update:model-value="(val) => updateField('age', val)"
      @blur="validateAge"
    >
      <template #append-inner>
        <v-chip size="x-small" color="demo-badge" label> AgeField.vue </v-chip>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

const { formData, errors, updateField, validateAge } = useFormContext()!
</script>
