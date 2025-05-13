<template>
  <div class="form-container">
    <h2>Add your book here</h2>
    <form @submit.prevent="submitBook">
      <strong>Title</strong>
      <input v-model="title" type="text" placeholder="Book's title" required />

      <strong>Year of editing</strong>
      <input v-model.number="year" type="number" placeholder="Book's year of editing" required />

      <strong>Number of pages</strong>
      <input v-model.number="pages" type="number" placeholder="Book's number of pages" required />

      <strong>Category</strong>
      <input v-model.number="category" type="number" placeholder="Book's category" required />

      <strong>Writer</strong>
      <input v-model.number="writer" type="number" placeholder="Book's writer" required />

      <button type="submit">Add</button>
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
  max-width: 80em;
  width: 40em;
  margin: 100px auto;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #415a77;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px 15px;
  border: 1px solid #b3dec1;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

button {
  background-color: #b3dec1;
  color: white;
  padding: 35px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #64dd8c;
}

p {
  text-align: center;
  margin-top: 15px;
  color: #415a77;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-container {
    padding: 20px;
    margin: 10px;
  }
}
</style>
