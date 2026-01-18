<template>
  <v-card-text>
    <v-chip size="x-small" color="demo-badge" label class="mb-2">
      📄 TableContent.vue (Nível 3)
    </v-chip>

    <v-table density="compact">
      <TableHeader />
      <TableBody />
    </v-table>
  </v-card-text>
</template>

<script setup lang="ts">
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'

// 📄 NÍVEL 3: Organiza a estrutura da tabela (thead + tbody)
// Não precisa passar props - os filhos acessam a store diretamente
</script>
