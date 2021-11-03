<template>
  <div>
    <transition name="a-bg">
      <div class="a-bg" v-if="show" @click="close()" :style="{ zIndex: zIndex ? zIndex - 1 : undefined }"/>
    </transition>
    <transition name="a-popup">
      <div class="a-popup" v-if="show" :style="{ width, height, maxWidth, maxHeight, zIndex }">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    show: Boolean,
    width: String,
    height: String,
    maxWidth: String,
    maxHeight: String,
    confirmClose: Boolean,
    zIndex: String
  },
  methods: {
    async close(){

      if(this.confirmClose){
        const confirmation = await this.$store.dispatch("confirmDialog/ask", this.$t("confirmPageClose"))
        if(!confirmation) return;
      }

      this.$store.commit("nav/closeAllDrawers")
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.a-bg{
  z-index: 7990;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
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
  z-index: 8000;
  position: fixed;
  left: 50vw;
  top: 50vh;
  /* top: calc(var(--header-y-t) + var(--gap)); */
  margin: auto;
  background-color: white;
  transform: translate(-50%, -50%);
  box-shadow: var(--box-shadow-drawer);
  border-radius: var(--page-border-radius);
}
.a-popup-enter-active, .a-popup-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
  /* transform: none; */
}
.a-popup-enter, .a-popup-leave-to{
  opacity: 0;
  /* transform: scale(60%); */
}

</style>