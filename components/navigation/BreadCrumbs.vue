<template>
  <div v-if="breadCrumbs.length >= 2">
    <div class="a-items">
      <div v-for="(breadCrumb, index) in breadCrumbs.slice(0, -1)" :key="index" class="a-item">
        <nuxt-link :to="breadCrumb.href">
          <div class="a-caption">{{ breadCrumb.caption }}</div>
        </nuxt-link>
        <chevron-right-icon color="var(--c-gray-3)" height=16 />
      </div>
    </div>
    <div class="h2 a-title">
      {{ breadCrumbs[breadCrumbs.length - 1].caption }}
    </div>
  </div>
</template>

<script>
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'

export default {
  components: { ChevronRightIcon },
  props: [ "breadCrumbs" ]
}
</script>

<style scoped>
.a-title{
  text-align: center;
  margin: 0 0 var(--default-margin) 0;
}
.a-caption{
  color: var(--c-gray-1);
}
.a-items{
  display: flex;
  align-items: center;
  overflow: scroll;
  height: var(--breadcrumbs-y-m);
}
.a-item{
  display: flex;
  flex-shrink: 0;
  align-items: center;
}
</style>