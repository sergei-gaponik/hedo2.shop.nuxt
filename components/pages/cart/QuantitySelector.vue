<template>
  <div class="a-quantity-selector">
    <div class="a-iconbutton" @click="clickHandler(() => $emit('decQuantity'))">
      <minus-icon height=24 color="var(--c-green-2)" />
    </div>
    <div class="a-quantity">
      {{ quantity }}
    </div>
    <div class="a-iconbutton" @click="clickHandler(() => $emit('incQuantity'))">
      <add-icon height=24 color="var(--c-green-2)" />
    </div>
  </div>
</template>

<script>
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import MinusIcon from '~/components/icons/basic/MinusIcon.vue'

export default {
  props: [ "quantity" ],
  components: { MinusIcon, AddIcon },
  methods: {
    clickHandler(action){

      if(!this.lock) action()

      this.lock = true

      setTimeout(() => this.lock = false, 100)
    }
  },
  data() { 
    return { 
      lock: false
    }
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
  padding: 0 var(--padding-s);
  border: var(--border-width) solid var(--c-green-3);
  width: max-content;
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
</style>