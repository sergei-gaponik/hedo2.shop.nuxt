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
          <div class="a-flex-left">
            <menu-button
              height="22"
              color="var(--c-gray-1)"
              px="15"
              py="0"
              :action="toggleMenuDrawer"
            />
            <home-button height="30" />
          </div>
          <div class="a-buttons">
            <!-- <regional-button height=26 region="DE" /> -->
            <cart-button height="26" />
            <profile-button height="26" />
          </div>
          <search-bar @showSearchbar="clickHandler(showSearchBar)" />
        </div>
      </div>
      <divider />
    </div>
    <div style="margin-top: var(--header-y-t)"></div>
  </div>
</template>

<script>
import HomeButton from "../buttons/HomeButton.vue";
import CartButton from "../buttons/CartButton.vue";
import ProfileButton from "../buttons/ProfileButton.vue";
import SearchButton from "../buttons/SearchButton.vue";
import SearchCloseButton from "../buttons/SearchCloseButton.vue";
import RegionalButton from "../buttons/RegionalButton.vue";
import SearchBar from "./SearchBar.vue";
import SearchBarMT from "./SearchBarMT.vue";
import MenuButton from "~/components/layout/buttons/MenuButton.vue";
import clickHandler from "~/util/clickHandler";
import Divider from "./Divider.vue";

export default {
  components: {
    Divider,
    MenuButton,
    HomeButton,
    CartButton,
    ProfileButton,
    SearchButton,
    RegionalButton,
    SearchCloseButton,
    SearchBar,
    SearchBarMT,
  },
  methods: {
    clickHandler,
    toggleMenuDrawer() {
      this.$store.commit("search/reset");
      this.$store.commit("nav/toggleMenuDrawer");
    },
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
  padding: 0 var(--padding-x-td);
  position: relative;
  height: calc(var(--header-y-t) - var(--divider-y));
}
.a-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
}
.a-buttons {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 20px;
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
