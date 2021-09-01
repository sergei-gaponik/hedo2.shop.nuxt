<template>
  <div class="a-img-container">
    <img v-if="src" :data-src="src" class="a-img" v-lazy-load />
  </div>
</template>

<script>
export default {
  props: ["src"]
}
</script>

<style scoped>
.a-img-container {
  position: relative;
  width: 100%;

}
.a-img-container:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.a-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>