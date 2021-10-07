<template>
  <div class="mb2 a-group" v-if="items.length" :style="{ order: order }">
    <h4 class="a-h4">{{ title }}</h4>
    <div :class="['a-list', $device.isMobile ? '' : 'a-list-td']">
      <list-item 
        v-for="item in items"
        :key="item._id"
        :caption="displayName(item)"
        @click="_action(item)"
      />
    </div>
  </div>
</template>

<script>
import ListItem from '~/components/layout/common/ListItem.vue'
export default {
  components: { ListItem },
  props: ["items", "title", "order", "href", "displayName"],
  methods: {
    _action(item){
      this.$store.commit('search/reset')
      this.$router.push(this.localePath(this.href(item)))
    }
  }
}
</script>

<style scoped>
.a-list{
  position: relative;
  left: calc(0px - var(--padding-x-m));
  width: 100vw;
}
.a-list-td{
  left: calc(0px - var(--padding-x-td));
  width: 50vw;
}
</style>