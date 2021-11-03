<template>
  <checkout-page />
</template>

<script>
import CheckoutPage from '~/components/pages/checkout/CheckoutPage.vue'

export default {
  components: { CheckoutPage },
  created(){
    this.$store.commit("nav/setFooterTagsVisible", false)
  },
  beforeRouteLeave(to, from, next){
    this.$store.commit("nav/setFooterTagsVisible", true)
    next()
  }
}
</script>

<style scoped>

</style>