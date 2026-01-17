import type { Component } from 'vue'

export interface RouteInfo {
  path: string
  name: string
  title: string
  description: string
  icon: string
  component: Component
  showInHome?: boolean
  category?: string // Para agrupar rotas no drawer
}

export interface RouteGroup {
  name: string
  icon?: string
  routes: RouteInfo[]
}
