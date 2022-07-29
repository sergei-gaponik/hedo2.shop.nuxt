<template>
  <div class="a-red">
    <div :class="$device.isMobile ? 'container-m' : 'container'">
      <div class="a-slogan mb2 mt2">
        <logo v-if="!hideLogo" class="mb2" color="var(--c-red-2)" height="30" />
        <span :class="$device.isMobile ? 'a-line-1-m' : 'a-line-1'"
          >Pflege aus dem Kosmetikinstitut</span
        >
        <span :class="$device.isMobile ? 'a-line-2-m' : 'a-line-2'"
          >established 1990</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/icons/Logo.vue";

export default {
  props: {
    hideLogo: Boolean,
  },
  components: { Logo },
};
</script>

<style scoped>
.a-red {
  background-color: var(--c-red-3-l);
}

.a-slogan {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.a-line-1,
.a-line-1-m {
  font-family: var(--handwriting-font);
  font-size: 3rem;
  color: var(--c-red-2);
  font-weight: 600;
  padding-bottom: var(--padding);
  border-bottom: 1px solid var(--c-red-2-l);
}

.a-line-1-m {
  font-size: 2rem;
}

.a-line-2,
.a-line-2-m {
  position: relative;
  top: -9px;
  background-color: var(--c-red-3-l);
  color: var(--c-red-2);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);
  padding: 0 var(--padding);
}

.a-line-2-m {
  font-size: 0.9rem;
}
</style>
