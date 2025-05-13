import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // Dynamic import creates a separate file (chunk)
      // which will be (lazy-loaded)loaded only when this route is visited
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/categories/:categorie_id/books',
      name: 'bookByCategory',
      component: () => import('../views/BookByCategoryView.vue'),
    },
    {
      path: '/users/:user_id',
      name: 'userById',
      component: () => import('../components/Profile.vue'),
    } /*
    {
      path: '/books/:user_id',
      name: 'booksByUserId',
      component: () => import('../components/Profile.vue'),
    },*/,
    /*{
      path: '/profile',
      name: 'Profile',
      component: () => import('../components/Profile.vue'),
    },*/
    {
      path: '/details/:id',
      name: 'Details',
      component: () => import('../components/DetailsView.vue'),
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('../components/CreateBook.vue'),
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
      path: '/books',
      name: 'Books',
      component: () => import('../views/BooksView.vue'),
    },*/
  ],
})

export default router
