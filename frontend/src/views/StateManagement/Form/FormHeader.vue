<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-title>
      <div class="text-h6">Cadastro de Usuário</div>
      <div class="text-caption">Preencha os campos abaixo</div>
    </v-toolbar-title>

    <v-spacer />

    <div class="d-flex align-center ga-2">
      <v-chip :color="isValid ? 'success' : 'error'" size="small" label>
        {{ isValid ? '✓ Válido' : '✗ Inválido' }}
      </v-chip>

      <v-chip v-if="hasChanges" color="warning" size="small" label>
        Modificado
      </v-chip>
    </div>
  </v-toolbar>

  <div class="pa-2">
    <v-chip size="x-small" color="demo-badge" label>
      FormHeader.vue (Consumer)
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// Consume o contexto fornecido pelo FormExample
// Desestruturação deixa explícito o que está sendo usado
const { isValid, hasChanges } = useFormContext()!
</script>
