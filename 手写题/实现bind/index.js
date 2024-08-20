/**
 * @Description: call和apply的实现与bind类似，在这里不做单独实现
 * @Author: OceanH
 * @Date: 2024-08-20 22:17:58
 */
Function.prototype.myBind = function (thisArg, ...args) {
  const fn = this;
  const key = Symbol();
  thisArg[key] = fn;

  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      // 加一个判断，用于处理bind返回的函数被用作构造函数的情况
      return new fn(...args, ...newFnArgs);
    }
    return thisArg[key](...args, ...newFnArgs);
  };
};

//在fnc的原型上定义一个方法
function func(...arg) {
  console.log(this)
  console.log(arg)
}
func.prototype.test = function() {
  console.log(this)
}

//下面我们使用构造函数测试一下
let newFunc1 = func.bind({a:1},1,2,3,4) // 原生的bind
let newFunc2 = func.myBind({a:1},1,2,3,4) // 我们的bind
let f1 = new newFunc1(5,6,7,8)
let f2 = new newFunc2(5,6,7,8)
console.log('-----原生bind-----')
console.log(f1.test) // 正确的test方法
console.log('-----myBind-----')
console.log(f2.test) // undefined