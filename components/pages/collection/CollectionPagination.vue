<template>
  <div :class="['a-container', $device.isMobile ? 'a-container-m' : '']">
    <div v-if="!$device.isMobile" class="a-results">
      <div class="a-caption">
        {{ $t("results") + ":" }}
      </div>
      <div class="a-options">
        <div
          v-for="option in [24, 48, 72]"
          :key="option"
          @click="$emit('setLimit', option)"
          :class="[
            'a-caption',
            'a-option',
            option == limit ? 'a-selected' : '',
          ]"
        >
          {{ option }}
        </div>
      </div>
      <div></div>
    </div>
    <div class="a-pagination">
      <div class="a-iconbutton" @click="clickHandler(() => $emit('prevPage'))">
        <chevron-left-icon
          height="40"
          :color="hasPrevPage ? 'var(--c-gray-2)' : 'var(--c-gray-3)'"
        />
      </div>
      <div class="a-caption">
        {{ $t("page") }} <span class="a-num">{{ page }}</span>
        {{ $t("pageOf") }} <span class="a-num">{{ totalPages }}</span>
      </div>
      <div class="a-iconbutton" @click="clickHandler(() => $emit('nextPage'))">
        <chevron-right-icon
          height="40"
          :color="hasNextPage ? 'var(--c-gray-2)' : 'var(--c-gray-3)'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeftIcon from "~/components/icons/arrows/ChevronLeftIcon.vue";
import ChevronRightIcon from "~/components/icons/arrows/ChevronRightIcon.vue";
import clickHandler from "~/util/clickHandler";

export default {
  components: { ChevronLeftIcon, ChevronRightIcon },
  props: ["page", "totalPages", "limit"],
  computed: {
    hasPrevPage() {
      return this.page > 1;
    },
    hasNextPage() {
      return this.page < this.totalPages;
    },
  },
  methods: {
    clickHandler,
  },
};
</script>

<style scoped>
.a-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.a-container-m {
  grid-template-columns: 1fr;
}
.a-iconbutton {
  cursor: pointer;
  user-select: none;
  padding: 0 var(--padding);
}
.a-pagination {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.a-results {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.a-options {
  display: flex;
  align-items: center;
  gap: var(--gap);
}
.a-option {
  color: var(--c-gray-2) !important;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
}
.a-selected {
  color: var(--c-gray-3) !important;
}
.a-caption {
  color: var(--c-gray-1);
  letter-spacing: var(--letter-spacing);
}
.a-num {
  font-size: 1.2em;
}
</style>
