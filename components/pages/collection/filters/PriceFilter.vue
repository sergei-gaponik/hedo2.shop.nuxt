<template>
  <div v-show="$store.state.filters.priceRange">
    <h6>{{ $t('price')}}</h6>
    <div class="a-range">
      <span class="a-line-bg"></span>
      <span class="a-line" :style="{ left: lineLeft, right: lineRight }"></span>
      <input 
        v-model="minPrice"
        @change="change()"
        class="a-slider" 
        type="range" 
        :min="leftBoundry" 
        :max="rightBoundry" 
        step="1" 
      >
      <input 
        v-model="maxPrice"
        @change="change()"
        class="a-slider" 
        type="range" 
        :min="leftBoundry" 
        :max="rightBoundry" 
        step="1" 
      >
    </div>
    <p class="subdued">{{ caption }}</p>
  </div>
</template>

<script>
import { GLOBAL } from '~/core/const'

export default {
  computed: {
    leftBoundry(){
      return Math.min(this.priceRange[0], this.maxPriceRange[0])
    },
    rightBoundry(){
      return Math.max(this.priceRange[1], this.maxPriceRange[1])
    },
    priceRange(){
      return this.$store.state.filters.priceRange || [ 0, GLOBAL.maxPriceRangeValue ]
    },
    maxPriceRange(){
      return this.$store.state.filters.maxPriceRange || [ 0, GLOBAL.maxPriceRangeValue ]
    },
    lineLeft(){
      const perc = (this.minPrice - this.leftBoundry) / (this.rightBoundry - this.leftBoundry) * 100

      return `calc(${Math.floor(Math.max(perc, 3))}% + 3px)`
    },
    lineRight(){
      const perc = (this.rightBoundry - this.maxPrice) / (this.rightBoundry - this.leftBoundry) * 100

      return `calc(${Math.floor(perc)}% - 1px)`
    },
    currencySymbol(){
      return this.$i18n.localeProperties.currencySymbol
    },
    caption(){

      if(this.minPrice == 0){
        if(this.maxPrice == GLOBAL.maxPriceRangeValue)
          return this.$t('noPriceFilter')
        else
          return `${this.$t('upTo')} ${this.maxPrice} ${this.currencySymbol}`
      }
      else{
        if(this.maxPrice == GLOBAL.maxPriceRangeValue)
          return `${this.$t('from')} ${this.minPrice} ${this.currencySymbol}`
        else
          return `${this.$t('from')} ${this.minPrice} ${this.currencySymbol} ${this.$t('to')} ${this.maxPrice} ${this.currencySymbol}`
      }
    }
  },
  data(){

    const [ minPrice, maxPrice ] = this.$store.state.filters.priceRange || [ 0, GLOBAL.maxPriceRangeValue ]

    return { minPrice, maxPrice }
  },
  methods: {
    change(){
      if(this.minPrice < this.maxPrice){
        this.$emit("change", [ this.minPrice, this.maxPrice ])
      }
      else{
        this.reset()
      }
    },
    reset(){
      const [ minPrice, maxPrice ] = this.$store.state.filters.priceRange || [ 0, GLOBAL.maxPriceRangeValue ]

      this.minPrice = minPrice
      this.maxPrice = maxPrice
    }
  },
  watch: {
    "$store.state.filters.maxPriceRange": function(){
      this.reset()
    },
  }
}
</script>

<style scoped>
.a-line-bg{
  position: absolute;
  width: 100%;
  border-bottom: var(--border-width) solid var(--c-gray-4);
}
.a-line{
  position: absolute;
  border-bottom:  var(--border-width)  solid var(--c-gray-1);
}
.a-range{
  position: relative;
  width: calc(100% - var(--padding) * 2);
  height: 10px;
  margin: auto;
}
.a-slider{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  appearance: none;
  outline: none;
  background-color: transparent;
  height: 0px;
}
.a-slider::-webkit-slider-thumb, .a-slider::-moz-range-thumb  {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%; 
  background: var(--c-gray-1);
  cursor: pointer;
  border: none;
  transition: var(--transition);
}

.a-slider:active::-webkit-slider-thumb, .a-slider:active::-moz-range-thumb {
  width: 18px;
  height: 18px;
}
</style>