<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="mb-6">
          <h1 class="text-h4 font-weight-bold mb-2">Exemplo 1: Contador</h1>
          <p class="text-body-1 text-medium-emphasis">
            Comparação lado a lado de 3 abordagens para gerenciar estado em hierarquias de componentes
          </p>
        </div>

        <v-row>
          <v-col cols="12" lg="4">
            <CounterPropsEmits />
          </v-col>
          <v-col cols="12" lg="4">
            <CounterPinia />
          </v-col>
          <v-col cols="12" lg="4">
            <CounterProvideInject />
          </v-col>
        </v-row>

        <v-alert type="warning" variant="tonal" class="mt-6">
          <template #title>
            <span class="text-h6">Lições Aprendidas</span>
          </template>

          <div class="mt-3">
            <div class="mb-3">
              <strong class="text-primary">Props/Emits:</strong>
              <p class="text-body-2 mt-1">
                Melhor para hierarquias simples (1-2 níveis). Explícito e fácil de entender, mas fica verboso com mais níveis.
              </p>
            </div>

            <div class="mb-3">
              <strong class="text-primary">Pinia Store:</strong>
              <p class="text-body-2 mt-1">
                Ótimo para estado global ou contextos locais muito complexos (4+ níveis). Acesso direto de qualquer lugar, mas pode gerar acoplamento.
              </p>
            </div>

            <div>
              <strong class="text-primary">Provide/Inject (createInjectionState):</strong>
              <p class="text-body-2 mt-1">
                <strong>Melhor abordagem para hierarquias de 3+ níveis.</strong> Combina rastreabilidade, type-safety e isolamento de contexto.
              </p>
            </div>
          </div>
        </v-alert>

        <div class="d-flex justify-space-between align-center mt-6">
          <v-btn
            variant="text"
            :to="{ path: '/state-management' }"
            prepend-icon="mdi-arrow-left"
          >
            Voltar para exemplos
          </v-btn>

          <v-btn
            color="primary"
            :to="{ path: '/state-management/form' }"
            append-icon="mdi-arrow-right"
          >
            Próximo: Formulário
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import CounterPropsEmits from './PropsEmits/CounterPropsEmits.vue'
import CounterPinia from './Pinia/CounterPinia.vue'
import CounterProvideInject from './ProvideInject/CounterProvideInject.vue'
</script>
