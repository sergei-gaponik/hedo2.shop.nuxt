import { LoadingState } from '~/types'

export const state = () => ({
  availableCategories: [],
  appliedFilters: [],
  appliedFilterTags: [],
})

export const mutations = {

  setAppliedFilters(_state: any, _appliedFilters: any[]){
    _state.appliedFilters = _appliedFilters
  },

  setAppliedFilterTags(_state: any, _appliedFilterTags: any[]){
    _state.appliedFilterTags = _appliedFilterTags

  },

  setAvailableCategories(_state: any, _availableCategories: any[]){
    _state.availableCategories = _availableCategories
    _state.filters = _availableCategories.flatMap(a => [ a.filters ])
  },
}