<template>
<div :style='{ fontSize: fontSize + "rem" }'>
  
  <div class="a-offer-wrapper">
    <div class="text a-offer">{{ $t("sale") }}</div> 
  </div>
  <div class="text a-brand">{{ product.brand.name }}</div>
  <div class="text a-title">
    <span class="bold">{{ product.series ? product.series.name : "" }}</span>
    <span>{{ product.name }}</span>
  </div>
  <div class="text a-price">
    <span class="bold">{{ priceCaption }}</span>
    <span v-if="freeShipping">{{ $t("freeShipping") }}</span>
    <span v-else>{{ $t("excludingShipping") }}</span>
  </div>
</div>
</template>

<script>
export default {
  props: ["product", "fontSize"],
  data() {
    const variants = this.$props.product.variants

    return {
      priceCaption: `${variants[0].price.toLocaleString("de-DE")} €`,
      freeShipping: true
    }
  }
}
</script>

<style scoped>
.a-offer-wrapper{
  position: relative;
  height: 2.2em;
}
.a-offer{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #a17c5e;
  padding: 0 0.6em 0.2em 0.6em;
  border: 0.1em solid #a17c5e;
  font-size: 0.8em;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 0.2em;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.a-title {
  height: 2.9em;
  margin-bottom: 1em;
  overflow: hidden;
  color: var(--c-green-1);
  font-size: 1em;
  line-height: 1.5em;
}

.a-brand {
  letter-spacing: 0.1em;
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5em;
}

.a-price {
  letter-spacing: 0.1em;
  font-size: 1em;
  line-height: 1.5em;
}
</style>