import '../index';

//在fnc的原型上定义一个方法
function func(...args) {
  console.log(this);
  console.log(args);
}
func.prototype.test = function () {
  console.log('test');
};

// 测试bind返回的函数作为构造函数的情况
let newFunc1 = func.bind({ a: 1 }, 1, 2, 3, 4); // 原生bind
let newFunc2 = func.myBind({ a: 1 }, 1, 2, 3, 4); // 我们的bind
let f1 = new newFunc1(5, 6, 7, 8);
let f2 = new newFunc2(5, 6, 7, 8);

console.log('-----原生bind-----');
f1.test();
console.log('-----myBind-----');
f2.test();