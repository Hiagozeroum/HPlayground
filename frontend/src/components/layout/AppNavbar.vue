<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { useRouter } from 'vue-router'

const navbarStore = useNavbarStore()
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <v-app-bar flat elevation="0" class="app-bar" color="surface">
    <v-app-bar-nav-icon variant="text" @click="navbarStore.toggleRail"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <div class="d-flex align-center logo-container" @click="goHome">
        <v-icon icon="mdi-cube-outline" size="32" class="mr-2" color="primary"></v-icon>
        <span class="text-h5 font-weight-bold">{{ navbarStore.currentTitle }}</span>
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon variant="text" v-h-tooltip="'Configurações'">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.logo-container {
  cursor: pointer;
  transition: opacity 0.2s ease;
  user-select: none;
  width: fit-content;
}

.logo-container:hover {
  opacity: 0.7;
}
</style>
