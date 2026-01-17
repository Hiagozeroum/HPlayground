import type { RouteInfo, RouteGroup } from '@/types/route'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import ComponentsPlayground from '@/views/ComponentsPlayground.vue'
import Page1 from '@/views/Page1.vue'

/**
 * Configuração centralizada de rotas
 * Fonte única de verdade para todas as rotas do aplicativo
 * - Usado pelo Vue Router para criar rotas
 * - Usado pela Home para listar páginas disponíveis
 * - Usado pelo Drawer para navegação lateral
 */
export const routesConfig: RouteInfo[] = [
  {
    path: '/',
    name: 'home',
    title: 'Home',
    description: 'Página inicial com todas as rotas disponíveis',
    icon: 'mdi-home',
    component: HomePage,
    showInHome: false,
    category: 'principal',
  },
  {
    path: '/login',
    name: 'login',
    title: 'Login',
    description: 'Página de autenticação de usuários',
    icon: 'mdi-login',
    component: Login,
    showInHome: true,
    category: 'autenticação',
  },
  {
    path: '/components-playground',
    name: 'components-playground',
    title: 'Components Playground',
    description: 'Área para testar e experimentar componentes Vue e Vuetify',
    icon: 'mdi-view-dashboard',
    component: ComponentsPlayground,
    showInHome: true,
    category: 'playground',
  },
  {
    path: '/page1',
    name: 'page1',
    title: 'Custom Directives',
    description: 'Aprenda a criar e usar custom directives com tooltips',
    icon: 'mdi-tooltip-text',
    component: Page1,
    showInHome: true,
    category: 'playground',
  },
]

/**
 * Agrupa rotas por categoria para exibição organizada no drawer
 */
export const routeGroups: RouteGroup[] = [
  {
    name: 'Principal',
    icon: 'mdi-home',
    routes: routesConfig.filter((r) => r.category === 'principal'),
  },
  {
    name: 'Autenticação',
    icon: 'mdi-shield-account',
    routes: routesConfig.filter((r) => r.category === 'autenticação'),
  },
  {
    name: 'Playground',
    icon: 'mdi-gamepad-variant',
    routes: routesConfig.filter((r) => r.category === 'playground'),
  },
].filter((group) => group.routes.length > 0) // Remove grupos vazios
