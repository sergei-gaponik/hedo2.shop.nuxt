<template>
<div>
  <banner class="a-banner-t" v-if="!$device.isDesktop" />
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <banner class="mb2" v-if="$device.isDesktop" />
    <popular-brands class="mb4" />
    <popular-products class="mb4" />
  </div>
  <!-- <div :class="$device.isMobile ? 'container-m' : 'container'">
  </div> -->
  <!-- <slogan hideLogo/> -->
  <front-page-section 
    v-for="frontPageSection in frontPageSections" 
    :key="frontPageSection._id"
    :frontPageSection="frontPageSection"
  />
</div>
</template>

<script>
import PopularProducts from '~/components/pages/home/PopularProducts.vue'
import Slogan from '~/components/pages/home/Slogan.vue'
import FrontPageSection from '~/components/pages/home/FrontPageSection.vue'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import PopularBrands from '~/components/pages/home/PopularBrands.vue'
import Banner from '~/components/pages/home/Banner.vue'

export default {
  components: { Banner, PopularProducts, Slogan, FrontPageSection, PopularBrands },
  data(){
    return {
      frontPageSections: []
    }
  },
  async fetch(){
    
    const r = await instanceHandler({
      path: "getFrontPageSections"
    })

    if(r.loadingState == LoadingState.ready)    
      this.frontPageSections = r.data.frontPageSections
  }
}
</script>

<style scoped>
.a-banner-t{
  position: relative;
}
</style>