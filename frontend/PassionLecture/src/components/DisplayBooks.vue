<template>
  <div
    v-for="book in showAll ? books : books.slice(0, 5)"
    :key="book.livre_id"
    class="book-card"
    @click="router.push(`/details/${book.livre_id}`)"
    style="cursor: pointer"
  >
    <img
      v-if="book.lien_image"
      :src="
        book.lien_image.startsWith('http')
          ? book.lien_image
          : `http://localhost:9999${book.lien_image}`
      "
      :alt="book.titre"
      class="book-cover"
    />
    <div class="book-info">
      <h4 class="book-title">{{ book.titre }}</h4>
      <p class="book-author" v-if="book.writer">{{ book.writer.nom }} {{ book.writer.prenom }}</p>
      <p class="book-category" v-if="book.category">
        {{ book.category.nom }}
      </p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DisplayBooks',
  props: {
    books: {
      type: Array,
      required: true,
    },
    router: {
      required: true,
    },
  },
})
</script>
<style scoped>
.books-grid {
  display: grid;
  grid-template-columns: repeat(5, 15.625em);
  justify-content: center;
  gap: 1.875em;
}

.book-card {
  background-color: #f8f9fa;
  border-radius: 0.5em;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-0.9375em);
  box-shadow: 0 0.625em 1.25em rgba(0, 0, 0, 0.12);
}

.book-title {
  font-size: 1.7em;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3125em;
}

.book-cover {
  width: 100%;
  height: 23.75em;
  object-fit: cover;
  border-radius: 0.25em;
  margin-bottom: 0.625em;
}

.book-info {
  padding: 0.9375em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}
</style>
