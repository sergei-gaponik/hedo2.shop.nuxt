<template>
<div>
  <div class="a-header">
    <div class="a-container">
      <div class="a-l1">
        <div class="a-l1-left">
          <regional-button height=26 region="DE" />
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
      <div class="a-l2">
        <div></div>
        <search-bar width="400px" /> 
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
import SearchBar from './SearchBar.vue'
import Divider from './Divider.vue'
import auth from '~/core/auth'

export default {
  components: { Divider, HomeButton, CartButton, ProfileButton, RegionalButton, SearchBar },
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
      isAuthenticated: false,
      firstName: ""
    }
  },
}

</script>

<style scoped>
.a-greeting{
  letter-spacing: 0.1em;
  color: var(--c-gray-2)
}
.a-header{
  z-index: 200;
  background-color: white;
  position: fixed;
  top: 0;
}
.a-container {
  position: relative;
  width: calc(100vw - (var(--padding-x-td) * 2));
  max-width: var(--max-width-d);
  margin: auto;
  height: calc(var(--header-y-d) - 4px);
  display: flex;
  flex-direction: column;
  padding: var(--padding) 0;
  box-sizing: border-box;
}
.a-l1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
}
.a-l2 {
  display: flex;
  justify-content: space-between;
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

.a-divider {
  position: relative;
  width: 100vw;
  height: 4px;
  background: linear-gradient(90.09deg, rgba(83, 122, 88, 0.5) 2.14%, rgba(155, 199, 161, 0.5) 95.28%);

}
</style>