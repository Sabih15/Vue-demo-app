<!-- <template>
  <div class="page">
    <h2>Dashboard</h2>

    <p>Welcome <strong>{{ auth.user?.username }}</strong></p>

    <router-link
      v-if="auth.isAdmin"
      to="/admin"
      class="link"
    >
      Go to Admin Panel
    </router-link>

    <button style="margin-top: 20px" @click="logout">
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = (): void => {
  auth.logout()
  router.push('/')
}
</script> -->

<template>
  <div class="page">
    <h2>Dashboard</h2>

    <DashboardCard title="User Information">
      <p><strong>Username:</strong> {{ auth.user?.username }}</p>
      <p>
        <strong>Role:</strong>
        <span class="badge" :class="auth.user?.role">
          {{ auth.user?.role }}
        </span>
      </p>
      <p><strong>Last Login:</strong> {{ auth.user?.lastLogin }}</p>
    </DashboardCard>

    <DashboardCard title="Recent Activity">
      <ul>
        <li v-for="item in activities" :key="item.id">
          {{ item.message }} — {{ item.date }}
        </li>
      </ul>
    </DashboardCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import DashboardCard from '../components/DashboardCard.vue'
import { getRecentActivities, type Activity } from '../services/activityService'

const auth = useAuthStore()
const activities = ref<Activity[]>(getRecentActivities())
</script>
