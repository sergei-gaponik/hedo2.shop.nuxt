import { LoadingState } from "~/types"

interface ShopHandlerResponse {
  loadingState: LoadingState
  data?: any

  errors?: string[]
}
interface ShopAPIRequest {
  path: string
  args?: any
  token?: string
}

export default async function shopHandler(body: ShopAPIRequest): Promise<ShopHandlerResponse>{

  try{

    const token = localStorage.getItem('token')

    body = token ? { ...body, token } : body

    const res = await fetch(`${process.env.SHOP_API_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(!res.ok) throw new Error();

    const data = await res.json()

    if(data.errors?.length){
      console.log(data)
      throw new Error()
    }
      
    if(data.token)
      localStorage.setItem('token', data.token)

    return { 
      ...data, 
      loadingState: LoadingState.ready
    }
  }
  catch(e){
    console.log(e)
    return { loadingState: LoadingState.error }
  }

}