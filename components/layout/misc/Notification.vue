<template>
  <transition :name="$device.isMobile ? 'a-container-m' : 'a-container'">
    <div
      v-if="$store.state.notifications.visible"
      :class="['a-notification', $device.isMobile ? 'a-notification-m' : '']"
    >
      <div
        :class="[
          'a-flex',
          $store.state.notifications.status == 'success'
            ? 'a-success'
            : 'a-error',
        ]"
      >
        <div>
          <success-icon
            height="24"
            color="white"
            v-if="$store.state.notifications.status == 'success'"
          />
          <error-icon
            height="24"
            color="white"
            v-if="$store.state.notifications.status == 'error'"
          />
        </div>
        <div class="a-caption">{{ $store.state.notifications.caption }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import SuccessIcon from "~/components/icons/status/SuccessIcon.vue";
import ErrorIcon from "~/components/icons/status/ErrorIcon.vue";

export default {
  components: { SuccessIcon, ErrorIcon },
};
</script>

<style scoped>
.a-notification {
  position: fixed;
  width: var(--mobile-max);
  top: calc(var(--header-y) + var(--gap));
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
}
.a-notification-m {
  width: calc(100% - (var(--padding-x-m) * 2));
  margin: 0 var(--padding-x-m);
  left: 0;
  transform: none;
}
.a-flex {
  display: flex;
  align-items: center;
  gap: var(--padding);
  padding: var(--padding-s) var(--padding);
  border-radius: 100px;
}
.a-error {
  background-color: var(--c-gray-1);
}
.a-success {
  background-color: var(--c-green-1);
}
.a-caption {
  color: white;
}

.a-container-m-enter-active,
.a-container-m-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
}

.a-container-m-enter {
  opacity: 0;
  transform: translateY(100%);
}

.a-container-m-leave-to {
  opacity: 0;
  transform: translateY(-200%);
}

.a-container-enter-active,
.a-container-leave-active {
  transition: var(--drawer-transition);
  opacity: 1;
}

.a-container-enter {
  opacity: 0;
  transform: translate(-50%, 100%);
}

.a-container-leave-to {
  opacity: 0;
  transform: translate(-50%, -200%);
}
</style>
