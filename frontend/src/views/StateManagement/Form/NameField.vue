<template>
  <div>
    <v-text-field
      :model-value="formData.name"
      label="Nome *"
      placeholder="Digite seu nome"
      :error-messages="errors.name ? [errors.name] : []"
      variant="outlined"
      density="comfortable"
      color="primary"
      @update:model-value="(val) => updateField('name', val)"
      @blur="validateName"
    >
      <template #append-inner>
        <v-chip size="x-small" color="demo-badge" label> NameField.vue (Nível 5) </v-chip>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// 🏷️ NÍVEL 5: Consumer - campo individual que injeta o contexto
// Desestruturação deixa explícito o que está sendo usado
const { formData, errors, updateField, validateName } = useFormContext()!
</script>
