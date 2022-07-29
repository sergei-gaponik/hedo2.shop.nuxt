<template>
  <client-only>
    <div>
      <checkout-progress @setStep="setStep" />
      <checkout-step-1
        v-if="$store.state.checkout.step == 1"
        @nextStep="setStep(2)"
      />
      <checkout-step-2
        v-if="isAuthenticated && $store.state.checkout.step == 2"
        @nextStep="setStep(3)"
      />
      <checkout-step-2-guest
        v-if="!isAuthenticated && $store.state.checkout.step == 2"
        @nextStep="setStep(3)"
      />
      <checkout-step-3
        v-if="$store.state.checkout.step == 3"
        :isAuthenticated="isAuthenticated"
      />
    </div>
  </client-only>
</template>

<script lang="ts">
import CheckoutStep1 from "./CheckoutStep1.vue";
import CheckoutStep2 from "./CheckoutStep2.vue";
import CheckoutStep2Guest from "./CheckoutStep2Guest.vue";
import CheckoutStep3 from "./CheckoutStep3.vue";
import CheckoutProgress from "./CheckoutProgress.vue";
import auth from "~/core/auth";

export default {
  components: {
    CheckoutStep1,
    CheckoutStep2,
    CheckoutStep2Guest,
    CheckoutStep3,
    CheckoutProgress,
  },
  data() {
    return {
      isAuthenticated: false,
      lineItems: [],
      ready: false,
    };
  },
  methods: {
    setContactInfo(attribute, value) {
      this.$store.commit("checkout/setContactInfo", [attribute, value]);
    },
    setStep(step) {
      if (this.isAuthenticated && step < 2) return;

      this.$store.commit("checkout/setStep", step);
    },
  },
  async created() {
    if (!process.client) return;

    try {
      const { attributes } = await auth().currentAuthenticatedUser();

      this.isAuthenticated = true;

      this.setContactInfo("email", attributes.email);
      this.setContactInfo("isAuthenticated", true);
      this.setContactInfo("username", attributes.sub);
      this.setStep(2);
    } catch (e) {}

    this.ready = true;
  },
};
</script>
