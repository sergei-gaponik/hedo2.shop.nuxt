import { GLOBAL } from '~/core/const'

export function getVariantTag(variant): string{

  const u = a => `${a.measurementQuantity || 1} ${a.measurementUnit || "Stk"}`
  
  if(variant.isSet)
    return "Set"
  if(variant.numberOfSameArticle > 1)
    return `${variant.numberOfSameArticle} x ${u(variant)}`
  
  return u(variant)

}

export function getVariantTitle(variant): string{

  const u = a => `${a.measurementQuantity || 1} ${a.measurementUnit || "Stück"}`
    
  if(variant.title)
    return variant.title
  if(variant.isSet)
    return "Im Set"
  if(variant.numberOfSameArticle > 1)
    return `${variant.numberOfSameArticle}-mal ${u(variant)}`
  
  return u(variant)
}

export function isSpecialOffer(variant): boolean{

  if(!variant.recommendedRetailPrice)
    return false;

  return (variant.price / variant.recommendedRetailPrice) < (1 - GLOBAL.specialOfferMin)
}

export function getCheapestVariant(variants: any[]): any{

  if(variants.length == 1)
    return variants[0]

  let min = null
  let _i;
  for(let i = 0; i < variants.length; i++){
    if(!min || (variants[i].price && variants[i].price < min)){
      min = variants[i].price
      _i = i
    }
  }

  return variants[_i]

}