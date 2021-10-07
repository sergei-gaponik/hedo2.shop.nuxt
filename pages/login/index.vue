<template>
  <div :class="[$device.isMobile ? 'container-m' : 'container']">
    <div v-if="page == 'forgotPassword'" class="a-page">
      <forgot-password-page 
        noAccountLink 
        @setPage="setPage" 
        @success="$router.push(localePath('/me'))"
      />
    </div>
    <div v-else>
      <h1>{{ $t('signIn') }}</h1>
      <div :class="['a-container', $device.isMobile ? '' : 'a-td']">
        <sign-in-page 
          @setPage="setPage" 
          @success="$router.push(localePath('/me'))"
        />
        <sign-up-page 
          @success="$router.push(localePath('/me'))"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SignInPage from '~/components/pages/login/SignInPage.vue'
import SignUpPage from '~/components/pages/login/SignUpPage.vue'
import ForgotPasswordPage from '~/components/pages/login/ForgotPasswordPage.vue'

export default {
  components: { SignInPage, SignUpPage, ForgotPasswordPage },
  data(){
    return {
      page: null
    }
  },
  methods: {
    setPage(page){
      this.page = page
    }
  }
}
</script>

<style scoped>
.a-container{
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--padding-x-td) * 2);
}
.a-td{
  grid-template-columns: repeat(2, calc(50% - var(--padding-x-td)));
}
.a-page{
  max-width: var(--mobile-max);
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>