<template>
<div>
  <div class="a-button-container">
    <checkout-button 
      :disabled="cartEmpty || !privacyPolicyAccepted"
      :action="checkout"
    />
  </div>
  <div v-if="!cartEmpty">
    <div class="a-cartitems mb2">
      <cart-item 
        v-for="cartItem in cartItems" 
        :key="cartItem.variant._id" 
        :cartItem="cartItem" 
      />
    </div>
    <cart-total class="mb2" :cartItems="cartItems" />
    <cart-privacy-policy v-model="privacyPolicyAccepted" ref="cartprivacypolicy" />
  </div>
  <div v-else class="a-empty">
    {{ $t("cartEmpty") }}
  </div>

  <div class="a-mb"></div>
</div>
</template>

<script lang="ts">

import CartItem from './CartItem.vue'
import CheckoutButton from './CheckoutButton.vue'
import CartPrivacyPolicy from './CartPrivacyPolicy.vue'
import CartTotal from './CartTotal.vue'

export default {
  components: { CartItem, CheckoutButton, CartPrivacyPolicy, CartTotal },
  props: [ "variants", "products" ],
  computed: {
    cartItems(){
      return this.$store.state.cart.lineItems.map(lineItem => ({
        ...lineItem,
        product: this.products.find(a => a._id == lineItem.product),
        variant: this.variants.find(a => a._id == lineItem.variant)
      }))
    },
    cartEmpty(){
      return this.cartItems.filter(a => a.quantity != 0).length == 0
    }
  },
  data() {

    return {
      privacyPolicyAccepted: false
    }
  },
  methods: {
    checkout(){
      
      if(this.cartEmpty) return;
      
      if(!this.privacyPolicyAccepted){
        this.$nextTick(() => {
          this.$refs.cartprivacypolicy.$el.scrollIntoView({ behaviour: "smooth"})
        });
        this.$store.dispatch("notifications/error", this.$t("cartPrivacyPolicyNotAccepted"))
        return;
      }
    }
  }
}
</script>

<style scoped>
.a-cartitems {
  display: flex;
  flex-direction: column;
  gap: calc(var(--default-margin) * 2);
}
.a-empty {
  text-align: left;
}
.a-button-container{
  position: fixed;
  bottom: calc(var(--footer-y-m) + var(--gap));
  z-index: 50;
  width: calc(100% - (var(--padding-x-m) * 2));
}
.a-mb{
  margin-bottom: calc(var(--gap) + var(--button-y));
}
</style>