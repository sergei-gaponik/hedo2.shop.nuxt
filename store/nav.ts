export const state = () => ({
  menuDrawerOpen: false,
  filterDrawerOpen: false
})

export const mutations = {

  toggleMenuDrawer(_state: any) {
    _state.filterDrawerOpen = false
    _state.menuDrawerOpen = !_state.menuDrawerOpen
  },

  openMenuDrawer(_state: any) {
    _state.filterDrawerOpen = false
    _state.menuDrawerOpen = true
  },

  closeMenuDrawer(_state: any) {
    _state.filterDrawerOpen = false
    _state.menuDrawerOpen = false
  },

  toggleFilterDrawer(_state: any){
    _state.menuDrawerOpen = false
    _state.filterDrawerOpen = !_state.filterDrawerOpen
  },

  openFilterDrawer(_state: any) {
    _state.menuDrawerOpen = false
    _state.filterDrawerOpen = true
  },

  closeFilterDrawer(_state: any) {
    _state.menuDrawerOpen = false
    _state.filterDrawerOpen = false
  },

}