<template>
  <div class="a-container">
    <h4 class="a-caption">
      {{ $t('payConvenientlyWith') + ":" }}
    </h4>
    <div class="a-paymentmethods">
      <payment-method-icons />

    </div>
  </div>
</template>

<script>
import PaymentMethodIcons from './PaymentMethodIcons.vue'

export default {
  components: { PaymentMethodIcons }
}
</script>

<style scoped>
.a-container{
  position: relative;
  width: 100%;
  top: 10px;
}
.a-caption{
  position: absolute;
  background-color: white;
  left: 50%;
  top: -25px;
  transform: translateX(-50%);
  color: var(--c-blue-1);
  z-index: 1;
  padding: 0 var(--padding);
  white-space: nowrap;
}

.a-paymentmethods{
  position: relative;
  border-radius: var(--default-border-radius);
  padding: calc(var(--padding) * 2);
  border: var(--border-width) solid var(--c-blue-2);
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

</style>