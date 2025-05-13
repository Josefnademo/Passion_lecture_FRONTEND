<template>
  <div class="form-container">
    <h2>Add New Book</h2>
    <form @submit.prevent="submitBook">
      <input v-model="title" type="text" placeholder="Book's title" required />
      <input v-model.number="year" type="number" placeholder="Book's year" required />
      <input v-model.number="pages" type="number" placeholder="Number of pages" required />
      <input v-model.number="category" type="number" placeholder="Category ID" required />
      <input v-model.number="writer" type="number" placeholder="Writer ID" required />
      <button type="submit">Submit</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive values for the input fields
const title = ref('')
const year = ref(null)
const pages = ref(null)
const category = ref(null)
const writer = ref(null)
const message = ref('')

// Decrypt the token and get the userId
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.userId //or payload.utilisateur_id - check what you named in payload
  } catch (e) {
    console.error('Error decoding token:', e)
    return null
  }
}

// This method is called when you submit the form
const submitBook = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    message.value = 'User is not authorized.'
    return
  }

  const userId = getUserIdFromToken()

  try {
    const res = await fetch('http://localhost:9999/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titre: title.value,
        annee_edition: year.value,
        nombre_de_page: pages.value,
        category_id: category.value,
        writer_id: writer.value,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      message.value = 'Book added successfully!'
      // Clear form
      title.value = ''
      year.value = null
      pages.value = null
      category.value = null
      writer.value = null
    } else {
      message.value = 'Error: ' + data.message
    }
  } catch (err) {
    console.error(err)
    message.value = 'Could not connect to server.'
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  padding: 8px 16px;
  background: #007bff;
  border: none;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>
