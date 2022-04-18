<template>
  <form @submit.prevent="nextStep()">
    <div class="mb2">
      <text-input 
        type="email"
        :placeholder="$t('email')"
        :caption="$t('email')"
        :value="$store.state.checkout.contactInfo.email"
        @input="v => setContactInfo('email', v)"
        required
        autocomplete="email"
      />
    </div>
    <div class="mb2">
      <span class="link" @click="$emit('haveAnAccount')">
        {{ $t('haveAnAccount') }}
      </span>
    </div>
    <checkout-privacy-policy  
      :checked="$store.state.checkout.contactInfo.privacyPolicyAccepted"
      @input="v => setContactInfo('privacyPolicyAccepted', v)"
    />
    <div :class="$device.isMobile ? 'main-button-m' : 'mt4'">
      <main-button :disabled="!$store.state.checkout.contactInfo.privacyPolicyAccepted" submit>
        {{ $t('nextStep') }}
      </main-button>
    </div>
  </form>
</template>

<script>
import CheckoutPrivacyPolicy from './CheckoutPrivacyPolicy.vue'
import MainButton from '~/components/layout/buttons/MainButton.vue'
import TextInput from '~/components/layout/inputs/TextInput.vue'

export default {
  components: { CheckoutPrivacyPolicy, MainButton, TextInput },
  
  data(){
    return {
      ready: false,
    }
  },
  methods: {
    setContactInfo(attribute, value){
      this.$store.commit("checkout/setContactInfo", [ attribute, value ])
    },

    nextStep(){
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>

</style>