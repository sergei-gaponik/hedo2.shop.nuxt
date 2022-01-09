<template>
  <div class="container-slim">
    <h2>{{ $t('paymentCanceled') }}</h2>
    <p class="mb4">{{ $t('paymentCanceledSubHeading') }}</p>
    <div>
      <icon-button
        :caption="$t('chooseAnotherPaymentMethod')"
        minContent
        @click="$router.push(localePath('/checkout'))"
      >
        <chevron-left-icon 
          height=20
          color="var(--c-gray-1)"
        />
      </icon-button>
    </div>

  </div>
</template>

<script>
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'

export default {
  components: { ChevronLeftIcon, IconButton }
}
</script>