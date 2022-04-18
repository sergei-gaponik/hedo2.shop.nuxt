<template>
<div>
  <div @mouseleave="mouseLeave()">
    <div class="a-menu">
      <span 
        @mouseover="mouseOver('brands')"
        class="cursor-normal"
      >
        {{ $t('brands') }}
      </span>
      <nuxt-link
        v-for="category in categories"
        :key="category._id"
        :to="localePath('/c/' + category.handle)"
        @click.native="mouseLeave()"
        @mouseover.native="mouseOver(category._id)"
      >
        {{ category.title || category.name }}
      </nuxt-link>
      <nuxt-link 
        :to="localePath('/c/sale')"
        @mouseover.native="mouseLeave()"
      >
        {{ $t('saleCollection') }}
      </nuxt-link>
    </div>
    <div class="a-sub" v-if="focusCategory || brandFocus">
      <category-sub-menu 
        :category="focusCategory" 
        :brands="brands"
        :brandFocus="brandFocus"
        @leave="mouseLeave"
      />
    </div>
  </div>
  <div class="a-bg" v-if="focusCategory || brandFocus"/>
</div>
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import CategorySubMenu from './CategorySubMenu.vue'

export default {
  components: { CategorySubMenu },
  computed: {
    focusCategory(){
      if(this.focusCategoryId == null)
        return null
      else
        return this.categories.find(a => a._id == this.focusCategoryId)
    }
  },
  data(){
    return {
      categories: [],
      brands: [],
      focusCategoryId: null,
      brandFocus: false
    }
  },
  async fetch(){

    this.$store.commit('loadingState/isLoading')
    
    const r = await instanceHandler({
      bulk: [
        {
          path: "getCategories",
          args: { root: true },
          cache: true
        },
        {
          path: "getBrands",
          cache: true
        }
      ]
    })

    this.categories = r.bulk[0].data?.categories || []
    this.brands = r.bulk[1].data?.brands || []

    this.$store.commit('loadingState/setLoadingState', r.loadingState)
  },
  methods: {
    mouseOver(_id){
      if(_id == "brands"){
        this.brandFocus = true
        this.focusCategoryId = null
        return
      }

      this.brandFocus = false

      if(_id)
        this.focusCategoryId = _id

      if(!this.focusCategory?.children?.length)
        this.focusCategoryId = null
    },
    mouseLeave(){
      this.focusCategoryId = null
      this.brandFocus = false
    }
  }
}
</script>

<style scoped>

.a-bg{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  background-color: var(--c-green-1);
  opacity: 0.06;
}

.a-menu{
  display: flex;
  font-size: 1.2rem;
  line-height: var(--search-bar-y);
  color: var(--c-gray-1);
  width: 100%;
  overflow: auto;
}

.a-menu > *{
  flex-shrink: 0;
  padding: 0 var(--gap);
}

.a-menu > *:first-child{
  padding: 0 var(--gap) 0 0;
}

.a-sub{
  position: fixed;
  top: calc(var(--header-y-d) - var(--divider-y));
  z-index: 200;
  width: 100vw;
  left: 0;
}
</style>