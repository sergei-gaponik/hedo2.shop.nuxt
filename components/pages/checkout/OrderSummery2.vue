<template>
  <lazy-wrapper>
    <div class="a-items mb4">
      <product-item
        v-for="cartItem in visibleCartItems"
        :key="cartItem.variant._id"
        :product="cartItem.product"
        :variant="cartItem.variant"
        :quantity="cartItem.quantity"
      />
      <show-more
        v-if="cartItems.length > 3"
        class="mt2"
        v-model="showAll"
        :showMoreCaption="$t('showAllNItems').replace('{n}', cartItems.length)"
      />
    </div>
    <cart-total :cartItems="cartItems" :customShippingCost="shippingCost" />
  </lazy-wrapper>
</template>

<script>
import LazyWrapper from "~/components/util/LazyWrapper.vue";
import instanceHandler from "~/core/instanceHandler";
import { LoadingState } from "~/types";
import ProductItem from "~/components/pages/product/ProductItem.vue";
import CartTotal from "~/components/pages/cart/CartTotal.vue";
import AddressInfo from "~/components/pages/profile/AddressInfo.vue";
import ShowMore from "~/components/layout/common/ShowMore.vue";

export default {
  props: {
    isAuthenticated: Boolean,
  },
  components: { LazyWrapper, ProductItem, CartTotal, AddressInfo, ShowMore },
  computed: {
    visibleCartItems() {
      if (this.showAll) return this.cartItems;
      else return this.cartItems.slice(0, 3);
    },
    subTotal() {
      return this.lineItems.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
    },
    shippingCost() {
      if (
        this.shippingInfo.shippingMethod.freeShippingMin != null &&
        this.shippingInfo.shippingMethod.freeShippingMin < this.subTotal
      )
        return 0;
      else return this.shippingInfo.shippingMethod.price;
    },
    shippingInfo() {
      return this.$store.state.checkout.shippingInfo;
    },
    contactInfo() {
      return this.$store.state.checkout.contactInfo;
    },
    paymentInfo() {
      return this.$store.state.checkout.paymentInfo;
    },
    lineItems() {
      return this.$store.state.cart.lineItems;
    },
    cartItems() {
      if (!this.products.length || !this.variants.length) return [];

      return this.lineItems.map((lineItem) => ({
        ...lineItem,
        product: this.products.find((a) => a._id == lineItem.product),
        variant: this.variants.find((a) => a._id == lineItem.variant),
      }));
    },
  },
  async fetch() {
    this.$store.commit("loadingState/setLoadingState", LoadingState.loading);

    const cartItems = this.lineItems.map((a) => ({
      product: a.product,
      variant: a.variant,
    }));

    if (cartItems.length) {
      const r2 = await instanceHandler({
        path: "findCartItems",
        args: { cartItems },
        cache: true,
      });

      this.variants = r2.data?.variants || [];
      this.products = r2.data?.products || [];
    }

    this.$store.commit("loadingState/setLoadingState", LoadingState.ready);
  },
  methods: {
    toggleShowAll() {
      this.showAll = !this.showAll;
    },
  },
  data() {
    return {
      variants: [],
      products: [],
      showAll: false,
    };
  },
};
</script>

<style scoped>
.a-items {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>
