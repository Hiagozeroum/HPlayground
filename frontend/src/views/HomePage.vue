<script setup lang="ts">
import { useRoutes } from '@/composables/useRoutes'
import { useRouter } from 'vue-router'

const { searchQuery, filteredRoutes } = useRoutes()
const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <v-container fluid class="home-container">
    <!-- Hero Section -->
    <v-row class="justify-center text-center py-8">
      <v-col cols="12" md="8">
        <!-- Barra de busca centralizada e moderna -->
        <v-row class="justify-center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-text-field
              v-model="searchQuery"
              placeholder="Buscar rotas..."
              prepend-inner-icon="mdi-magnify"
              clearable
              variant="solo"
              rounded="xl"
              hide-details
              density="comfortable"
              class="search-field"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Cards de rotas -->
    <v-row class="justify-center mt-4">
      <v-col cols="12" md="10" lg="8">
        <v-row>
          <v-col v-for="route in filteredRoutes" :key="route.path" cols="12" sm="6" md="4">
            <v-card
              hover
              class="route-card h-100"
              elevation="0"
              border
              @click="navigateTo(route.path)"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-3">
                  <v-avatar
                    :color="
                      route.icon === 'mdi-home'
                        ? 'primary'
                        : route.icon === 'mdi-login'
                          ? 'secondary'
                          : 'accent'
                    "
                    size="48"
                    class="mr-3"
                  >
                    <v-icon :icon="route.icon" size="28" color="white"></v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h6 font-weight-bold">{{ route.title }}</h3>
                  </div>
                </div>

                <p class="text-body-2 text-medium-emphasis mb-4">
                  {{ route.description }}
                </p>

                <v-chip size="small" variant="tonal" color="primary">
                  {{ route.path }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Mensagem quando não há resultados -->
          <v-col v-if="filteredRoutes.length === 0" cols="12">
            <v-alert type="info" variant="tonal" class="text-center">
              <v-icon icon="mdi-alert-circle" size="48" class="mb-2"></v-icon>
              <div>Nenhuma rota encontrada com "{{ searchQuery }}"</div>
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  padding-top: 2rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-field {
  transition: all 0.3s ease;
}

.search-field:focus-within {
  transform: translateY(-2px);
}

.route-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px !important;
}

.route-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
}

.h-100 {
  height: 100%;
}
</style>
