<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card elevation="3" color="demo-parent">
        <v-chip
          size="x-small"
          color="demo-badge"
          label
          class="ma-2"
          style="position: absolute; top: 0; right: 0; z-index: 1"
        >
          📄 FormContainer.vue (Nível 2)
        </v-chip>

        <FormHeader />
        <FormBody />
        <FormFooter />
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import FormHeader from './FormHeader.vue'
import FormBody from './FormBody.vue'
import FormFooter from './FormFooter.vue'

// 📄 NÍVEL 2: Este componente organiza a estrutura do formulário
// Não precisa de props - os filhos injetam o contexto diretamente
</script>
