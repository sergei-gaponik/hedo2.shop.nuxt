<template>
  <div>
    <nuxt-link to="/">
      <cart-icon color="#434343" :height="height" />
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
