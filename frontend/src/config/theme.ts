import type { ThemeDefinition } from 'vuetify'

/**
 * Tema customizado do Vuetify
 * Você pode adicionar cores customizadas aqui e elas estarão disponíveis em todo o projeto
 * Exemplo de uso: <v-btn color="primary">Button</v-btn>
 * Exemplo com cor customizada: <v-btn color="accent">Button</v-btn>
 */
export const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // Cores principais do Vuetify
    primary: '#662558ff',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',

    // Cores customizadas - adicione suas próprias cores aqui
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-variant': '#F5F5F5',
    'on-surface': '#000000',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',

    // Exemplos de cores customizadas que você pode usar
    'custom-purple': '#9C27B0',
    'custom-teal': '#009688',
    'custom-orange': '#FF9800',
  },
}

/**
 * Tema dark moderno - Similar ao ChatGPT/Claude
 */
export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    // Cores principais com tons de roxo
    primary: '#8B5CF6', // Roxo vibrante
    secondary: '#6366F1', // Indigo
    accent: '#A78BFA', // Roxo claro
    error: '#EF4444',
    info: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',

    // Backgrounds escuros modernos
    background: '#2c2b2b', // Quase preto
    surface: '#202020', // Cinza muito escuro
    'surface-bright': '#212121', // Um pouco mais claro
    'surface-variant': '#2C2C2C',

    // Navbar e Drawer com cor
    'navbar-bg': '#1F1F23', // Cinza escuro levemente roxo
    'drawer-bg': '#1F1F23',

    // Textos
    'on-surface': '#E5E5E5',
    'on-surface-variant': '#A0A0A0',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',

    // Cores customizadas
    'custom-purple': '#A78BFA',
    'custom-teal': '#14B8A6',
    'custom-orange': '#F97316',

    // Cores para componentes de demonstração (StateManagement, etc.)
    'demo-parent': '#2D2D3A', // Fundo do componente pai
    'demo-child': '#1E1E28', // Fundo do componente filho (mais escuro para contraste)
    'demo-badge': '#6366F1', // Badge com nome do componente (indigo para destaque)
  },
}
