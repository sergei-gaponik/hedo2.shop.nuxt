<template>
  <div class="a-container">
    <span v-if="caption" class="a-caption">{{ caption  }}<span class="subdued">{{ required ? ' *' : ' (optional)' }}</span></span>
    <div class="a-input-container">
      <textarea 
        class="a-input"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :rows="rows || 3"
      />
    </div>
    <span v-if="info" class="a-info">
      <info-icon height="20" color="var(--c-gray-2)" />
      <div>{{ info }}</div>
    </span>
  </div>
</template>


<script lang="ts">
import InfoIcon from '~/components/icons/status/InfoIcon.vue'

export default {
  components: { InfoIcon },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    required: Boolean,
    value: String,
    placeholder: String,
    caption: String,
    info: String,
    rows: Number
  },
}
</script>

<style scoped>
.a-container{
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.a-info{
  display: flex;
  gap: var(--gap);
  color: var(--c-gray-2);
  font-size: 0.9rem;
}
.a-input-container{
  position: relative;
}
.a-input{
  outline: none;
  font-size: var(--font-size);
  padding: var(--padding);
  box-sizing: border-box;
  position: relative;
  border: 1px solid var(--c-gray-3);
  font-family: var(--default-font);
  width: 100%;
  border-radius: var(--default-border-radius);
  resize: none;
}
.a-input:focus{
  border-color: black;
}

</style>