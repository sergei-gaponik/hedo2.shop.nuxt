<template>
  <client-only>
    <div :class="[
      'a-searchresults', 
      $device.isMobile ? 'a-searchresults-m' : '',
      $device.isTablet ? 'a-searchresults-t' : ''
    ]">
      <div class="mb2 mt"
        v-if="loadingState == 'loading' || products.length"
      >
        <product-list-horizontal 
          :products="products" 
          :cols="$device.isMobile ? 2 : 4" 
        />
        <nuxt-link 
          v-if="products.length"
          :to="localePath('/q/'+$store.state.search.query)" 
          @click.native="$store.commit('search/reset')"
          :class="$device.isMobile ? 'container-m' : 'container'"
        >
          <span class="link-h4">{{ $t('showMore') }}</span>
        </nuxt-link>
      </div>
      <lazy-wrapper>
        <div :class="$device.isMobile ? 'container-m' : 'container'">
          <div v-if="noResults">
            <span class="subdued">
              {{ `${$t('noResultsFor')} „${$store.state.search.query}“`  }}
            </span>
          </div>
          <div :class="['a-results', !$device.isMobile && articles.length ? 'a-results-td' : '']">
            <div 
              :class="['a-results', !$device.isMobile && !articles.length ? 'a-results-td' : '']"
              v-if="brands.length || categories.length || pages.length || series.length"
            >
              <search-result-group 
                :items="brands"
                :title="$t('brands')"
                :order="orderPosition('brands')"
                :href="brand => href('brands', brand)"
                :displayName="brand => brand.name"
              />
              <search-result-group 
                :items="categories"
                :title="$t('collections')"
                :order="orderPosition('categories')"
                :href="category => href('categories', category)"
                :displayName="category => category.name"
              />
              <search-result-group 
                :items="pages"
                :title="$t('pages')"
                :order="orderPosition('pages')"
                :href="page => href('pages', page)"
                :displayName="page => page.name"
              />
              <search-result-group 
                :items="series"
                :title="$t('series')"
                :order="orderPosition('series')"
                :href="series => href('series', series)"
                :displayName="series => series.name"
              />
            </div>
            <div v-if="articles.length" >
              <h4>{{ $t('beautyMagazine') }}</h4>
              <article-list
                :articleSearchResults="articles"
              />
            </div>
          </div>
        </div>
      </lazy-wrapper>
    </div>
  </client-only>
</template>

<script>
import ProductCard from '~/components/pages/collection/ProductCard.vue'
import ProductListHorizontal from '~/components/pages/collection/ProductListHorizontal.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'
import SearchResultGroup from './SearchResultGroup.vue'
import ArticleList from '~/components/pages/blog/ArticleList.vue'

export default {
  components: { LazyWrapper, ProductCard, ProductListHorizontal, ChevronRightIcon, SearchResultGroup, ArticleList },
  computed: {
    loadingState(){
      return this.$store.state.loadingState.loadingState
    },
    noResults(){
      return !this.brands.length && !this.categories.length && !this.pages.length && !this.series.length && !this.articles.length
    }
  },
  methods: {
    orderPosition(key){
      const maxScores = Object.entries(this.$store.state.search.maxScores)

      maxScores.sort((a, b) => b[1] - a[1])

      return maxScores.findIndex(a => a[0] == key) + 1
    },
    href(key, item){
      const p = {
        'brands': brand => `/b/${brand.handle}`,
        'categories': category => `/c/${category.handle}`,
        'pages': page => page.href,
        'series': series => `/s/${series.handle}`,
        'articles': article => `/mag/${article.handle}`
      }
      return p[key](item)
    }
  },
  async fetch() {

    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)

    const { productResults, brandResults, categoryResults, pageResults, articleResults, seriesResults } = this.$store.state.search

    if(!productResults.length && !brandResults.length && !categoryResults.length 
      && !pageResults.length && !articleResults.length && !seriesResults.length) {
      this.products = []
      this.brands = []
      this.categories = []
      this.articles = []
      this.pages = []
      this.series = []
      this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
      return;
    }

    this.pages = pageResults
    this.articles = articleResults
    this.series = seriesResults
    this.brands = brandResults
    this.categories = categoryResults

    const { bulk, loadingState } = await instanceHandler({
      bulk: [
        {
          path: "findProducts",
          args: { ids: productResults },
          cache: true
        }
      ]
    })

    if(loadingState == LoadingState.ready){
      this.products = bulk[0].data?.products || []
    }

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)

  },
  data(){

    return{
      products: [],
      brands: [],
      categories: [],
      pages: [],
      articles: [],
      series: []
    }
  },
  watch: {
    '$store.state.search.productResults': function(){
      this.$fetch()
    },
    '$store.state.search.brandResults': function(){
      this.$fetch()
    },
    '$store.state.search.categoryResults': function(){
      this.$fetch()
    },
    '$store.state.search.pageResults': function(){
      this.$fetch()
    },
    '$store.state.search.articleResults': function(){
      this.$fetch()
    },
    '$store.state.search.seriesResults': function(){
      this.$fetch()
    }
  },
  created() {
    if(process.client){

      window.addEventListener('keydown', async (e) => {

        if(this.$store.state.loadingState.loadingState == LoadingState.loading 
          || this.$store.state.search.loadingState == LoadingState.loading){
          
          return;
        }

        const query = this.$store.state.search.query

        if (e.key == "Enter" && query) {

          const maxScores = Object.entries(this.$store.state.search.maxScores)

          maxScores.sort((a, b) => b[1] - a[1])
          
          let href = '/q/' + query

          if(maxScores.length && maxScores[0][0] != 'products'){

            const map = {
              'brands': this.brands,
              'categories': this.categories,
              'pages': this.pages,
              'articles': this.articles,
              'series': this.series
            }

            const key = maxScores[0][0]

            if(map.hasOwnProperty(key))
              href = this.href(key, map[key][0])
          }
          else if(this.products.length == 1){
            href = '/p/' + this.products[0].handle
          }
          
          this.$store.commit("search/reset")
          this.$router.push(this.localePath(href))
        }
      });
    }
  },
}
</script>

<style scoped>
.a-searchresults{
  overflow-x: hidden;
  position: relative;
  width: 100%;
}

.a-searchresults-m{
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m))
}

.a-searchresults-t{
  height: calc(100vh - var(--header-y-t))
}

.a-results{
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}
.a-results-td{
  grid-template-columns: repeat(2, calc(50% - var(--padding-x-td)));
  gap: calc(var(--padding-x-td) * 2);
}
.a-list{
  position: relative;
  left: calc(0px - var(--padding-x-m));
  width: 100%;
}
.a-list-td{
  left: calc(0px - var(--padding-x-td));
  width: 50%;
}
.a-group{
  max-width: calc(100% - (var(--padding-x-td) * 2));
}
</style>