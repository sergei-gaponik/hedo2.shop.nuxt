<template>
  <div>
    <transition name="a-bg">
      <div class="a-bg" v-if="show" @click="close"/>
    </transition>
    <transition name="a-popup">
      <div class="a-popup" v-if="show">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: ["show"],
  methods: {
    close(){
      this.$store.commit("nav/closeAllDrawers")
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.a-bg{
  z-index: 50;
  position: fixed;
  left: 0;
  right: 0;
  top: var(--header-y-m);
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
.a-popup{
  z-index: 1000;
  position: fixed;
  left: 20vw;
  right: 20vw;
  top: calc(var(--header-y-t) + var(--gap));
  bottom: 20vw;
  max-width: var(--popup-max-x);
  max-height: var(--popup-max-y);
  margin: auto;
  background-color: white;
  transform: none;
  box-shadow: var(--box-shadow-drawer);
  border-radius: var(--page-border-radius);
}
.a-popup-enter-active, .a-popup-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
  transform: none;
}
.a-popup-enter, .a-popup-leave-to{
  opacity: 0;
  transform: scale(60%);
}

</style>