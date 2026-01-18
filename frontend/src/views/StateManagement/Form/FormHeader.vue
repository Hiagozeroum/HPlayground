<template>
  <v-toolbar color="demo-parent" dark>
    <v-toolbar-title>
      <div class="text-h6">Cadastro de Usuário</div>
      <div class="text-caption">
        Preencha os campos abaixo
        <v-chip size="x-small" color="demo-badge" label>
          📋 FormHeader.vue (Nível 3)
        </v-chip>
      </div>
    </v-toolbar-title>

    <div class="d-flex align-center ga-2">
      <v-chip :color="isValid ? 'success' : 'error'" size="small" label>
        {{ isValid ? '✓ Válido' : '✗ Inválido' }}
      </v-chip>

      <v-chip v-if="hasChanges" color="warning" size="small" label> Modificado </v-chip>
    </div>
  </v-toolbar>
  <div class="pa-2"></div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// 📋 NÍVEL 3: Consumer - injeta o contexto para mostrar status do formulário
// Desestruturação deixa explícito o que está sendo usado
const { isValid, hasChanges } = useFormContext()!
</script>
