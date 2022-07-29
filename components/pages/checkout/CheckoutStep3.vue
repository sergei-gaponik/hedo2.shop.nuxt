<template>
  <div :class="$device.isMobile ? 'container-m' : 'container-slim-d td-split'">
    <div :class="$device.isMobile ? 'a-z0' : 'td-split-sticky'">
      <order-summery-1 :isAuthenticated="isAuthenticated" />
      <h2>{{ $t("paymentMethod") }}</h2>
      <payment-method-selector
        :class="$device.isMobile ? 'mb2' : ''"
        :value="paymentInfo.paymentMethod"
        @input="(v) => setPaymentInfo('paymentMethod', v)"
      />
      <div v-if="$device.isMobile" class="mb4">
        <divider-or />
        <div id="paypal-checkout"></div>
      </div>
    </div>
    <div :class="$device.isMobile ? '' : 'td-split-sticky'">
      <h2>{{ $t("orderSummery") }}</h2>
      <order-summery-2 />
      <div :class="$device.isMobile ? 'main-button-m' : 'mt4'">
        <main-button :disabled="!isValid" @click="submit()">{{
          $t("goToPaymentProvider")
        }}</main-button>
      </div>
      <div v-if="!$device.isMobile" class="mt">
        <divider-or />
        <div id="paypal-checkout"></div>
      </div>
      <div v-if="$device.isMobile" class="a-mb"></div>
    </div>
  </div>
</template>

<script>
import MainButton from "~/components/layout/buttons/MainButton.vue";
import LazyWrapper from "~/components/util/LazyWrapper.vue";
import PaymentMethodSelector from "./PaymentMethodSelector.vue";
import OrderSummery1 from "./OrderSummery1.vue";
import OrderSummery2 from "./OrderSummery2.vue";
import instanceHandler from "~/core/instanceHandler";
import { LoadingState, PaymentMethod } from "~/types";
import { v4 as uuidv4 } from "uuid";
import { loadScript } from "@paypal/paypal-js";
import DividerOr from "~/components/layout/decoration/DividerOr.vue";

const getInitCheckoutSessionArgs = (_this) => {
  let { contactInfo, paymentInfo, shippingInfo } = JSON.parse(
    JSON.stringify(_this.$store.state.checkout)
  );

  const lineItems = _this.$store.state.cart.lineItems;

  if (shippingInfo.billingAddressMatchesShippingAddress) {
    shippingInfo.billingAddress = null;
  }

  return { contactInfo, paymentInfo, shippingInfo, lineItems };
};

export default {
  props: {
    isAuthenticated: Boolean,
  },
  data() {
    return {
      lock: false,
      paypalButtonRendered: false,
    };
  },
  components: {
    MainButton,
    LazyWrapper,
    PaymentMethodSelector,
    OrderSummery1,
    OrderSummery2,
    DividerOr,
  },
  computed: {
    paymentInfo() {
      return this.$store.state.checkout.paymentInfo;
    },
    isValid() {
      return true;
    },
  },
  async mounted() {
    const paypal = await loadScript({
      "client-id": process.env.PAYPAL_CLIENT_ID,
      currency: "EUR",
      "disable-funding":
        "credit,card,bancontact,blik,eps,giropay,ideal,mercadopago,mybank,p24,sepa,sofort,venmo",
      locale: "de_DE",
    });

    this.$nextTick(function () {
      const uuid = uuidv4();

      paypal
        .Buttons({
          createOrder: async () => {
            let args = getInitCheckoutSessionArgs(this);

            args.paymentInfo = { paymentMethod: PaymentMethod.paypal };
            args.uuid = uuid;

            const r = await instanceHandler({
              path: "initCheckoutSession",
              args,
            });

            if (
              r.loadingState == LoadingState.error ||
              !r.data?.paymentSession
            ) {
              this.$store.dispatch("notifications/error", this.$t("error"));
              throw new Error();
            }

            return r.data.paymentSession.id;
          },
          onApprove: () => {
            this.$router.push(
              this.localePath(`/checkout/success?sid=${uuid}&p=paypal`)
            );
          },
        })
        .render("#paypal-checkout");
    });
  },
  methods: {
    setPaymentInfo(attribute, value) {
      this.$store.commit("checkout/setPaymentInfo", [attribute, value]);
    },
    async submit() {
      const args = getInitCheckoutSessionArgs(this);

      const r = await instanceHandler({ path: "initCheckoutSession", args });

      if (r.loadingState == LoadingState.error || !r.data?.paymentSession) {
        this.$store.dispatch("notifications/error", this.$t("error"));
        return;
      }

      if (r.data.paymentSession.redirect) {
        window.location.href = r.data.paymentSession.redirect;
      }
    },
  },
};
</script>

<style scoped>
.a-mb {
  margin-bottom: calc(var(--gap) + var(--button-y));
}
.a-z0 {
  position: relative;
  z-index: 0;
}
</style>
