<template>
<div>
  <button v-if="submit" class="hide" type="submit" ref="btnsubmit"></button>
  <div 
    :class="['a-button', 
      disabled ? 'a-disabled' : '', 
      shakeAnimation ? 'shake-animation' : '',
      pressAnimation ? 'press-animation' : ''
    ]" 
    @click="handler"
  >
    <slot v-if="naked" />
    <div v-else class="a-inner">
      <div>
        <slot />
      </div>
    </div>
    
  </div>
</div>
</template>

<script>
import clickHandler from '~/util/clickHandler'

const ACTION_DELAY = 200 // small delay due to animation

export default {
  props: {
    disabled: Boolean,
    naked: Boolean,
    action: Function,
    submit: Boolean
  },
  data(){
    return {
      shakeAnimation: false,
      pressAnimation: false
    }
  },
  methods: {
    handler(){

      clickHandler(() => {

        if(this.disabled){
          this.shake()

          setTimeout(() => {
            if(this.submit && this.$refs.btnsubmit)
              this.$refs.btnsubmit.click()

          }, ACTION_DELAY)
        }
        else{
          this.press()

          setTimeout(() => {
            

            if(this.submit && this.$refs.btnsubmit)
              this.$refs.btnsubmit.click()
            else if(this.action) 
              this.action()
            else
              this.$emit('click')
              
          }, ACTION_DELAY)

          
        }
      })
    },
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

.a-inner{
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>