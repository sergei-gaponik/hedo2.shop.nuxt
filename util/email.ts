

export function sanitizeEmailAddress(address){

  if(!address) 
    return null;
  else
    return address.toLowerCase().trim().replace("@googlemail.com", "@gmail.com")
}