<template>
  <div
    class="a-tag"
    @click="_click"
    :style="{ cursor: clickable ? 'pointer' : 'default' }"
  >
    <span class="a-caption">{{ caption }}</span>
    <span v-if="removeable" @click="_remove" class="a-remove">
      <cross-icon height="12" color="var(--c-gray-1)" />
    </span>
  </div>
</template>

<script>
import CrossIcon from "~/components/icons/basic/CrossIcon.vue";

export default {
  components: { CrossIcon },
  props: {
    removeable: Boolean,
    clickable: Boolean,
    caption: String,
  },
  methods: {
    _remove() {
      this.$emit("remove");
    },
    _click() {
      if (this.clickable) this.$emit("click");
    },
  },
};
</script>

<style scoped>
.a-tag {
  background-color: var(--c-gray-3);
  display: flex;
  align-items: center;
  width: min-content;
  padding: 3px 5px;
  gap: 5px;
  height: min-content;
}
.a-caption {
  color: var(--c-gray-1);
  font-size: 0.75rem;
  white-space: nowrap;
}
.a-remove {
  cursor: pointer;
  display: flex;
}
</style>
