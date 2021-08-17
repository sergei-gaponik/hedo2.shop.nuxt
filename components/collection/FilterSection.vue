<template>
<div class="a-container">
  <div class="a-section">
    <div class="a-header">
      <div class="subdued">128 Ergebnisse</div>
      <div>
        <filter-button :action="openFilterDrawer" />
      </div>
    </div>
    <div class="a-applied-filters">
      <tag clickable :caption="$t('resetFilters')" />
      <tag removeable caption="Nachtpflege" />
    </div>
  </div>
</div>
</template>

<script>
import Tag from '~/components/layout/misc/Tag.vue'
import FilterButton from '~/components/layout/buttons/FilterButton.vue'

export default {
  components: { Tag, FilterButton },
  methods: {
    openFilterDrawer(){
      this.$store.commit("nav/openFilterDrawer")
    }
  }
}
</script>

<style scoped>
.a-applied-filters{
  display: flex;
  gap: var(--gap-s);
}
.a-container{
  height: min-content;
  padding: calc(2 * var(--default-margin)) 0;
}
.a-section{
  display: flex;
  flex-direction: column;
  gap: var(--default-margin);
}
.a-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>