<template>
<div>
  <h2 v-if="!hideTitle">{{ $t('alreadyCustomerCaption') }}</h2>
  <form @submit.prevent="submit">
    <div class="mb4">
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
        v-model="password"
        required
      />
      <span class="link" @click="$emit('setPage', 'forgotPassword')">{{ $t('forgotPassword') }}</span>
    </div>
    <div class="a-actions">
      <span>
        <div v-if="noAccountLink">
          <span class="nowrap">{{ $t('noAccount') }}&nbsp;</span>
          <span class="link" @click="$emit('setPage', 'signUp')">{{ $t('signUp') }}</span>
        </div>
      </span>
      <primary-button minContent submit>{{ $t('signIn') }}</primary-button>
    </div>
  </form>
</div>
</template>

<script>
import TextInput from '~/components/layout/inputs/TextInput.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import auth from '~/core/auth'
import { sanitizeEmailAddress } from '~/util/email'

export default {
  components: { TextInput, PrimaryButton },
  props: {
    noAccountLink: Boolean,
    hideTitle: Boolean
  },
  data(){
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async submit(){
      const email = sanitizeEmailAddress(this.email)

      try{
        this.$store.commit("loadingState/isLoading")
        await auth().signIn(email, this.password)
        this.$store.commit("loadingState/isReady")
      }
      catch(e){
        console.log(e)

        if(e.name == "UserNotConfirmedException")
          this.$emit('verifyEmail', { email, password: this.password })
        else if(e.name == "NotAuthorizedException")
          this.$store.dispatch("notifications/error", this.$t('incorrectEmailOrPassword'))
        else if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))

        return;
      }

      this.$emit("success")
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