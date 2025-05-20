<template>
  <div class="edit-book">
    <h1>Edit Book</h1>
    <div v-if="loading" class="loading">Loading book details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <form v-else @submit.prevent="updateBook" class="edit-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="bookData.title" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="bookData.description"
          required
          class="form-control"
          rows="4"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="cover_image">Cover Image URL</label>
        <input
          type="url"
          id="cover_image"
          v-model="bookData.cover_image"
          required
          class="form-control"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="save-button" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
        <router-link :to="'/my-books'" class="cancel-button">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'EditBookView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const bookData = ref({
      title: '',
      description: '',
      cover_image: '',
    })
    const loading = ref(true)
    const saving = ref(false)
    const error = ref(null)

    const fetchBookDetails = async () => {
      try {
        loading.value = true
        const token = localStorage.getItem('token')
        const bookId = route.params.id

        if (!token) {
          throw new Error('User not authenticated')
        }

        const response = await fetch(`/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch book details')
        }

        const data = await response.json()
        bookData.value = data
      } catch (err) {
        error.value = err.message || 'Failed to load book details'
        if (err.message === 'User not authenticated') {
          router.push('/login')
        }
      } finally {
        loading.value = false
      }
    }

    const updateBook = async () => {
      try {
        saving.value = true
        const token = localStorage.getItem('token')
        const bookId = route.params.id

        if (!token) {
          throw new Error('User not authenticated')
        }

        const response = await fetch(`/api/books/${bookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookData.value),
        })

        if (!response.ok) {
          throw new Error('Failed to update book')
        }

        router.push('/my-books')
      } catch (err) {
        error.value = err.message || 'Failed to update book'
        if (err.message === 'User not authenticated') {
          router.push('/login')
        }
      } finally {
        saving.value = false
      }
    }

    onMounted(() => {
      fetchBookDetails()
    })

    return {
      bookData,
      loading,
      saving,
      error,
      updateBook,
    }
  },
}
</script>

<style scoped>
.edit-book {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}

.edit-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button,
.cancel-button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s;
}

.save-button {
  background-color: #28a745;
  color: white;
  border: none;
}

.save-button:hover {
  background-color: #218838;
}

.save-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>
