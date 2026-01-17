import { createInjectionState } from '@vueuse/core'
import { ref } from 'vue'

/**
 * Composable de contexto de contador usando createInjectionState
 *
 * Retorna um array com:
 * [0] - useProvideCounterContext: função para fornecer o contexto (usar no componente raiz)
 * [1] - useCounterContext: função para consumir o contexto (usar nos componentes filhos)
 */
export const [useProvideCounterContext, useCounterContext] = createInjectionState(
  () => {
    const count = ref(0)

    function increment() {
      count.value++
    }

    function decrement() {
      count.value--
    }

    function reset() {
      count.value = 0
    }

    return {
      count,
      increment,
      decrement,
      reset
    }
  }
)
