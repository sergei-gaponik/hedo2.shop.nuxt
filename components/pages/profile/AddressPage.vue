<template>
  
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import { Auth } from 'aws-amplify'

export default {
  fetchOnServer: false,
  async fetch(){

    const user = await Auth.currentAuthenticatedUser();
    const idToken = window.localStorage.getItem(`${user.keyPrefix}.${user.username}.idToken`)

    const r = await instanceHandler({
      path: "getUserAddresses",
      args: { idToken },
    })
    console.log(r)
  }
}
</script>

<style scoped>

</style>