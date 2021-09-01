export const state = () => ({
  menuDrawerOpen: false,
  filterDrawerOpen: false,
  cartDrawerOpen: false,
})

export const mutations = {

  closeAllDrawers(_state: any){
    _state.filterDrawerOpen = false
    _state.menuDrawerOpen = false
    _state.cartDrawerOpen = false
  },

  toggleMenuDrawer(_state: any) {
    _state.filterDrawerOpen = false
    _state.cartDrawerOpen = false
    _state.menuDrawerOpen = !_state.menuDrawerOpen
  },

  openMenuDrawer(_state: any) {
    _state.menuDrawerOpen = true
    _state.cartDrawerOpen = false
    _state.filterDrawerOpen = false
  },

  openFilterDrawer(_state: any) {
    _state.menuDrawerOpen = false
    _state.cartDrawerOpen = false
    _state.filterDrawerOpen = true
  },

  openCartDrawer(_state: any){
    _state.menuDrawerOpen = false
    _state.cartDrawerOpen = true
    _state.filterDrawerOpen = false
  }
}