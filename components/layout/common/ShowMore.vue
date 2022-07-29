<template>
  <div @click="$emit('input', !showMore)">
    <div class="a-container">
      <expand-more-icon
        height="16"
        color="var(--c-gray-3)"
        :class="showMore ? 'a-icon a-rotate' : 'a-icon'"
      />
      <div class="text">
        {{
          !showMore
            ? showMoreCaption || $t("showMore")
            : showLessCaption || $t("showLess")
        }}
      </div>
    </div>
  </div>
</template>

<script>
import ExpandMoreIcon from "~/components/icons/arrows/ExpandMoreIcon.vue";

export default {
  model: {
    prop: "showMore",
    event: "input",
  },
  props: {
    showMore: Boolean,
    showMoreCaption: String,
    showLessCaption: String,
  },
  components: { ExpandMoreIcon },
};
</script>

<style scoped>
.a-container {
  display: flex;
  gap: var(--gap);
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.a-icon {
  position: relative;
}
.a-rotate {
  transform: rotate(180deg);
}
</style>
