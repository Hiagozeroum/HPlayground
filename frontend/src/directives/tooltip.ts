import type { Directive, DirectiveBinding } from 'vue'

/**
 * Custom Directive para Tooltips
 *
 * Uso básico:
 * <button v-h-tooltip="'Texto do tooltip'">Hover me</button>
 *
 * Com modifiers para posição:
 * <button v-h-tooltip.top="'Texto'">Top</button>
 * <button v-h-tooltip.bottom="'Texto'">Bottom</button>
 * <button v-h-tooltip.left="'Texto'">Left</button>
 * <button v-h-tooltip.right="'Texto'">Right</button>
 */

interface TooltipElement extends HTMLElement {
  __tooltip?: HTMLDivElement
  __showTooltip?: () => void
  __hideTooltip?: () => void
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

function showTooltip(el: TooltipElement) {
  if (el.__tooltip) {
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

export const vHTooltip: Directive<TooltipElement, string> = {
  mounted(el: TooltipElement, binding: DirectiveBinding<string>) {
    const text = binding.value
    if (!text) return

    const position = getPosition(binding.modifiers)

    // Cria o tooltip
    el.__tooltip = createTooltip(el, text, position)

    // Define funções para mostrar/esconder
    el.__showTooltip = () => showTooltip(el)
    el.__hideTooltip = () => hideTooltip(el)

    // Adiciona event listeners
    el.addEventListener('mouseenter', el.__showTooltip)
    el.addEventListener('mouseleave', el.__hideTooltip)
    el.addEventListener('focus', el.__showTooltip)
    el.addEventListener('blur', el.__hideTooltip)

    // Adiciona estilo para indicar que tem tooltip
    el.style.cursor = 'pointer'
  },

  updated(el: TooltipElement, binding: DirectiveBinding<string>) {
    const text = binding.value
    if (!text || !el.__tooltip) return

    // Atualiza o texto do tooltip
    el.__tooltip.textContent = text

    // Atualiza a posição se o modifier mudou
    const position = getPosition(binding.modifiers)
    el.__tooltip.setAttribute('data-position', position)
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

    // Limpa as referências
    delete el.__tooltip
    delete el.__showTooltip
    delete el.__hideTooltip
  },
}
