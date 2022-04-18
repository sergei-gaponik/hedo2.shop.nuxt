<template>
  <nuxt-link :to="localePath('/b/'+brand.handle)" @click.native="$emit('click')">
    <div :class="noBorder ? 'a-brand a-noborder' : 'a-brand'">
      <div class="a-img-container">
        <lazy-image v-if="brand.logo" :src="brand.logo.src" s3 class="a-img" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import LazyImage from '~/components/util/LazyImage.vue'

export default {
  components: { LazyImage },
  props: {
    brand: Object,
    noBorder: Boolean
  },
}
</script>

<style scoped>
.a-brand{
  border: 1px solid var(--c-gray-3);
  padding: var(--padding);
}

.a-noborder{
  border: none;
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