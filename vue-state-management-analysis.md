# Gerenciamento de Estado em Hierarquias de Componentes Vue 3

## 1. Problema: Props Drilling

```
┌─────────────────────────────────────────────────────────────┐
│                      ComponenteAvô                           │
│  const data = ref('valor')                                   │
│  const handleEvent = () => { ... }                           │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┴──────────────┐
        ▼                          ▼
┌──────────────────┐      ┌──────────────────┐
│  ComponentePai1  │      │  ComponentePai2  │
│  props: {        │      │  props: {        │
│    data,         │      │    data,         │
│    onEvent       │      │    onEvent       │
│  }               │      │  }               │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
    ┌────┴────┐               ┌────┴────┐
    ▼         ▼               ▼         ▼
┌────────┐ ┌────────┐    ┌────────┐ ┌────────┐
│ Neto1  │ │ Neto2  │    │ Neto3  │ │ Neto4  │
│props:  │ │props:  │    │props:  │ │props:  │
│ data,  │ │ data,  │    │ data,  │ │ data,  │
│onEvent │ │onEvent │    │onEvent │ │onEvent │
└────────┘ └────────┘    └────────┘ └────────┘
```

**Problemas:**
- ❌ Props passadas por componentes intermediários que não usam
- ❌ Emits precisam ser re-emitidos várias vezes
- ❌ Difícil manutenção e refatoração
- ❌ Perda de reatividade se não cuidar bem
- ❌ Código verboso e repetitivo

---

## 2. Store Global (Pinia)

```
┌─────────────────────────────────────────────────────────────┐
│                      PINIA STORE                             │
│  state: { data }                                             │
│  actions: { handleEvent() }                                  │
│  getters: { computedData }                                   │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┼──────────────┐
        │           │              │
        ▼           ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Avô     │  │  Pai     │  │  Neto    │
│ const    │  │ const    │  │ const    │
│ store =  │  │ store =  │  │ store =  │
│ useStore │  │ useStore │  │ useStore │
└──────────┘  └──────────┘  └──────────┘
```

**Quando usar Store Global:**
✅ Estado compartilhado por múltiplas páginas/rotas
✅ Dados de usuário, autenticação, preferências
✅ Cache de dados de API
✅ Estado que precisa persistir entre navegações

**Quando PODE usar Store para contexto local:**
✅ Componente complexo com 4+ níveis de hierarquia
✅ Muitos "irmãos" precisam acessar o mesmo estado
✅ Lógica de negócio complexa que merece isolamento
✅ Facilita testes unitários (mock da store)

**Ressalvas:**
⚠️ Namespace bem definido (ex: `useProductFormStore`)
⚠️ Limpeza ao desmontar (resetar estado)
⚠️ Não abuse - pode gerar acoplamento desnecessário

---

## 3.1. Provide/Inject com Helper (Padrão Reka-UI)

```
┌─────────────────────────────────────────────────────────────┐
│                   createContext()                            │
│  Gera:                                                       │
│  - Symbol único (key)                                        │
│  - provideContext()                                          │
│  - injectContext()                                           │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              SliderRoot.vue (PROVIDER)                       │
│  const context = {                                           │
│    modelValue: ref(50),                                      │
│    updateValue: (v) => { ... }                               │
│  }                                                           │
│  provideSliderContext(context)                               │
│                                                              │
│  <slot /> <!-- Filhos têm acesso -->                         │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┴──────────────┐
        ▼                          ▼
┌──────────────────┐      ┌──────────────────┐
│ SliderTrack.vue  │      │ SliderThumb.vue  │
│ (INJECT)         │      │ (INJECT)         │
│                  │      │                  │
│ const context =  │      │ const context =  │
│ injectSlider()   │      │ injectSlider()   │
│                  │      │                  │
│ context.value    │      │ context.update   │
└──────────────────┘      └──────────────────┘
```

**Vantagens:**
✅ Type-safe com TypeScript
✅ Key isolada e reutilizável
✅ Evita props drilling
✅ Composição clara (Provider/Consumer pattern)

**Desvantagens que você apontou:**
❌ Necessidade de usar slots no Provider
❌ Rastreabilidade - não fica óbvio de onde vem
❌ Mais boilerplate para casos simples

---

## 3.2. Provide/Inject de Composable Inteiro

```
┌─────────────────────────────────────────────────────────────┐
│                   useFormLogic.ts                            │
│  export function useFormLogic() {                            │
│    const formData = ref({})                                  │
│    const errors = ref({})                                    │
│    const validate = () => { ... }                            │
│    const submit = async () => { ... }                        │
│    return { formData, errors, validate, submit }             │
│  }                                                           │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              FormRoot.vue (PROVIDER)                         │
│  import { useFormLogic } from './useFormLogic'               │
│                                                              │
│  const formLogic = useFormLogic()  // Instância única        │
│  provide(FORM_KEY, formLogic)                                │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┴──────────────┐
        ▼                          ▼
┌──────────────────┐      ┌──────────────────┐
│ FormField.vue    │      │ FormSubmit.vue   │
│ (INJECT)         │      │ (INJECT)         │
│                  │      │                  │
│ const form =     │      │ const form =     │
│ inject(FORM_KEY) │      │ inject(FORM_KEY) │
│                  │      │                  │
│ form.formData    │      │ form.submit()    │
│ form.errors      │      │                  │
└──────────────────┘      └──────────────────┘
```

**ESSA ABORDAGEM FAZ MUITO SENTIDO! ✅**

**Vantagens:**
✅ Rastreabilidade TOTAL - você vê o import do composable
✅ Mesma instância compartilhada (reatividade garantida)
✅ Lógica isolada e testável
✅ Não precisa de slots obrigatórios
✅ Developer Experience melhor (autocomplete, go-to-definition)
✅ Pode misturar provide com props quando necessário

**Melhor dos dois mundos:**
```typescript
// useFormLogic.ts
import type { InjectionKey } from 'vue'

export interface FormContext {
  formData: Ref<Record<string, any>>
  errors: Ref<Record<string, string>>
  validate: () => boolean
  submit: () => Promise<void>
}

export const FORM_INJECTION_KEY: InjectionKey<FormContext> = Symbol('form')

export function useFormLogic() {
  // ... implementação
  return { formData, errors, validate, submit }
}

// Helper para provide
export function provideForm() {
  const form = useFormLogic()
  provide(FORM_INJECTION_KEY, form)
  return form
}

// Helper para inject
export function injectForm() {
  const form = inject(FORM_INJECTION_KEY)
  if (!form) throw new Error('Form context not provided')
  return form
}
```

---

## 4. Composables do VueUse para Provide/Inject

### 4.1. `createInjectionState()` ⭐ RECOMENDADO

```typescript
import { createInjectionState } from '@vueuse/core'

// Cria automaticamente provide/inject tipados
const [useProvideFormState, useInjectFormState] = createInjectionState(
  (initialData = {}) => {
    const formData = ref(initialData)
    const errors = ref({})

    const validate = () => { /* ... */ }
    const submit = async () => { /* ... */ }

    return { formData, errors, validate, submit }
  }
)

// FormRoot.vue
useProvideFormState({ name: '', email: '' })

// FormField.vue
const form = useInjectFormState()! // Form context here
```

**É BASICAMENTE O QUE VOCÊ PENSOU, MAS AUTOMATIZADO! 🎯**

✅ Type-safe automático
✅ Keys gerenciadas internamente
✅ SSR-safe (unique key por instância)
✅ Código limpo e mínimo

---

### 4.2. `injectLocal()` / `provideLocal()`

Para contextos que não devem "vazar" para componentes fora da árvore.

```typescript
// Pai
provideLocal('localData', ref(123))

// Filho direto - ✅ funciona
const data = injectLocal('localData')

// Neto - ❌ não funciona (precisa re-provide)
```

Menos comum, útil para isolamento explícito.

---

### 4.3. `computedInject()`

Computed lazy que só é calculado quando injetado:

```typescript
// Provide
const expensiveValue = computed(() => heavyCalculation())
provide('expensive', expensiveValue)

// Inject com lazy
const value = computedInject('expensive', () => defaultValue)
// Só calcula se realmente usado
```

Útil para otimizações, mas casos de uso específicos.

---

## 5. Comparação Visual de Fluxo de Dados

### Props/Emits (3 níveis)
```
Avô                    Pai                    Neto
│                      │                      │
├─ data ────────────>  ├─ :data ──────────>  ├─ usa data
│  handleEvent         │  @event             │
│  <───────────────────┼─ emit('event') <────┼─ emit('event')
│  executa             │  repassa            │  dispara
```

### Pinia Store
```
      ┌─────────────────┐
      │   PINIA STORE   │
      └─────────────────┘
         ↕️      ↕️      ↕️
        Avô    Pai    Neto
       (todos acessam diretamente)
```

### Provide/Inject (Composable)
```
Avô (Provider)
├─ useProvideForm()
│  ├─ cria instância única
│  └─ disponibiliza para árvore
│
├─ Pai (Consumidor)
│  └─ injectForm() ──> mesma instância
│
└─ Neto (Consumidor)
   └─ injectForm() ──> mesma instância
```

---

## 6. Recomendações Práticas

### Use **Props/Emits** quando:
- Hierarquia de 1-2 níveis
- Componentes reutilizáveis/genéricos
- Quer explicitação clara de dependências

### Use **Pinia Store** quando:
- Estado global (multi-página)
- Dados de usuário/autenticação
- Cache de API
- Feature complexa mesmo em contexto local (4+ níveis)

### Use **Provide/Inject + Composable** quando:
- Componente composto (3+ níveis)
- Contexto bem definido (Form, Table, Tabs, etc)
- Quer rastreabilidade e type-safety
- Não precisa persistir além do ciclo de vida do componente raiz

### Use **createInjectionState (VueUse)** quando:
- Tudo do Provide/Inject + Composable
- Quer menos boilerplate
- Quer SSR-safety automático

---

## 7. Exemplo de Decisão (Formulário Complexo)

**Cenário:** Formulário de cadastro de produto com:
- Tabs (Dados Básicos, Preço, Estoque, Imagens)
- Validação em tempo real
- Preview lateral
- Botões de ação no topo e rodapé

**Hierarquia:**
```
ProductForm (raiz)
├─ FormHeader
│  ├─ SaveButton
│  └─ CancelButton
├─ FormTabs
│  ├─ BasicDataTab
│  │  ├─ NameField
│  │  ├─ DescriptionField
│  │  └─ CategorySelect
│  ├─ PriceTab
│  │  ├─ PriceField
│  │  └─ DiscountField
│  └─ StockTab
│     └─ QuantityField
├─ ProductPreview (usa todos os dados)
└─ FormFooter
   ├─ SaveButton
   └─ CancelButton
```

**Solução Recomendada:** `createInjectionState`

```typescript
// composables/useProductForm.ts
export const [useProvideProductForm, useProductForm] = createInjectionState(
  (initialProduct = {}) => {
    const product = ref(initialProduct)
    const errors = ref({})
    const isDirty = ref(false)

    const validate = () => { /* ... */ }
    const save = async () => { /* ... */ }
    const reset = () => { /* ... */ }

    return {
      product,
      errors,
      isDirty,
      validate,
      save,
      reset
    }
  }
)
```

**Por quê?**
- ✅ 4+ níveis de hierarquia
- ✅ Múltiplos componentes precisam dos mesmos dados
- ✅ Lógica complexa (validação, save) centralizada
- ✅ Rastreabilidade (cada componente importa `useProductForm`)
- ✅ Não precisa persistir (não é Pinia)
- ✅ Type-safe e testável

---

## 8. Próximos Passos

Quer que eu crie um exemplo prático implementando:

1. **Exemplo simples (Contador)** com as 3 abordagens lado a lado?
2. **Exemplo médio (Formulário de 3 níveis)** com `createInjectionState`?
3. **Exemplo complexo (Table com filtros/paginação)** comparando Pinia vs Provide/Inject?

Me diga qual te interessa mais para explorarmos com código real!
