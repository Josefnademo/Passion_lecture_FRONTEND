<template>
  <div class="container">
    <h1 class="profile-title">Your Profile</h1>

    <div class="profile-card">
      <div class="avatar-container">
        <div class="avatar">
          <span class="avatar-text">A</span>
        </div>
      </div>

      <div class="profile-info">
        <div class="info-item">
          <h2 class="info-label">Name</h2>
          <p class="info-value">{{ name }}</p>
        </div>

        <div class="info-item">
          <h2 class="info-label">Books Added</h2>
          <p class="info-value">{{ booksAdded }}</p>
        </div>

        <div class="info-item">
          <h2 class="info-label">Comments</h2>
          <p class="info-value">{{ commentsCount }}</p>
        </div>

        <div class="info-item">
          <h2 class="info-label">Member Since</h2>
          <p class="info-value">{{ memberSince }}</p>
        </div>
      </div>

      <div class="button-container">
        <button class="edit-button" @click="editProfile">Edit Profile</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive data
const name = ref('Albert')
const booksAdded = ref(12)
const commentsCount = ref(24)
const memberSince = ref('January 2023')

// Methods
const editProfile = () => {
  console.log('Edit profile clicked')
  // Logic to edit the profile can be added here
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin-top: 80px; /* Added to account for the fixed header */
}

.profile-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--medium-blue, #4a6fa5);
  text-align: center;
  margin-bottom: 3rem;
}

.profile-card {
  max-width: 28rem;
  margin: 0 auto;
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 6rem;
  height: 6rem;
  background-color: var(--medium-blue, #8da4be);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: white;
  font-size: 1.875rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  margin-bottom: 0.5rem;
}

.info-label {
  color: var(--medium-blue, #4a6fa5);
  font-weight: 600;
}

.info-value {
  color: #8da4be;
}

.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.edit-button {
  background-color: var(--medium-blue, #4a6fa5);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #6789b5;
}
</style>
