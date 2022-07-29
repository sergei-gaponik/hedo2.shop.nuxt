<template>
  <div ref="drawer">
    <transition name="a-bg">
      <div class="a-bg" v-if="show" @click="close" />
    </transition>
    <transition name="a-drawer">
      <div class="a-drawer hide-scrollbar" v-if="show">
        <div class="container-m">
          <slot />
        </div>
      </div>
    </transition>
    <transition name="a-close">
      <div class="a-close" @click="close">
        <cross-icon color="#ffffff" height="30" v-if="show" />
      </div>
    </transition>
  </div>
</template>

<script>
import CrossIcon from "~/components/icons/basic/CrossIcon.vue";
import { createTouchSlider } from "~/util/touch";

export default {
  components: { CrossIcon },
  props: ["show"],
  methods: {
    close() {
      this.$store.commit("search/reset");
      this.$store.commit("nav/closeAllDrawers");
    },
  },
  mounted() {
    createTouchSlider(this.$refs.drawer, null, this.close);
  },
};
</script>

<style scoped>
.a-bg {
  z-index: 50;
  position: fixed;
  left: 0;
  right: 0;
  top: var(--header-y-m);
  bottom: var(--footer-y-m);
  background-color: var(--c-green-1);
  opacity: 0.25;
}
.a-bg-enter-active,
.a-bg-leave-active {
  transition: var(--drawer-transition);
  opacity: 0.25;
}
.a-bg-enter,
.a-bg-leave-to {
  opacity: 0;
}
.a-drawer {
  z-index: 100;
  position: fixed;
  left: 0;
  right: var(--drawer-margin-x-m);
  top: var(--header-y-m);
  bottom: var(--footer-y-m);
  background-color: white;
  transform: none;
  box-shadow: var(--box-shadow-drawer);
  overflow: scroll;
}
.a-drawer-enter-active,
.a-drawer-leave-active {
  transition: var(--drawer-transition);
  transform: none;
}
.a-drawer-enter,
.a-drawer-leave-to {
  transform: translateX(-100%);
}
.a-close {
  position: fixed;
  right: var(--padding-x-m);
  top: 50vh;
  z-index: 100;
}
.a-close-enter-active,
.a-close-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
}
.a-close-enter,
.a-close-leave-to {
  opacity: 0;
}
</style>
