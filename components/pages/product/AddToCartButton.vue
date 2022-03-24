<template>
<client-only>
  <main-button :ref="'addtocart' + _uid" :disabled="disabled" naked>
    <quantity-selector 
      @decQuantity="decQuantity()"
      @incQuantity="incQuantity()"
      :quantity="quantity"
      :maxQuantity="maxQuantity"
      :disabled="disabled"
    />
    <div class="a-addtocart" @click="clickHandler(_action)">
      {{ $t("addToCart") }}
    </div>
  </main-button>
</client-only>
</template>

<script>
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import MinusIcon from '~/components/icons/basic/MinusIcon.vue'
import MainButton from '~/components/layout/buttons/MainButton.vue'
import clickHandler from '~/util/clickHandler'
import QuantitySelector from '~/components/pages/cart/QuantitySelector.vue'

export default {
  props: [ "maxQuantity", "selectedVariant" ],
  components: { MinusIcon, AddIcon, MainButton, QuantitySelector },
  computed: {
    maxQuantityToAdd(){

      const lineItem = this.$store.state.cart.lineItems.find(a => a.variant == this.selectedVariant._id)

      return  lineItem ?  this.maxQuantity - lineItem.quantity : this.maxQuantity;
    },
    disabled(){
      if(this._created)
        return this.maxQuantityToAdd == 0
      else
        return true
    }
  },
  created(){
    this._created = true

    if(process.client)
      this.$store.commit("cart/init")
  },
  data(){
    return { 
      _created: false,
      quantity: 1,
      lock: false,
    }
  },
  methods: {
    _action(){

      if(this.disabled)
        this.$refs["addtocart" + this._uid].shake()
      else
        this.$refs["addtocart" + this._uid].press()

      this.$emit('action', this.quantity)
      this.quantity = 1
    },
    incQuantity(){
      if(this.quantity < this.maxQuantityToAdd) 
        this.quantity++
    },
    decQuantity(){
      if(this.quantity > 1)
        this.quantity--
    },
    clickHandler
  }
}
</script>

<style scoped>


.a-addtocart{
  color: white;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>