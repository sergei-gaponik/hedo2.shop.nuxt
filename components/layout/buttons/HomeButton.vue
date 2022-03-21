<template>
  <div>
    <nuxt-link :to="localePath('/')">
      <logo :height="height" color="var(--c-gray-1)" />
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