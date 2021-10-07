<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <client-only>
      <div v-if="emailVerified">
        <profile-page-m v-if="$device.isMobile" />
      </div>
      <div v-else>
        <verify-email-page />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import ProfilePageM from '~/components/pages/profile/ProfilePageM.vue'
import PageTitleM from '~/components/layout/header/PageTitleM.vue'
import { Auth } from 'aws-amplify'
import VerifyEmailPage from '~/components/pages/profile/VerifyEmailPage.vue'

export default {
  components: { ProfilePageM, PageTitleM, VerifyEmailPage },
  data(){
    return {
      emailVerified: false
    }
  },
  async created(){
    
    if(!process.client) return;

    const { attributes } = await Auth.currentAuthenticatedUser();

    this.emailVerified = attributes.email_verified
  }
}
</script>