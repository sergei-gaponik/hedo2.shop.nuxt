<template>
  <div :class="['a-button', disabled ? 'a-disabled' : '']" ref="mainbutton" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>

export default {
  props: [ "disabled" ],
  methods: {
    shake(){

      this.$refs.mainbutton.classList.add('shake-animation')

      setTimeout(() => this.$refs.mainbutton.classList.remove('shake-animation'), 1000)
    },
    press(){

      this.$refs.mainbutton.classList.add('press-animation')

      setTimeout(() => this.$refs.mainbutton.classList.remove('press-animation'), 500)
    }
  }
}
</script>

<style scoped>
.a-button {
  cursor: pointer;
  width: 100%;
  height: var(--button-y);
  background-color: var(--c-green-2);
  border-radius: calc(var(--button-y) / 2);
  display: flex;
  align-items: center;
  padding: var(--padding-s);
  box-sizing: border-box;
}

.a-disabled{
  background-color: var(--c-green-3);
}
</style>