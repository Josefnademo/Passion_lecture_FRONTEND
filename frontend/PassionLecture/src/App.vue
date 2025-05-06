<template>
  <div id="app">
    <Header></Header>
    <main class="main-content">
      <RouterView />
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Error message styling */
.erreur {
  color: #e53935;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
}
/* Button hover effect */
button:hover {
  background-color: #673ab7;
  transform: translateY(-3px);
}

/* Button active/click effect */
button:active {
  background-color: #5e35b1;
  transform: translateY(1px);
}
</style>
