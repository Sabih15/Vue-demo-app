<template>
  <nav class="navbar">
    <div class="nav-left">
      Vue Auth App
    </div>

    <div class="nav-right" @click="toggle">
      <span class="user">
        {{ auth.user?.username }}
      </span>

      <div v-if="open" class="dropdown">
        <router-link to="/dashboard">Dashboard</router-link>

        <router-link
          v-if="auth.isAdmin"
          to="/admin"
        >
          Admin
        </router-link>

        <router-link to="/pokemon">Pokemon</router-link>

        <button @click.stop="logout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const open = ref(false)

const toggle = () => {
  open.value = !open.value
}

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>
