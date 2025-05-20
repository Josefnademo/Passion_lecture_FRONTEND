<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="!book" class="error">Book not found</div>
    <div v-else class="book-container">
      <h1 class="book-title">{{ book.titre }}</h1>

      <div class="book-content">
        <div class="book-image-container">
          <div class="book-image">
            <img
              :src="book.lien_image || '/placeholder.svg?height=400&width=400'"
              :alt="book.titre"
            />
          </div>
          <a :href="book.lien_pdf" class="pdf-link" v-if="book.lien_pdf">PDF Link</a>
        </div>

        <div class="book-details">
          <div class="author-info">
            <h2 class="author-title">
              Author: {{ author ? `${author.prenom} ${author.nom_de_famille}` : 'Unknown' }}
            </h2>
            <p class="editor" v-if="book.editeur">Editor: {{ book.editeur }}</p>
            <p class="details">
              <span v-if="book.annee_edition">Year: {{ book.annee_edition }}<br /></span>
              <span v-if="book.nombre_de_page">Pages: {{ book.nombre_de_page }}<br /></span>
              <span v-if="category">Category: {{ category.nom }}<br /></span>
              <span v-if="book.created"
                >Added: {{ new Date(book.created).toLocaleDateString() }}<br
              /></span>
              <span v-if="book.updated"
                >Last Updated: {{ new Date(book.updated).toLocaleDateString() }}</span
              >
            </p>
          </div>

          <div class="resume-section" v-if="book.resume">
            <h3 class="section-title">Resume</h3>
            <p class="resume-text">{{ book.resume }}</p>
          </div>

          <div class="comments-section">
            <h3 class="section-title">Evaluations</h3>

            <div v-if="loadingEvaluations" class="loading">Loading evaluations...</div>
            <div v-else>
              <div v-if="evaluations && evaluations.length > 0" class="comments-list">
                <div v-for="evaluation in evaluations" :key="evaluation.id" class="comment-card">
                  <div class="comment-header">
                    <p class="commenter-name">User #{{ evaluation.user_id }}</p>
                    <star-rating :initial-rating="evaluation.note" :read-only="true" />
                  </div>
                  <p class="comment-text">{{ evaluation.commentaire }}</p>
                  <p class="comment-date">
                    {{ new Date(evaluation.created).toLocaleDateString() }}
                  </p>
                </div>
              </div>
              <div v-else class="no-evaluations">
                No evaluations yet. Be the first to review this book!
              </div>

              <div v-if="isLoggedIn" class="new-comment-card">
                <h4 class="new-comment-title">Add Your Evaluation</h4>
                <form @submit.prevent="handleCommentSubmit">
                  <div class="rating-container">
                    <star-rating v-model:rating="rating" />
                  </div>
                  <textarea
                    v-model="commentText"
                    class="comment-textarea"
                    rows="4"
                    placeholder="Write your evaluation here..."
                  ></textarea>
                  <div class="form-actions">
                    <button type="button" class="cancel-button" @click="resetForm">Cancel</button>
                    <button type="submit" class="submit-button">Submit Evaluation</button>
                  </div>
                </form>
              </div>
              <div v-else class="login-prompt">
                <p>
                  Please <router-link to="/login" class="login-link">login</router-link> to add your
                  evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from './star-rating.vue'
import api from '../services/api'

export default {
  name: 'BookPage',
  components: {
    StarRating,
  },
  data() {
    return {
      commentText: '',
      rating: 0,
      book: null,
      loading: true,
      evaluations: [],
      loadingEvaluations: true,
      author: null,
      category: null,
      isLoggedIn: false,
    }
  },
  created() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'))
    this.isLoggedIn = !!user
    this.loadBookDetails()
  },
  methods: {
    async loadBookDetails() {
      const bookId = this.$route.params.id
      try {
        // Fetch book details
        const bookResponse = await fetch(`http://localhost:9999/api/books/${bookId}`)
        const bookResult = await bookResponse.json()
        console.log('Book details:', bookResult.data)
        this.book = bookResult.data

        // Fetch author details if writer_id exists
        if (this.book.writer_id) {
          const authorResponse = await fetch(
            `http://localhost:9999/api/authors/${this.book.writer_id}`,
          )
          const authorResult = await authorResponse.json()
          console.log('Author details:', authorResult.data)
          this.author = authorResult.data
        }

        // Fetch category details if category_id exists
        if (this.book.category_id) {
          const categoryResponse = await fetch(
            `http://localhost:9999/api/categories/${this.book.category_id}`,
          )
          const categoryResult = await categoryResponse.json()
          console.log('Category details:', categoryResult)
          this.category = categoryResult
        }

        // Fetch evaluations
        const evaluationsResponse = await fetch(
          `http://localhost:9999/api/books/${bookId}/evaluations`,
        )
        const evaluationsResult = await evaluationsResponse.json()
        console.log('Evaluations:', evaluationsResult.data)
        this.evaluations = evaluationsResult.data
      } catch (error) {
        console.error('Error loading details:', error)
      } finally {
        this.loading = false
        this.loadingEvaluations = false
      }
    },
    setRating(value) {
      this.rating = value
    },
    resetForm() {
      this.commentText = ''
      this.rating = 0
    },
    async handleCommentSubmit() {
      if (!this.commentText || !this.rating) {
        alert('Please provide both a rating and a comment')
        return
      }

      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        alert('Please login to submit an evaluation')
        return
      }

      try {
        const response = await fetch(
          `http://localhost:9999/api/books/${this.book.livre_id}/evaluations`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              note: this.rating,
              commentaire: this.commentText,
              user_id: user.userId,
              book_id: this.book.livre_id,
            }),
          },
        )

        if (response.ok) {
          // Refresh evaluations
          const evaluationsResponse = await fetch(
            `http://localhost:9999/api/books/${this.book.livre_id}/evaluations`,
          )
          const evaluationsResult = await evaluationsResponse.json()
          this.evaluations = evaluationsResult.data
          this.resetForm()
        } else {
          const errorData = await response.json()
          alert(errorData.message || 'Failed to submit evaluation')
        }
      } catch (error) {
        console.error('Error submitting evaluation:', error)
        alert('Error submitting evaluation')
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.book-container {
  max-width: 900px;
  margin: 0 auto;
}

.book-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #3b6992;
  margin: 1rem 0 1.5rem 0;
}

.book-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.book-image-container {
  width: 100%;
}

.book-image {
  position: relative;
  aspect-ratio: 1/1;
  margin-bottom: 1rem;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pdf-link {
  display: block;
  text-align: center;
  background-color: #7abc94; /* primary-green from original */
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.pdf-link:hover {
  background-color: #9ed3ac;
}

.author-info {
  margin-bottom: 1rem;
}

.author-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b6992; /* medium-blue */
}

.editor {
  color: #7a8ea3; /* light-blue-gray */
}

.resume-section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #3b6992; /* medium-blue */
  margin-bottom: 0.5rem;
}

.resume-text {
  color: #7a8ea3; /* light-blue-gray */
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.comment-card,
.new-comment-card {
  background-color: #f6f8fa; /* card-bg from original */
  padding: 1rem;
  border-radius: 0.5rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.commenter-name {
  font-weight: 600;
}

.comment-text {
  color: #7a8ea3; /* light-blue-gray */
}

.new-comment-title {
  color: #3b6992; /* medium-blue */
  font-weight: 600;
  margin-bottom: 1rem;
}

.rating-container {
  margin-bottom: 1rem;
}

.comment-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #7abc94; /* primary-green */
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.cancel-button {
  background-color: #f26565; /* delete-btn from original */
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #f37777;
}

.submit-button {
  background-color: #7abc94; /* primary-green */
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #9ed3ac;
}

/* Responsive styles */
@media (min-width: 768px) {
  .book-content {
    flex-direction: row;
  }

  .book-image-container {
    width: 33.333%;
  }

  .book-details {
    width: 66.666%;
  }
}

.details {
  color: #7a8ea3;
  margin-top: 0.5rem;
  line-height: 1.5;
}

.comment-date {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.5rem;
  text-align: right;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #7a8ea3;
  font-style: italic;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #f26565;
  font-weight: bold;
}

.no-evaluations {
  text-align: center;
  padding: 2rem;
  color: #7a8ea3;
  font-style: italic;
  background-color: #f6f8fa;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.login-prompt {
  text-align: center;
  padding: 1rem;
  background-color: #f6f8fa;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.login-link {
  color: #3b6992;
  text-decoration: underline;
  font-weight: 600;
}

.login-link:hover {
  color: #7abc94;
}
</style>
