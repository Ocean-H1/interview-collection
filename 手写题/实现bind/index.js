/**
 * @Description: 实现一个bind方法，需要处理 当bind返回的函数被用作构造函数时的情况
 * @Author: OceanH
 * @Date: 2024-08-20 22:17:58
 */
Function.prototype.myBind = function (thisArg, ...args) {
  const fn = this;
  const key = Symbol();
  thisArg[key] = fn;

  return function newFn(...newFnArgs) {
    // if (this instanceof newFn) {
    //   // 处理当bind返回的函数被用作构造函数时的情况
    //   return new fn(...args, ...newFnArgs);
    // }
    if (new.target === newFn) {
      // 处理当bind返回的函数被用作构造函数时的情况
      return new fn(...args, ...newFnArgs);
    }
    return thisArg[key](...args, ...newFnArgs);
  };
};