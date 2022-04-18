
export function getShippingMethodPrice(shippingMethod, subTotal){

  if(shippingMethod.freeShippingMin != null && shippingMethod.freeShippingMin < subTotal)
    return 0
  else 
    return shippingMethod.price
}

export function getDefaultShippingMethod(shippingMethods, subTotal){

  let lowestPrice = Number.MAX_VALUE

  for(const shippingMethod of shippingMethods){
    const price = getShippingMethodPrice(shippingMethod, subTotal)

    if(price < lowestPrice) lowestPrice = price
  }

  const cheapest = shippingMethods.filter(a => getShippingMethodPrice(a, subTotal) == lowestPrice)

  if(cheapest.length == 1)
    return cheapest[0]
  else
    return cheapest.sort((a, b) => a.deliveryTimeTo - b.deliveryTimeTo)[0]
}