<template>
  <div
    class="a-img-container"
    @mouseover="mouseOver()"
    @mouseleave="mouseLeave()"
  >
    <lazy-image
      v-if="!defaultVisible"
      class="a-img"
      :src="activeImageSrc"
      s3
      @error="showDefault"
    />
    <image-icon
      v-if="defaultVisible"
      class="a-default"
      height="24"
      color="var(--c-gray-4)"
    />
  </div>
</template>

<script>
import ImageIcon from "~/components/icons/basic/ImageIcon.vue";
import LazyImage from "~/components/util/LazyImage.vue";

export default {
  components: { LazyImage, ImageIcon },
  props: ["src", "altSrc"],
  watch: {
    src() {
      this.activeImageSrc = this.src || this.altSrc;
    },
    altSrc() {
      this.activeImageSrc = this.src || this.altSrc;
    },
  },
  data() {
    return {
      defaultVisible: !this.src && !this.altSrc,
      activeImageSrc: this.src || this.altSrc,
    };
  },
  methods: {
    showDefault() {
      this.defaultVisible = true;
    },
    mouseOver() {
      if (this.altSrc && this.$device.isDesktop)
        this.activeImageSrc = this.altSrc;
    },
    mouseLeave() {
      if (this.src && this.$device.isDesktop) this.activeImageSrc = this.src;
    },
  },
};
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
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  object-position: center;
}

.a-default {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 33%;
  height: 33%;
  transform: translate(-50%, -50%);
}
</style>
