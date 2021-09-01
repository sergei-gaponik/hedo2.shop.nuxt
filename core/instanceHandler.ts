import { LoadingState } from "~/types"

interface InstanceHandlerResponse {
  loadingState: LoadingState
  data?: any
  errors?: string[]
}

interface InstanceAPIRequest {
  path: string
  args?: any
}

export default async function instanceHandler(body: InstanceAPIRequest): Promise<InstanceHandlerResponse>{

  

  try{
    const res = await fetch(`${process.env.INSTANCE_API_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(!res.ok) throw new Error();

    const data = await res.json()

    if(data.errors && data.errors.length){
      console.log(data)
      throw new Error()
    }

    return { 
      ...data, 
      loadingState: LoadingState.ready
    }
  }
  catch(e){
    return { loadingState: LoadingState.error }
  }

}