<template>
  <v-card-actions class="pa-4">
    <v-chip size="x-small" color="demo-badge" label> FormFooter.vue (Consumer) </v-chip>

    <v-spacer />

    <v-btn variant="outlined" :disabled="!hasChanges" @click="reset"> Limpar </v-btn>

    <v-btn
      color="primary"
      :disabled="!isValid || isSubmitting"
      :loading="isSubmitting"
      @click="handleSubmit"
    >
      Enviar
    </v-btn>
  </v-card-actions>

  <v-snackbar v-model="showSuccess" color="success" :timeout="3000">
    Formulário enviado com sucesso!
    <template #actions>
      <v-btn variant="text" @click="showSuccess = false">Fechar</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormContext } from './useFormContext'

const { isValid, isSubmitting, hasChanges, submit, reset } = useFormContext()!
const showSuccess = ref(false)

async function handleSubmit() {
  const success = await submit()

  if (success) {
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      reset()
    }, 3000)
  }
}
</script>
