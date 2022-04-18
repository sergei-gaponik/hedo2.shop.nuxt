<template>
<div>
  <div class="a-header">
    <portal-target name="header-d" />
    <div class="a-container">
      <div class="a-l1">
        <div class="a-l1-left">
          <!-- <regional-button height=26 region="DE" /> -->
          <cart-button height=26 />
          <profile-button height=26 />
        </div>
        <home-button height=30  />
        <div class="a-l1-right">
          <div v-if="!isAuthenticated">
            <nuxt-link :to="localePath('/login')">
              <h6 class="a-greeting">{{ $t('signIn') }}</h6>
            </nuxt-link>
          </div>
          <div v-else>
            <nuxt-link :to="localePath('/me')">
              <h6 class="a-greeting">{{ $t('welcomeBack') + ' ' + firstName }}</h6>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div>
        <category-bar 
          :class="['a-categorybar', searchBarVisible ? 'a-categorybar-focus' : '']" 
        />
        <search-bar-d 
          v-if="mounted"
          @focus="focus"
          @focusout="focusout"
          :class="['a-searchbar', searchBarVisible ? 'a-searchbar-focus' : '']" 
        /> 
      </div>
    </div>
    <divider />
  </div>
  <div style="margin-top:var(--header-y-d)"></div>
</div>
</template>

<script>

import HomeButton from '../buttons/HomeButton.vue'
import CartButton from '../buttons/CartButton.vue'
import ProfileButton from '../buttons/ProfileButton.vue'
import RegionalButton from '../buttons/RegionalButton.vue'
import SearchBarD from './SearchBarD.vue'
import Divider from './Divider.vue'
import auth from '~/core/auth'
import CategoryBar from './CategoryBar.vue'

export default {
  components: { Divider, HomeButton, CartButton, ProfileButton, RegionalButton, SearchBarD, CategoryBar },
  async created(){
    try{
      const { attributes } = await auth().currentAuthenticatedUser()

      this.firstName = attributes.given_name
      this.isAuthenticated = true
    }
    catch(e){
    }
  },
  computed: {
    searchBarVisible(){
      return this.$store.state.search.searchBarVisible
    }
  },
  data(){
    return {
      isAuthenticated: false,
      firstName: "",
      searchBarFocus: false,
      mounted: false
    }
  },
  methods: {
    focus(){
      if(!this.searchBarVisible){
        this.$store.commit('nav/closeAllDrawers')
        this.$store.commit('search/showSearchBar')
      }
    },
    focusout(){
      if(this.searchBarVisible)
        this.$store.commit('search/reset')
    }
  },
  mounted(){
    this.mounted = true
  }
}

</script>



<style scoped>
.a-categorybar{
  transition: var(--fast-transition);
  opacity: 1;
  width: 60%;
}
.a-categorybar-focus{
  opacity: 0;
}
.a-searchbar{
  position: absolute;
  transition: var(--fast-transition);
  right: 0;
  width: 40%;
  z-index: 900;
  bottom: 0;
}
.a-searchbar-focus{
  width: 75%;
  right: 12.5%;
}

.a-greeting{
  letter-spacing: 0.1em;
  color: var(--c-gray-2)
}
.a-header{
  z-index: 200;
  width: 100vw;
  background-color: white;
  position: fixed;
  top: 0;
}
.a-container {
  position: relative;
  width: calc(100vw - (var(--padding-x-td) * 2));
  max-width: var(--max-width-d);
  margin: auto;
  height: calc(var(--header-y-d) - var(--divider-y));
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--padding) 0 0 0;
  box-sizing: border-box;
}
.a-l1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
}
.a-l1-left{
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 20px;
  width: 300px;
}
.a-l1-right{
  width: 300px;
  text-align: right;
}
.a-flex-left {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
}
.a-search-close {
  margin-left: auto;
}
</style>