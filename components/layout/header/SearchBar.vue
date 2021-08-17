<template>
<form v-on:submit.prevent="submitForm">

  <input 
    class="a-input"
    :placeholder="$t('lookingFor')"
    :value="value" 
    ref="input"
    @input="changeValue" />
</form>
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
      this.$store.dispatch("search/globalSearch", { query: e.target.value })
    },
    focusInput(){
      this.$nextTick(function(){
        this.$refs.input.focus()
      })
    },
    submitForm(){ 
      this.$router.push(this.localePath('/q/'+ this.value))
      this.$store.commit("search/reset")

    }
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