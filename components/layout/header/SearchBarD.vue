<template>
  <div>
    <portal to="header-d">
      <transition name="a-bg">
        <div 
          v-if="searchResultsVisible"
          class="a-bg" 
          @click="$emit('focusout')" 
        />
      </transition>
    </portal>
    <div :class="searchResultsVisible ? 'a-boxshadow' : ''">
      <div class="a-searchbar">
        <input 
          id="searchbar-d-input"
          class="a-input"
          @focus="$emit('focus')"
          @focusout="!searchResultsVisible ? $emit('focusout') : null"
          :value="value" 
          @input="globalSearch"
        />
          <!-- :placeholder="$t('lookingFor')" -->
        <search-icon 
          class="a-icon"
          height=20
          color="black"
        />
      </div>
      <div class="a-searchresults" v-show="searchResultsVisible">
        <search-results />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SearchIcon from '~/components/icons/navigation/SearchIcon.vue'
import SearchResults from './SearchResults.vue'

export default {
  components: { SearchIcon, SearchResults },
  props: {
    width: String
  },
  computed: {
    value() {
      return this.$store.state.search.query;
    },
    searchResultsVisible(){
      return this.$store.state.search.searchResultsVisible
    }
  },
  methods: {
    globalSearch(e) {
      this.$store.dispatch("search/globalSearch", { query: e.target.value, limit: 4 })
    }
  }
}
</script>



<style scoped>
.a-boxshadow{
  box-shadow: var(--box-shadow-drawer);
}
.a-bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  background-color: var(--c-green-1);
  opacity: 0.06;
  transition: var(--drawer-transition);
}
.a-bg-enter-active, .a-bg-leave-active {
  transition: var(--drawer-transition);
  opacity: 0.06;
}
.a-bg-enter, .a-bg-leave-to{
  opacity: 0;
}
.a-searchresults{
  position: relative;
  background-color: white;
  top: 0;
  width: 100%;
  max-height: calc(100vh - var(--header-y-d) + var(--divider-y) - var(--margin-2));
  overflow: auto;
}

.a-searchbar{
  height: var(--search-bar-y);
  z-index: 1000;
}
.a-input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 0 var(--padding);
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: var(--c-green-3-l);
  transition: var(--slow-transition);

}
/* .a-input::placeholder{
  color: var(--c-gray-2);
  opacity: 1;
  font-weight: 600;
  font-family: var(--default-font);
} */
.a-icon {
  position: absolute;
  right: var(--padding);
  top: 50%;
  transform: translateY(-50%)
}
</style>