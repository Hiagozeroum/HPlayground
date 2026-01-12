<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { routesConfig } from '@/config/routes'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const navbarStore = useNavbarStore()
const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.name)

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <v-navigation-drawer
    v-model="navbarStore.rail"
    :rail="navbarStore.rail"
    permanent
    class="app-drawer"
    @click="navbarStore.rail && navbarStore.toggleRail()"
  >
    <v-list density="compact" nav class="py-2">
      <v-list-item
        v-for="route in routesConfig"
        :key="route.path"
        :prepend-icon="route.icon"
        :title="route.title"
        :value="route.name"
        :active="currentRoute === route.name"
        class="drawer-item"
        @click="navigateTo(route.path)"
      >
        <template #append>
          <v-icon v-if="currentRoute === route.name" color="primary" size="small">
            mdi-circle
          </v-icon>
        </template>
      </v-list-item>
    </v-list>

    <template #append>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-btn
          icon
          variant="text"
          block
          @click.stop="navbarStore.toggleRail()"
        >
          <v-icon>
            {{ navbarStore.rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
          </v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.app-drawer {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.drawer-item {
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.drawer-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
