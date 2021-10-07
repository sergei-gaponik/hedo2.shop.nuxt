<template>
<client-only>
  <main-button ref="checkout" :disabled="disabled" @click="handler()">
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
import clickHandler from '~/util/clickHandler'

export default {
  components: { MainButton },
  props: ["disabled", "action"],
  methods: {
    handler(){

      clickHandler(() => {
        if(this.disabled)
          this.$refs.checkout.shake()
        else
          this.$refs.checkout.press()

        this.action()
      })
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