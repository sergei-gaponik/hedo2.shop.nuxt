import { PaymentMethod } from '~/types'

const defaultState = {
  shippingInfo: {
    shippingAddress: null,
    billingAddress: null,
    shippingMethod: {},
    billingAddressMatchesShippingAddress: true
  },
  contactInfo: {
    privacyPolicyAccepted: false,
    email: "",
    isAuthenticated: false,
    username: ""
  },
  paymentInfo: {
    paymentMethod: PaymentMethod.creditcard
  },
  furthestStep: 1,
  step: 1
}

export const state = () => defaultState

const save = _state => {
  localStorage.setItem('checkoutInfo', JSON.stringify(_state))
}

const _init = _state => {
  let checkoutInfo = defaultState

  if(localStorage.hasOwnProperty('checkoutInfo'))
    checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo"))

  _state.shippingInfo = checkoutInfo.shippingInfo
  _state.contactInfo = checkoutInfo.contactInfo
  _state.paymentInfo = checkoutInfo.paymentInfo
  _state.furthestStep = checkoutInfo.furthestStep
  _state.step = checkoutInfo.step
}

export const mutations = {

  init(_state){
    _init(_state)
  },

  setContactInfo(_state, [ attribute, value ]){
    _state.contactInfo[attribute] = value
    save(_state)
  },

  setShippingInfo(_state, [ attribute, value ]){
    _state.shippingInfo[attribute] = value
    save(_state)
  },

  setPaymentInfo(_state, [ attribute, value ]){
    _state.paymentInfo[attribute] = value
    save(_state)
  },

  setStep(_state, step){

    _state.step = step
    _state.furthestStep = Math.max(step, _state.furthestStep)

    save(_state)
  },

  reset(_state){
    localStorage.removeItem('checkoutInfo')
    _init(_state)
  }
}