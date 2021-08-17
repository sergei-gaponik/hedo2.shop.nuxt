import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'

interface GlobalSearchParams {
  query: string,
  options?: any
}

const REQUEST_DELAY = 200

export const state = () => ({
  query: "",
  productResults: [],
  loadingState: LoadingState.ready,
  requestIndex: 0,
  searchResultsVisible: false,
  searchBarVisible: false
})

export const mutations = {

  setQuery(_state: any, input: string) {
    _state.query = input
  },

  setProductResults(_state: any, _productResults: any[]){
    _state.productResults = _productResults
  },

  setLoadingState(_state: any, _loadingState: any[]){
    _state.loadingState = _loadingState
  },

  showSearchResults(_state: any){
    _state.searchResultsVisible = true
  },
  
  hideSearchResults(_state: any){
    _state.searchResultsVisible = false
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
    _state.query = ""
    _state.productResults = []
    _state.loadingState = LoadingState.ready
    _state.requestIndex = 0
    _state.searchResultsVisible = false
    _state.searchBarVisible = false
  }
}

export const actions = {

  async globalSearch(context: any, params: GlobalSearchParams) {

    if(params.query.length < 3) return;

    context.commit("setLoadingState", LoadingState.loading)
    context.commit("showSearchResults")
    context.commit("setQuery", params.query)
    
    context.commit("incrementRequestIndex")
    const _requestIndex = context.state.requestIndex

    setTimeout(() => {
      if(context.state.requestIndex == _requestIndex){
        context.dispatch("fetchProducts", params.query)
      }
    }, REQUEST_DELAY)
  },

  async fetchProducts(context: any, query: string) {

    const { loadingState, data } = await searchHandler({
      path: "getProductSearchResults",
      args: { query, limit: 5, preview: true }
    })

    await context.commit("setLoadingState", loadingState)

    if(data?.products && data.products.length) 
      await context.commit("setProductResults", data.products)
    else
      await context.commit("setProductResults", [])
  }
}