

export function selectedFiltersToQueryParams(categories, selected){

  return Object.fromEntries(categories.flatMap((category, i) => {

    const f = category.filters.filter(a => selected.includes(a.handle)).map(a => a.handle)

    return !f.length ? [] : [[ `f${i}`, f.join(',') ]]

  }))
}

export function removeFromAppliedFilters(appliedFilters, handle){

  return appliedFilters.flatMap(category => {
    const c = category.filter(a => a != handle)
    return !c.length ? [] : [ c ]
  })
}

export function appliedFiltersToQueryParams(appliedFilters){
  return Object.fromEntries(appliedFilters.map((f, i) => [ `f${i}`, f.join(',') ]))
}

export function appliedFiltersFromQueryParams(urlParams){
  try{
    return Object.entries(urlParams).filter((a) => a[0][0] == "f").map((a: any) => a[1].split(","))
  }
  catch(e){
    return []
  }
}

export function priceRangeToQueryParams(priceRange){
  return { p: priceRange.join("-") }
}

export function priceRangeFromQueryParams(urlParams){
  try{
    return urlParams.p.split("-").map(a => parseInt(a))
  }
  catch(e){
    return null
  }
}