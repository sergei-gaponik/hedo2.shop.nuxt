<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
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
      breadCrumbs: []
    }

  },
  async fetch(){
    
    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)

    const { data } = await instanceHandler({
      path: "getBrand",
      args: { handle: this.$route.params.brandHandle },
      cache: true
    })

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
    
    const brandInfo = data?.brand

    if(brandInfo){
      
      this.breadCrumbs = [
        {
          caption: this.$t("allProducts"),
          href: this.localePath("/c/all")
        },
        {
          caption: this.$t("brands"),
          href: this.localePath("/b")
        },
        {
          caption: brandInfo.name
        }
      ]
    }

  }
}
</script>