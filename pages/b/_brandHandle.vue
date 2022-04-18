<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <div :class="$device.isDesktop ? 'td-split-1-3' : ''">
      <div v-if="$device.isDesktop">
        <filter-page-d 
          class="td-split-sticky"
          v-if="$device.isDesktop" 
        />
      </div>
      <div>
        <bread-crumbs :breadCrumbs="breadCrumbs" />
        <lazy-wrapper :loadingState="loadingState">
          <collection-page 
            :brand="$route.params.brandHandle"
          />
        </lazy-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionPage from '~/components/pages/collection/CollectionPage.vue'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import FilterPageD from '~/components/pages/collection/filters/FilterPageD.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'


export default {
  components: { CollectionPage, BreadCrumbs, FilterPageD, LazyWrapper },
  data(){
    return { 
      breadCrumbs: [],
      loadingState: LoadingState.ready
    }

  },
  async fetch(){
    
    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)

    this.loadingState = LoadingState.loading

    const { data, loadingState } = await instanceHandler({
      path: "getBrand",
      args: { handle: this.$route.params.brandHandle },
      cache: true
    })

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
    this.loadingState = loadingState
    
    const brandInfo = data?.brand

    if(brandInfo){
      
      this.breadCrumbs = [
        {
          caption: this.$t("home"),
          href: this.localePath("/")
        },
        {
          caption: brandInfo.name
        }
      ]
    }

  }
}
</script>