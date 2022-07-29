<template>
  <div>
    <div class="a-header" v-click-outside="hideSearchBar">
      <div class="a-container">
        <div v-show="$store.state.search.searchBarVisible" class="a-flex">
          <search-bar-m-t ref="searchbar" />
          <search-close-button
            height="26"
            :action="() => clickHandler(hideSearchBar)"
            class="a-search-close"
          />
        </div>
        <div v-show="!$store.state.search.searchBarVisible" class="a-flex">
          <home-button height="30" class="a-flex-left" />
          <!-- <regional-button height=26 region="DE" /> -->
          <cart-button height="26" />
          <profile-button height="26" />
          <search-button
            height="26"
            :action="() => clickHandler(showSearchBar)"
          />
        </div>
      </div>
      <divider />
    </div>
    <div style="margin-top: var(--header-y-m)"></div>
  </div>
</template>

<script>
import HomeButton from "../buttons/HomeButton.vue";
import CartButton from "../buttons/CartButton.vue";
import ProfileButton from "../buttons/ProfileButton.vue";
import SearchButton from "../buttons/SearchButton.vue";
import SearchCloseButton from "../buttons/SearchCloseButton.vue";
import RegionalButton from "../buttons/RegionalButton.vue";
import SearchBarMT from "./SearchBarMT.vue";
import clickHandler from "~/util/clickHandler";
import Divider from "./Divider.vue";

export default {
  components: {
    HomeButton,
    CartButton,
    ProfileButton,
    SearchButton,
    RegionalButton,
    SearchCloseButton,
    SearchBarMT,
    Divider,
  },
  methods: {
    clickHandler,
    showSearchBar() {
      if (!this.$store.state.search.searchBarVisible) {
        this.$store.commit("nav/closeAllDrawers");
        this.$store.commit("search/showSearchBar");
        this.$refs.searchbar.focusInput();
      }
    },
    hideSearchBar() {
      if (this.$store.state.search.searchBarVisible)
        this.$store.commit("search/reset");
    },
  },
};
</script>

<style scoped>
.a-header {
  z-index: 200;
  background-color: white;
  position: fixed;
  top: 0;
}
.a-container {
  padding: 0 var(--padding-x-m);
  position: relative;
  height: calc(var(--header-y-m) - var(--divider-y));
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
</style>
