<template>
  <div class="page">
    <h2>Login</h2>
    
     <form @submit.prevent="handleLogin">
      <input
        v-model="username"
        placeholder="Username"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit">Sign In</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')

const auth = useAuthStore()
const router = useRouter()

const handleLogin = (): void => {
  try {
    auth.login(username.value, password.value)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message
  }
}
</script>
