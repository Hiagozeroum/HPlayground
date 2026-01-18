<script setup lang="ts">
import { useNavbarStore } from '@/stores/navbar'
import { routeGroups } from '@/config/routes'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const navbarStore = useNavbarStore()
const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.name)

// Índices de todos os painéis
const allPanelIndices = routeGroups.map((_, i) => i)

// Controla quais painéis estão expandidos (todos abertos por padrão)
const expandedPanels = ref<number[]>([...allPanelIndices])

// Verifica se todos os painéis estão expandidos
const allExpanded = computed(() => expandedPanels.value.length === routeGroups.length)

// Expande ou recolhe todos os painéis
function toggleAllPanels() {
  if (allExpanded.value) {
    expandedPanels.value = []
  } else {
    expandedPanels.value = [...allPanelIndices]
  }
}

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

    <!-- Rotas agrupadas com Expansion Panels -->
    <v-expansion-panels
      v-if="!navbarStore.rail"
      v-model="expandedPanels"
      multiple
      variant="accordion"
      class="drawer-panels"
    >
      <v-expansion-panel
        v-for="(group, index) in routeGroups"
        :key="group.name"
        :value="index"
        class="drawer-panel"
      >
        <v-expansion-panel-title class="panel-title">
          <v-icon :icon="group.icon" size="20" class="mr-3"></v-icon>
          <span class="text-body-2 font-weight-medium">{{ group.name }}</span>
        </v-expansion-panel-title>

        <v-expansion-panel-text class="panel-content">
          <v-list density="compact" nav class="pa-0">
            <v-list-item
              v-for="routeItem in group.routes"
              :key="routeItem.path"
              :prepend-icon="routeItem.icon"
              :title="routeItem.title"
              :value="routeItem.name"
              :active="currentRoute === routeItem.name"
              class="drawer-item"
              rounded="xl"
              @click="navigateTo(routeItem.path)"
            >
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Rail mode: lista compacta com tooltips -->
    <template v-else>
      <template v-for="group in routeGroups" :key="group.name">
        <v-divider class="my-2 mx-4"></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            v-for="routeItem in group.routes"
            :key="routeItem.path"
            v-h-tooltip.right="routeItem.title"
            :prepend-icon="routeItem.icon"
            :value="routeItem.name"
            :active="currentRoute === routeItem.name"
            class="drawer-item"
            rounded="xl"
            @click="navigateTo(routeItem.path)"
          >
          </v-list-item>
        </v-list>
      </template>
    </template>

    <!-- Botões de toggle no rodapé -->
    <template #append>
      <v-divider></v-divider>
      <div class="d-flex align-center justify-space-between pa-2">
        <v-btn
          v-h-tooltip.right="navbarStore.rail ? 'Expandir menu' : 'Recolher menu'"
          icon
          variant="text"
          size="small"
          @click.stop="navbarStore.toggleRail()"
        >
          <v-icon size="20">
            {{ navbarStore.rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
          </v-icon>
        </v-btn>
        <v-btn
          v-if="!navbarStore.rail"
          v-h-tooltip.top="allExpanded ? 'Recolher grupos' : 'Expandir grupos'"
          icon
          variant="text"
          size="small"
          @click="toggleAllPanels"
        >
          <v-icon size="20">
            {{ allExpanded ? 'mdi-unfold-less-horizontal' : 'mdi-unfold-more-horizontal' }}
          </v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.app-drawer {
  background: linear-gradient(180deg, #1f1f23 0%, #1a1a1f 100%) !important;
  border-right: 1px solid rgba(139, 92, 246, 0.1);
}

.drawer-panels {
  background: transparent;
}

.drawer-panel {
  background: transparent !important;
}

.drawer-panel :deep(.v-expansion-panel__shadow) {
  display: none;
}

.panel-title {
  min-height: 44px !important;
  padding: 8px 16px !important;
  background: transparent !important;
}

.panel-title:hover {
  background: rgba(139, 92, 246, 0.05) !important;
}

.panel-content {
  background: transparent !important;
}

.panel-content :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 8px 8px 8px !important;
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
