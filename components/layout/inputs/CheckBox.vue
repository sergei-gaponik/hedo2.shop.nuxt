<template>
<div :class="['a-container', small ? 'a-small' : '']">
  <input 
    type="checkbox"
    class="a-checkbox"
    :checked="checked" 
    @change="handler($event.target.checked)"
    :required="!!required"
  />
  <span class="a-checkmark" />
</div>
</template>

<script lang="ts">
export default {
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    required: Boolean,
    checked: Boolean,
    small: Boolean
  },
  data(){
    return {
      lock: false
    }
  },
  methods: {
    handler(v){
      if(this.lock) return;

      this.lock = true;

      this.$emit("input", v)

      setTimeout(() => this.lock = false, 100)
    }
  }
}
</script>

<style scoped>
.a-container {
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


</style>