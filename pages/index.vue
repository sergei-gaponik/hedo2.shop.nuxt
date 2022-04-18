<template>
<div>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <popular-brands />
  </div>
  <slogan hideLogo/>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <popular-products />
  </div>
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

export default {
  components: { PopularProducts, Slogan, FrontPageSection, PopularBrands },
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
