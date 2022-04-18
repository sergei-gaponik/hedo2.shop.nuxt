<template>
<div class="a-container">
  <div class="a-slider hide-scrollbar mb2" ref="slider">
    <product-image :src="imgSrc"/>
    <div v-if="multipleImages" @click="clickHandler(prevImage)" class="a-left">
      <chevron-left-icon height=36 color="var(--c-gray-3)" :style="{ opacity: !$device.isDesktop ? 0 : 1 }" />
    </div>
    <div v-if="multipleImages" @click="clickHandler(nextImage)" class="a-right">
      <chevron-right-icon height=36 color="var(--c-gray-3)" :style="{ opacity: !$device.isDesktop ? 0 : 1 }" />
    </div>
  </div>
  <div class="a-dots" v-if="multipleImages">
    <div v-for="(image, i) in images" :key="i" :class="['a-dot', position == i ? 'a-dot-selected' : '']" @click="clickHandler(() => dotClick(i))"/>
  </div>
</div>
</template>

<script>
import ProductImage from './ProductImage.vue'
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'
import clickHandler from '~/util/clickHandler'

let initTouchPos = null
let curTouchPos = null

const TOUCH_THRESH = 50

function getTouchPosX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
}

export default {
  components: { ProductImage, ChevronLeftIcon, ChevronRightIcon },
  props: ["images"],
  computed: {
    imgSrc(){
      return this.images?.[this.position]?.asset.src || ""
    },
    multipleImages(){
      return this.images.length > 1
    }
  },  
  data(){
    return {
      position: 0
    }
  },
  mounted(){
    this.$refs.slider.addEventListener("touchstart", e => {
      initTouchPos = getTouchPosX(e)
    })

    this.$refs.slider.addEventListener("touchmove", e => {
      curTouchPos = getTouchPosX(e)
    })

    this.$refs.slider.addEventListener("touchend", e => {

      if(initTouchPos != null && curTouchPos != null){

        if(curTouchPos - initTouchPos > TOUCH_THRESH)
          this.prevImage()
        else if(initTouchPos - curTouchPos > TOUCH_THRESH)
          this.nextImage()

        initTouchPos = null
        curTouchPos = null
      }
    })
  },
  methods: {
    clickHandler,
    dotClick(i){
      this.position = i
    },
    prevImage(){
      const position = this.position - 1

      if(position < 0)
        this.position = this.images.length - 1
      else
        this.position = position
    },
    nextImage(){
      const position = this.position + 1

      if(position > this.images.length - 1)
        this.position = 0
      else
        this.position = position
    }
  },
  watch: {
    images(){
      this.position = 0
    }
  }
}
</script>

<style scoped>

.a-slider{
  position: relative;
  width: 100%;
  height: 100%;
}
.a-dots{
  display: flex;
  justify-content: center;
  width: 100%;
  gap: var(--gap);
}
.a-dot{
  cursor: pointer;
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--c-gray-3);
  transition: var(--drawer-transition);
}
.a-dot-selected{
  background-color: var(--c-gray-2);
}
.a-left{
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
}
.a-right{
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
}
</style>