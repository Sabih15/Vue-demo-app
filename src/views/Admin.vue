<template>
  <div class="page">
    <h2>Admin – User Management</h2>

    <table class="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>

          <td>
            <span class="badge" :class="user.role">
              {{ user.role }}
            </span>
          </td>

          <td>
            <span :class="user.active ? 'active' : 'inactive'">
              {{ user.active ? 'Active' : 'Disabled' }}
            </span>
          </td>

          <td>
            <button @click="changeRole(user.id)">
              Change Role
            </button>
            <button @click="toggleStatus(user.id)">
              {{ user.active ? 'Disable' : 'Enable' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getUsers,
  toggleUserStatus,
  changeUserRole,
  type AppUser
} from '../services/userService'

const users = ref<AppUser[]>(getUsers())

const toggleStatus = (id: number) => {
  toggleUserStatus(id)
}

const changeRole = (id: number) => {
  changeUserRole(id)
}
</script>
