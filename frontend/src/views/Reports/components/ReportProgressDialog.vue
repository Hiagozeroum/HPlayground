<script setup lang="ts">
import type { GenerationState } from '@/composables/useReportGeneration'

const props = defineProps<{
  modelValue: boolean
  state: GenerationState
  progress: number
  statusMessage: string
  errorMessage: string | null
  reportTitle: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const isProcessing = () => props.state === 'processing'
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    max-width="480"
    :persistent="isProcessing()"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="d-flex align-center ga-2 pt-4 px-4">
        <v-icon icon="mdi-file-chart" color="primary" />
        {{ props.reportTitle }}
      </v-card-title>

      <v-card-text class="pt-2">
        <!-- Estado: processando -->
        <template v-if="props.state === 'processing'">
          <p class="text-body-2 text-medium-emphasis mb-4">
            {{ props.statusMessage || 'Aguardando início...' }}
          </p>
          <v-progress-linear
            :model-value="props.progress"
            color="primary"
            height="10"
            rounded
            striped
          />
          <div class="text-right text-caption mt-1 text-medium-emphasis">
            {{ props.progress }}%
          </div>
        </template>

        <!-- Estado: concluído -->
        <template v-else-if="props.state === 'done'">
          <div class="text-center py-6">
            <v-icon icon="mdi-check-circle" color="success" size="56" />
            <p class="text-h6 mt-3">Download iniciado!</p>
            <p class="text-body-2 text-medium-emphasis mt-1">
              O arquivo CSV foi salvo no seu computador.
            </p>
          </div>
        </template>

        <!-- Estado: erro -->
        <template v-else-if="props.state === 'error'">
          <div class="text-center py-6">
            <v-icon icon="mdi-alert-circle" color="error" size="56" />
            <p class="text-h6 mt-3">Erro na geração</p>
            <p class="text-body-2 text-medium-emphasis mt-1">
              {{ props.errorMessage ?? 'Tente novamente.' }}
            </p>
          </div>
        </template>
      </v-card-text>

      <v-card-actions v-if="props.state === 'done' || props.state === 'error'" class="px-4 pb-4">
        <v-spacer />
        <v-btn color="primary" variant="tonal" @click="emit('close')">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
