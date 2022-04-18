<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <div :class="$device.isDesktop ? 'td-split-1-3' : ''">
      <div v-if="$device.isDesktop">
        <filter-page-d 
          class="td-split-sticky"
          v-if="$device.isDesktop" 
        />
      </div>
      <div>
        <bread-crumbs :breadCrumbs="breadCrumbs" />
        <collection-page 
          :query="$route.params.query"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CollectionPage from '~/components/pages/collection/CollectionPage.vue'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'
import FilterPageD from '~/components/pages/collection/filters/FilterPageD.vue'


export default {
  components: { CollectionPage, BreadCrumbs, FilterPageD },
  data(){

    const breadCrumbs = [
      {
        caption: this.$t("home"),
        href: this.localePath("/")
      },
      {
        caption: `${this.$t("search")}: "${this.$route.params.query}"`
      }
    ]

    return { 
      breadCrumbs 
    }

  }
}
</script>