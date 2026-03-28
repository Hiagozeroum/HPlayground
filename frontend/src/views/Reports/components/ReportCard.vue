<script setup lang="ts">
import type { ReportType } from '@/composables/useReportGeneration'

const props = defineProps<{
  title: string
  description: string
  icon: string
  type: ReportType
  disabled: boolean
}>()

const emit = defineEmits<{
  generate: [type: ReportType]
}>()
</script>

<template>
  <v-card :disabled="disabled" height="100%" class="d-flex flex-column">
    <v-card-item>
      <template #prepend>
        <v-icon :icon="props.icon" size="36" color="primary" />
      </template>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-subtitle class="mt-1">{{ props.description }}</v-card-subtitle>
    </v-card-item>

    <v-spacer />

    <v-card-actions class="pa-4 pt-0">
      <v-btn
        color="primary"
        variant="tonal"
        block
        :disabled="disabled"
        prepend-icon="mdi-file-download"
        @click="emit('generate', props.type)"
      >
        Gerar Relatório
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
