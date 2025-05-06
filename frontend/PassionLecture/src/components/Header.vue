<template>
  <header class="header">
    <button @click="toggleSidebar" class="menu-button" aria-label="Toggle menu">
      <img :src="dropMenu" class="logo" alt="Menu" />
    </button>
    <router-link to="/" class="logo-link">
      <h1 class="logo-text">Passion <span class="logo-highlight">Lecture</span></h1>
    </router-link>
    <router-link to="/profile" class="profile-link">
      <div class="user-button">👤</div>
    </router-link>
    <!-- Sidebar will be conditionally rendered when available -->
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

const dropMenu = '../../public/images/Group 36.png'
const sidebarOpen = ref(false)
const isSidebarAvailable = computed(() => !!Sidebar)

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

.user-button {
  font-size: 1.5rem;
}
</style>

<!-- <script setup>
import { ref, onMounted } from 'vue'
//import { Menu, User } from 'lucide-vue-next'
import { defineComponent } from './Sidebar.vue'
</script>

<script>
const dropMenu = '../../public/images/Group 36.png'

export default {
  name: 'Header',
  components: {
    Menu,
    User,
    defineComponent,
  },
  setup() {
    const sidebarOpen = ref(false)

    const setSidebarOpen = (value) => {
      sidebarOpen.value = value
    }

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    return {
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
    }
  },
}
</script> -->

<!-- <template>
  <header class="app-header">
    <div class="left-section">
      <div class="icon-button" @click="toggleSelect('categorie')">
        <img :src="dropMenu" class="logo" />
      </div>
    </div>
    <h1 class="header-title">
      <span class="title-main">Passion</span>
      <span class="title-tag">Lecture</span>
    </h1>
    <div class="right-section">
      <button class="icon-button user-button">👤</button>
    </div>
  </header>
</template> -->

<!-- <template>
  <header class="header">
    <button @click="toggleSidebar" class="menu-button" aria-label="Toggle menu">
      <Menu :size="32" />
    </button>
    <router-link to="/" class="logo-link">
      <h1 class="logo-text">Passion <span class="logo-highlight">Lecture</span></h1>
    </router-link>
    <router-link to="/profile" class="profile-link">
      <User :size="32" />
    </router-link>
    <Sidebar v-if="sidebarOpen" :is-open="sidebarOpen" @close="setSidebarOpen(false)" />
  </header>
</template>

<style scoped>
.app-header {
  background-color: #3c5a78;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: #f5ffed;
  padding: 10px 20px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-section {
  display: flex;
  align-items: center;
}

.icon-button {
  background-color: #3c5a78;
  border: none;
  transform: none;
}

.logo {
  width: 2.5em;
}

.user-button {
  font-size: 1.5rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.title-main {
  color: white;
}

.title-tag {
  background-color: #b3dec1;
  color: #1a3c5a;
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: 600;
}
</style> -->

<!-- <style scoped>
.header {
  background-color: var(--medium-blue, #1a365d);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-button {
  color: var(--primary-green, #48bb78);
  transition: color 0.3s;
}

.menu-button:hover {
  color: white;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
}

.logo-highlight {
  background-color: var(--primary-green, #48bb78);
  color: var(--medium-blue, #1a365d);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.profile-link {
  color: var(--primary-green, #48bb78);
  transition: color 0.3s;
}

.profile-link:hover {
  color: white;
}
</style> -->
