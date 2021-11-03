export const state = () => ({
  menuDrawerOpen: false,
  filterDrawerOpen: false,
  cartDrawerOpen: false,
  footerTagsVisible: true
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
  },

  showLoginForm(_state){
    _state.loginFormOpen = true
    _state.filterDrawerOpen = false
    _state.menuDrawerOpen = false
    _state.cartDrawerOpen = false
  },

  hideLoginForm(_state){
    _state.loginFormOpen = false
  },

  setFooterTagsVisible(_state, footerTagsVisible){
    _state.footerTagsVisible = footerTagsVisible
  }
}