<template>
  <div v-if="breadCrumbs.length">
    <div class="a-items hide-scrollbar" v-if="breadCrumbs.length > 1">
      <div
        v-for="(breadCrumb, index) in breadCrumbsLine"
        :key="index"
        class="a-item"
      >
        <nuxt-link v-if="breadCrumb.href" :to="breadCrumb.href">
          <div class="a-caption">{{ breadCrumb.caption }}</div>
        </nuxt-link>
        <div v-else class="a-caption">{{ breadCrumb.caption }}</div>
        <chevron-right-icon
          v-if="!inline || index < breadCrumbsLine.length - 1"
          color="var(--c-gray-3)"
          height="16"
        />
      </div>
    </div>
    <div
      v-if="!inline"
      :class="['h2', 'a-title', breadCrumbs.length > 1 ? 'a-nomt' : '']"
    >
      {{ breadCrumbs[breadCrumbs.length - 1].caption }}
    </div>
  </div>
</template>

<script>
import ChevronRightIcon from "~/components/icons/arrows/ChevronRightIcon.vue";

export default {
  components: { ChevronRightIcon },
  props: {
    breadCrumbs: Array,
    inline: Boolean,
  },
  computed: {
    breadCrumbsLine() {
      return this.inline ? this.breadCrumbs : this.breadCrumbs.slice(0, -1);
    },
  },
};
</script>

<style scoped>
.a-nomt {
  margin-top: 0;
}
.a-title {
  text-align: center;
  margin-bottom: calc(var(--default-margin) * 4);
}
.a-caption {
  color: var(--c-gray-1);
}
.a-items {
  display: flex;
  align-items: center;
  overflow: scroll;
  height: var(--breadcrumbs-y-m);
}
.a-center {
  display: flex;
  justify-content: center;
}
.a-item {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}
</style>
