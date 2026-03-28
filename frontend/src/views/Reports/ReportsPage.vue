<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReportGeneration, type ReportType } from '@/composables/useReportGeneration'
import ReportCard from './components/ReportCard.vue'
import ReportProgressDialog from './components/ReportProgressDialog.vue'

interface ReportDefinition {
  type: ReportType
  title: string
  description: string
  icon: string
}

const REPORTS: ReportDefinition[] = [
  {
    type: 'sales',
    title: 'Relatório de Vendas',
    description: 'Histórico de transações com produtos, quantidades e valores totais.',
    icon: 'mdi-chart-line',
  },
  {
    type: 'users',
    title: 'Relatório de Usuários',
    description: 'Lista de usuários cadastrados com e-mails e datas de criação.',
    icon: 'mdi-account-group',
  },
  {
    type: 'inventory',
    title: 'Relatório de Estoque',
    description: 'Situação atual do estoque por SKU com quantidades mínimas.',
    icon: 'mdi-package-variant',
  },
]

const { state, progress, statusMessage, errorMessage, generateReport, closeDialog } =
  useReportGeneration()

// Rastreia qual relatório está sendo gerado para exibir no diálogo
const activeReportType = ref<ReportType | null>(null)

const isDialogOpen = computed(() => state.value !== 'idle')
const isProcessing = computed(() => state.value === 'processing')

const dialogTitle = computed(
  () => REPORTS.find((r) => r.type === activeReportType.value)?.title ?? 'Gerando Relatório',
)

async function handleGenerate(type: ReportType): Promise<void> {
  activeReportType.value = type
  await generateReport(type)
}

function handleClose(): void {
  activeReportType.value = null
  closeDialog()
}
</script>

<template>
  <v-container class="py-6">
    <div class="mb-6">
      <h1 class="text-h5 font-weight-bold">Geração de Relatórios</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">
        Selecione um relatório para gerar. O progresso é acompanhado em tempo real via
        WebSocket e o download inicia automaticamente ao concluir.
      </p>
    </div>

    <v-row>
      <v-col v-for="report in REPORTS" :key="report.type" cols="12" sm="6" md="4">
        <ReportCard
          :title="report.title"
          :description="report.description"
          :icon="report.icon"
          :type="report.type"
          :disabled="isProcessing"
          @generate="handleGenerate"
        />
      </v-col>
    </v-row>
  </v-container>

  <ReportProgressDialog
    :model-value="isDialogOpen"
    :state="state"
    :progress="progress"
    :status-message="statusMessage"
    :error-message="errorMessage"
    :report-title="dialogTitle"
    @close="handleClose"
  />
</template>
