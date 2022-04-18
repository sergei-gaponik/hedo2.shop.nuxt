<template>

  <input 
    class="a-input"
    :placeholder="$t('lookingFor')"
    :value="value" 
    ref="input"
    @input="changeValue" />
</template>

<script>
export default {
  computed: {
    value() {
      return this.$store.state.search.query;
    }
  },
  methods: {
    changeValue(e) {
      const limit = this.$device.isMobile ? 5 : 8
      this.$store.dispatch("search/globalSearch", { query: e.target.value, limit })
    },
    focusInput(){
      this.$nextTick(function(){
        this.$refs.input.focus()
      })
    },
  }
}
</script>

<style scoped>
.a-input {
  width: 100%;
  font-size: 20px;
  border: none;
  outline: none;
}
</style>