<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

function handleLogin() {
  // TODO: Implementar lógica de login real
  console.log('Login:', { email: email.value, password: password.value })
  // Por enquanto, apenas redireciona para home
  router.push('/')
}
</script>

<template>
  <v-container class="login-container fill-height" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="10" md="8" lg="5" xl="4">
        <div class="text-center mb-8">
          <v-avatar size="80" color="primary" class="mb-4 elevation-4">
            <v-icon icon="mdi-cube-outline" size="48"></v-icon>
          </v-avatar>
          <h1 class="text-h3 font-weight-bold mb-2">Bem-vindo</h1>
          <p class="text-subtitle-1 text-medium-emphasis">
            Entre na sua conta para continuar
          </p>
        </div>

        <v-card class="pa-4 rounded-xl" elevation="8">
          <v-card-text class="pa-6">
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                variant="outlined"
                rounded="lg"
                required
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                variant="outlined"
                rounded="lg"
                required
                class="mb-2"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <div class="d-flex justify-space-between align-center mb-6">
                <v-checkbox
                  v-model="rememberMe"
                  label="Lembrar-me"
                  density="compact"
                  hide-details
                ></v-checkbox>
                <v-btn variant="text" size="small" color="primary">
                  Esqueceu a senha?
                </v-btn>
              </div>

              <v-btn
                color="primary"
                size="large"
                block
                rounded="lg"
                elevation="0"
                @click="handleLogin"
              >
                Entrar
              </v-btn>
            </v-form>

            <v-divider class="my-6"></v-divider>

            <div class="text-center">
              <p class="text-body-2 text-medium-emphasis">
                Não tem uma conta?
                <v-btn variant="text" size="small" color="primary"> Cadastre-se </v-btn>
              </p>
            </div>
          </v-card-text>
        </v-card>

        <v-alert
          type="info"
          variant="tonal"
          class="mt-6"
          border="start"
          rounded="lg"
        >
          <template #prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          Esta é uma página de exemplo para fins de estudo. O login ainda não está funcional.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.v-card {
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}
</style>
