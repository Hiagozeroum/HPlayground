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
    primary: '#1976D2',
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
 * Tema dark - você pode alternar entre temas programaticamente
 * Exemplo: useTheme().global.name.value = 'darkTheme'
 */
export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#FF4081',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    background: '#121212',
    surface: '#1E1E1E',
    'surface-variant': '#2C2C2C',
    'on-surface': '#FFFFFF',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'custom-purple': '#BA68C8',
    'custom-teal': '#26A69A',
    'custom-orange': '#FFB74D',
  },
}
