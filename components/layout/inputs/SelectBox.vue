<template>
  <div class="a-container">
    <span v-if="caption" class="a-caption"
      >{{ caption
      }}<span class="subdued">{{ required ? " *" : " (optional)" }}</span></span
    >
    <div class="a-select-container">
      <select
        class="a-select"
        :value="value"
        @change="$emit('change', $event.target.value)"
        :required="!!required"
      >
        <option
          v-for="option in computedOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="a-icon">
        <expand-more-icon color="var(--c-gray-3)" height="24" />
      </div>
    </div>
    <span v-if="info" class="a-info">
      <info-icon height="20" color="var(--c-gray-2)" />
      <div>{{ info }}</div>
    </span>
  </div>
</template>

<script lang="ts">
import VisibleIcon from "~/components/icons/basic/VisibleIcon.vue";
import VisibleOffIcon from "~/components/icons/basic/VisibleOffIcon.vue";
import InfoIcon from "~/components/icons/status/InfoIcon.vue";
import ExpandMoreIcon from "~/components/icons/arrows/ExpandMoreIcon.vue";

export default {
  components: { InfoIcon, VisibleIcon, VisibleOffIcon, ExpandMoreIcon },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    required: Boolean,
    value: String,
    caption: String,
    info: String,
    options: Array,
  },
  computed: {
    computedOptions() {
      let _options = [];

      if (this.options.length) {
        if (typeof this.options[0] == "object")
          _options = this.options.map((o) => ({ value: o[0], label: o[1] }));
        else _options = this.options.map((o) => ({ value: o, label: o }));
      }
      return _options;
    },
  },
  data() {
    return {
      passwordVisible: false,
    };
  },
};
</script>

<style scoped>
.a-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  margin-bottom: var(--default-margin);
}
.a-info {
  display: flex;
  gap: var(--gap);
  color: var(--c-gray-2);
  font-size: 0.9rem;
}
.a-select-container {
  position: relative;
}
.a-select {
  all: unset;
  padding: 0 var(--padding);
  box-sizing: border-box;
  position: relative;
  border: 1px solid var(--c-gray-3);
  height: var(--text-input-y);
  width: 100%;
  border-radius: var(--default-border-radius);
}
.a-icon {
  cursor: pointer;
  display: flex;
  position: absolute;
  right: var(--padding);
  top: 50%;
  transform: translateY(-50%);
}
</style>
