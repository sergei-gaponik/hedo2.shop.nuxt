<template>
  <div class="container-slim">
    <ul class="a-progressbar">
      <li @click="setStep(1)" class="a-active">{{ $t('contact') }}</li>
      <li @click="setStep(2)" :class="$store.state.checkout.step > 1 ? 'a-active' : ''">{{ $t('deliveryInstruction') }}</li>
      <li @click="setStep(3)" :class="$store.state.checkout.step > 2 ? 'a-active' : ''">{{ $t('payment') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    setStep(step){
      if(step <= this.$store.state.checkout.furthestStep){
        this.$emit('setStep', step)
      }
    }
  }
}
</script>

<style scoped>

.a-progressbar {
  padding: 0;
}
.a-progressbar li {
  list-style: none;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  width: 32.5%;
  position: relative;
  text-align: center;
  color: var(--c-gray-2);
}
.a-progressbar li:before {
  content: "";
  counter-increment: step;
  width: 12px;
  height: 12px;
  line-height: 12px;
  border: 2px solid white;
  border-radius: 100%;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  background-color: var(--c-gray-3);
  transition: var(--fast-transition);
}
.a-progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--c-gray-4);
  top: 7px;
  left: -50%;
  z-index : -1;
  transition: var(--fast-transition);
}
.a-progressbar li:first-child:after {
  content: none;
}
.a-progressbar li.a-active {
  color: var(--c-green-1);
}
.a-progressbar li.a-active:before {
  background-color: var(--c-green-2);
} 
.a-progressbar li.a-active + li:after {
  background-color: var(--c-green-2);
}
</style>