

export function sanitizeEmailAddress(address){

  return address.toLowerCase().trim().replace("@googlemail.com", "@gmail.com")
}