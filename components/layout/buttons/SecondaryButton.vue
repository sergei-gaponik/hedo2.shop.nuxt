<template>
  <button class="a-button" @click="_action" :type="submit ? 'submit' : 'button'"><slot /></button>
</template>

<script>
export default {
  props: {
    action: Function,
    to: String,
    submit: Boolean
  },
  methods: {
    _action(){

      if(this.$props.submit) return;

      if(this.$props.to)
        this.$router.push(this.$props.to)
      else if(this.$props.action)
        this.$props.action()
    }
  }
}
</script>

<style scoped>
.a-button{
  all: unset;
  cursor: pointer;
  user-select: none;
  height: var(--button-y);
  padding: 0 var(--button-padding-x);
  color: var(--c-green-2);
  background-color: white;
  border-radius: var(--default-border-radius);
  border: var(--border-width) solid var(--c-green-3);
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: var(--letter-spacing);
  box-sizing: border-box;
  font-weight: bold;
}
</style>