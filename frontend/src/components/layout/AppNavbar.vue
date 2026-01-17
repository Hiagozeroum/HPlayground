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
  <v-app-bar flat elevation="2" class="app-bar">
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
  background: linear-gradient(135deg, #1F1F23 0%, #1A1A1F 100%) !important;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(10px);
}

.logo-container {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  width: fit-content;
}

.logo-container:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}
</style>
