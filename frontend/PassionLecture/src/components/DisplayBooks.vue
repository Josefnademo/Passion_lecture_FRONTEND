<template>
  <div
    v-for="book in books"
    :key="book.livre_id"
    class="book-card"
    @click="router.push(`/details/${book.livre_id}`)"
    style="cursor: pointer"
  >
    <img v-if="book.lien_image" :src="book.lien_image" :alt="book.titre" class="book-cover" />
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
  },
})
</script>
