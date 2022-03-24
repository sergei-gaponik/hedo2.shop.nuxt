<template>
  <div class="a-options">
    <div v-for="(variant, index) in variants" :key="variant._id" class="a-option">
      <div class="a-radio">
        <input type="radio" :checked="index == variantIndex" name="variant" class="a-radiobox" @click="$emit('input', index)" >
        <span class="a-checkmark" />
      </div>
      <div>
        {{ getVariantTitle(variant) }}
      </div>
    </div>
  </div>
</template>

<script>
import { getVariantTitle } from '~/util/variants'

export default {
  model: {
    prop: 'variantIndex',
    event: 'input'
  },
  props: ['variants', 'variantIndex'],
  methods: {
    getVariantTitle
  }
}
</script>

<style scoped>

.a-options{
  display: flex;
  gap: var(--gap);
  flex-direction: column;
}
.a-option{
  display: flex;
  gap: var(--padding);
  align-items: center;
}
.a-radio {
  position: relative;
  appearance: none;
  background-color: white;
  font-family: var(--default-font);
  border: var(--padding-s) solid var(--c-green-2);
  border-radius: 100px;
  color: var(--c-gray-1);
  padding: 0 5px;
  height: var(--form-element-y);
  width: var(--form-element-y);
  box-sizing: border-box;
}

.a-small {
  height: 20px;
  width: 20px;
}

.a-radiobox {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  margin: 0;
}

.a-checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 66%;
  height: 66%;
  border-radius: 100px;
}

.a-radiobox:checked ~ .a-checkmark {
  background-color: var(--c-green-2);
}
</style>