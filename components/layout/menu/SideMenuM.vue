<template>
<div>
  <primary-button>
    {{ $t('login') }}
  </primary-button>

  <div v-for="(menuItem, i) in menuItems" :key="i"></div>
</div>
</template>

<script>
import PrimaryButton from '../buttons/PrimaryButton.vue'
import ExpandLessIcon from '~/components/icons/arrows/ExpandLessIcon.vue'
import ExpandMoreIcon from '~/components/icons/arrows/ExpandMoreIcon.vue'

export default {
  components: { PrimaryButton, ExpandLessIcon, ExpandMoreIcon },
  data(){

    const menuItems = [
    ]

    return {
      menuItems
    }
  }
}
</script>

<style sc
    PrimaryButtonoped>
</style>