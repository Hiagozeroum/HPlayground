# Custom Directives

Este diretório contém custom directives reutilizáveis do Vue 3.

## O que são Custom Directives?

Custom directives são uma forma de reutilizar lógica que envolve manipulação DOM de baixo nível. Elas permitem criar atributos personalizados que podem ser aplicados a elementos HTML.

## Estrutura Básica

```typescript
import type { Directive } from 'vue'

export const vMinhaDiretiva: Directive = {
  // Chamado antes dos atributos serem aplicados
  created(el, binding, vnode, prevVnode) {},

  // Chamado antes do elemento ser inserido no DOM
  beforeMount(el, binding, vnode, prevVnode) {},

  // Chamado quando o elemento é inserido no DOM
  mounted(el, binding, vnode, prevVnode) {},

  // Chamado antes do componente pai atualizar
  beforeUpdate(el, binding, vnode, prevVnode) {},

  // Chamado após o componente pai atualizar
  updated(el, binding, vnode, prevVnode) {},

  // Chamado antes do elemento ser removido
  beforeUnmount(el, binding, vnode, prevVnode) {},

  // Chamado quando o elemento é removido do DOM
  unmounted(el, binding, vnode, prevVnode) {}
}
```

## Parâmetros dos Hooks

### `el` - HTMLElement
O elemento DOM ao qual a directive está vinculada.

### `binding` - DirectiveBinding
Um objeto contendo:
- `value`: O valor passado para a directive (ex: em `v-my-directive="1 + 1"`, o valor é `2`)
- `oldValue`: O valor anterior (disponível apenas em `updated` e `beforeUpdate`)
- `arg`: O argumento passado (ex: em `v-my-directive:foo`, o arg é `"foo"`)
- `modifiers`: Um objeto de modificadores (ex: em `v-my-directive.foo.bar`, é `{ foo: true, bar: true }`)
- `instance`: A instância do componente onde a directive está sendo usada
- `dir`: O objeto de definição da directive

### `vnode` - VNode
O VNode (Virtual Node) do elemento.

### `prevVnode` - VNode
O VNode anterior (disponível apenas em `updated` e `beforeUpdate`).

## Exemplo: Tooltip Directive

```typescript
// directives/tooltip.ts
export const vHTooltip: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    // Criar elemento tooltip
    const tooltip = document.createElement('div')
    tooltip.textContent = binding.value

    // Adicionar event listeners
    el.addEventListener('mouseenter', () => {
      document.body.appendChild(tooltip)
    })

    el.addEventListener('mouseleave', () => {
      tooltip.remove()
    })
  }
}
```

## Registrando Directives

### Globalmente (recomendado para directives reutilizáveis)

```typescript
// main.ts
import { vHTooltip } from './directives/tooltip'

const app = createApp(App)
app.directive('h-tooltip', vHTooltip)
```

### Localmente (em um componente específico)

```vue
<script setup lang="ts">
import { vHTooltip } from '@/directives/tooltip'
</script>

<template>
  <button v-h-tooltip="'Tooltip text'">Hover me</button>
</template>
```

## Uso

### Básico
```vue
<button v-h-tooltip="'Texto do tooltip'">Hover me</button>
```

### Com Reactive Data
```vue
<script setup>
const tooltipText = ref('Texto dinâmico')
</script>

<template>
  <button v-h-tooltip="tooltipText">Hover me</button>
</template>
```

### Com Modifiers
```vue
<button v-h-tooltip.top="'Texto'">Top</button>
<button v-h-tooltip.bottom="'Texto'">Bottom</button>
<button v-h-tooltip.left="'Texto'">Left</button>
<button v-h-tooltip.right="'Texto'">Right</button>
```

## Directives vs Components

### Use Directives quando:
- Você precisa de manipulação DOM de baixo nível
- A lógica é simples e focada em um comportamento específico
- Você quer aplicar comportamento a elementos existentes sem envolvê-los

### Use Components quando:
- Você precisa de templates complexos
- Você precisa de estado interno ou lógica complexa
- Você quer reutilizar UI com diferentes variações

## Directives Disponíveis

### `v-h-tooltip`
Adiciona um tooltip customizado a qualquer elemento.

**Arquivo:** `tooltip.ts`

**Uso:**
```vue
<button v-h-tooltip="'Texto do tooltip'">Hover me</button>
<button v-h-tooltip.top="'Texto'">Com posição</button>
```

**Modifiers:**
- `.top` - Tooltip acima do elemento (padrão)
- `.bottom` - Tooltip abaixo do elemento
- `.left` - Tooltip à esquerda do elemento
- `.right` - Tooltip à direita do elemento

## Boas Práticas

1. **Sempre limpe event listeners** no hook `unmounted`
2. **Use TypeScript** para type-safety
3. **Documente** suas directives com JSDoc
4. **Teste** em diferentes navegadores
5. **Performance**: Evite operações pesadas nos hooks que são chamados frequentemente (`updated`, `beforeUpdate`)
6. **Acessibilidade**: Garanta que suas directives não quebrem a acessibilidade (use atributos ARIA apropriados)

## Recursos

- [Vue 3 Docs - Custom Directives](https://vuejs.org/guide/reusability/custom-directives.html)
- [Vue 3 API - Directive](https://vuejs.org/api/application.html#app-directive)
