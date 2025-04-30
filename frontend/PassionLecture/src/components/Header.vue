<template>
  <header class="app-header">
    <div class="left-section">
      <button class="icon-button">☰</button>
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

<script>
export default {
  name: 'AppHeader',
}
</script>

<style scoped>
.app-header {
  background-color: #3c5a78;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: white;
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
  background-color: #b1d9bc;
  border: none;
  border-radius: 50%;
  padding: 8px 12px;
  font-size: 1.2rem;
  cursor: pointer;
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
  background-color: #b1d9bc;
  color: #1a3c5a;
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: 600;
}
</style>
