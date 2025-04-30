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
    /* {
      path: '/search',
      name: 'Search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/details',
      name: 'Details',
      component: () => import('../views/DetailsView.vue'),
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/AccountView.vue'),
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/books',
      name: 'Books',
      component: () => import('../views/BooksView.vue'),
    }, */
  ],
})

export default router
