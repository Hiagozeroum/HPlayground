<template>
  <div class="form-header bg-purple-600 text-white p-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Cadastro de Usuário</h2>
        <p class="text-sm text-purple-100 mt-1">Preencha os campos abaixo</p>
      </div>

      <div class="text-right">
        <div class="text-xs text-purple-100 mb-1">Status</div>
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center px-2 py-1 rounded text-xs font-semibold"
            :class="form?.isValid ? 'bg-green-500' : 'bg-red-500'"
          >
            {{ form?.isValid ? '✓ Válido' : '✗ Inválido' }}
          </span>

          <span
            v-if="form?.hasChanges"
            class="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-500"
          >
            Modificado
          </span>
        </div>
      </div>
    </div>

    <div class="mt-3 text-xs font-mono bg-purple-700 px-2 py-1 rounded inline-block">
      FormHeader.vue (Consumer)
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormContext } from './useFormContext'

// Consume o contexto fornecido pelo FormExample
const form = useFormContext()
</script>
