<template>
  <div class="container-m">
    <bread-crumbs 
      :breadCrumbs="breadCrumbs"
    />
    <collection-page 
      :brand="$route.params.brandHandle"
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
      path: "getBrand",
      args: { handle: this.$route.params.brandHandle }
    })

    this.loadingState = loadingState
    
    const brandInfo = data?.brand

    if(brandInfo){
      
      this.breadCrumbs = [
        {
          caption: this.$t("allProducts"),
          href: this.localePath("/c/all")
        },
        {
          caption: brandInfo.name
        }
      ]
    }

  }
}
</script>