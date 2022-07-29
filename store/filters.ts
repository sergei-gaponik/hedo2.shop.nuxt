export const state = () => ({
  availableCategories: [],
  appliedFilters: [],
  appliedFilterTags: [],
  filters: [],
  priceRange: null,
  maxPriceRange: null,
});

export const mutations = {
  setAppliedFilters(_state: any, _appliedFilters: any[]) {
    _state.appliedFilters = _appliedFilters;
  },

  setAppliedFilterTags(_state: any, _appliedFilterTags: any[]) {
    _state.appliedFilterTags = _appliedFilterTags;
  },

  setAvailableCategories(_state: any, _availableCategories: any[]) {
    _state.availableCategories = _availableCategories;
    _state.filters = _availableCategories.flatMap((a) => [a.filters]);
  },

  setPriceRange(_state: any, _priceRange: any) {
    if (_priceRange)
      _state.priceRange = [
        Math.floor(_priceRange[0]),
        Math.ceil(_priceRange[1]),
      ];
    else _state.priceRange = null;
  },

  setMaxPriceRange(_state: any, _priceRange: any) {
    if (_priceRange)
      _state.maxPriceRange = [
        Math.floor(_priceRange[0]),
        Math.ceil(_priceRange[1]),
      ];
    else _state.maxPriceRange = null;
  },

  resetMaxPriceRange(_state: any) {
    _state.maxPriceRange = null;
  },
};
