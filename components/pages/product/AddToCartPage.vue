<template>
  <div class="container-m a-page">
    <primary-button :action="goToCart">{{ $t("goToCart") }}</primary-button>
    <secondary-button :action="continueShopping">{{ $t("continueShopping") }}</secondary-button>
  </div>
</template>

<script>
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'

export default {
  components: { PrimaryButton },
  methods: {
    continueShopping(){
      this.$store.commit('nav/closeAllDrawers')
    },
    goToCart(){
      this.$store.commit('nav/closeAllDrawers')
      this.$router.push(this.localePath('/cart'))
    }
  }
}
</script>

<style scoped>
.a-page{
  display: flex;
  flex-direction: column-reverse;
  height: calc(100% - var(--padding-y-m) * 2);
  gap: var(--gap)
}
</style>