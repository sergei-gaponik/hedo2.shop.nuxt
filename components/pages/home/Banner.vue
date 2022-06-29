<template>
  <div v-if="banners.length">
    <div class="a-banner">
      <div 
        v-if="multipleItems" 
        @click="clickHandler(prevItem)"
        class="a-icon-button a-left"
      >
        <chevron-left-icon 
          height=36
          color="white" 
        />
      </div>
      <nuxt-link :to="localePath(banner.href)">
        <div 
          :class="$device.isMobile ? 'a-img-container-m' : 'a-img-container'" 
          ref="slider"
        >
          <lazy-image 
            v-for="{ image, mobileImage, _id } in banners"
            :key="_id"
            :src="$device.isMobile ? mobileImage.src : image.src" 
            :style="{ opacity: banner._id == _id ? 1 : 0 }"
            s3 
            class="a-img" 
          />
        </div>
      </nuxt-link>
      <div 
        v-if="multipleItems" 
        @click="clickHandler(nextItem)" 
        class="a-icon-button a-right"
      >
        <chevron-right-icon 
          class="a-icon"
          height=36
          color="white" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import LazyImage from '~/components/util/LazyImage.vue'
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'
import clickHandler from '~/util/clickHandler'
import { createTouchSlider } from '~/util/touch'

export default {
  components: { LazyWrapper, LazyImage, ChevronLeftIcon, ChevronRightIcon},
  computed: {
    multipleItems(){
      return this.banners.length > 1
    },
    banner(){
      if(!this.banners.length)
        return null
      else
        return this.banners[this.position]
    }
  },
  data(){
    return {
      banners: [],
      position: 0,
    }
  },
  methods: {
    clickHandler,
    prevItem(){
      if(this.position <= 0)
        this.position = this.banners.length - 1
      else
        this.position--
      
    },
    nextItem(){
      if(this.position >= this.banners.length - 1)
        this.position = 0
      else
        this.position++
      
    }
  },
  async fetch(){

    const r = await instanceHandler({
      path: "getBanners",
      cache: true
    })

    this.banners = r.data?.banners?.sort((a,b) => b.priority - a.priority) || []

    if(this.multipleItems){
      createTouchSlider(this.$refs.slider, this.prevItem, this.nextItem)
    }
  }
}
</script>

<style scoped>

.a-banner{
  position: relative;
}

.a-icon-button{
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  background-color: #ffffff00;
  transition: var(--transition);
}

.a-icon-button:hover{
  background-color: #ffffff30;
}

.a-left{
  left: 0;
}

.a-right{
  right: 0;
}

.a-img-container, .a-img-container-m {
  position: relative;
  width: 100%;
}
.a-img-container:after {
  content: "";
  display: block;
  padding-bottom: 33%;
}

.a-img-container-m:after {
  content: "";
  display: block;
  padding-bottom: 130%;
}

.a-img {
  position: absolute;
  /* border-radius: var(--border-radius); */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: var(--slow-transition);
}
</style>