<template>
  <div>
    <h1 class="a-heading">Beauty Magazine</h1>
    <div class="a-tags mb2" v-if="article.tags">
      <tag v-for="tag in article.tags" :key="tag" :caption="tag" />
      <!-- clickable
        @click="$router.push(localePath('/mag?t=' + encodeURI(tag)))" -->
    </div>
    <div class="a-img-container" v-if="article.image">
      <lazy-image class="a-img" :src="article.image.src" s3 />
    </div>
  </div>
</template>

<script>
import LazyImage from "~/components/util/LazyImage.vue";
import Tag from "~/components/layout/misc/Tag.vue";

export default {
  components: { LazyImage, Tag },
  props: ["article"],
};
</script>

<style scoped>
.a-tags {
  display: flex;
  gap: var(--gap-s);
}

.a-heading {
  font-family: var(--magazine-font);
  font-size: 48px;
  color: var(--c-gray-1);
}

.a-img-container {
  position: relative;
  width: 100%;
}

.a-img-container:after {
  content: "";
  display: block;
  padding-bottom: 66%;
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
