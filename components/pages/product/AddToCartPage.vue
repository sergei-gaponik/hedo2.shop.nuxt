<template>
  <div class="container-m a-page">
    <div class="a-success">
      <success-icon height=112 color="var(--c-green-2)" class="a-icon a-icon-animation" />
      <h4 class="a-caption">{{ $t("addedToCart") }}</h4>
    </div>
    <div class="a-product">
      <div>
        <product-image :src="image" />
      </div>
      <div @click="continueShopping()">
        <product-title 
          :product="product"
          :hideInfoTag="true"
          :hidePrice="true"
          :customTag="customTag"
        />
      </div>
    </div>
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
import ProductImage from './ProductImage.vue'

export default {
  components: { PrimaryButton, SecondaryButton, SuccessIcon, ProductImage },
  props: [ "product", "variant" ],
  methods: {
    continueShopping(){
      this.$store.commit('nav/closeAllDrawers')

    },
    goToCart(){
      this.$store.commit('nav/closeAllDrawers')
      this.$router.push(this.localePath('/cart'))
    }
  },
  computed: {
    image(){
      return this.variant.images?.length ? this.variant.images[0].src : this.product.images[0].src
    },
    customTag(){
      return this.variant.title || ""
    }
  }
}
</script>

<style scoped>
.a-product{
  display: grid;
  grid-template-columns: 100px auto;
  cursor: pointer;
}
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