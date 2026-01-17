import type { Directive, DirectiveBinding } from 'vue'

/**
 * Custom Directive para Tooltips
 *
 * Uso básico (string):
 * <button v-h-tooltip="'Texto do tooltip'">Hover me</button>
 *
 * Uso avançado (objeto):
 * <button v-h-tooltip="{ text: 'Tooltip', maxLength: 10 }">Texto longo</button>
 *
 * Com modifiers para posição:
 * <button v-h-tooltip.top="'Texto'">Top</button>
 * <button v-h-tooltip.bottom="'Texto'">Bottom</button>
 * <button v-h-tooltip.left="'Texto'">Left</button>
 * <button v-h-tooltip.right="'Texto'">Right</button>
 *
 * Opções disponíveis:
 * - text: string - Texto do tooltip
 * - maxLength: number - Mostra tooltip apenas se o conteúdo do elemento tiver mais caracteres que este valor
 * - truncatedOnly: boolean - Aplica estilos de truncamento e mostra tooltip apenas quando o texto está truncado
 * - disabled: boolean - Desabilita o tooltip
 */

interface TooltipOptions {
  text: string
  maxLength?: number
  truncatedOnly?: boolean
  disabled?: boolean
}

interface TooltipElement extends HTMLElement {
  __tooltip?: HTMLDivElement
  __showTooltip?: () => void
  __hideTooltip?: () => void
  __tooltipOptions?: TooltipOptions
  __originalStyles?: {
    whiteSpace: string
    overflow: string
    textOverflow: string
  }
}

function getPosition(
  modifiers: DirectiveBinding['modifiers'],
): 'top' | 'bottom' | 'left' | 'right' {
  if (modifiers.top) return 'top'
  if (modifiers.bottom) return 'bottom'
  if (modifiers.left) return 'left'
  if (modifiers.right) return 'right'
  return 'top' // default
}

function createTooltip(el: TooltipElement, text: string, position: string): HTMLDivElement {
  const tooltip = document.createElement('div')
  tooltip.className = 'h-tooltip'
  tooltip.textContent = text
  tooltip.setAttribute('data-position', position)

  // Estilos inline para garantir que funcione
  Object.assign(tooltip.style, {
    position: 'absolute',
    backgroundColor: 'rgba(97, 97, 97, 0.95)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    zIndex: '9999',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.2s ease-in-out',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  })

  document.body.appendChild(tooltip)
  return tooltip
}

function positionTooltip(el: TooltipElement, tooltip: HTMLDivElement, position: string) {
  const rect = el.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()

  let top = 0
  let left = 0

  switch (position) {
    case 'top':
      top = rect.top - tooltipRect.height - 8 + window.scrollY
      left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX
      break
    case 'bottom':
      top = rect.bottom + 8 + window.scrollY
      left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX
      break
    case 'left':
      top = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY
      left = rect.left - tooltipRect.width - 8 + window.scrollX
      break
    case 'right':
      top = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY
      left = rect.right + 8 + window.scrollX
      break
  }

  tooltip.style.top = `${top}px`
  tooltip.style.left = `${left}px`
}

function applyTruncateStyles(el: TooltipElement) {
  // Salva os estilos originais antes de modificar
  if (!el.__originalStyles) {
    el.__originalStyles = {
      whiteSpace: el.style.whiteSpace,
      overflow: el.style.overflow,
      textOverflow: el.style.textOverflow,
    }
  }

  // Aplica os estilos de truncamento
  el.style.whiteSpace = 'nowrap'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
}

function removeTruncateStyles(el: TooltipElement) {
  // Restaura os estilos originais
  if (el.__originalStyles) {
    el.style.whiteSpace = el.__originalStyles.whiteSpace
    el.style.overflow = el.__originalStyles.overflow
    el.style.textOverflow = el.__originalStyles.textOverflow
    delete el.__originalStyles
  }
}

function shouldShowTooltip(el: TooltipElement): boolean {
  const options = el.__tooltipOptions
  if (!options || options.disabled) return false

  // Verifica maxLength
  if (options.maxLength !== undefined) {
    const elementText = el.textContent || ''
    if (elementText.trim().length <= options.maxLength) {
      return false
    }
  }

  // Verifica overflow (truncatedOnly)
  if (options.truncatedOnly) {
    const isOverflowing =
      el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
    if (!isOverflowing) {
      return false
    }
  }

  return true
}

function showTooltip(el: TooltipElement) {
  if (el.__tooltip && shouldShowTooltip(el)) {
    const position = el.__tooltip.getAttribute('data-position') || 'top'
    positionTooltip(el, el.__tooltip, position)
    el.__tooltip.style.opacity = '1'
  }
}

function hideTooltip(el: TooltipElement) {
  if (el.__tooltip) {
    el.__tooltip.style.opacity = '0'
  }
}

function parseBinding(binding: DirectiveBinding<string | TooltipOptions>): TooltipOptions {
  // Se for string, converte para objeto
  if (typeof binding.value === 'string') {
    return { text: binding.value }
  }
  // Se for objeto, retorna como está
  return binding.value
}

export const vHTooltip: Directive<TooltipElement, string | TooltipOptions> = {
  mounted(el: TooltipElement, binding: DirectiveBinding<string | TooltipOptions>) {
    const options = parseBinding(binding)
    if (!options.text) return

    // Salva as opções no elemento para validações futuras
    el.__tooltipOptions = options

    const position = getPosition(binding.modifiers)

    // Aplica estilos de truncamento se necessário
    if (options.truncatedOnly) {
      applyTruncateStyles(el)
    }

    // Cria o tooltip
    el.__tooltip = createTooltip(el, options.text, position)

    // Define funções para mostrar/esconder
    el.__showTooltip = () => showTooltip(el)
    el.__hideTooltip = () => hideTooltip(el)

    // Adiciona event listeners
    el.addEventListener('mouseenter', el.__showTooltip)
    el.addEventListener('mouseleave', el.__hideTooltip)
    el.addEventListener('focus', el.__showTooltip)
    el.addEventListener('blur', el.__hideTooltip)

    // Adiciona estilo para indicar que tem tooltip (se não estiver desabilitado)
    if (!options.disabled) {
      el.style.cursor = 'pointer'
    }
  },

  updated(el: TooltipElement, binding: DirectiveBinding<string | TooltipOptions>) {
    const options = parseBinding(binding)
    if (!options.text || !el.__tooltip) return

    const oldOptions = el.__tooltipOptions

    // Atualiza as opções
    el.__tooltipOptions = options

    // Gerencia estilos de truncamento
    if (options.truncatedOnly && !oldOptions?.truncatedOnly) {
      // Ativou truncatedOnly
      applyTruncateStyles(el)
    } else if (!options.truncatedOnly && oldOptions?.truncatedOnly) {
      // Desativou truncatedOnly
      removeTruncateStyles(el)
    }

    // Atualiza o texto do tooltip
    el.__tooltip.textContent = options.text

    // Atualiza a posição se o modifier mudou
    const position = getPosition(binding.modifiers)
    el.__tooltip.setAttribute('data-position', position)

    // Atualiza o cursor
    if (options.disabled) {
      el.style.cursor = ''
    } else {
      el.style.cursor = 'pointer'
    }
  },

  beforeUnmount(el: TooltipElement) {
    // Remove event listeners
    if (el.__showTooltip) {
      el.removeEventListener('mouseenter', el.__showTooltip)
      el.removeEventListener('focus', el.__showTooltip)
    }
    if (el.__hideTooltip) {
      el.removeEventListener('mouseleave', el.__hideTooltip)
      el.removeEventListener('blur', el.__hideTooltip)
    }

    // Remove o tooltip do DOM
    if (el.__tooltip && el.__tooltip.parentNode) {
      el.__tooltip.parentNode.removeChild(el.__tooltip)
    }

    // Remove estilos de truncamento
    removeTruncateStyles(el)

    // Limpa as referências
    delete el.__tooltip
    delete el.__showTooltip
    delete el.__hideTooltip
    delete el.__tooltipOptions
  },
}
