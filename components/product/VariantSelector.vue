<template>
  <div>
    <div v-for="(variant, index) in variants" :key="variant._id" >
      <input type="radio" v-model="selectedIndex" :value="index" >
      <label :for="index">{{ variant.title }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["variants", "selectedIndex"],
  watch: {
    selectedIndex(){
      this.$emit("selectionChanged", this.selectedIndex)
    }
  },
  data(){
    return {
      selectedIndex: this.$props.selectedIndex
    }
  }
}
</script>