<template>
<div>
  <div class="a-iconbutton" @click="clickHandler(() => $emit('prevPage'))">
    <chevron-left-icon height=24 color="var(--c-gray-3)" />
  </div>
  <div class="a-iconbutton" @click="clickHandler(() => $emit('nextPage'))">
    <chevron-right-icon height=24 color="var(--c-gray-3)" />
  </div>
</div>
</template>

<script>
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'

export default {
  components: { ChevronLeftIcon, ChevronRightIcon },
  data(){
    return {
      lock: false
    }
  },
  methods: {
    clickHandler(_action){

      if(this.lock) return;

      this.lock = true;

      _action()

      setTimeout(() => this.lock = false, 100)
    }
  }
}
</script>

<style scoped>
.a-iconbutton{
  cursor: pointer;
  user-select: none;
}
</style>