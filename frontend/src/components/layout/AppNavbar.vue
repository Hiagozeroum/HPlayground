<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { useThemeStore } from '@/stores/theme'
import { useRouter } from 'vue-router'

const navbarStore = useNavbarStore()
const themeStore = useThemeStore()
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click="navbarStore.toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="cursor-pointer" @click="goHome">
      {{ navbarStore.currentTitle }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="themeStore.toggleTheme">
      <v-icon>{{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
