<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { routesConfig } from '@/config/routes'
import { useRouter } from 'vue-router'

const navbarStore = useNavbarStore()
const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
  // Fecha o drawer em mobile após navegar
  if (window.innerWidth < 960) {
    navbarStore.setDrawer(false)
  }
}
</script>

<template>
  <v-navigation-drawer v-model="navbarStore.drawer" temporary>
    <v-list>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="HPlayground"
        subtitle="Seu laboratório Vue"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="route in routesConfig"
        :key="route.path"
        :prepend-icon="route.icon"
        :title="route.title"
        :value="route.name"
        @click="navigateTo(route.path)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
