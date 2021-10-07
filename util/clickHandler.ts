
let lock = false

export default function clickHandler(action){

  if(lock || !action) return;

  lock = true

  action()

  setTimeout(() => lock = false, 100)
}