<template>
  <div>
    <nuxt-link :to="switchLocalePath(getNextLocaleCode())">
      <span class="a-text">
        {{ $i18n.locale }}
      </span>
    </nuxt-link>
  </div>
</template>

<style scoped>
.a-text {
  font-family: var(--default-font);
  color: var(--c-gray-1);
  font-size: 18px;
  text-transform: uppercase;
  text-decoration: none;
}
</style>

<script>

export default {
  props: ["region"],
  methods: {
    getNextLocaleCode(){

      let index = this.$i18n.locales
        .findIndex(a => a.code == this.$i18n.locale)

      index++

      if(index >= this.$i18n.locales.length)
        index = 0

      return this.$i18n.locales[index].code

    }
  }
}
</script>