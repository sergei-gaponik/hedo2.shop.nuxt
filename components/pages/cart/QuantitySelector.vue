<template>
  <div :class="['a-quantity-selector', this.border ? 'a-border' : '']">
    <div
      :class="['a-iconbutton', minusDisabled ? '' : 'pointer']"
      @click="clickHandler(() => $emit('decQuantity'))"
    >
      <minus-icon
        height="24"
        :color="minusDisabled ? 'var(--c-green-3)' : 'var(--c-green-2)'"
      />
    </div>
    <div :class="['a-quantity', disabled ? 'a-quantity-disabled' : '']">
      {{ quantity }}
    </div>
    <div
      :class="['a-iconbutton', plusDisabled ? '' : 'pointer']"
      @click="clickHandler(() => $emit('incQuantity'))"
    >
      <add-icon
        height="24"
        :color="plusDisabled ? 'var(--c-green-3)' : 'var(--c-green-2)'"
      />
    </div>
  </div>
</template>

<script>
import AddIcon from "~/components/icons/basic/AddIcon.vue";
import MinusIcon from "~/components/icons/basic/MinusIcon.vue";
import clickHandler from "~/util/clickHandler";

export default {
  props: {
    quantity: Number,
    maxQuantity: Number,
    border: Boolean,
    disabled: Boolean,
  },
  components: { MinusIcon, AddIcon },
  computed: {
    minusDisabled() {
      return this.disabled || this.quantity <= 1;
    },
    plusDisabled() {
      return this.disabled || this.quantity >= this.maxQuantity;
    },
  },
  methods: {
    clickHandler,
  },
  data() {
    return {
      lock: false,
    };
  },
};
</script>

<style scoped>
.a-quantity-selector {
  background-color: #fff;
  display: flex;
  align-items: center;
  /* height: 100%; */
  border-radius: 100px;
  padding: 0 var(--padding-s);
  width: max-content;
}

.a-border {
  border: var(--border-width) solid var(--c-green-3);
}

.a-iconbutton {
  padding: 0 var(--padding-s);
}

.a-quantity {
  color: var(--c-green-2);
  font-weight: 600;
  font-size: 18px;
  width: 15px;
  position: relative;
  text-align: center;
}

.a-quantity-disabled {
  color: var(--c-green-3);
}
</style>
