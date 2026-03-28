import { ref, onUnmounted } from 'vue'
import { io, type Socket } from 'socket.io-client'

/**
 * Composable genérico para conexão WebSocket via socket.io.
 * Gerencia o ciclo de vida da conexão e expõe uma API simples
 * para qualquer use case de WebSocket no projeto.
 *
 * Uso:
 *   const { connect, joinRoom, on, off, disconnect } = useWebSocket('http://localhost:3001')
 */
export function useWebSocket(serverUrl: string) {
  const socket = ref<Socket | null>(null)
  const isConnected = ref(false)

  function connect(): void {
    if (socket.value?.connected) return

    socket.value = io(serverUrl, {
      // Backoff exponencial na reconexão, limitado a 10s
      reconnectionDelayMax: 10_000,
    })

    socket.value.on('connect', () => {
      isConnected.value = true
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
    })
  }

  function disconnect(): void {
    socket.value?.disconnect()
    socket.value = null
    isConnected.value = false
  }

  /**
   * Entra em uma room e aguarda o ACK do servidor.
   * Retorna a resposta do servidor (útil para confirmar a entrada).
   */
  function joinRoom<T = unknown>(room: string): Promise<T> {
    return new Promise((resolve) => {
      socket.value?.emit('join-report', room, resolve)
    })
  }

  function on<T>(event: string, handler: (data: T) => void): void {
    socket.value?.on(event, handler)
  }

  function off(event: string): void {
    socket.value?.off(event)
  }

  // Garante desconexão quando o componente que usa este composable é desmontado
  onUnmounted(disconnect)

  return { isConnected, connect, disconnect, joinRoom, on, off }
}
