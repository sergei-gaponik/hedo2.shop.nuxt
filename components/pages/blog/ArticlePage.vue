<template>
  <div>
    <div :class="$device.isMobile ? 'container-m' : 'container'">
      {{ article.name }}
    </div>
    <div class="a-img-wrapper">
      <div class="a-img-container">
        <img v-if="image" :data-src="image" class="a-img" v-lazy-load />
      </div>
    </div>
    <div>
      <div class="a-body" v-html="article.body">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "article" ],
  computed: {
    image(){
      return this.article.image ? process.env.STORAGE_URL + this.article.image.src : null
    }
  }

}
</script>

<style scoped>
.a-img-wrapper{
  position: relative;
  height: 40vw;
}
.a-img-container {
  position: absolute;
  width: 100vw;
  left: 0;
}
.a-img-margin{
  position: relatiev;
  margin-bottom: 40vw;
}
.a-img-container:after {
  content: "";
  display: block;
  padding-bottom: 40%;
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