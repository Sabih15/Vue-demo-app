<template>
  <Navbar v-if="auth.isAuthenticated" />
  <router-view />
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './store/authStore'

const auth = useAuthStore()
</script>