<template>
  <div class="star-rating" :class="{ readonly: readOnly }">
    <div v-for="star in 5" :key="star" class="star-container">
      <div class="star-wrapper">
        <span class="star star-outline">★</span>
        <span class="star star-fill" :style="getStarStyle(star)">★</span>
      </div>
      <div
        class="star-half"
        @mousemove="!readOnly && handleHalfStar(star)"
        @click="!readOnly && handleHalfStar(star)"
        @mouseleave="!readOnly && resetHoverRating()"
      ></div>
      <div
        class="star-full"
        @mousemove="!readOnly && handleFullStar(star)"
        @click="!readOnly && handleFullStar(star)"
        @mouseleave="!readOnly && resetHoverRating()"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
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
      localRating: this.modelValue || this.initialRating,
      hoverRating: 0,
    }
  },
  methods: {
    getStarStyle(star) {
      const currentRating = this.readOnly
        ? this.initialRating
        : this.hoverRating || this.localRating
      const percentage = Math.min(100, Math.max(0, (currentRating - (star - 1)) * 100))
      return {
        clipPath: `inset(0 ${100 - percentage}% 0 0)`,
      }
    },
    handleHalfStar(star) {
      if (this.readOnly) return
      this.hoverRating = star - 0.5
      this.setRating(star - 0.5)
    },
    handleFullStar(star) {
      if (this.readOnly) return
      this.hoverRating = star
      this.setRating(star)
    },
    setRating(value) {
      this.localRating = value
      this.$emit('update:modelValue', value)
    },
    resetHoverRating() {
      this.hoverRating = 0
    },
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.localRating = newValue
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 0.25rem;
}

.star-container {
  position: relative;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.star-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  line-height: 1;
}

.star-outline {
  color: #ddd;
  z-index: 1;
}

.star-fill {
  color: #ffd700;
  z-index: 2;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.2s ease-in-out;
}

.star-half,
.star-full {
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 3;
}

.star-half {
  left: 0;
  width: 50%;
}

.star-full {
  left: 50%;
  width: 50%;
}

.star-rating.readonly .star-container {
  cursor: default;
  pointer-events: none;
}

.star-container:hover .star-fill {
  color: #ffc107;
}
</style>
