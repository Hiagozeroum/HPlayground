# HPlayground

Projeto Vue.js para testar componentes, boas práticas e aprender sobre o ecossistema Vue.

## Estrutura do Projeto

```
src/
├── components/           # Componentes Vue reutilizáveis
│   ├── layout/          # Componentes de layout (Navbar, Drawer, Footer, etc)
│   └── common/          # Componentes comuns reutilizáveis
├── views/               # Páginas/Views da aplicação
├── router/              # Configuração do Vue Router
├── stores/              # Stores Pinia para gerenciamento de estado
├── composables/         # Composables reutilizáveis (lógica compartilhada)
├── helpers/             # Funções auxiliares puras
├── utils/               # Utilitários gerais
├── types/               # Definições de tipos TypeScript
├── plugins/             # Plugins Vue (Vuetify, etc)
├── config/              # Arquivos de configuração (tema, rotas, etc)
└── styles/              # Estilos globais
```

## Organização por Categoria

### 📁 Components
Componentes são divididos em categorias:
- **layout/**: Componentes estruturais (AppNavbar, AppDrawer, AppFooter)
- **common/**: Componentes reutilizáveis em múltiplas páginas

### 📁 Views
Páginas completas da aplicação. Cada view representa uma rota.

### 📁 Composables
Funções que usam Composition API para compartilhar lógica entre componentes.
Exemplo: `useRoutes`, `useAuth`, `useTheme`

### 📁 Stores (Pinia)
Gerenciamento de estado global da aplicação.
- `navbar.ts`: Estado da navbar (drawer, título, etc)
- `theme.ts`: Controle de tema (dark/light mode)

### 📁 Config
Configurações centralizadas:
- `theme.ts`: Temas customizados do Vuetify
- `routes.ts`: Configuração de rotas com metadados

## Temas Customizados

O projeto usa um sistema de temas customizados do Vuetify. Para adicionar ou modificar cores:

1. Abra `src/config/theme.ts`
2. Adicione suas cores no objeto `colors`
3. Use a cor em qualquer componente: `<v-btn color="custom-purple">Button</v-btn>`

### Cores Disponíveis

- Cores padrão: `primary`, `secondary`, `accent`, `success`, `error`, `warning`, `info`
- Cores customizadas: `custom-purple`, `custom-teal`, `custom-orange`

## Páginas Disponíveis

### 🏠 Home (`/`)
Página inicial com cards mostrando todas as rotas disponíveis e barra de busca para filtrar.

### 🔐 Login (`/login`)
Página de login (ainda não funcional, apenas estrutura base).

### 🎨 Components Playground (`/components-playground`)
Área para testar e experimentar componentes do Vuetify. Exemplos organizados por abas:
- Buttons
- Forms
- Cards
- Colors

## Como Adicionar Novas Rotas

1. Crie a view em `src/views/`
2. Adicione a configuração em `src/config/routes.ts`
3. A rota aparecerá automaticamente na Home!

```typescript
// src/config/routes.ts
{
  path: '/nova-rota',
  name: 'nova-rota',
  title: 'Nova Rota',
  description: 'Descrição da nova rota',
  icon: 'mdi-star',
  showInHome: true,
}
```

## Tecnologias Utilizadas

- Vue 3 (Composition API)
- TypeScript
- Vuetify 3
- Vue Router
- Pinia
- Vite

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Testes
npm run test:unit

# Lint
npm run lint

# Format
npm run format
```

## Boas Práticas Implementadas

1. **Separação de Responsabilidades**: Componentes, lógica (composables) e estado (stores) separados
2. **Configuração Centralizada**: Rotas e temas em arquivos de config
3. **TypeScript**: Tipagem forte para melhor DX e menos bugs
4. **Composables**: Reutilização de lógica entre componentes
5. **Stores Modulares**: Cada store com responsabilidade única

## Próximos Passos Sugeridos

- [ ] Implementar autenticação real
- [ ] Adicionar mais componentes ao playground
- [ ] Criar sistema de notificações/toasts
- [ ] Implementar tema dark completo
- [ ] Adicionar testes unitários
- [ ] Criar documentação de componentes

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
