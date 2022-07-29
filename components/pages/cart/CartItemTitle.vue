<template>
  <nuxt-link
    :to="localePath('/p/' + cartItem.product.handle)"
    @click.native="$store.commit('search/reset')"
  >
    <div>
      <div class="text a-brand">{{ cartItem.product.brand.name }}</div>
      <div class="text a-title">
        <span class="bold">{{
          cartItem.product.series ? cartItem.product.series.name : ""
        }}</span>
        <span>{{ cartItem.product.name }}</span>
      </div>
      <div class="a-variant" v-if="variantTitle">
        <tag :caption="variantTitle" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Tag from "~/components/layout/misc/Tag.vue";
export default {
  components: { Tag },
  props: ["cartItem"],
  computed: {
    variantTitle() {
      return this.cartItem.variant.title || null;
    },
  },
};
</script>

<style scoped>
.a-offer-wrapper {
  position: relative;
  height: 2.2em;
}
.a-offer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #a17c5e;
  padding: 0 0.6em 0.2em 0.6em;
  border: 0.1em solid #a17c5e;
  font-size: 0.8em;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: var(--letter-spacing);
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
