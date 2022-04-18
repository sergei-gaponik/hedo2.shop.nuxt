<template>
  <div>
    <div v-if="!loginPage" class="container-slim">
      <h2>{{ $t('contactInformation') }}</h2>
      <checkout-as-guest 
        @nextStep="nextStep"
        @haveAnAccount="setLoginPage('signIn')"
      />
    </div>
    <div v-if="loginPage == 'signIn'" class="container-slim" >
      <page-title-m 
        :title="$t('signIn')" 
        backButton 
        @back="setLoginPage(null)" 
      />
      <sign-in-page 
        noAccountLink
        hideTitle
        v-if="loginPage == 'signIn'" 
        @setPage="setLoginPage" 
        @verifyEmail="verifyEmail"
        @success="location.reload()"
      />
    </div>
    <forgot-password-page 
      v-if="loginPage == 'forgotPassword'"
      class="container-slim" 
      noAccountLink 
      @setPage="setLoginPage"
    />
    <div 
      v-if="loginPage == 'signUp'"
      class="container-slim" 
    >
      <page-title-m 
        :title="$t('signUp')" 
        backButton 
        @back="setLoginPage('signIn')" 
      />
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
import CheckoutAsGuest from './CheckoutAsGuest.vue'

export default {
  components: { SignInPage, SignUpPage, ForgotPasswordPage, PageTitleM, PrimaryButton, SecondaryButton, VerifyEmailPage, CheckoutAsGuest },
  data(){
    return {
      loginPage: null,
      email: "",
      password: ""
    }
  },
  methods: {
    setLoginPage(page){
      this.loginPage = page
    },
    nextStep(){
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