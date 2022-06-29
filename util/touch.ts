
let initTouchPos = null
let curTouchPos = null

const TOUCH_THRESH = 50
const TOUCH_TIMEOUT = 400

function getTouchPosX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
}

export function createTouchSlider(element, prevItemCallback, nextItemCallback){


  element.addEventListener("touchstart", e => {
    initTouchPos = getTouchPosX(e)

    setTimeout(() => initTouchPos = null, TOUCH_TIMEOUT)
  })

  element.addEventListener("touchmove", e => {
    curTouchPos = getTouchPosX(e)
  })

  element.addEventListener("touchend", e => {

    if(initTouchPos != null && curTouchPos != null){

      if(curTouchPos - initTouchPos > TOUCH_THRESH && prevItemCallback)
        prevItemCallback();
      else if(initTouchPos - curTouchPos > TOUCH_THRESH && nextItemCallback)
        nextItemCallback();

      initTouchPos = null
      curTouchPos = null
    }
  })
}