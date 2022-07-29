<template>
  <div class="container-slim">
    <checkout-sign-up @success="success" />
  </div>
</template>

<script>
import CheckoutSignUp from "~/components/pages/login/CheckoutSignUp.vue";

export default {
  components: { CheckoutSignUp },
  created() {
    if (process.client) this.$store.commit("checkout/init");
  },
  methods: {
    success() {
      this.$router.push(this.localePath("/me"));
    },
  },
};
</script>

<style scoped></style>
