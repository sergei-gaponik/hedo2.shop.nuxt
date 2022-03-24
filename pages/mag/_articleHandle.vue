<template>
  <div class="container">
    <lazy-wrapper :loadingState="loadingState">
      <article-page :article="article" />
    </lazy-wrapper>
  </div>
</template>

<script>
import ArticlePage from '~/components/pages/blog/ArticlePage.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { LoadingState } from '~/types'
import instanceHandler from '~/core/instanceHandler'

export default {
  components: { ArticlePage, LazyWrapper },
  data(){
    return {
      article: null,
      loadingState: LoadingState.ready
    }
  },
  async fetch(){
    this.loadingState = LoadingState.loading

    const { data, loadingState } = await instanceHandler({
      path: "getArticle",
      args: {
        handle: this.$route.params.articleHandle
      },
      cache: true
    })

    if(!data?.article){
      this.loadingState = LoadingState.notFound
      return
    }


    this.loadingState = loadingState
    this.article = data.article
  }

}
</script>

<style scoped>

</style>