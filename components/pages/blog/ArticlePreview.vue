<template>
  <div class="a-preview" @click="goToArticle()">
    <div class="a-img-container" v-if="articleSearchResult.imageSrc">
      <lazy-image class="a-img" :src="articleSearchResult.imageSrc" s3 />
    </div>
    <div class="a-right">
      <div>{{ articleSearchResult.name }}</div>
      <div>
        <span class="subdued">{{
          toDateString(articleSearchResult.published)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from "~/components/util/LazyImage.vue";
import { toDateString } from "~/util/misc";

export default {
  components: { LazyImage },
  props: ["articleSearchResult"],
  methods: {
    toDateString,
    goToArticle() {
      this.$store.commit("search/reset");
      this.$router.push(
        this.localePath("/mag/" + this.articleSearchResult.handle)
      );
    },
  },
};
</script>

<style scoped>
.a-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.9rem;
}

.a-preview {
  display: grid;
  grid-template-columns: 65px auto;
  gap: var(--gap);
  cursor: pointer;
}

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
