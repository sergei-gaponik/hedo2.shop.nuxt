<template>
  <transition name="a-cartitem">
    <div class="a-cartitem" v-if="cartItem.quantity > 0">
      <div
        class="a-image"
        @click="() => $router.push(localePath('/p/' + cartItem.product.handle))"
      >
        <product-image :src="image" />
      </div>
      <div>
        <cart-item-title :cartItem="cartItem" />
        <div class="a-pricecontainer mt">
          <quantity-selector
            :quantity="cartItem.quantity"
            :maxQuantity="cartItem.maxQuantity"
            @incQuantity="incQuantity"
            @decQuantity="decQuantity"
            border
          />
          <div class="text bold a-price">
            <div>{{ priceCaption }}</div>
            <div>
              <unit-price :variant="cartItem.variant" />
            </div>
          </div>
        </div>
        <div class="a-bottom mt">
          <div class="a-gift">
            <check-box
              small
              :checked="cartItem.isGift"
              @input="(v) => updateVariant({ isGift: v })"
            />
            <span>{{ $t("packageAsGift") }}</span>
          </div>
          <span class="link" @click="removeItem">
            {{ $t("removeItem") }}
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartItemTitle from "./CartItemTitle.vue";
import ProductImage from "../product/ProductImage.vue";
import QuantitySelector from "./QuantitySelector.vue";
import UnitPrice from "../product/UnitPrice.vue";
import CheckBox from "~/components/layout/inputs/CheckBox.vue";
import { toMoney } from "~/util/money";

export default {
  components: {
    CartItemTitle,
    ProductImage,
    QuantitySelector,
    UnitPrice,
    CheckBox,
  },
  props: ["cartItem"],
  computed: {
    image() {
      return this.cartItem.variant.images?.length
        ? this.cartItem.variant.images[0].asset.src
        : this.cartItem.product.images[0].asset.src;
    },
    priceCaption() {
      return toMoney(this.totalPrice, this);
    },
    totalPrice() {
      return this.cartItem.price * this.cartItem.quantity;
    },
  },
  methods: {
    incQuantity() {
      if (this.cartItem.quantity < this.cartItem.maxQuantity)
        this.updateVariant({ quantity: this.cartItem.quantity + 1 });
    },
    decQuantity() {
      if (this.cartItem.quantity > 1)
        this.updateVariant({ quantity: this.cartItem.quantity - 1 });
    },
    removeItem() {
      if (this.cartItem.quantity != 0) this.updateVariant({ quantity: 0 });
    },
    updateVariant(update) {
      this.$store.dispatch("cart/updateLineItem", {
        ...update,
        variant: this.cartItem.variant._id,
      });
    },
  },
  watch: {},
};
</script>

<style scoped>
.a-cartitem {
  display: grid;
  grid-template-columns: 100px auto;
  gap: var(--gap);
}
.a-cartitem-enter-active,
.a-cartitem-leave-active {
  transition: var(--remove-transition);
  opacity: 1;
}
.a-cartitem-enter,
.a-cartitem-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.a-image {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.a-price {
  letter-spacing: 0.1em;
  font-size: 1em;
  line-height: 1.5em;
  text-align: right;
}
.a-pricecontainer {
  display: flex;
  justify-content: space-between;
}
.a-bottom {
  display: flex;
  justify-content: space-between;
}
.a-gift {
  display: flex;
  align-items: center;
  gap: var(--gap-s);
}
</style>
