<template>
  <client-only>
    <div style="position: relative">
      <nuxt-link :to="localePath('/cart')">
        <cart-icon color="var(--c-gray-1)" :height="height" />
      </nuxt-link>
      <span v-if="!cartEmpty" class="a-dot"> &#9679; </span>
    </div>
  </client-only>
</template>

<script>
import CartIcon from "~/components/icons/navigation/CartIcon.vue";

export default {
  components: { CartIcon },
  props: ["height"],
  computed: {
    cartEmpty() {
      return (
        this.$store.state.cart.lineItems.filter((a) => a.quantity != 0)
          .length == 0
      );
    },
  },
};
</script>

<style scoped>
.a-dot {
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--c-green-2);
  font-size: 9px;
  user-select: none;
  cursor: default;
}
</style>
