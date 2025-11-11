import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_CONTEXT_PATH || '/'),
  routes
})

// Simple navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
