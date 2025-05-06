<template>
  <div class="accueil-container">
    <!-- Title and description -->
    <section class="hero-section">
      <h1>Passion Lecture</h1>
      <h2 class="site-description">
        Passion Lecture is a site for book lovers who love reading and who know how to read books
        full of pages composed of sentences themselves composed of a string of diverse and varied
        words.
      </h2>
    </section>

    <!-- Books section -->
    <section class="books-section">
      <h3 class="section-title">Latest Books</h3>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="books-grid">
        <div v-for="book in books" :key="book.livre_id" class="book-card">
          <img v-if="book.lien_image" :src="book.lien_image" :alt="book.titre" class="book-cover" />
          <div class="book-info">
            <h4 class="book-title">{{ book.titre }}</h4>
            <p class="book-author" v-if="book.writer">
              {{ book.writer.nom }} {{ book.writer.prenom }}
            </p>
            <p class="book-category" v-if="book.category">
              {{ book.category.nom }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// We import the necessary functions
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Initialize the router
const router = useRouter()

// Define the loading state and books array waitung for data to be loaded
const loading = ref(true)
const books = ref([])

// Book data loading from API
onMounted(async () => {
  // Fetch books from API

  try {
    const response = await fetch('http://localhost:9999/api/books')
    const result = await response.json()
    // If the response has the structure { message: "...", data: [...] }
    books.value = result.data
  } catch (error) {
    console.error('Error loading books:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.accueil-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}
.book-cover {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.site-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

.quick-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.quick-link {
  padding: 10px 20px;
  background-color: #b6e1c6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.quick-link:hover {
  background-color: #9bc9b4;
}

.books-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.book-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 5px;
}

.book-author {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .quick-links {
    flex-direction: column;
    align-items: center;
  }

  .books-grid {
    grid-template-columns: 1fr;
  }

  .book-cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .loading {
    text-align: center;
    padding: 20px;
    font-style: italic;
    color: #666;
  }
}
</style>
