<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppDrawer from '@/components/layout/AppDrawer.vue'
</script>

<template>
  <v-app>
    <AppNavbar />
    <AppDrawer />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
