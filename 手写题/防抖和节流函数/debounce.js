/**
 * 通过配置isImmediately参数可选择是否立即执行一次，后续进行防抖
 * @param {Function} fn 
 * @param {number} delay 
 * @param {boolean} isImmediately 
 * @returns 
 */
export function debounce(fn, delay = 200, isImmediately = false) {
  if (typeof fn !== 'function') {
    return new TypeError('fn is not a function');
  }

  let timer;
  let flag = true;

  return function (...args) {
    if (isImmediately && flag) {
      flag = false;
      fn.call(this, ...args);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        fn.call(this, ...args);
      }, delay);
    }
  };
};