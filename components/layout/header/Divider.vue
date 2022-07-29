<template>
  <div class="a-divider">
    <div :class="[loading ? 'a-loading' : '']"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    "$store.state.loadingState.loadingState": function (v) {
      if (v == "loading" && this.loading == false) {
        setTimeout(() => {
          if (this.$store.state.loadingState.loadingState == "loading") {
            this.loading = true;

            setTimeout(() => {
              this.loading = false;
            }, 2000);
          }
        }, 20);
      }
    },
  },
};
</script>

<style scoped>
.a-divider {
  position: relative;
  width: 100vw;
  height: var(--divider-y);
  background: var(--c-green-3-l);
  /* background: linear-gradient(90deg, #a8bcab 2%, #cce2cf 95%); */
  z-index: 1;
}
.a-loading {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* background: linear-gradient(-90deg, #cce2cf 10%, #d9e6db 80%, #dee9df 95%); */
  /* box-shadow: 0px 3px 7px #9bc7a175; */
  box-shadow: 0px 4px 8px var(--c-green-3-l);
  background: linear-gradient(
    -90deg,
    #c3ddc680 10%,
    #c3ddc650 80%,
    #c3ddc640 95%
  );
  z-index: 2;
  animation: a-animation 2s 1;
  opacity: 0;
  transition: all 1s linear;
}
.a-stop {
  opacity: 0;
}

@keyframes a-animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.a-transition::before {
  opacity: 1;
}
</style>
