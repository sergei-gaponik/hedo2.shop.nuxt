
import { Auth } from 'aws-amplify'

export async function getIdToken(){

  if(!process.client)
    throw new Error();

  const user = await Auth.currentAuthenticatedUser();
  return window.localStorage.getItem(`${user.keyPrefix}.${user.username}.idToken`)
}