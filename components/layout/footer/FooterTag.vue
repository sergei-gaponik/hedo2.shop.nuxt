<template>
  <nuxt-link :to="href">
    <div class="a-tag">{{name}}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: ["href", "name"]
}
</script>

<style scoped>
.a-tag {
  color: var(--c-gray-1);
  background-color: white;
padding: 10px 14px;
height: 100%;
border-radius: 25px;
}
</style>