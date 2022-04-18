import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'

interface GlobalSearchParams {
  query: string,
  limit?: number
}

const REQUEST_DELAY = 200

export const state = () => ({
  query: "",
  productResults: [],
  brandResults: [],
  categoryResults: [],
  pageResults: [],
  seriesResults: [],
  articleResults: [],
  maxScores: {},
  loadingState: LoadingState.ready,
  requestIndex: 0,
  searchResultsVisible: false,
  searchBarVisible: false
})

export const mutations = {

  setQuery(_state: any, input: string) {
    _state.query = input
  },

  setResults(_state: any, results: any){
    if(results.products != null) _state.productResults = results.products
    if(results.brands != null) _state.brandResults = results.brands
    if(results.categories != null) _state.categoryResults = results.categories
    if(results.pages != null) _state.pageResults = results.pages
    if(results.articles != null) _state.articleResults = results.articles
    if(results.series != null) _state.seriesResults = results.series
  },

  setMaxScores(_state: any, maxScores: any){
    _state.maxScores = { ..._state.maxScores, ...maxScores }
  },

  setLoadingState(_state: any, _loadingState: LoadingState){
    _state.loadingState = _loadingState
  },

  showSearchResults(_state: any){
    _state.searchResultsVisible = true
    document.body.style.overflow = "hidden"
  },
  
  hideSearchResults(_state: any){
    _state.searchResultsVisible = false
    document.body.style.overflow = "initial"
  },

  showSearchBar(_state: any){
    _state.searchBarVisible = true
  },

  hideSearchBar(_state: any){
    _state.searchBarVisible = false
  },
  
  incrementRequestIndex(_state: any){
    _state.requestIndex++
  },

  reset(_state: any){
    if(_state.query) _state.query = ""
    if(_state.productResults?.length) _state.productResults = []
    if(_state.loadingState != LoadingState.ready) _state.loadingState = LoadingState.ready
    if(_state.requestIndex) _state.requestIndex = 0
    _state.searchResultsVisible = false
    _state.searchBarVisible = false
    document.body.style.overflow = "initial"
    document.getElementById("searchbar-d-input")?.blur()
  }
}

export const actions = {

  async globalSearch(context: any, params: GlobalSearchParams) {

    if(params.query == ""){
      context.commit("reset")
      return;
    }

    if(params.query.length < 2) return;

    context.commit("showSearchResults")
    context.commit("setQuery", params.query)
    
    context.commit("incrementRequestIndex")
    const _requestIndex = context.state.requestIndex

    context.commit("loadingState/setLoadingState", LoadingState.loading, { root: true })

    setTimeout(async () => {
      if(context.state.requestIndex == _requestIndex){

        const { limit: productLimit = 5, query } = params
        
        const limit = 3

        const { loadingState, bulk } = await searchHandler({
          bulk: [
            {
              path: "getProductSearchResults",
              args: { query, limit: productLimit, preview: true },
            },
            {
              path: "getBrandSearchResults",
              args: { query, limit },
            },
            {
              path: "getCategorySearchResults",
              args: { query, limit },
            },
            {
              path: "getPageSearchResults",
              args: { query, limit }
            },
            {
              path: "getSeriesSearchResults",
              args: { query, limit }
            },
            {
              path: "getArticleSearchResults",
              args: { query, limit }
            }
          ],
          cache: true
        })

        context.commit("setResults", {
          products: bulk[0].data.ids,
          brands: bulk[1].data.brands,
          categories: bulk[2].data.categories,
          pages: bulk[3].data.pages,
          series: bulk[4].data.series,
          articles: bulk[5].data.articles
        })

        context.commit("setMaxScores", {
          products: bulk[0].data.maxScore,
          brands: bulk[1].data.maxScore * 4,
          categories: bulk[2].data.maxScore * 2.5,
          pages: bulk[3].data.maxScore * 2.5,
          series: bulk[4].data.maxScore * 2,
          articles: bulk[5].data.maxScore
        })

        context.commit("loadingState/setLoadingState", LoadingState.ready, { root: true })

      }
    }, REQUEST_DELAY)
  },

  async fetchProducts(context: any, params) {

    const { limit = 5, query } = params

    context.commit("loadingState/setLoadingState", LoadingState.loading, { root: true })

    const { loadingState, data } = await searchHandler({
      path: "getProductSearchResults",
      args: { query, limit, preview: true },
      cache: true
    })

    context.commit("loadingState/setLoadingState", loadingState, { root: true })


    if(data?.ids && data.ids.length) 
      context.commit("setProductResults", data.ids)
    else
      context.commit("setProductResults", [])
  }
}