<template>
  <div @click="clickHandler(action)">
    <span class="a-text">
      {{ $i18n.locale }}
    </span>
  </div>
</template>

<style scoped>
.a-text {
  font-family: var(--default-font);
  color: var(--c-gray-1);
  font-size: 18px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}
</style>

<script>
import clickHandler from "~/util/clickHandler";

export default {
  props: ["region"],
  methods: {
    action() {
      this.$router.push(this.switchLocalePath(this.getNextLocaleCode()));
    },
    getNextLocaleCode() {
      let index = this.$i18n.locales.findIndex(
        (a) => a.code == this.$i18n.locale
      );

      index++;

      if (index >= this.$i18n.locales.length) index = 0;

      return this.$i18n.locales[index].code;
    },
    clickHandler,
  },
};
</script>
