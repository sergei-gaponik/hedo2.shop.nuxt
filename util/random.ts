
export function randomString(length){

  const r = () => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36)

  let _r = ""

  while(_r.length < length){
    _r = _r + r()
  }

  return _r.slice(0, length)
}