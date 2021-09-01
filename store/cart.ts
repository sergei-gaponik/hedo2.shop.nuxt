import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import Vue from 'vue'
import { CartError } from '~/types'

const save = lineItems => localStorage.setItem('lineItems', JSON.stringify(lineItems))

export const state = () => ({
  lineItems: []
})

export const mutations = {

  init(_state){
    _state.lineItems = JSON.parse(localStorage.getItem("lineItems") || "[]")
    _state.lineItems = _state.lineItems.filter(a => a.quantity > 0)
    save(_state.lineItems)
  },

  updateLineItem(_state, _lineItem){

    const i = _state.lineItems.findIndex(a => a.variant == _lineItem.variant)

    if(i >= 0){
      Vue.set(_state.lineItems, i, { ..._state.lineItems[i], ..._lineItem })
      save(_state.lineItems)
    }
  },

  updateAvailableQuantities(_state, variants){
    
    for(const variant of variants){

      const i = _state.lineItems.findIndex(a => a.variant == variant._id)
      const maxQuantity = Math.min(variant.availableQuantity, variant.maxQuantity || 100)

      if(i >= 0){
        Vue.set(_state.lineItems, i, { ..._state.lineItems[i], maxQuantity })
        save(_state.lineItems)
      }

    }
  },

  addLineItem(_state, _lineItem){
    console.log(_lineItem)
    _state.lineItems.push(_lineItem)
    save(_state.lineItems)
  },

  removeLineItem(_state, variant){
    _state.lineItems = _state.lineItems.filter(a => a.variant != variant)
    save(_state.lineItems)
  }
}

export const actions = {

  async addToCart(context, { variant, product, quantity, price, maxQuantity }){

    context.commit("init")

    const { lineItems } = context.state

    const lineItem = lineItems.find(a => a.variant == variant)

    const total = lineItem ? quantity + lineItem.quantity : quantity

    if(total > maxQuantity)
      return CartError.quantityNotAvailable;

    if(lineItem){

      const updatedQuantity = quantity + lineItem.quantity

      if(product)
        context.commit('updateLineItem', { variant, quantity: updatedQuantity, product })
      else
        context.commit('updateLineItem', { variant, quantity: updatedQuantity })

      return null;
    }

    const r = await instanceHandler({
      path: 'signLineItem',
      args: { lineItems: [{ variant, price  }] }
    })

    if(r.loadingState != LoadingState.ready || !r.data?.tokens?.length)
      return CartError.error

    const token = r.data.tokens[0]

    context.commit('addLineItem', { variant, quantity, price, maxQuantity, product, token })

    return null;
  },

  updateLineItem(context, { variant, quantity }){

    context.commit("init")

    const lineItem = context.state.lineItems.find(a => a.variant == variant)

    if(quantity > lineItem.maxQuantity)
      return CartError.quantityNotAvailable
    
    context.commit('updateLineItem', { variant, quantity })

    return null;
  }
}