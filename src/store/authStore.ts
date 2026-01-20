import { defineStore } from 'pinia'

export interface User {
  username: string
  role: 'admin' | 'user'
  lastLogin?: string
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    isAdmin: (state): boolean => state.user?.role === 'admin'
  },

  actions: {
    login(username: string, password: string) {
      const users: Array<User & { password: string }> = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
      ]

      const found = users.find(
        u => u.username === username && u.password === password
      )

      if (!found) {
        throw new Error('Invalid credentials')
      }

      this.token = 'fake-jwt-token'
      this.user = { username: found.username, role: found.role, lastLogin: new Date().toLocaleString() }

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.clear()
    }
  }
})
