
const DURATION = 3000

export const state = () => ({
  caption: "",
  visible: false
})

export const mutations = {

  setCaption(_state, caption){
    _state.caption = caption
  },
  
  setVisible(_state, visible){
    _state.visible = visible
  }
}

export const actions = {
  error(context, caption){
    context.commit('setCaption', caption)
    context.commit('setVisible', true)

    setTimeout(() => {
      context.commit('setVisible', false)
    }, DURATION)

  }
}