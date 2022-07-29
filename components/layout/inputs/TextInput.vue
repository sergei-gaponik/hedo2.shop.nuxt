<template>
  <div class="a-container">
    <span v-if="caption" class="a-caption"
      >{{ caption }}
      <span v-if="!hideRequiredInfo" class="a-required-info">{{
        required ? " *" : " (optional)"
      }}</span>
    </span>
    <div class="a-input-container">
      <input
        ref="input"
        class="a-input"
        :type="inputType"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :pattern="pattern"
        :autocomplete="autocomplete ? autocomplete : 'off'"
      />
      <div
        class="a-iconbutton"
        v-if="type == 'password'"
        @click="clickHandler(togglePasswordVisible)"
      >
        <visible-icon
          v-if="!passwordVisible"
          color="var(--c-gray-3)"
          height="24"
        />
        <visible-off-icon
          v-if="passwordVisible"
          color="var(--c-gray-3)"
          height="24"
        />
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
import clickHandler from "~/util/clickHandler";

export default {
  components: { InfoIcon, VisibleIcon, VisibleOffIcon },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    required: Boolean,
    hideRequiredInfo: Boolean,
    value: String,
    placeholder: String,
    caption: String,
    info: String,
    type: String,
    pattern: String,
    autocomplete: String,
  },
  data() {
    return {
      passwordVisible: false,
    };
  },
  computed: {
    inputType() {
      if (this.type == "password")
        return this.passwordVisible ? "text" : "password";
      else if (this.type) return this.type;
      else return "text";
    },
  },
  methods: {
    togglePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
    },
    clickHandler,
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
.a-input-container {
  position: relative;
}
.a-input {
  all: unset;
  padding: 0 var(--padding);
  box-sizing: border-box;
  position: relative;
  border: 1px solid var(--c-gray-3);
  height: var(--text-input-y);
  width: 100%;
  background-color: white;
  border-radius: var(--default-border-radius);
}
.a-input:focus {
  border-color: var(--c-gray-1);
  box-shadow: inset 0px 0px 5px var(--c-gray-3);
}
.a-iconbutton {
  cursor: pointer;
  display: flex;
  position: absolute;
  right: var(--padding);
  top: 50%;
  transform: translateY(-50%);
}

.a-required-info {
  color: var(--c-green-2);
}
</style>
