<template>
  <div>
    <div v-if="attributes['custom:newsletter_consent'] != '1'" class="panel mb4">
      <div class="mb4">
        <h4>{{ $t('newsletterNotSubscribedYet') }}</h4>
        <p>{{ $t('newsletterSubscribeCaption') }}</p>
      </div>
      <primary-button @click="subscribeNewsletter()">{{ $t('newsletterSubscribe') }}</primary-button>
    </div>
    <collapse :caption="$t('myData')">
      <form @submit.prevent="save()">
        <div class="grid-2-s mb4">
          <text-input 
            :caption="$t('firstName')"
            :placeholder="$t('firstName')"
            v-model="attributes.given_name"
            required
          />
          <text-input 
            :caption="$t('lastName')"
            :placeholder="$t('lastName')"
            v-model="attributes.family_name"
            required
          />
        </div>
        <primary-button submit>{{ $t('save') }}</primary-button>
      </form>
    </collapse>
    <collapse :caption="$t('changePassword')">
      <form @submit.prevent="changePassword()">
        <div class="mb4">
          <text-input 
            type="password"
            :caption="$t('oldPassword')"
            :placeholder="$t('oldPassword')"
            required
            v-model="oldPassword"
          />
          <text-input 
            type="password"
            :placeholder="$t('newPassword')"
            :caption="$t('newPassword')"
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            :info="$t('passwordRequiredPattern')"
            required
            v-model="newPassword"
          />
          <text-input 
            type="password"
            :caption="$t('repeatNewPassword')"
            :placeholder="$t('repeatNewPassword')"
            required
            v-model="repeatPassword"
          />
        </div>
        <primary-button submit>{{ $t('changePassword') }}</primary-button>
      </form>
    </collapse>
    <collapse :caption="$t('newsletter')" v-if="attributes['custom:newsletter_consent'] == '1'">
      <div class="mb4">
        <h4>{{ $t('newsletterAlreadySubscribed') }}</h4>
        <p>{{ $t('newsletterUnsubscribeCaption') }}</p>
      </div>
      <secondary-button @click="unsubscribeNewsletter()">{{ $t('newsletterUnsubscribe') }}</secondary-button>
    </collapse>
    <collapse :caption="$t('manageAccount')">
      <icon-button :caption="$t('signOut')" @click="signOut()">
        <sign-out-icon height=24 color="var(--c-gray-1)"/>
      </icon-button>
    </collapse>
  </div>
</template>

<script>
import TextInput from '~/components/layout/inputs/TextInput.vue'
import auth from '~/core/auth'
import Collapse from '~/components/layout/common/Collapse.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'
import SignOutIcon from '~/components/icons/navigation/SignOutIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'

export default {
  components: { IconButton, TextInput, Collapse, PrimaryButton, SecondaryButton, SignOutIcon },
  data(){

    return {
      attributes: {},
      oldPassword: "",
      newPassword: "",
      repeatPassword: ""
    }
  },
  async fetch(){
    const { attributes } = await auth().currentAuthenticatedUser()

    this.attributes = attributes
  },
  methods: {
    async save(){
      try{

        const user = await auth().currentAuthenticatedUser()
  
        await auth().updateUserAttributes(user, this.attributes)

        this.$store.dispatch("notifications/success", this.$t('dataUpdatedNotification'))

        this.$fetch()
      }
      catch(e){
        console.log(e)
        if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }
    },
    async unsubscribeNewsletter(){
      const confirmation = await this.$store.dispatch('confirmDialog/ask', this.$t('newsletterUnsubscribeConfirm'))

      if(!confirmation) return;

      try{

        const user = await auth().currentAuthenticatedUser()
  
        await auth().updateUserAttributes(user, {
          'custom:newsletter_consent': '0',
        })

        this.$store.dispatch("notifications/success", this.$t('newsletterUnsubscribedNotification'))

        this.$fetch()
      }
      catch(e){
        console.log(e)
        if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }

    },
    async subscribeNewsletter(){
      try{
        const user = await auth().currentAuthenticatedUser()
  
        await auth().updateUserAttributes(user, {
          'custom:newsletter_consent': '1',
        })

        this.$store.dispatch("notifications/success", this.$t('newsletterSubscribedNotification'))

        this.$fetch()
      }
      catch(e){
        console.log(e)
        if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }
    },
    async changePassword(){

      const user = await auth().currentAuthenticatedUser()

      try{
        if(this.repeatPassword != this.newPassword){
          this.$store.dispatch("notifications/error", this.$t('passwordsDontMatch'))
          return;
        }

        await auth().changePassword(user, this.oldPassword, this.newPassword)

        this.$store.dispatch("notifications/success", this.$t('passwordChangedNotification'))
      }
      catch(e){
        console.log(e)
        if(e.name == 'LimitExceededException')
          this.$store.dispatch("notifications/error", this.$t('limitExceededError'))
        else if(e.name == 'NotAuthorizedException')
          this.$store.dispatch("notifications/error", this.$t('incorrectPassword'))
        else
          this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }
      
    },
    async signOut(){
      await auth().signOut()
      localStorage.removeItem("checkoutInfo")
      this.$store.commit("checkout/init")
      this.$router.push(this.localePath('/login'))
    }
  }
}
</script>

<style scoped>

</style>