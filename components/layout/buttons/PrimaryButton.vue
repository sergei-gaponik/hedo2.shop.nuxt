<template>
  <button
    class="a-button"
    :style="{ width: minContent ? 'min-content' : '100%' }"
    @click="_action"
    :type="submit ? 'submit' : 'button'"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    action: Function,
    to: String,
    submit: Boolean,
    minContent: Boolean,
  },
  methods: {
    _action() {
      if (this.submit) return;

      if (this.to) {
        this.$store.commit("nav/closeAllDrawers");
        this.$router.push(this.to);
      } else if (this.action) this.action();

      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.a-button {
  all: unset;
  cursor: pointer;
  user-select: none;
  height: var(--button-y);
  padding: 0 var(--button-padding-x);
  box-sizing: border-box;
  color: white;
  background-color: var(--c-green-2);
  border-radius: var(--default-border-radius);
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: var(--letter-spacing);
  font-weight: bold;
  white-space: nowrap;
}
</style>
