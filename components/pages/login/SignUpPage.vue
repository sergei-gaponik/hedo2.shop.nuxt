<template>
<div>
  <h2>{{ $t('newCustomerCaption') }}</h2>
  <form @submit.prevent="submit">
    <div class="mb4">
      <div class="grid-2-s">
        <text-input 
          type="text"
          :placeholder="$t('firstName')"
          :caption="$t('firstName')"
          v-model="givenName"
          required
        />
        <text-input 
          type="text"
          :placeholder="$t('lastName')"
          :caption="$t('lastName')"
          v-model="familyName"
          required
        />
      </div>
      <text-input 
        type="email"
        :placeholder="$t('email')"
        :caption="$t('email')"
        v-model="email"
        required
      />
      <text-input 
        type="password"
        :placeholder="$t('password')"
        :caption="$t('password')"
        pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
        v-model="password"
        required
        :info="$t('passwordRequiredPattern')"
      />
      <text-input
        type="password"
        :placeholder="$t('repeatPassword')"
        :caption="$t('repeatPassword')"
        v-model="repeatPassword"
        required

      />
    </div>
    <div class="mb4">
      <check-box v-model="privacyPolicyConsent" required>
        <span>
          {{ $t("signUpPrivacyPolicy") }}<span class="subdued"> *</span>
        </span>
        <nuxt-link :to="localePath('/privacy')" class="link-alt">
          {{ $t("moreDetails") }}
        </nuxt-link>
      </check-box>
      <check-box v-model="newsletterConsent">
        <span>{{ $t('signUpNewsletterConsent') }}</span>
        <span class="subdued nowrap">{{ '(' + $t('optional') + ')' }}</span>
      </check-box>
    </div>
    <div class="a-actions">
      <span>
        <div v-if="haveAnAccountLink">
          <span class="nowrap">{{ $t('haveAnAccount') }}</span>
          <span class="link" @click="$emit('setPage', 'signIn')">{{ $t('signIn') }}</span>
        </div>
      </span>
      <primary-button minContent submit>{{ $t('signUp') }}</primary-button>
    </div>
  </form>
</div>
</template>

<script>
import TextInput from '~/components/layout/inputs/TextInput.vue'
import CheckBox from '~/components/layout/inputs/CheckBox.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import auth from '~/core/auth'
import { sanitizeEmailAddress } from '~/util/email'

export default {
  components: { TextInput, CheckBox, PrimaryButton },
  props: {
    haveAnAccountLink: Boolean
  },
  data(){
    return {
      email: "",
      password: "",
      repeatPassword: "",
      givenName: "",
      familyName: "",
      newsletterConsent: false,
      privacyPolicyConsent: false
    }
  },
  methods: {
    async submit(){
      const email = sanitizeEmailAddress(this.email)
      try{
        if(!this.privacyPolicyConsent){
          this.$store.dispatch("notifications/error", this.$t('signUpPrivacyPolicyNotAccepted'))
          return;
        }
        if(this.repeatPassword != this.password){
          this.$store.dispatch("notifications/error", this.$t('passwordsDontMatch'))
          return;
        }

        await auth().signUp({
          username: email,
          password: this.password,
          attributes: {
            given_name: this.givenName,
            family_name: this.familyName,
            "custom:newsletter_consent": this.newsletterConsent ? "1" : "0"
          }
        })
      
      }
      catch(e){
        console.log(e)
        if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else if(e.name == 'UsernameExistsException')
          this.$store.dispatch("notifications/error", this.$t('emailExists'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }
      
      this.$emit("success", { email, password: this.password  })
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