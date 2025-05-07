<template>
  <div class="container">
    <div class="book-container">
      <h1 class="book-title">{{ book.title }}</h1>

      <div class="book-content">
        <div class="book-image-container">
          <div class="book-image">
            <img :src="'/placeholder.svg?height=400&width=400'" :alt="book.title" />
          </div>
          <a :href="book.pdfLink" class="pdf-link">PDF Link</a>
        </div>

        <div class="book-details">
          <div class="author-info">
            <h2 class="author-title">Author: {{ book.author }}</h2>
            <p class="editor">Editor: {{ book.editor }}</p>
          </div>

          <div class="resume-section">
            <h3 class="section-title">Resume</h3>
            <p class="resume-text">{{ book.resume }}</p>
          </div>

          <div class="comments-section">
            <h3 class="section-title">Comments</h3>

            <div class="comments-list">
              <div v-for="comment in book.comments" :key="comment.id" class="comment-card">
                <div class="comment-header">
                  <p class="commenter-name">{{ comment.user }}</p>
                  <star-rating :initial-rating="comment.rating" :read-only="true" />
                </div>
                <p class="comment-text">{{ comment.text }}</p>
              </div>
            </div>

            <div class="new-comment-card">
              <h4 class="new-comment-title">New comment</h4>
              <form @submit.prevent="handleCommentSubmit">
                <div class="rating-container">
                  <star-rating @change="setRating" />
                </div>
                <textarea
                  v-model="commentText"
                  class="comment-textarea"
                  rows="4"
                  placeholder="Write your comment here..."
                ></textarea>
                <div class="form-actions">
                  <button type="button" class="cancel-button" @click="resetForm">cancel</button>
                  <button type="submit" class="submit-button">send comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  components: {
    StarRating: () => import('@/components/star-rating'), // Import star rating component
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commentText: '',
      rating: 0,
      // Example pour testing TUTUTUTU MARX VERSHTAPPEN
      book: {
        title: 'The King',
        author: 'Hamilton Louis',
        editor: 'Socket Edissions',
        pdfLink: '#',
        resume:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat tortor eu ultrices. Etiam sed mi mauris. Vivamus hendrerit, lacus quis posuere congue, diam orci. Ut quis semper libero, ac consectetur ex. Sed ac diam neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam fringilla bibendum vitae mattis enim, laoreet.',
        comments: [
          { id: '1', user: 'User1', text: 'Great book!', rating: 5 },
          { id: '2', user: 'User2', text: 'I enjoyed reading this.', rating: 4 },
        ],
      },
    }
  },
  created() {
    // Here you would typically fetch the book data based on ID
    // For example: this.fetchBookData(this.id)
    this.book.id = this.id
  },
  methods: {
    setRating(value) {
      this.rating = value
    },
    resetForm() {
      this.commentText = ''
      this.rating = 0
    },
    handleCommentSubmit() {
      // Logic to submit comment would go here
      console.log({ commentText: this.commentText, rating: this.rating })
      this.resetForm()
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
  color: #3b6992; /* medium-blue from original */
  margin-bottom: 1.5rem;
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
</style>
