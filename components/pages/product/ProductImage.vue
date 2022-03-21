<template>
  <div class="a-img-container">
    <lazy-image v-if="!defaultVisible" class="a-img" :src="src" s3 @error="showDefault" />
    <image-icon v-if="defaultVisible" class="a-default" height=24 color="var(--c-gray-4)"/>
  </div>
</template>

<script>
import ImageIcon from '~/components/icons/basic/ImageIcon.vue'
import LazyImage from '~/components/util/LazyImage.vue'

export default {
  components: { LazyImage, ImageIcon },
  props: ["src"],
  data(){
    return {
      defaultVisible: !this.src
    }
  },
  methods: {
    showDefault(){
      this.defaultVisible = true
    }
  }
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

.a-default{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 33%;
  height: 33%;
  transform: translate(-50%, -50%);
}
</style>