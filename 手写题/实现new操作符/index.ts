/**
 * new操作符大概做了哪些事：
 * 1. 创建一个新对象obj
 * 2. 将该对象与构造函数通过原型链连接起来
 * 3. 将构造函数的this绑定到新创建的对象上
 * 4. 判断构造函数返回值及其类型，如果是原始值则忽略，否则就正常返回
 * @param constructor 构造函数
 * @param args 参数
 */
export function my_new<T extends Function>(constructor: T, ...args: any[]) {
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}