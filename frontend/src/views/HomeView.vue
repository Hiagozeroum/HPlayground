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
  <v-container>
    <!-- Barra de busca -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          label="Buscar rotas..."
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          hide-details
          class="mb-6"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Cards de rotas -->
    <v-row>
      <v-col v-for="route in filteredRoutes" :key="route.path" cols="12" sm="6" md="4">
        <v-card hover class="route-card" @click="navigateTo(route.path)">
          <v-card-title class="d-flex align-center">
            <v-icon :icon="route.icon" class="mr-2" size="large"></v-icon>
            {{ route.title }}
          </v-card-title>

          <v-card-text>
            <p>{{ route.description }}</p>
            <v-chip size="small" class="mt-2">{{ route.path }}</v-chip>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text">Acessar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Mensagem quando não há resultados -->
      <v-col v-if="filteredRoutes.length === 0" cols="12">
        <v-alert type="info" variant="tonal">
          Nenhuma rota encontrada com "{{ searchQuery }}"
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.route-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.route-card:hover {
  transform: translateY(-4px);
}
</style>
