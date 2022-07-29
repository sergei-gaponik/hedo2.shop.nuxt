<template>
  <div>
    <div class="a-container">
      <div class="a-header" @click="clickHandler(toggle)">
        <h4>{{ caption }}</h4>
        <expand-more-icon
          height="20"
          color="var(--c-gray-1)"
          class="a-expandicon"
          :style="{ transform: collapsed ? 'rotate(-180deg)' : 'none' }"
        />
      </div>
      <div class="panel" v-if="collapsed">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import ExpandMoreIcon from "~/components/icons/arrows/ExpandMoreIcon.vue";
import clickHandler from "~/util/clickHandler";

export default {
  components: { ExpandMoreIcon },
  props: ["caption"],
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    clickHandler,
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style scoped>
.a-header {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--gap-s);
}
</style>
