<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { routeGroups } from '@/config/routes'
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
  <v-navigation-drawer :model-value="true" :rail="navbarStore.rail" permanent class="app-drawer">
    <!-- Logo/Header quando expandido -->
    <div v-if="!navbarStore.rail" class="pa-4">
      <div class="d-flex align-center">
        <v-icon icon="mdi-cube-outline" color="primary" size="32" class="mr-3"></v-icon>
        <div>
          <div class="text-subtitle-1 font-weight-bold">HPlayground</div>
          <div class="text-caption text-medium-emphasis">Seu lab Vue</div>
        </div>
      </div>
    </div>

    <v-divider v-if="!navbarStore.rail"></v-divider>

    <!-- Rotas agrupadas -->
    <template v-for="group in routeGroups" :key="group.name">
      <!-- Header do grupo (apenas quando não está em rail mode) -->
      <v-list-subheader
        v-if="!navbarStore.rail"
        class="text-uppercase text-caption font-weight-bold ml-3 mt-4"
      >
        {{ group.name }}
      </v-list-subheader>

      <!-- Divider visual quando em rail mode -->
      <v-divider v-else class="my-2 mx-4"></v-divider>

      <v-list density="compact" nav>
        <v-tooltip
          v-for="routeItem in group.routes"
          :key="routeItem.path"
          :text="routeItem.title"
          location="end"
          :disabled="!navbarStore.rail"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="routeItem.icon"
              :title="routeItem.title"
              :value="routeItem.name"
              :active="currentRoute === routeItem.name"
              class="drawer-item"
              rounded="xl"
              @click="navigateTo(routeItem.path)"
            >
            </v-list-item>
          </template>
        </v-tooltip>
      </v-list>
    </template>

    <!-- Botão de toggle no rodapé -->
    <template #append>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-tooltip :text="navbarStore.rail ? 'Expandir menu' : 'Recolher menu'" location="end">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              variant="text"
              size="small"
              @click.stop="navbarStore.toggleRail()"
            >
              <v-icon size="20">
                {{ navbarStore.rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
              </v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.app-drawer {
  background: linear-gradient(180deg, #1f1f23 0%, #1a1a1f 100%) !important;
  border-right: 1px solid rgba(139, 92, 246, 0.1);
}

.drawer-item {
  margin: 2px;
  transition: all 0.2s ease;
}

.drawer-item:hover {
  background-color: rgba(139, 92, 246, 0.1) !important;
}

.drawer-item.v-list-item--active {
  background: linear-gradient(
    90deg,
    rgba(139, 92, 246, 0.2) 0%,
    rgba(139, 92, 246, 0.1) 100%
  ) !important;
  color: rgb(229, 229, 229);
  font-weight: 600;
}

.drawer-item.v-list-item--active :deep(.v-icon) {
  color: rgb(139, 92, 246);
}
</style>
