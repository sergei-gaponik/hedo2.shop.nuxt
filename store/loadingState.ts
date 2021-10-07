import { LoadingState } from '~/types'

export const state = () => ({
  loadingState: LoadingState.ready,
  index: 0
})

export const mutations = {

  setLoadingState(_state: any, _loadingState: LoadingState){

    _state.loadingState = _loadingState
  },
  isLoading(_state){
    _state.loadingState = LoadingState.loading
  },
  isReady(_state){
    _state.loadingState = LoadingState.ready
  },
}