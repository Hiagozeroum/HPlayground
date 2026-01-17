<template>
  <div class="form-fields p-6 space-y-4">
    <div class="mb-3 text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block">
      FormFields.vue (Consumer - repassa para filhos via inject)
    </div>

    <NameField />
    <EmailField />
    <AgeField />
    <TermsField />
  </div>
</template>

<script setup lang="ts">
import NameField from './NameField.vue'
import EmailField from './EmailField.vue'
import AgeField from './AgeField.vue'
import TermsField from './TermsField.vue'

// Note que este componente NÃO precisa receber props e repassar para os filhos!
// Cada filho usa useFormContext() diretamente
</script>
