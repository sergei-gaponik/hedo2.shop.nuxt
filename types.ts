export enum LoadingState {
  "loading" = "loading",
  "ready" = "ready",
  "error" = "error",
  "notFound" = "notFound"
}

export enum CartError {
  "quantityNotAvailable" = "quantityNotAvailable",
  "error" = "error"
}

export enum PaymentMethod {
  "creditcard" = "creditcard",
  "googlepay" = "googlepay",
  "amazonpay" = "amazonpay",
  "applepay" = "applepay",
  "paypal" = "paypal",
  "paylater" = "paylater",
  "sofort" = "sofort"
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

export interface LineItem {
  product: string
  variant: string
  maxQuantity: number
  price: number
  quantity: number
  token: string
}