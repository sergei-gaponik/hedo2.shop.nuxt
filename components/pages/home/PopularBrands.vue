<template>
  <div class="a-hlist-container" ref="slider">
    <div 
      v-if="multipleItems" 
      @click="clickHandler(prevItem)"
      :class="[ 'a-icon-button a-left', leftDisabled ? 'a-disabled' : '' ]"
    >
      <chevron-left-icon 
        height=36
        color="var(--c-gray-3)" 
      />
    </div>
    <div class="a-horizontal-list">
      <featured-brand 
        class="a-featured-brand"
        v-for="brand in brands" 
        :key="brand._id" 
        :brand="brand" 
        :style="{ minWidth: itemWidth, maxWidth: itemWidth, left: `${0 - pos}%` }"
      /> 
    </div>
    <div 
      v-if="multipleItems" 
      @click="clickHandler(nextItem)" 
      :class="[ 'a-icon-button a-right', rightDisabled ? 'a-disabled' : '' ]"
    >
      <chevron-right-icon 
        class="a-icon"
        height=36
        color="var(--c-gray-3)" 
      />
    </div>
  </div>
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import FeaturedBrand from '~/components/pages/brands/FeaturedBrand.vue'
import clickHandler from '~/util/clickHandler'
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'
import { createTouchSlider } from '~/util/touch'

export default {
  components: { FeaturedBrand, ChevronRightIcon, ChevronLeftIcon },
  computed: {
    multipleItems(){
      return this.brands?.length > this.cols
    },
    itemWidth() {
      return `${Math.round(100 / (this.cols || 2))}%`
    },
    maxPos(){
      if(!this.brands?.length)
        return 0;
      
      return (100 / this.cols) * (this.brands.length - this.cols)
    },
    leftDisabled(){
      return this.pos <= 0
    },
    rightDisabled(){
      return this.pos >= this.maxPos
    },
    cols(){
      if(this.$device.isMobile)
        return 2
      else if(this.$device.isTablet)
        return 5
      else
        return 5
    },
    limit(){
      if(this.$device.isMobile)
        return 6
      else if(this.$device.isTablet)
        return 8
      else
        return 12
    }
  },
  data(){
    return { 
      loadingState: LoadingState.ready,
      brands: [],
      pos: 0
    }
  },
  async fetch(){
    
    this.loadingState = LoadingState.loading

    const { data } = await instanceHandler({
      path: "getBrands",
      cache: true
    })

    this.brands = data?.brands.filter(a => a.featured).slice(0, this.limit)
    this.loadingState = LoadingState.ready
  },
  mounted(){
    createTouchSlider(this.$refs.slider, this.prevItem, this.nextItem)
  },
  methods: {
    clickHandler,
    prevItem(){
      this.pos = Math.max(this.pos - 100, 0)
    },
    nextItem(){
      this.pos = Math.min(this.pos + 100, this.maxPos)
    }
  }
}
</script>


<style scoped>
.a-hlist-container{
  position: relative;
  display: flex;
  align-items: center;
}
.a-horizontal-list{
  scroll-snap-type: x mandatory;  
  overflow: hidden;
  display: flex;
  position: relative;
  width: 100%;
}
.a-featured-brand {
  scroll-snap-align: start;
  padding: var(--padding-s);
  box-sizing: border-box;
  position: relative;
  transition: var(--slow-transition);
}
.a-icon-button{
  position: relative;
  transition: var(--transition);
  opacity: 1;
  cursor: pointer;
}
.a-right{
  right: 0;
}
.a-left{
  left: 0;
}
.a-disabled{
  opacity: 0.4;
  cursor: default;
}

</style>