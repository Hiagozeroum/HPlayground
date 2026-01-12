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
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                required
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <v-checkbox v-model="rememberMe" label="Lembrar-me"></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleLogin">Entrar</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mt-4" variant="outlined">
          <v-card-text class="text-center">
            <p class="text-caption">
              Esta é uma página de exemplo para fins de estudo. O login ainda não está funcional.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
