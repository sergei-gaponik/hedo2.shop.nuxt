<template>
  <div>
    <nuxt-link :to="localePath('/cart')">
      <cart-icon color="var(--c-gray-1)" :height="height" />
    </nuxt-link>
  </div>
</template>

<script>
import CartIcon from '~/components/icons/navigation/CartIcon.vue'

export default {
  components: { CartIcon },
  props: ["height"]
}
</script>
