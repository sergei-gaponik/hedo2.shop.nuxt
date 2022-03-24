<template>
<transition name="a-cartitem">
  <div class="a-cartitem" v-if="cartItem.quantity > 0">
    <div class="a-image" @click="() => $router.push(localePath('/p/'+cartItem.product.handle))">
        <product-image :src="image"/>
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
            <unit-price :variant="cartItem.variant" :price="totalPrice" />
          </div>
        </div>
      </div>
      <div class="a-remove mt">
        <span class="link" @click="removeItem">
          {{ $t("removeItem") }}
        </span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import CartItemTitle from './CartItemTitle.vue'
import ProductImage from '../product/ProductImage.vue'
import QuantitySelector from './QuantitySelector.vue'
import UnitPrice from '../product/UnitPrice.vue'

export default {
  components: { CartItemTitle, ProductImage, QuantitySelector, UnitPrice },
  props: [ "cartItem" ],
  computed: {
    image(){
      return this.cartItem.variant.images?.length ? this.cartItem.variant.images[0].asset.src : this.cartItem.product.images[0].asset.src
    },
    priceCaption(){
      return `${this.totalPrice.toLocaleString(this.$i18n.localeProperties.numberFormat, { style:'currency', currency: this.$i18n.localeProperties.currency } )}`
    },
    totalPrice(){
      return (this.cartItem.price * this.cartItem.quantity)
    }
  },
  methods: {
    incQuantity(){
      if(this.cartItem.quantity < this.cartItem.maxQuantity )
        this.setQuantity({ quantity: this.cartItem.quantity + 1, variant: this.cartItem.variant._id })
    },
    decQuantity(){
      if(this.cartItem.quantity > 1)
        this.setQuantity({ quantity: this.cartItem.quantity - 1, variant: this.cartItem.variant._id })
    },
    removeItem(){
      if(this.cartItem.quantity != 0)
        this.setQuantity({ quantity: 0, variant: this.cartItem.variant._id })
    },
    async setQuantity({ quantity, variant }){
      await this.$store.dispatch("cart/updateLineItem", { quantity, variant })
    }
  }
}
</script>

<style scoped>
.a-cartitem{
  display: grid;
  grid-template-columns: 100px auto;
  gap: var(--gap);
}
.a-cartitem-enter-active, .a-cartitem-leave-active {
  transition: var(--remove-transition);
  opacity: 1;
}
.a-cartitem-enter, .a-cartitem-leave-to{
  opacity: 0;
  transform: translateX(100%)
}
.a-image{
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
.a-pricecontainer{
  display: flex;
  justify-content: space-between;
}
.a-remove{
  text-align: right;
}
</style>