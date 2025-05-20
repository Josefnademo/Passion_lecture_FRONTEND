<template>
  <div class="my-books">
    <h1>My Books</h1>
    <div v-if="loading" class="loading">Loading your books...</div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="books.length === 0" class="no-books">
      <p>You haven't created any books yet.</p>
      <router-link to="/create" class="create-button">Create Your First Book</router-link>
    </div>
    <div v-else class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <img :src="book.cover_image" :alt="book.title" class="book-cover" />
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p>{{ book.description }}</p>
          <router-link :to="'/details/' + book.id" class="view-details">View Details</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'MyBooksView',
  setup() {
    const books = ref([])
    const loading = ref(true)
    const error = ref(null)
    const router = useRouter()

    const fetchMyBooks = async () => {
      try {
        loading.value = true
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')

        if (!userId || !token) {
          throw new Error('User not authenticated')
        }

        const response = await fetch(`/api/users/${userId}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        const data = await response.json()
        books.value = data
      } catch (err) {
        error.value = err.message || 'Failed to load your books'
        if (err.message === 'User not authenticated') {
          // Redirect to login if not authenticated
          router.push('/login')
        }
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchMyBooks()
    })

    return {
      books,
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.my-books {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.loading,
.error,
.no-books {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.book-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.book-info {
  padding: 1rem;
}

.book-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.book-info p {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.view-details {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.view-details:hover {
  background-color: #0056b3;
}

.create-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #218838;
}
</style>
