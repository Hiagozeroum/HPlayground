<template>
  <v-card-text>
    <v-chip size="x-small" color="demo-badge" label class="mb-2">
      📊 TableStats.vue (Nível 3)
    </v-chip>

    <v-row dense>
      <v-col cols="3">
        <v-card color="info" variant="tonal">
          <v-card-text class="text-center py-2">
            <div class="text-caption">Total</div>
            <div class="text-h6 font-weight-bold">{{ stats.total }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="success" variant="tonal">
          <v-card-text class="text-center py-2">
            <div class="text-caption">Disponível</div>
            <div class="text-h6 font-weight-bold">{{ stats.available }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="warning" variant="tonal">
          <v-card-text class="text-center py-2">
            <div class="text-caption">Baixo</div>
            <div class="text-h6 font-weight-bold">{{ stats.lowStock }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="error" variant="tonal">
          <v-card-text class="text-center py-2">
            <div class="text-caption">Sem estoque</div>
            <div class="text-h6 font-weight-bold">{{ stats.outOfStock }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import { useTableContext } from '../useTableContext'

// 📊 NÍVEL 3: Consumer - exibe estatísticas
const { stats } = useTableContext()!
</script>
