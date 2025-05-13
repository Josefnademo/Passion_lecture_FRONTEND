<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ active: star <= (readOnly ? initialRating : rating) }"
      @click="!readOnly && setRating(star)"
      @mouseover="!readOnly && setHoverRating(star)"
      @mouseleave="!readOnly && resetHoverRating()"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    initialRating: {
      type: Number,
      default: 0,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rating: this.initialRating,
      hoverRating: 0,
    }
  },
  methods: {
    setRating(value) {
      this.rating = value
      this.$emit('update:rating', value)
    },
    setHoverRating(value) {
      this.hoverRating = value
    },
    resetHoverRating() {
      this.hoverRating = 0
    },
  },
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 0.25rem;
}

.star {
  font-size: 1.5rem;
  cursor: pointer;
  color: #ddd;
  transition: color 0.2s;
}

.star.active,
.star:hover {
  color: #ffd700;
}

.star-rating[readonly] .star {
  cursor: default;
}
</style>
