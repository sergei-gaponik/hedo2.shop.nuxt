<template>
  <div class="container-m">
    <bread-crumbs 
      :breadCrumbs="breadCrumbs"
    />
    <collection-page 
      :series="$route.params.seriesHandle"
    />
  </div>
</template>

<script>
import CollectionPage from '~/components/pages/collection/CollectionPage.vue'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'

export default {
  components: { CollectionPage, BreadCrumbs },
  data(){

    return { 
      loadingState: LoadingState.ready,
      breadCrumbs: []
    }

  },
  async fetch(){
    
    this.loadingState = LoadingState.loading

    const { loadingState, data } = await instanceHandler({
      path: "getOneSeries",
      args: { handle: this.$route.params.seriesHandle }
    })

    this.loadingState = loadingState
    
    const seriesInfo = data?.series

    if(seriesInfo){
      
      this.breadCrumbs = [
        {
          caption: this.$t("allProducts"),
          href: this.localePath("/c/all")
        },
        {
          caption: seriesInfo.brand.name,
          href: this.localePath(`/b/${seriesInfo.brand.handle}`)
        },
        {
          caption: seriesInfo.name
        },
      ]
    }

  }
}
</script>