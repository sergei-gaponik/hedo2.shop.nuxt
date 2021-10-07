<template>
  <div :class="['a-button', 
    disabled ? 'a-disabled' : '', 
    shakeAnimation ? 'shake-animation' : '',
    pressAnimation ? 'press-animation' : ''
  ]" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>

export default {
  props: [ "disabled" ],
  data(){
    return {
      shakeAnimation: false,
      pressAnimation: false
    }
  },
  methods: {
    shake(){

      if(this.shakeAnimation == true) return;

      this.shakeAnimation = true

      setTimeout(() => this.shakeAnimation = false, 1000)
    },
    press(){

      if(this.pressAnimation == true) return;

      this.pressAnimation = true

      setTimeout(() => this.pressAnimation = false, 500)
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
  user-select: none;
  box-shadow: 0px 4px 7px rgb(155, 199, 161, 0.5);
}

.a-disabled{
  background-color: var(--c-green-3);
  box-shadow: none;
}
</style>