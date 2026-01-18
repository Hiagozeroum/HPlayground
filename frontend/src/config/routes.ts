import type { RouteInfo, RouteGroup } from '@/types/route'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import ComponentsPlayground from '@/views/ComponentsPlayground.vue'
import CustomDirectivesPage from '@/views/CustomDirectivesPage.vue'
import StateManagementIndex from '@/views/StateManagement/StateManagementIndex.vue'
import CounterExample from '@/views/StateManagement/Counter/CounterExample.vue'
import FormExample from '@/views/StateManagement/Form/FormExample.vue'
import TableExample from '@/views/StateManagement/Table/TableExample.vue'

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
    path: '/page1',
    name: 'page1',
    title: 'Custom Directives - Tooltip',
    description: 'Testando custom directives',
    icon: 'mdi-tooltip-text',
    component: CustomDirectivesPage,
    showInHome: true,
    category: 'playground',
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
    path: '/state-management',
    name: 'state-management',
    title: 'State Management',
    description: 'Comparação de abordagens: Props/Emits, Provide/Inject e Pinia',
    icon: 'mdi-state-machine',
    component: StateManagementIndex,
    showInHome: true,
    category: 'estudos',
  },
  {
    path: '/state-management/counter',
    name: 'state-management-counter',
    title: 'Exemplo: Contador',
    description: 'Comparação de Props/Emits, Pinia e Provide/Inject',
    icon: 'mdi-counter',
    component: CounterExample,
    showInHome: false,
    category: 'estudos',
  },
  {
    path: '/state-management/form',
    name: 'state-management-form',
    title: 'Exemplo: Formulário',
    description: 'Formulário multi-nível com createInjectionState',
    icon: 'mdi-form-select',
    component: FormExample,
    showInHome: false,
    category: 'estudos',
  },
  {
    path: '/state-management/table',
    name: 'state-management-table',
    title: 'Exemplo: Tabela',
    description: 'Tabela complexa: Pinia vs Provide/Inject',
    icon: 'mdi-table',
    component: TableExample,
    showInHome: false,
    category: 'estudos',
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
    name: 'Playground',
    icon: 'mdi-gamepad-variant',
    routes: routesConfig.filter((r) => r.category === 'playground'),
  },
  {
    name: 'Estudos',
    icon: 'mdi-school',
    routes: routesConfig.filter((r) => r.category === 'estudos'),
  },
  {
    name: 'Autenticação',
    icon: 'mdi-shield-account',
    routes: routesConfig.filter((r) => r.category === 'autenticação'),
  },
].filter((group) => group.routes.length > 0) // Remove grupos vazios
