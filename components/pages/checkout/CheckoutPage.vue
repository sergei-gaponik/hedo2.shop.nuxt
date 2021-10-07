<template>
<client-only>
  <div>
    <div v-if="loginPage == 'signIn'">
      <div :class="['mb4', $device.isMobile ? '' : 'a-td']">
        <sign-in-page noAccountLink v-if="loginPage == 'signIn'" @setPage="setLoginPage"/>
        <div class="divider" v-if="$device.isMobile"></div>
        <div :class="[$device.isMobile ? '' : 'a-newcustomer-td']">
          <h2>{{ $t('newCustomerCaption') }}</h2>
          <div :class="['a-buttons', 'mt2', $device.isMobile ? 'mb2' : '' ]">
            <primary-button :action="() => setLoginPage('signUp')">{{ $t('signUp') }}</primary-button>
            <secondary-button>{{ $t('checkoutAsGuest') }}</secondary-button>
          </div>
          <nuxt-link v-if="$device.isMobile" class="link-h4" :to="localePath('/cart')">{{ $t('backToCart') }}</nuxt-link>
        </div>
      </div>
      <nuxt-link v-if="!$device.isMobile" class="link-h4" :to="localePath('/cart')">{{ $t('backToCart') }}</nuxt-link>
    </div>
    <forgot-password-page noAccountLink v-if="loginPage == 'forgotPassword'" @setPage="setLoginPage"/>
    <div v-if="loginPage == 'signUp'">
      <page-title-m :title="$t('signUp')" backButton @back="setLoginPage('signIn')" />
      <sign-up-page haveAnAccountLink @setPage="setLoginPage"/>
    </div>
  </div>
</client-only>
</template>

<script>
import SignInPage from '~/components/pages/login/SignInPage.vue'
import SignUpPage from '~/components/pages/login/SignUpPage.vue'
import ForgotPasswordPage from '~/components/pages/login/ForgotPasswordPage.vue'
import PageTitleM from '~/components/layout/header/PageTitleM.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'


export default {
  components: { SignInPage, SignUpPage, ForgotPasswordPage, PageTitleM, PrimaryButton, SecondaryButton },
  data(){
    return {
      loginPage: "signIn"
    }
  },
  methods: {
    setLoginPage(page){
      this.loginPage = page
    }
  },
  watch: {
    loginPage(v){
      console.log(v)
    }
  }
}
</script>

<style scoped>
.a-buttons{
  display: flex;
  flex-direction: column;
  gap: var(--gap)
}
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