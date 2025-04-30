<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const titleTabs = ['Create', 'Categories', 'My Books']
const images = [
  '../../public/images/Group 44.png',
  '../../public/images/Group 45.png',
  '../../public/images/Group 54.png',
]
const references = ["name: 'home'", "name: 'home'", "name: 'home'"]
</script>

<template>
  <ul>
    <li v-for="(image, index) in images">
      <RouterLink :to="references[index]"> <img :src="image" />{{ titleTabs[index] }} </RouterLink>
    </li>
  </ul>
</template>

<style scoped></style>
