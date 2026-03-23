# HPlayground — Instruções do Projeto

## Propósito

Este é um projeto de aprendizado com padrão profissional. O objetivo é explorar tecnologias, tomar decisões arquiteturais reais e construir código como seria feito em um ambiente produtivo de verdade — sem atalhos didáticos, sem simplificações artificiais.

Toda sugestão, implementação e discussão deve partir dessa premissa: **o que um time sênior faria aqui?**

---

## Estrutura do Projeto

```
HPlayground/
├── frontend/    # Vue 3 + TypeScript + Vite
└── api/         # (em construção)
```

---

## Documentação Técnica (Discovery & Learning)

Discussões técnicas relevantes, comparações de abordagens e decisões arquiteturais devem ser preservadas como documentação.

**Localização:** `/estudos/` na raiz do projeto
**Formato:** Markdown (.md)
**Organização:**
- Arquivos soltos para tópicos únicos
- Subpastas para contextos relacionados (ex: `estudos/gerenciamento-estados/`)

### Quando documentar

- Discovery técnico ou comparação de abordagens
- Discussões que resultam em decisões arquiteturais
- Conceitos aprendidos que podem ser reutilizados
- Análise de prós/contras entre soluções

### Estrutura de cada documento

1. **Contexto** — qual problema ou pergunta motivou a discussão
2. **Análise técnica** — comparações, diagramas, exemplos de código
3. **Conclusão** — decisão tomada e justificativa
4. **Próximos passos** — se aplicável

### Exemplo

```
estudos/
├── gerenciamento-estados/
│   ├── comparacao-abordagens.md
│   └── guia-decisao.md
└── performance/
    └── otimizacao-render.md
```

---

## Padrões Gerais

- Código em inglês (variáveis, funções, tipos, commits)
- Comentários e documentação em português, quando necessário
- Sem simplificações: tratar edge cases, erros e validações como em produção
- Preferir soluções explícitas a "mágicas" — clareza tem mais valor que brevidade
