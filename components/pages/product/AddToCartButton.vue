<template>
<client-only>
  <main-button :ref="'addtocart' + _uid" :disabled="disabled">
    <div class="a-quantity-selector">
      <div class="a-iconbutton" @click="clickHandler(decQuantity)">
        <minus-icon height=24 :color="disabled ? 'var(--c-green-3)' : 'var(--c-green-2)'" />
      </div>
      <div :class="['a-quantity', disabled ? 'a-quantity-disabled' : '']">
        {{ quantity }}
      </div>
      <div class="a-iconbutton" @click="clickHandler(incQuantity)">
        <add-icon height=24 :color="disabled ? 'var(--c-green-3)' : 'var(--c-green-2)'" />
      </div>
    </div>
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

export default {
  props: [ "maxQuantity", "selectedVariant" ],
  components: { MinusIcon, AddIcon, MainButton },
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
.a-quantity-selector {
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: 100px;
  padding: 0 var(--padding-s)
}

.a-iconbutton{
  padding: 0 var(--padding-s);
}

.a-quantity{
  color: var(--c-green-2);
  font-weight: 600;
  font-size: 18px;
  width: 15px;
  position: relative;
  text-align: center;
}

.a-addtocart{
  color: white;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-quantity-disabled{
  color: var(--c-green-3);
}
</style>