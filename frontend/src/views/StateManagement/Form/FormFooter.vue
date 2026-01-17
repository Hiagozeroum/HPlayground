<template>
  <div class="form-footer bg-gray-50 dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-700">
    <div class="mb-3 text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block">
      FormFooter.vue (Consumer)
    </div>

    <div class="flex items-center justify-between">
      <button
        @click="form?.reset()"
        :disabled="!form?.hasChanges"
        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Limpar
      </button>

      <div class="flex gap-3">
        <button
          @click="handleSubmit"
          :disabled="!form?.isValid || form?.isSubmitting"
          class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="form?.isSubmitting">Enviando...</span>
          <span v-else>Enviar</span>
        </button>
      </div>
    </div>

    <!-- Feedback de sucesso -->
    <div
      v-if="showSuccess"
      class="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded text-sm text-green-800 dark:text-green-200"
    >
      ✓ Formulário enviado com sucesso!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormContext } from './useFormContext'

const form = useFormContext()
const showSuccess = ref(false)

async function handleSubmit() {
  const success = await form?.submit()

  if (success) {
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      form?.reset()
    }, 3000)
  }
}
</script>
