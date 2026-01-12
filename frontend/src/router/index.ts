import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import ComponentsPlayground from '@/views/ComponentsPlayground.vue'
import Page1 from '@/views/Page1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/components-playground',
      name: 'components-playground',
      component: ComponentsPlayground,
    },
    {
      path: '/page1',
      name: 'page1',
      component: Page1,
    },
  ],
})

export default router
