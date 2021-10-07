<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <bread-crumbs 
      :breadCrumbs="breadCrumbs"
    />
    <lazy-wrapper :loadingState="loadingState">
      <collection-page 
        :filters="filters"
      />
    </lazy-wrapper>
  </div>
</template>

<script>
import CollectionPage from '~/components/pages/collection/CollectionPage.vue'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import LazyWrapper from '~/components/util/LazyWrapper.vue'

export default {
  components: { CollectionPage, BreadCrumbs, LazyWrapper },
  data(){

    const breadCrumbs = [
      {
        caption: this.$t("allProducts"),
        href: this.localePath("/c/all")
      }
    ]

    return { 
      breadCrumbs,
      filters: [],
      loadingState: LoadingState.ready
    }
  },
  async fetch(){

    const collectionHandle = this.$route.params.collectionHandle

    if(collectionHandle == "all") return;

    this.loadingState = LoadingState.loading

    const { loadingState, data } = await instanceHandler({
      path: "getCategory",
      args: { handle: collectionHandle },
      cache: true
    })

    console.log(data, loadingState)

    this.loadingState = loadingState
    if(this.loadingState != LoadingState.ready) return;

    if(!data.category){
      this.loadingState = LoadingState.notFound
      return;
    }
    
    this.filters = data.category.filters || []

    this.breadCrumbs.push({
      caption: this.$t("collections"),
      href: this.localePath("/c")
    })

    let parent = data.category.parent

    while(parent){
      this.breadCrumbs.push({
        caption: parent.title || parent.name,
        href: this.localePath("/c/" + parent.handle)
      })

      parent = parent.parent
    }

    this.breadCrumbs.push({
      caption: data.category.title || data.category.name
    })
  }
}
</script>