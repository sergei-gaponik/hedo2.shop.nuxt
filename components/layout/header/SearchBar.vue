<template>
  <div class="a-searchbar">
    <input 
      class="a-input"
      :value="value" 
      ref="input"
      @input="changeValueOnDesktop"
      @click="showSearchbarOnTablet"
    />
    <search-icon 
      class="a-icon"
      height=20
      color="var(--c-gray-1)"
    />
  </div>
</template>

<script>
import SearchIcon from '~/components/icons/navigation/SearchIcon.vue'

export default {
  components: { SearchIcon },
  computed: {
    value() {
      return this.$store.state.search.query;
    }
  },
  methods: {
    changeValueOnDesktop(e) {
      if(this.$device.isDesktop)
        this.$store.dispatch("search/globalSearch", { query: e.target.value, limit: 8 })
    },
    showSearchbarOnTablet(){
      if(this.$device.isTablet){
        this.$emit('showSearchbar')
      }

    },
    focusInput(){
      this.$nextTick(function(){
        this.$refs.input.focus()
      })
    }
  }
}
</script>

<style scoped>
.a-searchbar{
  position: relative;
  width: calc(50vw - (var(--padding-x-td) * 2));
  height: var(--search-bar-y);
  
}
.a-input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 8px;
  padding: 0 var(--padding);
  box-sizing: border-box;
  border: 1px solid var(--c-gray-3);
  outline: none;
}
.a-icon {
  position: absolute;
  right: var(--padding);
  top: 50%;
  transform: translateY(-50%)
}
</style>