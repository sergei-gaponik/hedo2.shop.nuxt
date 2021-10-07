<template>
  <nuxt-link :to="localePath('/b/'+brand.handle)">
    <div class="a-brand">
      <div class="a-img-container">
        <img v-if="src" :data-src="src" class="a-img" v-lazy-load />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: [ "brand"],
  computed: {
    src(){
      return process.env.STORAGE_URL + "/" + this.brand.logo.src
    }
  }
}
</script>

<style scoped>
.a-brand{
  border: 1px solid var(--c-gray-3);
  padding: var(--padding);
}

.a-img-container {
  position: relative;
  width: 100%;

}
.a-img-container:after {
  content: "";
  display: block;
  padding-bottom: 50%;
}

.a-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>