<template>
  <div ref="drawer">
    <transition name="a-bg">
      <div class="a-bg" v-if="show" @click="close"/>
    </transition>
    <transition name="a-drawer">
      <div class="a-drawer hide-scrollbar" v-if="show">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { createTouchSlider } from '~/util/touch'

export default {
  props: ["show"],
  methods: {
    close(){
      this.$store.commit("search/reset")
      this.$store.commit("nav/closeAllDrawers")
    }
  },
  mounted(){
    createTouchSlider(this.$refs.drawer, this.close, null)
  }
}
</script>

<style scoped>
.a-bg{
  z-index: 50;
  position: fixed;
  left: 0;
  right: 0;
  top: var(--header-y-t);
  bottom: 0;
  background-color: var(--c-green-1);
  opacity: 0.1;
}
.a-bg-enter-active, .a-bg-leave-active {
  transition: var(--drawer-transition);
  opacity: 0.1;
}
.a-bg-enter, .a-bg-leave-to{
  opacity: 0;
}
.a-drawer{
  z-index: 100;
  position: fixed;
  right: 0;
  width: var(--drawer-x-t);
  top: var(--header-y-t);
  bottom: 0;
  background-color: white;
  transform: none;
  box-shadow: var(--box-shadow-drawer);
  overflow: scroll;
}
.a-drawer-enter-active, .a-drawer-leave-active {
  transition: var(--drawer-transition);
  transform: none;
}
.a-drawer-enter, .a-drawer-leave-to{
  transform: translateX(100%);
}

</style>