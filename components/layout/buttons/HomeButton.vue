<template>
  <div>
    <nuxt-link to="/">
      <logo :height="height" color="#434343" />
    </nuxt-link>
  </div>
</template>

<script>

import Logo from '~/components/icons/Logo.vue'

export default {
  components: { Logo },
  props: ["height"]
}
</script>