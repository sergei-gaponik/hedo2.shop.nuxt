<template>
<div>
  <client-only>
    <div v-if="cartLoadingState == 'ready'">
      <div class="a-button-container" v-if="$device.isMobile">
        <checkout-button 
          :disabled="cartEmpty || !privacyPolicyAccepted"
          :action="checkout"
        />
      </div>
      <div v-if="cartEmpty" class="a-empty">
        {{ $t("cartEmpty") }}
      </div>
      <div v-if="!cartEmpty" :class="[$device.isMobile ? '' : 'a-grid-td']">
        <div class="a-cartitems mb2">
          <cart-item 
            v-for="cartItem in cartItems" 
            :key="cartItem.variant._id" 
            :cartItem="cartItem" 
          />
        </div>
        <div class="a-sticky-td">
            <cart-total class="mb2" :cartItems="cartItems" />
            <cart-privacy-policy v-model="privacyPolicyAccepted" ref="cartprivacypolicy" />
            <checkout-button 
              v-if="!$device.isMobile"
              class="mb4 mt4"
              :disabled="cartEmpty || !privacyPolicyAccepted"
              :action="checkout"
            />
        </div>
      </div>
      <div class="a-mb"></div>
    </div>
  </client-only>
</div>
</template>

<script lang="ts">

import CartItem from './CartItem.vue'
import CheckoutButton from './CheckoutButton.vue'
import CartPrivacyPolicy from './CartPrivacyPolicy.vue'
import CartTotal from './CartTotal.vue'
import { GLOBAL } from '~/core/const'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState, LineItem } from '~/types'
import { decodeToken } from '~/util/jwt'
import LazyWrapper from '~/components/util/LazyWrapper.vue'

export default {
  components: { CartItem, CheckoutButton, CartPrivacyPolicy, CartTotal, LazyWrapper },
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
      variants: [],
      products: [],
      privacyPolicyAccepted: false,
      cartLoadingState: LoadingState.ready
    }
  },
  async created(){
    
    this.cartLoadingState = LoadingState.loading

    if(process.client){
      await this._fetch()
      this.cartLoadingState = LoadingState.ready
      this.refreshLineItems()
    }
  },
  methods: {
    async refreshLineItems(){

      let result = true;

      try{

        const cartItems = this.cartItems

        this.$store.commit("loadingState/isLoading")

//#region update variant quantities

        const r = await instanceHandler({
          path: "getVariantQuantities",
          args: { variants: cartItems.map(a => a.variant._id) }
        })

        if(r.loadingState != LoadingState.ready)
          throw new Error()

        for(const { variant, availableQuantity } of r.data.variantQuantities){

          const _variant = this.variants.find(a => a._id == variant)
          
          _variant.availableQuantity = _variant.availableQuantity > availableQuantity ? availableQuantity : _variant.availableQuantity
        }
//#endregion

//#region check lineItem quantities

        const maxQuantity = cartItem => 
          cartItem.variant.maxQuantity != null 
            ? Math.min(cartItem.variant.maxQuantity, cartItem.variant.availableQuantity)
            : cartItem.variant.availableQuantity

        const notEnoughQuantityCartItems = cartItems.filter(a => maxQuantity(a) < a.quantity)

        if(notEnoughQuantityCartItems.length){

          for(const cartItem of notEnoughQuantityCartItems){

            if(maxQuantity(cartItem) > 0){
              this.$store.commit("cart/updateLineItem", {
                variant: cartItem.variant._id,
                quantity: maxQuantity(cartItem)
              })
            }
            else{
              this.$store.commit("cart/removeLineItem", cartItem.variant._id)
            }
          }

          this.$store.dispatch("notifications/error", this.$t("cartQuantityChangedNotification"))
          result = false;
        }
//#endregion

//#region refresh tokens and check prices
        
        const r2 = await instanceHandler({ 
          path: "signLineItems", 
          args: { lineItems: cartItems.map(a => ({ variant: a.variant._id })) } 
        })

        if(r2.loadingState == LoadingState.error)
          throw new Error();

        const tokens = r2.data.tokens

        let updateFlag = false

        for(const i in tokens){

          const { price } = decodeToken(tokens[i])

          if(cartItems[i].price != price){
            updateFlag = true
          }

          this.$store.commit("cart/updateLineItem", {
            variant: cartItems[i].variant._id,
            token: tokens[i],
            price: price
          })
        }
//#endregion


        this.$store.commit("loadingState/isReady")

        if(updateFlag){
          this.$store.dispatch("notifications/error", this.$t("priceChangeNotification"))
          return false; 
        }
      }
      catch(e){
        console.log(e)

        this.$store.commit("loadingState/isReady")
        this.$store.dispatch("notifications/error", this.$t("error"))
        return false;
      }

      return result;
    },
    isValidCartItem(cartItem){

      const { variant, price, iat } = decodeToken(cartItem.token)

      if((iat + GLOBAL.cartItemValidFor) * 1000 > Date.now())
        return variant == cartItem.variant._id && price == cartItem.price;

      return false;
    },
    async checkout(){
      
      if(this.cartEmpty) return;
      
      if(!this.privacyPolicyAccepted){
        this.$nextTick(() => {
          this.$refs.cartprivacypolicy.$el.scrollIntoView({ behaviour: "smooth"})
          this.$refs.cartprivacypolicy.$refs.checkbox.$el.querySelector('.a-container').style.borderColor = "var(--c-red-1)"
        });
        this.$store.dispatch("notifications/error", this.$t("cartPrivacyPolicyNotAccepted"))
        return;
      }

      const ok = await this.refreshLineItems()

      if(ok){
        setTimeout(() => this.$router.push(this.localePath("/checkout")), 200)
        // timeout due to animation
      }
    },
    async _fetch(){

      this.$store.commit('loadingState/setLoadingState', LoadingState.loading)
      this.$store.commit("cart/init")

      const lineItems = this.$store.state.cart.lineItems

      const cartItems = lineItems.map(a => ({ 
        product: a.product, 
        variant: a.variant
      }))

      if(cartItems.length){
        
        const r2 = await instanceHandler({ 
          path: 'findCartItems', 
          args: { cartItems },
          cache: true
        })

        this.variants = r2.data?.variants || []
        this.products = r2.data?.products || []

        this.$store.commit("cart/updateAvailableQuantities", this.variants)
      }
      
      this.$store.commit('loadingState/setLoadingState', LoadingState.ready)

    }
  },
}
</script>

<style scoped>
.a-cartitems {
  display: flex;
  flex-direction: column;
  gap: calc(var(--default-margin) * 2);
  overflow: scroll;
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
.a-grid-td{
  display: grid;
  grid-template-columns: repeat(2, calc(50% - var(--padding-x-td)));
  gap: calc(var(--padding-x-td) * 2);
  box-sizing: border-box;
}
.a-sticky-td{
  position: sticky;
  top: calc(var(--header-y-t) + var(--padding-y-td));
  height: min-content;
}
</style>