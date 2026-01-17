# Claude Code - Instruções do Projeto

## Documentação Técnica (Discovery & Learning)

### Estrutura de Documentação

Para discussões técnicas, análises e estudos que precisam ser preservados:

- **Localização:** `/estudos/` (pasta na raiz do projeto)
- **Formato:** Arquivos Markdown (.md)
- **Organização:**
  - Arquivos soltos para tópicos únicos/simples
  - Subpastas para contextos relacionados (ex: `estudos/gerenciamento-estados/`)

### Quando Documentar

Crie documentação quando:
- ✅ Discovery técnico ou comparação de abordagens
- ✅ Discussões que resultam em decisões arquiteturais
- ✅ Aprendizado de conceitos que podem ser reutilizados
- ✅ Análises de prós e contras de diferentes soluções

### Formato da Documentação

Inclua sempre:
1. **Contexto da discussão** - Input/perguntas iniciais do usuário
2. **Análise técnica** - Comparações, diagramas, exemplos
3. **Conclusões e recomendações** - Decision tree, quando usar cada abordagem
4. **Próximos passos** - Se aplicável, exemplos práticos a serem implementados

### Exemplo de Estrutura

```
estudos/
├── gerenciamento-estados/
│   ├── comparacao-abordagens.md
│   ├── guia-decisao.md
│   └── exemplos-praticos.md
└── performance/
    └── otimizacao-render.md
```

---

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
