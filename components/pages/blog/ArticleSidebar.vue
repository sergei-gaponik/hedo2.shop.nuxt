<template>
  <div>
    <div class="mb4" v-if="similarArticles.length">
      <h4 class="mb2">{{ $t('youMightAlsoBeInterestedIn') }}</h4>
      <article-list :articleSearchResults="similarArticles" />
    </div>
    <social-container v-if="!$device.isMobile" />
  </div>
</template>


<script>
import ArticleList from './ArticleList.vue'
import SocialContainer from './SocialContainer.vue'

export default {
  components: { ArticleList, SocialContainer },
  props: [ "similarArticles" ],
}
</script>