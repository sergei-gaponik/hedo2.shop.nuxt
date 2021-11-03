<template>
<div>
  <div class="mb2">
    <div v-if="!isAuthenticated">
      <primary-button :to="localePath('/login')">
        {{ $t('signIn') }}
      </primary-button>
    </div>
    <div v-else>
      <nuxt-link :to="localePath('/me')" @click.native="$store.commit('nav/closeAllDrawers')">
        <h6 class="a-greeting">{{ $t('welcomeBack') + ' ' + firstName }}</h6>
      </nuxt-link>
    </div>
  </div>

  <div class="a-items">
    <div class="a-item" v-for="menuItem in menuItems" :key="menuItem.handle">
      <div :class="['a-itemheader', menuItem.handle == 'sale' ? 'a-sale' : '']"
        @click="clickHandler(expandable(menuItem) ? () => toggleItem(menuItem.handle) : action(menuItem))"
      >
        <div>
          {{ menuItem.title || menuItem.name }}
        </div>

        <expand-more-icon v-if="expandable(menuItem)" height=16 color="var(--c-gray-2)" 
          class="a-expandicon"
          :style="{ transform: expanded.includes(menuItem.handle) ? 'rotate(-180deg)' : 'none' }"
        />
      </div>
      <div class="a-subitems" 
        :style="{ maxHeight: expanded.includes(menuItem.handle) ? `${45 * (menuItem.children.length + 1)}px` : 0}"
      >
        <div v-if="!menuItem.hideShowAll" class="link-alt mb2" @click="action(menuItem)">{{ $t("showAll") }}</div>
        <sub-item 
          v-for="child in menuItem.children" 
          :key="child.handle" 
          :menuItem="child" 
        />
        <div style="height:var(--default-margin)"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import ExpandMoreIcon from '~/components/icons/arrows/ExpandMoreIcon.vue'
import { LoadingState } from '~/types'
import instanceHandler from '~/core/instanceHandler'
import clickHandler from '~/util/clickHandler'
import SubItem from './SubItem.vue'
import auth from '~/core/auth'

export default {
  components: { PrimaryButton, ExpandMoreIcon, SubItem },
  methods: {
    clickHandler,
    toggleItem(handle){
      if(this.expanded.includes(handle))
        this.expanded = this.expanded.filter(a => a != handle)
      else
        this.expanded = [ handle ]
    },
    expandable(menuItem){
      return !!menuItem.children?.length
    },
    action(menuItem){
      this.$store.commit("nav/closeAllDrawers")
      this.$store.commit('search/reset')

      if(menuItem.href)
        this.$router.push(menuItem.href)
      else
        this.$router.push(this.localePath('/c/' + menuItem.handle))
    }
  },
  async created(){
    try{
      const { attributes } = await auth().currentAuthenticatedUser()

      this.firstName = attributes.given_name
      this.isAuthenticated = true
    }
    catch(e){
    }

  },
  data(){
    return {
      menuItems: [],
      expanded: [],
      isAuthenticated: false,
      firstName: ""
    }
  },
  async fetch(){

    let productCategories = []
    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)
    
    const { loadingState, data } = await instanceHandler({
      path: "getCategories",
      args: { root: true },
      cache: true
    })

    if(loadingState == LoadingState.ready){
      productCategories = data?.categories || []
    }

    let menuItems = [
      {
        href: this.localePath('/b'),
        title: this.$t('brands')
      },
      ...productCategories,
      {
        handle: 'sale',
        title: this.$t("saleCollection")
      }
    ]

    if(this.$route.params.brandHandle || this.$route.params.seriesHandle){

      const { data } = await instanceHandler({
        path: "getSeriesForBrand",
        args: { 
          handle: this.$route.params.brandHandle,
          seriesHandle: this.$route.params.seriesHandle
        },
        cache: true
      })

      if(data?.series?.length){
        const series = data.series

        const brandMenu = {
          handle: series[0].brand.handle,
          title: series[0].brand.name,
          hideShowAll: true,
          href: this.localePath('/b/' + series[0].brand.handle),
          children: series.map(a => ({
            handle: a.handle,
            title: a.name,
            href: this.localePath('/s/' + a.handle)
          }))
        }

        menuItems.unshift(brandMenu)
        this.$store.commit('loadingState/setLoadingState', LoadingState.ready)

      }

    }
    else{
      this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
    }

    this.menuItems = menuItems.map(menuItem => {
      if(menuItem.children?.length)
        menuItem.children.sort((a, b) => (a.title || a.name).localeCompare((b.title || b.name)))

      return menuItem
    })
  }
}
</script>

<style scoped>
.a-greeting{
  letter-spacing: 0.1em;
  color: var(--c-gray-2)
}
.a-item{
  border-top: 1px solid var(--c-gray-3);
  padding: 0 calc(var(--padding) * 1.5);
}
.a-itemheader{
  all: unset;
  min-height: var(--list-item-y);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.a-sale{
  color: var(--c-red-1);
  font-weight: bold;
}
.a-items{
  position: absolute;
  left: 0;
  right: 0;
}
.a-items > .a-item:first-child{
  border-top: none;
}
.a-subitems{
  position: relative;
  padding-left: calc(var(--padding) * 1.5);
  transition: var(--drawer-transition);
  max-height: 0;
  overflow: hidden;
}
.a-expandicon{
  transition: var(--drawer-transition);
}
</style>