<template>
  <div>
    <lazy-wrapper>
      <article-page 
        :article="article"
      />
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
      article: null
    }
  },
  async fetch(){
    this.$store.commit("loadingState/setLoadingState", LoadingState.loading)

    const { loadingState, data } = await instanceHandler({
      path: "getArticle",
      args: {
        handle: this.$route.params.articleHandle
      },
      cache: true
    })

    if(!data?.article){
      this.$store.commit("loadingState/setLoadingState", LoadingState.notFound)
      return;
    }

    this.article = data.article

    this.$store.commit("loadingState/setLoadingState", LoadingState.ready)

  }

}
</script>

<style scoped>

</style>