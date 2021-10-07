<template>
<transition :name="$device.isMobile ? 'a-container-m' : 'a-container'">
  <div v-if="$store.state.notifications.visible" :class="['a-container', $device.isMobile ? 'a-mobile' : '']">
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
  width: var(--mobile-max);
  top: calc(var(--header-y-t) + var(--gap));
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
}
.a-mobile{
  width: calc(100% - (var(--padding-x-m) * 2));
  top: calc(var(--header-y-m) + var(--gap));
  margin: 0 var(--padding-x-m);
  left: 0;
  transform: none;
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

.a-container-m-enter-active, .a-container-m-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
}

.a-container-m-enter{
  opacity: 0;
  transform: translateY(100%);
}

.a-container-m-leave-to{
  opacity: 0;
  transform: translateY(-200%);
}

.a-container-enter-active, .a-container-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
}

.a-container-enter{
  opacity: 0;
  transform: translate(-50%, 100%);
}

.a-container-leave-to{
  opacity: 0;
  transform: translate(-50%, -200%);
}

</style>