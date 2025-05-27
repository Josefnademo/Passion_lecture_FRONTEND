<template>
  <header class="header">
    <button @click="toggleSidebar" class="menu-button" aria-label="Toggle menu">
      <img :src="dropMenu" class="logo" alt="Menu" />
    </button>
    <router-link to="/" class="logo-link">
      <h1 class="logo-text">Passion <span class="logo-highlight">Lecture</span></h1>
    </router-link>
    <div class="loginButtons">
      <router-link to="/login" class="profile-link" v-if="!isLoggedIn">
        <p>Log in</p>
      </router-link>
      <router-link to="/register" class="profile-link" v-if="!isLoggedIn">
        <p>Register</p>
      </router-link>
      <router-link :to="profileLink" class="profile-link" v-if="isLoggedIn">
        <img src="/images/userProfile.png" class="user-icon" alt="User Profile" />
      </router-link>
    </div>

    <Sidebar
      v-if="sidebarOpen && isSidebarAvailable"
      :is-open="sidebarOpen"
      @close="setSidebarOpen(false)"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// TODO: Uncomment when lucide-vue-next is installed
// import { Menu, User } from 'lucide-vue-next'
import Sidebar from './Sidebar.vue'

const token = ref('')
const dropMenu = '/images/dropMenu.png'
const sidebarOpen = ref(false)
const isSidebarAvailable = computed(() => !!Sidebar)

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token')
})

const profileLink = computed(() => {
  const userId = localStorage.getItem('CurrentUserId')
  return userId ? `/users/${userId}` : '/login'
})

onMounted(async () => {
  await tryToken()
})

const tryToken = async () => {
  const savedToken = localStorage.getItem('token')

  if (!savedToken) {
    console.log('No token found')
    localStorage.removeItem('userId') // Clean up any stray userId
    return
  }

  // Extract the actual token from "Bearer token" format
  const actualToken = savedToken.startsWith('Bearer ') ? savedToken.split(' ')[1] : savedToken

  try {
    const response = await fetch(`http://localhost:9999/api/auth/login/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: actualToken }),
    })

    const result = await response.json()

    if (result.valid) {
      console.log('User authenticated with token:', result.user)
      // Update userId in case it was missing
      localStorage.setItem('CurrentUserId', result.user.id)
    } else {
      console.log('Invalid or expired token')
      localStorage.removeItem('token') // clear invalid token
      localStorage.removeItem('CurrentUserId') // also clear userId
    }
  } catch (e) {
    console.error('Token validation failed:', e)
  }
}

const setSidebarOpen = (value) => {
  sidebarOpen.value = value
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
.header {
  background-color: var(--medium-blue, #3c5a78);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
}

.menu-button {
  background: none;
  border: none;
  color: var(--primary-green, #b3dec1);
  transition: color 0.3s;
  cursor: pointer;
  z-index: 101;
}

.menu-button:hover {
  opacity: 0.8;
}

.logo {
  width: 2.5em;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-left: 10em;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.logo-highlight {
  background-color: var(--primary-green, #b3dec1);
  color: var(--medium-blue, #1a3c5a);
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: 600;
}

.profile-link {
  color: var(--primary-green, #b3dec1);
  transition: color 0.3s;
  text-decoration: none;
}

.profile-link:hover {
  opacity: 0.8;
}

.user-icon {
  width: 2em;
  height: 2em;
}
.loginButtons {
  display: flex;
  gap: 1em;
}
</style>
