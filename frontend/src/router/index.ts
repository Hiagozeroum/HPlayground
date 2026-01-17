import { createRouter, createWebHistory } from 'vue-router'
import { routesConfig } from '@/config/routes'

/**
 * Vue Router configurado a partir do config centralizado
 * As rotas são importadas de @/config/routes.ts para evitar duplicação
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesConfig.map((route) => ({
    path: route.path,
    name: route.name,
    component: route.component,
    meta: {
      title: route.title,
      description: route.description,
      icon: route.icon,
    },
  })),
})

export default router
