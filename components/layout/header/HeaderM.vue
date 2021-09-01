<template>
<div>
  <div class="a-header">
    <div class="a-container">
      <div v-show="$store.state.search.searchBarVisible" class="a-flex">
        <search-bar ref="searchbar" />
        <search-close-button height=26 :action="hideSearchBar" class="a-search-close" />
      </div>
      <div v-show="!$store.state.search.searchBarVisible" class="a-flex">
        <home-button height=30 class="a-flex-left" />
        <regional-button height=26 region="DE" />
        <cart-button height=26 />
        <profile-button height=26 />
        <search-button height=26 :action="showSearchBar" />
      </div>
    </div>
    <div class="a-divider"></div>
  </div>
  <div style="margin-top:var(--header-y-m)"></div>
</div>
</template>

<script>

import HomeButton from '../buttons/HomeButton.vue'
import CartButton from '../buttons/CartButton.vue'
import ProfileButton from '../buttons/ProfileButton.vue'
import SearchButton from '../buttons/SearchButton.vue'
import SearchCloseButton from '../buttons/SearchCloseButton.vue'
import RegionalButton from '../buttons/RegionalButton.vue'
import SearchBar from './SearchBar.vue'

export default {
  components: { HomeButton, CartButton, ProfileButton, SearchButton, RegionalButton, SearchCloseButton, SearchBar },
  data: () => ({
    searchBarVisible: false,
    query: ""
  }),
  methods: {
    showSearchBar() {
      this.$store.commit('nav/closeAllDrawers')
      this.$store.commit('search/showSearchBar')
      this.$refs.searchbar.focusInput()
    },
    hideSearchBar(){
      this.$store.commit('search/reset')
    }
  }
}

</script>

<style scoped>
.a-header{
  z-index: 100;
  background-color: white;
  position: fixed;
  top: 0;
}
.a-container {
  padding: 0 var(--padding-x-m);
  position: relative;
  height: calc(var(--header-y-m) - 4px);
}
.a-flex {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 20px;
}
.a-search-close {
  margin-left: auto;
}
.a-flex-left {
  margin-right: auto;
}

.a-divider {
  position: relative;
  width: 100vw;
  height: 4px;
  background: linear-gradient(90.09deg, rgba(83, 122, 88, 0.5) 2.14%, rgba(155, 199, 161, 0.5) 95.28%);

}
</style>