<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <div v-if="loginPage == 'signIn'">
      <div :class="['mb4', $device.isMobile ? '' : 'a-td']">
        <sign-in-page 
          noAccountLink 
          v-if="loginPage == 'signIn'" 
          @setPage="setLoginPage" 
          @success="proceed()"
          @verifyEmail="verifyEmail"
        />
        <div class="divider" v-if="$device.isMobile"></div>
        <div :class="[$device.isMobile ? '' : 'a-newcustomer-td']">
          <h2>{{ $t('newCustomerCaption') }}</h2>
          <div :class="['btn-group-v', 'mt2', $device.isMobile ? 'mb2' : '' ]">
            <primary-button :action="() => setLoginPage('signUp')">{{ $t('signUp') }}</primary-button>
            <secondary-button @click="proceed()">{{ $t('checkoutAsGuest') }}</secondary-button>
          </div>
          <nuxt-link v-if="$device.isMobile" class="link-h4" :to="localePath('/cart')">{{ $t('backToCart') }}</nuxt-link>
        </div>
      </div>
      <nuxt-link v-if="!$device.isMobile" class="link-h4" :to="localePath('/cart')">{{ $t('backToCart') }}</nuxt-link>
    </div>
    <forgot-password-page class="container-slim" noAccountLink v-if="loginPage == 'forgotPassword'" @setPage="setLoginPage"/>
    <div class="container-slim" v-if="loginPage == 'signUp'">
      <page-title-m :title="$t('signUp')" backButton @back="setLoginPage('signIn')" />
      <sign-up-page 
        haveAnAccountLink 
        @setPage="setLoginPage" 
        @success="verifyEmail" 
      />
    </div>
    <verify-email-page 
      v-if="loginPage == 'verifyEmail'"
      class="container-slim" 
      :email="email"
      :password="password"
      @success="proceed()" 
    />
  </div>
</template>

<script>
import SignInPage from '~/components/pages/login/SignInPage.vue'
import SignUpPage from '~/components/pages/login/SignUpPage.vue'
import ForgotPasswordPage from '~/components/pages/login/ForgotPasswordPage.vue'
import PageTitleM from '~/components/layout/header/PageTitleM.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'
import VerifyEmailPage from '../login/VerifyEmailPage.vue'

export default {
  components: { SignInPage, SignUpPage, ForgotPasswordPage, PageTitleM, PrimaryButton, SecondaryButton, VerifyEmailPage },
  data(){
    return {
      loginPage: "signIn",
      email: "",
      password: ""
    }
  },
  methods: {
    setLoginPage(page){
      this.loginPage = page
    },
    proceed(){
      this.$emit("nextStep")
    },
    verifyEmail({ email, password }){
      this.setLoginPage('verifyEmail')
      this.email = email
      this.password = password
    },
  }
}
</script>

<style scoped>
.a-td{
  display: grid;
  gap: calc(var(--padding-x-td) * 2);
  grid-template-columns: repeat(2, calc(50% - var(--padding-x-td)));
}
.a-newcustomer-td{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>