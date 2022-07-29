<template>
  <img v-if="isMounted" :data-src="computedSrc" class="a-img" v-lazy-load />
</template>

<script>
import { s3AssetUrl } from "~/util/s3";

export default {
  computed: {
    computedSrc() {
      if (this.s3) return s3AssetUrl(this.src);
      else this.src;
    },
  },
  props: {
    src: String,
    s3: Boolean,
  },
  data() {
    return {
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style scoped>
.a-img:not(.isLoaded) {
  opacity: 0;
}

.a-img.isLoaded {
  opacity: 1;
}

.a-img {
  transition: var(--fast-transition);
}
</style>
