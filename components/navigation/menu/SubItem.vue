<template>
  <div>
    <div class="a-itemheader" @click="action()">
      {{ menuItem.title || menuItem.name }}
    </div>
    <!-- <div class="a-subitems" v-if="expanded && menuItem.children && menuItem.children.length">
      <sub-item 
        v-for="child in menuItem.children" 
        :key="child._id" 
        :menuItem="child" 
        :expanded="expanded.includes(child._id)"
        @toggle="clickHandler(() => $emit('toggle', child._id))"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  props: [ "menuItem" ],
  methods: {
    action(){
      this.$store.commit("nav/closeAllDrawers")
      this.$store.commit('search/reset')

      if(this.menuItem.href)
        this.$router.push(this.menuItem.href)
      else
        this.$router.push(this.localePath('/c/' + this.menuItem.handle))
    }
  }
}
</script>

<style scoped>
.a-subitems{
  padding-left: calc(var(--padding) * 1.5);
}
.a-itemheader{
  all: unset;
  min-height: var(--sub-item-y);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
</style>