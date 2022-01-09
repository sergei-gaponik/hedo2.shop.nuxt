<template>
<div v-if="step == 1">
  <page-title-m :title="$t('completeRegistration')"/>
  <form @submit.prevent="submitStep1">
    <p>{{ $t('checkoutSignUpText') }}</p>
    <div class="panel mb4">
      {{ contactInfo.email }}
    </div>
    <div class="a-actions">
      <span>
        <div v-if="noAccountLink">
          <span class="nowrap">{{ $t('noAccount') }}&nbsp;</span>
          <span class="link" @click="$emit('setPage', 'signUp')">{{ $t('signUp') }}</span>
        </div>
      </span>
      <primary-button minContent submit>{{ $t('sendCode') }}</primary-button>
    </div>
  </form>
</div>
<div v-else>
  <page-title-m :title="$t('completeRegistration')"/>
  <form @submit.prevent="submitStep2">
    <div class="mb4">
      <text-input 
        type="text"
        :placeholder="$t('verificationCode')"
        :caption="$t('verificationCode')"
        v-model="verificationCode"
        required
      />
      <text-input 
        type="password"
        :placeholder="$t('newPassword')"
        :caption="$t('newPassword')"
        v-model="newPassword"
        required
        pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
        :info="$t('passwordRequiredPattern')"
      />
      <text-input 
        type="password"
        :caption="$t('repeatNewPassword')"
        :placeholder="$t('repeatNewPassword')"
        required
        v-model="repeatPassword"
      />
    </div>
    <div class="a-actions">
      <div class="link" @click="resend">{{ $t('resendCode') }}</div>
      <primary-button minContent submit>{{ $t('signUp') }}</primary-button>
    </div>
  </form>
</div>
</template>

<script>
import TextInput from '~/components/layout/inputs/TextInput.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import auth from '~/core/auth'
import { getIdToken } from '~/util/auth'
import { sanitizeEmailAddress } from '~/util/email'
import PageTitleM from '~/components/layout/header/PageTitleM.vue'
import { randomString } from '~/util/random'
import instanceHandler from '~/core/instanceHandler'

export default {
  components: { TextInput, PrimaryButton, PageTitleM },
  props: {
    noAccountLink: Boolean
  },
  data(){
    return {
      repeatPassword: "",
      verificationCode: "",
      newPassword: "",
      step: 1
    }
  },
  computed: {
    contactInfo(){
      return this.$store.state.checkout.contactInfo
    },
    shippingInfo(){
      return this.$store.state.checkout.shippingInfo
    },
    email(){
      return sanitizeEmailAddress(this.contactInfo.email)
    }
  },
  created(){
    if(!process.client) return;

    if(localStorage.getItem("tempPassword")){
      this.step = 2
    }
  },
  methods: {
    async resend(){
      try {
        await auth().resendSignUp(this.email);
        this.$store.dispatch("notifications/success", this.$t('resendCodeSuccess'))
      } catch (e) {
        console.log(e)
        this.$store.dispatch("notifications/error", this.$t('error'))
      }
    },
    getTempPassword(){
      const tempPassword = localStorage.getItem("tempPassword") || `PW_${randomString(18)}`

      localStorage.setItem("tempPassword", tempPassword)

      return tempPassword
    },
    async submitStep1(){
      if(!this.email){
        this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }

      const address = this.shippingInfo.billingAddressMatchesShippingAddress 
        ? this.shippingInfo.shippingAddress 
        : this.shippingInfo.billingAddress
      
      if(!address){
        this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }
      
      const { firstName, lastName } = address

      try{
        this.$store.commit("loadingState/isLoading")
        await auth().signUp({
          username: this.email,
          password: this.getTempPassword(),
          attributes: {
            given_name: firstName,
            family_name: lastName,
            "custom:newsletter_consent": "0"
          }
        })
        this.$store.commit("loadingState/isReady")
      }
      catch(e){
        console.log(e)
        if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else if(e.name == "UsernameExistsException")
          this.$store.dispatch("notifications/error", this.$t('emailExists'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }

      this.step = 2
    },
    async submitStep2(){
      try{
        if(this.repeatPassword != this.newPassword){
          this.$store.dispatch("notifications/error", this.$t('passwordsDontMatch'))
          return;
        }

        this.$store.commit("loadingState/isLoading")
        try{
          await auth().confirmSignUp(this.email, this.verificationCode)
        }
        catch(e){
          if(e.name != "NotAuthorizedException")
            throw e
        }
        await auth().signIn(this.email, this.getTempPassword())
        const user = await auth().currentAuthenticatedUser()
        await auth().changePassword(user, this.getTempPassword(), this.newPassword)

        const idToken = await getIdToken()

        let addresses = []

        if(this.shippingInfo.billingAddressMatchesShippingAddress){

          addresses.push({
            ...this.shippingInfo.shippingAddress,
            defaultShippingAddress: true,
            defaultBillingAddress: true
          })
        }
        else{
          addresses.push({
            ...this.shippingInfo.shippingAddress,
            defaultShippingAddress: true
          })
          addresses.push({
            ...this.shippingInfo.billingAddress,
            defaultBillingAddress: true,
          })
        }

        await instanceHandler({
          bulk: addresses.map(address => ({
            path: "createUserAddress",
            args: { idToken, address }
          })),
          chronological: true
        })

        this.$store.commit("loadingState/isReady")

        localStorage.removeItem("tempPassword")
        this.$emit("success")
      }
      catch(e){
        console.log(e)

        if(e.name == "CodeMismatchException")
          this.$store.dispatch("notifications/error", this.$t('codeMismatchError'))
        else if(e.name == "ExpiredCodeException")
          this.$store.dispatch("notifications/error", this.$t('codeExpiredError'))
        else if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }
    }
  }
}
</script>

<style scoped>
.a-actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>