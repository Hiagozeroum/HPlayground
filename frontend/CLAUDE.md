# Frontend — Instruções do Módulo

> Instruções globais do projeto (documentação, padrões gerais) estão em `/CLAUDE.md`.

## Convenções do Projeto

### Componentes Vue

- Usar Composition API (Vue 3)
- Separar lógica complexa em composables (`useXXX.ts`)
- Type-safe com TypeScript

### Composables

- Prefixo `use` obrigatório (ex: `useFormLogic.ts`)
- Exportar interfaces/types quando aplicável
- Documentar com JSDoc quando necessário

---

## Estado e Gerenciamento

### Decision Tree

```
Hierarquia 1-2 níveis → Props/Emits
Hierarquia 3 níveis → createInjectionState (VueUse)
Hierarquia 4+ níveis complexa → createInjectionState OU Pinia (contexto local)
Estado global → Pinia
```

Para mais detalhes, consulte: `/estudos/gerenciamento-estados/comparacao-abordagens.md`
