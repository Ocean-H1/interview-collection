export const myInstanceof = (object, constructor): boolean => {
  let proto = Object.getPrototypeOf(object);
  const protoType = constructor.prototype;

  // 循环判断该对象的原型链上是否存在构造函数的prototype
  while (true) {
    if (!proto) return false;
    if (proto === protoType) return true;
    proto = Object.getPrototypeOf(proto);
  }
};
