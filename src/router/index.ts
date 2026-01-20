import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Admin from '../views/Admin.vue'
import Pokemon from '../views/Pokemon.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/admin', component: Admin, meta: { auth: true, admin: true } },
  { path: '/pokemon', component: Pokemon, meta: { auth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.auth && !auth.isAuthenticated) {
    return '/'
  }

  if (to.meta.admin && !auth.isAdmin) {
    return '/dashboard'
  }
})

export default router
