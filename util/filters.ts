

export function selectedFiltersToQueryParams(categories, selected){

  return Object.fromEntries(categories.flatMap((category, i) => {

    const f = category.filters.filter(a => selected.includes(a.handle)).map(a => a.handle)

    return !f.length ? [] : [[ `f${i}`, f.join('_') ]]

  }))
}

export function appliedFiltersToQueryParams(appliedFilters){
  return Object.fromEntries(appliedFilters.map((f, i) => [ `f${i}`, f.join('_') ]))
}

export function removeFromAppliedFilters(appliedFilters, handle){

  return appliedFilters.flatMap(category => {
    const c = category.filter(a => a != handle)
    return !c.length ? [] : [ c ]
  })
}