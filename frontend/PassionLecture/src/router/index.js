import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Dynamic import creates a separate file (chunk)
      // which will be (lazy-loaded)loaded only when this route is visited
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
