<template>
  <div
    v-if="articleSearchResults && articleSearchResults.length"
    class="a-similar"
  >
    <div
      v-for="(articleSearchResult, i) in articleSearchResults"
      :key="articleSearchResult._id"
    >
      <article-preview :articleSearchResult="articleSearchResult" />
      <div v-if="i < articleSearchResults.length - 1" class="a-divider"></div>
    </div>
  </div>
  <div v-else>
    {{ $t("noResults") }}
  </div>
</template>

<script>
import ArticlePreview from "./ArticlePreview.vue";

export default {
  components: { ArticlePreview },
  props: ["articleSearchResults"],
};
</script>

<style scoped>
.a-similar {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.a-divider {
  margin-top: var(--gap);
  border-bottom: 2px dotted var(--c-gray-3);
}
</style>
