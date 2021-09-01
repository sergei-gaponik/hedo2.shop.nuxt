<template>
<client-only>
  <main-button ref="checkout" :disabled="disabled" @click="clickHandler(action)">
    <div class="a-checkout">
      <div>
        {{ $t("checkout") }}
      </div>
    </div>
  </main-button>
</client-only>
</template>

<script>
import MainButton from '~/components/layout/buttons/MainButton.vue'

export default {
  components: { MainButton },
  props: ["disabled", "action"],
  data(){
    return { 
      lock: false,
    }
  },
  methods: {
    clickHandler(action){

      if(this.lock) return;
      
      if(this.disabled)
        this.$refs.checkout.shake()
      else
        this.$refs.checkout.press()

      this.lock = true

      action()

      setTimeout(() => this.lock = false, 100)
    }
  }
}
</script>

<style scoped>


.a-checkout{
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>