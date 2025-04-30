<script setup>
import { ref, onMounted } from 'vue'
</script>

<script>
const dropMenu = '../../public/images/Group 36.png'
</script>

<template>
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
</style>
