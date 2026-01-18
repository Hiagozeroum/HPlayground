<template>
  <div>
    <v-chip size="x-small" color="demo-badge" label class="mb-4">
      🔢 FormFieldsGroup.vue (Nível 4)
    </v-chip>

    <div class="d-flex flex-column ga-4">
      <NameField />
      <EmailField />
      <AgeField />
      <TermsField />
    </div>
  </div>
</template>

<script setup lang="ts">
import NameField from './NameField.vue'
import EmailField from './EmailField.vue'
import AgeField from './AgeField.vue'
import TermsField from './TermsField.vue'

// 🔢 NÍVEL 4: Agrupa os campos do formulário
// Note que este componente NÃO precisa receber props e repassar para os filhos!
// Cada campo (Nível 5) usa useFormContext() diretamente
//
// Se estivéssemos usando Props/Emits, este componente precisaria:
// - Receber todas as props (formData, errors, etc) do FormBody
// - Repassar para cada campo filho
// - Receber todos os emits dos filhos
// - Re-emitir para o FormBody
// = Muito código repetitivo e propenso a erros! 😓
//
// Com Provide/Inject: ZERO props, ZERO emits! 🎉
</script>
