<template>
  <div v-if="ready">
    <client-only>
      <div>
        <profile-page-m v-if="$device.isMobile" />
        <profile-page v-else />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import ProfilePageM from "~/components/pages/profile/ProfilePageM.vue";
import ProfilePage from "~/components/pages/profile/ProfilePage.vue";
import PageTitleM from "~/components/layout/header/PageTitleM.vue";
import auth from "~/core/auth";

export default {
  components: { ProfilePageM, ProfilePage, PageTitleM },
  data() {
    return {
      emailVerified: false,
      ready: false,
    };
  },
  async created() {
    if (!process.client) return;

    try {
      const { attributes } = await auth().currentAuthenticatedUser();

      this.emailVerified = attributes.email_verified;
    } catch (e) {
      this.$router.push(this.localePath("/login"));
    }

    this.ready = true;
  },
};
</script>
