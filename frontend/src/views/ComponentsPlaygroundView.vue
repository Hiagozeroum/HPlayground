<script setup lang="ts">
import { ref } from 'vue'

const selectedTab = ref('buttons')

// Exemplos de dados para demonstração
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
const checkbox = ref(false)
const radio = ref(1)
const slider = ref(50)
const switchValue = ref(false)
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-2">Components Playground</h1>
        <p class="text-subtitle-1 mb-6">
          Experimente e teste diferentes componentes do Vuetify aqui
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-tabs v-model="selectedTab" color="primary">
          <v-tab value="buttons">Buttons</v-tab>
          <v-tab value="forms">Forms</v-tab>
          <v-tab value="cards">Cards</v-tab>
          <v-tab value="colors">Colors</v-tab>
        </v-tabs>

        <v-card class="mt-4">
          <v-card-text>
            <v-window v-model="selectedTab">
              <!-- Tab Buttons -->
              <v-window-item value="buttons">
                <h3 class="mb-4">Exemplos de Botões</h3>
                <div class="d-flex flex-wrap gap-2 mb-4">
                  <v-btn>Default</v-btn>
                  <v-btn color="primary">Primary</v-btn>
                  <v-btn color="secondary">Secondary</v-btn>
                  <v-btn color="success">Success</v-btn>
                  <v-btn color="error">Error</v-btn>
                  <v-btn color="warning">Warning</v-btn>
                  <v-btn color="info">Info</v-btn>
                </div>

                <h4 class="mb-4">Cores Customizadas</h4>
                <div class="d-flex flex-wrap gap-2 mb-4">
                  <v-btn color="custom-purple">Purple</v-btn>
                  <v-btn color="custom-teal">Teal</v-btn>
                  <v-btn color="custom-orange">Orange</v-btn>
                </div>

                <h4 class="mb-4">Variantes</h4>
                <div class="d-flex flex-wrap gap-2">
                  <v-btn variant="elevated" color="primary">Elevated</v-btn>
                  <v-btn variant="flat" color="primary">Flat</v-btn>
                  <v-btn variant="text" color="primary">Text</v-btn>
                  <v-btn variant="outlined" color="primary">Outlined</v-btn>
                  <v-btn variant="tonal" color="primary">Tonal</v-btn>
                </div>
              </v-window-item>

              <!-- Tab Forms -->
              <v-window-item value="forms">
                <h3 class="mb-4">Exemplos de Formulários</h3>

                <v-text-field label="Text Field" class="mb-4"></v-text-field>

                <v-select :items="items" label="Select" class="mb-4"></v-select>

                <v-checkbox v-model="checkbox" label="Checkbox"></v-checkbox>

                <v-radio-group v-model="radio">
                  <v-radio label="Option 1" :value="1"></v-radio>
                  <v-radio label="Option 2" :value="2"></v-radio>
                </v-radio-group>

                <v-slider v-model="slider" label="Slider" class="mb-4"></v-slider>

                <v-switch v-model="switchValue" label="Switch"></v-switch>
              </v-window-item>

              <!-- Tab Cards -->
              <v-window-item value="cards">
                <h3 class="mb-4">Exemplos de Cards</h3>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-card>
                      <v-card-title>Card Simples</v-card-title>
                      <v-card-text>Este é um card básico do Vuetify.</v-card-text>
                      <v-card-actions>
                        <v-btn color="primary">Ação</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card color="primary" dark>
                      <v-card-title>Card Colorido</v-card-title>
                      <v-card-text>Card com cor de fundo customizada.</v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card variant="outlined">
                      <v-card-title>Card Outlined</v-card-title>
                      <v-card-text>Card com borda ao invés de elevação.</v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card variant="tonal" color="success">
                      <v-card-title>Card Tonal</v-card-title>
                      <v-card-text>Card com variante tonal.</v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Tab Colors -->
              <v-window-item value="colors">
                <h3 class="mb-4">Paleta de Cores</h3>
                <p class="mb-4">
                  Estas são as cores disponíveis no tema customizado. Você pode editá-las em
                  <code>src/config/theme.ts</code>
                </p>

                <v-row>
                  <v-col
                    v-for="color in [
                      'primary',
                      'secondary',
                      'accent',
                      'success',
                      'error',
                      'warning',
                      'info',
                      'custom-purple',
                      'custom-teal',
                      'custom-orange',
                    ]"
                    :key="color"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card :color="color" dark>
                      <v-card-text class="text-center py-8">
                        <h3>{{ color }}</h3>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gap-2 {
  gap: 0.5rem;
}

code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
