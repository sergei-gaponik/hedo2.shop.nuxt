<template>
  <div class="mb2 a-group" v-if="items.length" :style="{ order: order }">
    <h4>{{ title }}</h4>
    <div>
      <list-item
        :class="['a-list-item', $device.isMobile ? '' : 'a-list-item-td']"
        v-for="item in items"
        :key="item._id"
        :caption="displayName(item)"
        @click="_action(item)"
      />
    </div>
  </div>
</template>

<script>
import ListItem from "~/components/layout/common/ListItem.vue";
export default {
  components: { ListItem },
  props: ["items", "title", "order", "href", "displayName"],
  methods: {
    _action(item) {
      this.$store.commit("search/reset");
      this.$router.push(this.localePath(this.href(item)));
    },
  },
};
</script>

<style scoped>
.a-group {
  width: 100%;
}
.a-list-item {
  left: calc(0px - var(--padding-x-m));
  width: calc(100% + var(--padding-x-m) * 2);
}
.a-list-item-td {
  left: calc(0px - var(--padding-x-td));
  width: calc(100% + var(--padding-x-td) * 2);
}
</style>
