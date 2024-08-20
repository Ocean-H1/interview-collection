/**
 * 节流
 * @param {Function} fn 
 * @param {Number} delay 
 */
export function throttle(fn, delay = 200) {
  if (typeof fn !== 'function') {
    return new TypeError('fn is not a function');
  }

  let flag = true;
  return function(...args) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
        fn.call(this, ...args);
      }, delay);
    }
  };
};