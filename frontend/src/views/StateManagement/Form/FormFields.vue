<template>
  <v-card-text>
    <v-chip size="x-small" color="demo-badge" label class="mb-4">
      FormFields.vue (Consumer - repassa para filhos via inject)
    </v-chip>

    <div class="d-flex flex-column ga-4">
      <NameField />
      <EmailField />
      <AgeField />
      <TermsField />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import NameField from './NameField.vue'
import EmailField from './EmailField.vue'
import AgeField from './AgeField.vue'
import TermsField from './TermsField.vue'

// Note que este componente NÃO precisa receber props e repassar para os filhos!
// Cada filho usa useFormContext() diretamente
</script>
