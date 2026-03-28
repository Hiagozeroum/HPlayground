import { ref } from 'vue'
import { useWebSocket } from './useWebSocket'

export type ReportType = 'sales' | 'users' | 'inventory'

// Estados possíveis do ciclo de vida de uma geração
export type GenerationState = 'idle' | 'processing' | 'done' | 'error'

interface ProgressEvent {
  jobId: string
  progress: number
  message: string
}

interface DoneEvent {
  jobId: string
}

interface ErrorEvent {
  jobId: string
  message: string
}

const API_URL = 'http://localhost:3001'

/**
 * Composable de domínio para geração de relatórios CSV.
 * Orquestra o fluxo completo:
 *   1. POST REST  → dispara o job e recebe o jobId
 *   2. WebSocket  → entra na room do job e escuta o progresso
 *   3. report:done → faz o download do CSV via fetch + blob
 *
 * Separa a lógica de negócio (aqui) da lógica de UI (nos componentes).
 */
export function useReportGeneration() {
  const { connect, disconnect, joinRoom, on, off } = useWebSocket(API_URL)

  const state = ref<GenerationState>('idle')
  const progress = ref(0)
  const statusMessage = ref('')
  const errorMessage = ref<string | null>(null)
  const currentJobId = ref<string | null>(null)

  function reset(): void {
    state.value = 'idle'
    progress.value = 0
    statusMessage.value = ''
    errorMessage.value = null
    currentJobId.value = null
  }

  /** Fecha o diálogo e restaura o estado inicial. */
  function closeDialog(): void {
    reset()
    disconnect()
  }

  /**
   * Aciona o download do CSV via fetch.
   * Cria um blob URL temporário, simula um clique no <a> e revoga a URL.
   */
  async function downloadCsv(jobId: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/reports/download/${jobId}`)

    const disposition = response.headers.get('Content-Disposition') ?? ''
    const filename = disposition.match(/filename="(.+?)"/)?.[1] ?? `report-${jobId}.csv`

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.click()

    URL.revokeObjectURL(url)
  }

  async function generateReport(type: ReportType): Promise<void> {
    reset()
    state.value = 'processing'
    connect()

    try {
      // 1. Dispara a geração via REST — resposta imediata com jobId
      const response = await fetch(`${API_URL}/api/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      })

      const { jobId } = (await response.json()) as { jobId: string }
      currentJobId.value = jobId

      // 2. Entra na room exclusiva deste job para receber apenas os eventos dele
      await joinRoom(jobId)

      // 3. Aguarda conclusão via WebSocket
      await new Promise<void>((resolve, reject) => {
        on<ProgressEvent>('report:progress', ({ progress: p, message }) => {
          progress.value = p
          statusMessage.value = message
        })

        on<DoneEvent>('report:done', async ({ jobId: doneJobId }) => {
          cleanupListeners()
          await downloadCsv(doneJobId)
          state.value = 'done'
          resolve()
        })

        on<ErrorEvent>('report:error', ({ message }) => {
          cleanupListeners()
          errorMessage.value = message
          state.value = 'error'
          reject(new Error(message))
        })
      })
    } catch (err) {
      // Cobre erros de rede/fetch. O WS error handler já seta errorMessage
      // quando o erro vem do servidor — checamos pelo valor para não sobrescrever.
      if (!errorMessage.value) {
        errorMessage.value =
          err instanceof Error ? err.message : 'Erro desconhecido ao gerar o relatório.'
        state.value = 'error'
      }
    }
  }

  function cleanupListeners(): void {
    off('report:progress')
    off('report:done')
    off('report:error')
  }

  return {
    state,
    progress,
    statusMessage,
    errorMessage,
    currentJobId,
    generateReport,
    closeDialog,
  }
}
