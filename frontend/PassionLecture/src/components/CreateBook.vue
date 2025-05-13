<template>
  <div class="add-book-container">
    <h1 class="title">Add a New Book</h1>
    <form @submit.prevent="submitBook" class="add-book-form">
      <label for="title">Book Title</label>
      <input v-model="title" type="text" id="title" placeholder="Enter book title" required />

      <label for="year">Year of Edition</label>
      <input
        v-model.number="year"
        type="number"
        id="year"
        placeholder="Enter year of edition"
        required
      />

      <label for="pages">Number of Pages</label>
      <input
        v-model.number="pages"
        type="number"
        id="pages"
        placeholder="Enter number of pages"
        required
      />

      <label for="category">Category ID</label>
      <input
        v-model.number="category"
        type="number"
        id="category"
        placeholder="Enter category ID"
        required
      />

      <label for="writer">Writer ID</label>
      <input
        v-model.number="writer"
        type="number"
        id="writer"
        placeholder="Enter writer ID"
        required
      />

      <button type="submit" class="submit-btn">Add Book</button>
    </form>

    <p v-if="message" :class="messageClass">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const year = ref(null)
const pages = ref(null)
const category = ref(null)
const writer = ref(null)
const message = ref('')
const messageClass = ref('')

const submitBook = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titre: title.value,
        annee_edition: year.value,
        nombre_de_page: pages.value,
        category_id: category.value,
        writer_id: writer.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      message.value = `Book "${title.value}" added successfully!`
      messageClass.value = 'success'
      title.value = ''
      year.value = null
      pages.value = null
      category.value = null
      writer.value = null
    } else {
      message.value = data.message || 'Failed to add the book.'
      messageClass.value = 'error'
    }
  } catch (error) {
    message.value = 'Error occurred while adding the book.'
    messageClass.value = 'error'
    console.error('Error:', error)
  }
}
</script>

<style scoped>
.add-book-container {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.add-book-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.submit-btn {
  margin-top: 10px;
}

.success {
  color: green;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>
