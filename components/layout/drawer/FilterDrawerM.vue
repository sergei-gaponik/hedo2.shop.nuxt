<template>
  <div>
    <transition name="a-bg">
      <div class="a-bg" v-if="show" @click="close"/>
    </transition>
    <transition name="a-drawer">
      <div class="a-drawer" v-if="show">
        <div class="container-m">
          content
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
import CrossIcon from '~/components/icons/basic/CrossIcon.vue'

export default {
  components: { CrossIcon },
  props: ["show"],
  methods: {
    close(){
      this.$store.commit("nav/closeFilterDrawer")
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
  bottom: var(--footer-y-m);
  background-color: var(--c-green-1);
  opacity: 0.25;
}
.a-bg-enter-active, .a-bg-leave-active {
  transition: all 0.3s cubic-bezier(0.85, 0, 0.15, 1);
  opacity: 0.25;
}
.a-bg-enter, .a-bg-leave-to{
  opacity: 0;
}
.a-drawer{
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  top: calc(var(--header-y-m) + var(--drawer-margin-x-m));
  bottom: var(--footer-y-m);
  background-color: white;
  transform: none;
}
.a-drawer-enter-active, .a-drawer-leave-active {
  transition: all 0.3s cubic-bezier(0.85, 0, 0.15, 1);
  transform: none;
}
.a-drawer-enter, .a-drawer-leave-to{
  transform: translateY(100%);
}
.a-close{
  position: fixed;
  left: 50vw;
  top: calc(var(--header-y-m) + var(--padding-x-m));
  z-index: 100;
}
.a-close-enter-active, .a-close-leave-active {
  transition: all 0.3s cubic-bezier(0.85, 0, 0.15, 1);
  opacity: 1;
}
.a-close-enter, .a-close-leave-to{
  opacity: 0;
}

</style>