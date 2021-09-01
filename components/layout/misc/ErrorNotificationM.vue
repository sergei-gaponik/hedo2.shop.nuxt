<template>
<transition name="a-container">
  <div v-if="$store.state.notifications.visible" class="a-container">
    <div class="a-error">
      <div>
        <error-icon height=24 color="white" />
      </div>
      <div class="a-caption"> {{ $store.state.notifications.caption }} </div>
    </div>
  </div>
</transition>
</template>

<script>
import ErrorIcon from '~/components/icons/status/ErrorIcon.vue'

export default {
  components: { ErrorIcon }
}
</script>

<style scoped>
.a-container{
  position: fixed;
  top: calc(var(--header-y-m) + var(--gap));
  width: calc(100% - (var(--padding-x-m) * 2));
  z-index: 99;
  margin: 0 var(--padding-x-m);
}
.a-error{
  background-color: var(--c-gray-1);
  display: flex;
  align-items: center;
  gap: var(--padding);
  padding: var(--padding-s) var(--padding);
  border-radius: 100px;
}
.a-caption{
  color: white;
}

.a-container-enter-active, .a-container-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
}

.a-container-enter{
  opacity: 0;
  transform: translateY(100%);

}

.a-container-leave-to{
  opacity: 0;
  transform: translateY(-200%);
}

</style>