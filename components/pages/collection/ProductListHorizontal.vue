<template>
  <div class="a-plist-container" ref="slider">
    <div
      v-if="multipleItems"
      @click="clickHandler(prevItem)"
      :class="['a-icon-button a-left', leftDisabled ? 'a-disabled' : '']"
    >
      <chevron-left-icon height="36" color="var(--c-gray-3)" />
    </div>
    <div class="a-horizontal-list">
      <product-card
        v-for="product in computedProducts"
        :key="product._id"
        :product="product._dummy ? null : product"
        :dummy="product._dummy"
        class="a-product"
        :style="{
          minWidth: cardWidth,
          maxWidth: cardWidth,
          left: `${0 - pos}%`,
        }"
      />
    </div>
    <div
      v-if="multipleItems"
      @click="clickHandler(nextItem)"
      :class="['a-icon-button a-right', rightDisabled ? 'a-disabled' : '']"
    >
      <chevron-right-icon class="a-icon" height="36" color="var(--c-gray-3)" />
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/pages/collection/ProductCard.vue";
import ChevronLeftIcon from "~/components/icons/arrows/ChevronLeftIcon.vue";
import ChevronRightIcon from "~/components/icons/arrows/ChevronRightIcon.vue";
import clickHandler from "~/util/clickHandler";
import { createTouchSlider } from "~/util/touch";

export default {
  components: { ProductCard, ChevronLeftIcon, ChevronRightIcon },
  props: {
    products: Array,
    cols: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      pos: 0,
    };
  },
  computed: {
    multipleItems() {
      return this.products?.length > this.cols;
    },
    computedProducts() {
      if (this.products?.length) return this.products;
      else
        return [...Array(this.cols).keys()].map((a) => ({
          _id: a,
          _dummy: true,
        }));
    },
    cardWidth() {
      return `${Math.round(100 / (this.cols || 2))}%`;
    },
    maxPos() {
      if (!this.products?.length) return 0;

      return (100 / this.cols) * (this.products.length - this.cols);
    },
    leftDisabled() {
      return this.pos <= 0;
    },
    rightDisabled() {
      return this.pos >= this.maxPos;
    },
  },
  mounted() {
    createTouchSlider(this.$refs.slider, this.prevItem, this.nextItem);
  },
  methods: {
    clickHandler,
    prevItem() {
      this.pos = Math.max(this.pos - 100, 0);
    },
    nextItem() {
      this.pos = Math.min(this.pos + 100, this.maxPos);
    },
  },
};
</script>

<style scoped>
.a-plist-container {
  position: relative;
  display: flex;
  align-items: center;
}
.a-horizontal-list {
  scroll-snap-type: x mandatory;
  overflow: hidden;
  display: flex;
  position: relative;
  width: 100%;
}
.a-product {
  scroll-snap-align: start;
  padding: var(--padding);
  box-sizing: border-box;
  position: relative;
  transition: var(--slow-transition);
}
.a-icon-button {
  position: relative;
  transition: var(--transition);
  opacity: 1;
  cursor: pointer;
}
.a-right {
  right: 0;
}
.a-left {
  left: 0;
}
.a-disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
