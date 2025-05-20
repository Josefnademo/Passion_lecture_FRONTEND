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
    },
    {
      path: '/my-books',
      name: 'myBooks',
      component: () => import('../views/MyBooksView.vue'),
      meta: { requiresAuth: true },
    },
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
    {
      path: '/edit/:id',
      name: 'EditBook',
      component: () => import('../views/EditBookView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    /* {
      path: '/search',
      name: 'Search',
      component: () => import('../views/SearchView.vue'),
    },

    {
      path: '/books',
      name: 'Books',
      component: () => import('../views/BooksView.vue'),
    },*/
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userId')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access protected route while not authenticated
    next('/login')
  } else {
    next()
  }
})

export default router
