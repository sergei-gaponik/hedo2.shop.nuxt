<template>
  <div class="container-m a-page">
    <div class="a-success">
      <success-icon height=112 color="var(--c-green-2)" class="a-icon a-icon-animation" />
      <h4 class="a-caption">{{ $t("addedToCart") }}</h4>
    </div>
    <product-item 
      :product="product" 
      :variant="variant" 
      hidePrice
      @click="continueShopping()"
    />
    <div class="a-buttons">
      <secondary-button :action="continueShopping">{{ $t("continueShopping") }}</secondary-button>
      <primary-button :action="goToCart">{{ $t("goToCart") }}</primary-button>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'
import SuccessIcon from '~/components/icons/status/SuccessIcon.vue'
import ProductItem from './ProductItem.vue'

export default {
  components: { PrimaryButton, SecondaryButton, SuccessIcon, ProductItem },
  props: [ "product", "variant" ],
  methods: {
    continueShopping(){
      this.$store.commit('nav/closeAllDrawers')
    },
    goToCart(){
      this.$store.commit('nav/closeAllDrawers')
      this.$router.push(this.localePath('/cart'))
    }
  }
}
</script>

<style scoped>
.a-page{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: calc(100% - var(--padding-y-m) * 2);
}
.a-buttons{
  display: flex;
  flex-direction: column;
  gap: var(--gap)
}
.a-success{
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}
.a-caption{
  color: var(--c-gray-2);
}
.a-icon {
  opacity: 0.4;
}
.a-icon-animation {
  animation: a-appear 0.7s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes a-appear {

  0% {
    transform: scale(0%);
    opacity: 0;
  }

  50% {
    transform: scale(50%);
    opacity: 0.1;
  }

  75% {
    transform: scale(140%);
    opacity: 0.2;
  }
  
  100% {
    transform: scale(100%);
    opacity: 0.4;
  }
}
</style>