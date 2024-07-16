/**
 *
 * 防抖节流函数
 *
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    let context = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
export function throttle(fn, delay = 300) {
  let last = 0
  return function (...args) {
    let context = this
    let now = +new Date()
    if (now - last >= delay) {
      last = now
      fn.apply(context, args)
    }
  }
}
