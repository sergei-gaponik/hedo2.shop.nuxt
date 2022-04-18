<template>
  <div :class="[
    'a-item', 
    noPadding ? 'a-nopadding' : '', 
    noBorder ? 'a-noborder' : ''
  ]">
    <div :class="[
      'a-itemheader', 
      menuItem.style == 'sale' ? 'a-sale' : '',
      menuItem.style == 'bold' ? 'a-bold' : ''
    ]"
      @click="clickHandler(expandable(menuItem) ? () => toggleItem(menuItem.handle) : action(menuItem))"
    >
      <div>
        {{ menuItem.title || menuItem.name }}
      </div>

      <expand-more-icon v-if="expandable(menuItem)" height=16 color="var(--c-gray-2)" 
        class="a-expandicon"
        :style="{ transform: expanded.includes(menuItem.handle) ? 'rotate(-180deg)' : 'none' }"
      />
    </div>
    <div class="a-subitems" 
      :style="{ 
        maxHeight: expanded.includes(menuItem.handle) ? `${45 * (menuItem.children.length + 1)}px` : 0,
        padding: noSubItemPadding ? 0 : undefined
      }"
    >
      <div v-if="showAll && !menuItem.hideShowAll" class="link-alt mb2" @click="action(menuItem)">{{ $t("showAll") }}</div>
      <slot />
      <div style="height:var(--default-margin)"></div>
    </div>
  </div>
</template>

<script>
import clickHandler from '~/util/clickHandler'
import ExpandMoreIcon from '~/components/icons/arrows/ExpandMoreIcon.vue'

export default {
  components: { ExpandMoreIcon },
  props: {
    menuItem: Object,
    expanded: Array,
    noPadding: Boolean,
    noBorder: Boolean,
    bold: Boolean,
    showAll: Boolean,
    noSubItemPadding: Boolean
  },
  methods: {
    clickHandler,
    expandable(menuItem){
      return !!menuItem.children?.length
    },
    toggleItem(handle){
      if(this.expanded.includes(handle))
        this.$emit("collapse")
      else
        this.$emit("expand")
    },
    action(menuItem){

      this.$store.commit("nav/closeAllDrawers")
      this.$store.commit('search/reset')

      if(menuItem.href)
        this.$router.push(menuItem.href)
    }
  }
}
</script>

<style scoped>
.a-item{
  border-top: 1px solid var(--c-gray-3);
  padding: 0 calc(var(--padding) * 1.5);
  overflow: hidden;
}
.a-nopadding{
  padding: 0;
}
.a-noborder{
  border: none;
}
.a-item:first-child{
  border-top: none;
}
.a-itemheader{
  all: unset;
  min-height: var(--list-item-y);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.a-sale{
  color: var(--c-red-1);
  font-weight: bold;
}
.a-bold{
  font-weight: bold;
}
.a-expandicon{
  transition: var(--drawer-transition);
}
.a-subitems{
  position: relative;
  padding-left: calc(var(--padding) * 1.5);
  transition: var(--drawer-transition);
  max-height: 0;
  overflow: hidden;
}
</style>