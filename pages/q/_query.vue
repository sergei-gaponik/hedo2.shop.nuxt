<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <bread-crumbs 
      :breadCrumbs="breadCrumbs"
    />
    <collection-page 
      :query="$route.params.query"
    />
  </div>
</template>

<script>
import CollectionPage from '~/components/pages/collection/CollectionPage.vue'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'

export default {
  components: { CollectionPage, BreadCrumbs },
  data(){

    const breadCrumbs = [
      {
        caption: this.$t("allProducts"),
        href: "/c/all"
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