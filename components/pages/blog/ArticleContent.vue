<template>
  <div>
    <h1>{{ article.name }}</h1>
    <div class="a-meta subdued mb2">
      <span>{{ toDateString(article.published) }}</span>
      <span>&bull;</span>
      <span>{{ article.author }}</span>
    </div>
    <div v-html="article.body" class="article-content-body"></div>
  </div>
</template>

<script>
import { toDateString } from "~/util/misc";

export default {
  props: ["article"],
  methods: {
    toDateString,
  },
};
</script>

<style scoped>
.a-meta {
  display: flex;
  gap: var(--gap);
}
</style>

<style>
.article-content-body {
  position: relative;
  font-family: var(--alt-font);
}

.article-content-body img {
  width: 100%;
  margin: calc(var(--default-margin) * 2) 0;
}

.article-content-body,
.article-content-body * {
  font-size: 1.3rem;
  line-height: 2.3rem;
}

.article-content-body blockquote {
  margin: var(--padding) 0;
  padding: 0 var(--padding);
  border-left: 2px dotted var(--c-gray-3);
  font-style: italic;
}

.article-content-body ul {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.article-content-body strong,
.article-content-body b {
  color: black;
}

.article-content-body li {
  position: relative;
  left: var(--margin-2);
}

.article-content-body li::before {
  content: "•";
  position: absolute;
  left: calc(0px - var(--margin-2));
  top: 0;
  color: var(--c-gray-3);
  font-size: 1.8rem;
}
</style>
