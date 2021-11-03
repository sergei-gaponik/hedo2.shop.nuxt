<template>
<div :class="['a-flex', center ? 'a-flex-center' : '']">
  <div :class="['a-container', small ? 'a-small' : '']">
    <input 
      type="checkbox"
      class="a-checkbox"
      :checked="checked" 
      @change="clickHandler(() => $emit('input', $event.target.checked))"
      :required="!!required"
    />
    <span class="a-checkmark" />
  </div>
  <div>
    <slot />
  </div>
</div>
</template>

<script lang="ts">
import clickHandler from '~/util/clickHandler'

export default {
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    required: Boolean,
    checked: Boolean,
    small: Boolean,
    center: Boolean
  },
  data(){
    return {
      lock: false
    }
  },
  methods: {
    clickHandler
  }
}
</script>

<style scoped>
.a-flex{
  display: flex;
  gap: var(--gap);
  flex-wrap: nowrap;
  margin-bottom: var(--default-margin);
}
.a-flex-center{
  align-items: center;
}
.a-container {
  flex-shrink: 0;
  position: relative;
  appearance: none;
  background-color: white;
  font-family: var(--default-font);
  border: 1px solid var(--c-gray-3);
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

.a-checkbox {
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
  width: 60%;
  height: 60%;
}

.a-checkbox:checked ~ .a-checkmark {
  background-color: var(--c-gray-1);
}

.a-checkbox:invalid .a-container{
  border-color: var(--c-red-1);
}

</style>