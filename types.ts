export enum LoadingState {
  "loading" = "loading",
  "ready" = "ready",
  "error" = "error"
}

export enum CartError {
  "quantityNotAvailable" = "quantityNotAvailable",
  "error" = "error"
}

export interface Filter {
  _id: string
  title: string
  handle: string
}

export interface FilterCategory {
  _id: string
  name: string
  filters: Filter[]
}