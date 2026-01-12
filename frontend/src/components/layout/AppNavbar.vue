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
  <v-app-bar flat elevation="0" class="app-bar" color="surface">
    <v-app-bar-nav-icon
      variant="text"
      @click="navbarStore.toggleRail"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="cursor-pointer d-flex align-center" @click="goHome">
      <v-icon icon="mdi-cube-outline" size="32" class="mr-2" color="primary"></v-icon>
      <span class="text-h5 font-weight-bold">{{ navbarStore.currentTitle }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      icon
      variant="text"
      @click="themeStore.toggleTheme"
      class="mr-2"
    >
      <v-icon>{{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-btn icon variant="text">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  backdrop-filter: blur(10px);
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.2s;
}

.cursor-pointer:hover {
  opacity: 0.8;
}
</style>
