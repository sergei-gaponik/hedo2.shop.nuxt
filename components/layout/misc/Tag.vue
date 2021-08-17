<template>
  <div class="a-tag" @click="clickable ? _click : undefined" :style="{ cursor: clickable ? 'pointer' : 'default' }">
    <span class="a-caption">{{ caption }}</span>
    <cross-icon class="a-remove" v-if="removeable" @click="_remove" height=10 color="var(--c-gray-1)" />
  </div>
</template>

<script>
import CrossIcon from '~/components/icons/basic/CrossIcon.vue'

export default {
  components: { CrossIcon },
  props: {
    removeable: Boolean,
    clickable: Boolean,
    caption: String
  },
  methods: {
    _remove(){
      this.$emit("remove")
    },
    _click(){
      this.$emit("click")
    }
  }
}
</script>

<style scoped>
.a-tag{
  background-color: var(--c-gray-3);
  display: flex;
  align-items: center;
  width: min-content;
  padding: 3px 5px;
  gap: 5px
}
.a-caption{
  color: var(--c-gray-1);
  font-size: 0.75rem;
  white-space: nowrap;
}
.a-remove{
  cursor: pointer;
}
</style>