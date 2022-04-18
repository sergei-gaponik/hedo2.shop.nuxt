<template>
  <div :class="containerClass">
    <div :class="$device.isMobile ? 'mb4' : 'td-split-sticky'">
      <article-header :article="article"/>
      <article-content :article="article" />
    </div>
    <div :class="$device.isMobile ? '' : 'td-split-sticky'">
      <article-sidebar :similarArticles="similarArticles"/>
    </div>
  </div>
</template>

<script>
import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'
import ArticleHeader from './ArticleHeader.vue'
import ArticleSidebar from './ArticleSidebar.vue'
import ArticleContent from './ArticleContent.vue'

export default {
  components: { ArticleHeader, ArticleSidebar, ArticleContent },
  props: [ "article" ],
  computed: {
    containerClass(){
      if(this.$device.isMobile)
        return 'a-container-m'
      else if(this.$device.isTablet)
        return 'a-container-t'
      else
        return 'a-container-d'
    }
  },  
  async fetch(){

    this.loadingState = LoadingState.loading

    const { loadingState, data } = await searchHandler({
      path: "getInterestingArticles",
      args: {
        _id: this.article._id,
        exclude: [ ...new Set(this.$store.state.blog.visitedArticles) ],
        limit: 3
      },
      cache: true
    })

    this.$store.commit("blog/addVisitedArticle", this.article._id)

    this.loadingState = loadingState
    this.similarArticles = data?.articles || []
  },
  data(){
    return {
      loadingState: LoadingState.ready,
      similarArticles: []
    }
  }
}
</script>


<style scoped>

.a-container-t{
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: calc(var(--padding-x-td));
}

.a-container-d{
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: calc(var(--padding-x-td));
}

</style>