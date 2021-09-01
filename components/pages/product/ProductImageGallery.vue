<template>
<div class="a-container">
  <div class="a-slider">
    <div v-for="image of images" :key="image.src" class="a-slide">
      <product-image :src="image.src"/>
    </div>
  </div>
</div>
</template>

<script>
import ProductImage from './ProductImage.vue'

export default {
  components: { ProductImage },
  props: ["images"]
}
</script>

<style scoped>

.a-slider{
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  display: flex;
  scroll-snap-type: x mandatory;  
  scroll-behavior: smooth;
}
.a-slide{
  position: relative;
  width:100%;
  height: 100%;
  flex-shrink: 0;
  scroll-snap-align: start;
}
</style>