<template>
<client-only>
  <div class="container-slim">
    <lazy-wrapper>
      <div class="a-success">
        <success-icon height=112 color="var(--c-green-2)" class="a-icon a-icon-animation" />
        <h4 class="a-caption">{{ $t("orderReceived") }}</h4>
      </div>
      <div v-if="!isAuthenticated">
        <div class="mb4" v-html="$t('checkoutSuccessText')"></div>
        <div>
          <icon-button
            :caption="$t('completeRegistration')"
            minContent
            @click="$router.push(localePath('/checkout/signup'))"
          >
            <sign-in-icon
              height=24
              color="var(--c-gray-1)"
            />
          </icon-button>
        </div>
      </div>
      <div v-if="isAuthenticated">
        <div class="mb4" v-html="$t('checkoutSuccessAuthenticatedText')"></div>
        <div>
          <icon-button
            :caption="$t('goToMainMenu')"
            minContent
            @click="$router.push(localePath('/'))"
          >
            <chevron-left-icon 
              height=20
              color="var(--c-gray-1)"
            />
          </icon-button>
        </div>
      </div>
    </lazy-wrapper>
  </div>
</client-only>
</template>

<script>
import SuccessIcon from '~/components/icons/status/SuccessIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'
import SignInIcon from '~/components/icons/navigation/SignInIcon.vue'
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import auth from '~/core/auth'
import instanceHandler from '~/core/instanceHandler'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { LoadingState } from '~/types'

export default {
  components: { SuccessIcon, IconButton, SignInIcon, LazyWrapper, ChevronLeftIcon },
  data(){
    return {
      isAuthenticated: false,
      ready: false
    }
  },
  fetchOnServer: false,
  async fetch(){

    try{
      await auth().currentAuthenticatedUser()
      this.isAuthenticated = true
    }
    catch(e){
      this.isAuthenticated = false
    }

    if(!this.$route.query.p || !this.$route.query.sid){
      this.$store.commit("cart/reset")
      this.$store.commit("checkout/init")
      this.$store.commit("checkout/setStep", 1)
      return;
    }

    this.$store.commit("loadingState/isLoading")

    const r = await instanceHandler({
      path: "completeCheckoutSession",
      args: {
        paymentProvider: this.$route.query.p,
        sessionId: this.$route.query.sid,
        hppSession: this.$route.query.sid,
        uuid: this.$route.query.sid
      }
    })

    if(r.loadingState == LoadingState.ready){
      this.$router.push(this.localePath('/checkout/success'))
    }
    else{
      this.$router.push(this.localePath('/checkout/cancel'))
    }

    this.$store.commit("loadingState/isReady")
  },
  watch: {
    "$route.query.sid": function(){
      this.$fetch()
    }
  }
}
</script>

<style scoped>
.a-success{
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}
.a-caption{
  color: var(--c-gray-2);
}
.a-icon {
  opacity: 0.4;
}
</style>