<template>
  <div>
    <nuxt-link to="/">
      <profile-icon color="#434343" :height="height" />
    </nuxt-link>
  </div>
</template>

<script>
import ProfileIcon from '~/components/icons/navigation/ProfileIcon.vue'

export default {
  components: { ProfileIcon },
  props: ["height"]
}
</script>
