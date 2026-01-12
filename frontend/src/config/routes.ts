import type { RouteInfo } from '@/types/route'

/**
 * Configuração centralizada de rotas
 * Facilita manutenção e permite listar rotas na Home
 */
export const routesConfig: RouteInfo[] = [
  {
    path: '/',
    name: 'home',
    title: 'Home',
    description: 'Página inicial com todas as rotas disponíveis',
    icon: 'mdi-home',
    showInHome: false, // Não mostra a home na própria home
  },
  {
    path: '/login',
    name: 'login',
    title: 'Login',
    description: 'Página de autenticação de usuários',
    icon: 'mdi-login',
    showInHome: true,
  },
  {
    path: '/components-playground',
    name: 'components-playground',
    title: 'Components Playground',
    description: 'Área para testar e experimentar componentes Vue e Vuetify',
    icon: 'mdi-view-dashboard',
    showInHome: true,
  },
  {
    path: '/storybook',
    name: 'storybook',
    title: 'Storybook',
    description: 'Documentação e desenvolvimento de componentes isolados',
    icon: 'mdi-book-open-variant',
    showInHome: true,
  },
]
