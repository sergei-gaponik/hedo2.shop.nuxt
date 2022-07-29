<template>
  <client-only>
    <nuxt-link :to="localePath('/me')">
      <profile-icon color="#434343" :height="height" />
    </nuxt-link>
  </client-only>
</template>

<script>
import ProfileIcon from "~/components/icons/navigation/ProfileIcon.vue";

export default {
  components: { ProfileIcon },
  props: ["height"],
};
</script>
