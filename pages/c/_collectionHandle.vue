<template>
  <div class="container-m">
    <bread-crumbs 
      :breadCrumbs="breadCrumbs"
    />
    <collection-page 
      :collection="collectionHandle"
    />
  </div>
</template>

<script>
import CollectionPage from '~/components/pages/collection/CollectionPage.vue'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'

export default {
  components: { CollectionPage, BreadCrumbs },
  data(){

    const collectionHandle = this.$route.params.collectionHandle != "all" 
      ? this.$route.params.collectionHandle : null

    const breadCrumbs = [
      {
        caption: this.$t("allProducts"),
      }
    ]

    return { 
      breadCrumbs,
      collectionHandle
    }
  }
}
</script>