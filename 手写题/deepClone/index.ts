/**
 * 深拷贝
 * @param {Object} source
 * @param {WeakMap} cache 缓存,用来处理循环引用的情况
 */
export function deepClone(source, cache = new WeakMap()){
  if (typeof source !== "object" || typeof source === null) {
    return source;
  }

  if (cache.has(source)) {
    return cache.get(source);
  }

  let result;
  // 处理特殊类型
  const Constructor = source.constructor;
  switch (true) {
    case source instanceof Date:
      result = new Constructor(source)
      break
    case source instanceof RegExp:
      result = new Constructor(source.source, source.flags)
      break
    case source instanceof Map:
      result = new Constructor()
      source.forEach((val, key) => {
        result.set(deepClone(key, cache), deepClone(val, cache))
      })
      break
    case source instanceof Set:
      result = new Constructor()
      source.forEach((val) => {
        result.add(deepClone(val, cache))
      })
      break
    case Array.isArray(source):
      result = []
      break
    default: 
      // 保持原型链
      result = Object.create(Object.getPrototypeOf(source))
  }

  // 写入缓存
  cache.set(source, result)

  // 遍历复制所有属性(包括Symbol类型)
  Reflect.ownKeys(source).forEach((key) => {
    if(source.hasOwnProperty(key)) {
      result[key] = deepClone(source[key], cache)
    }
  })
  
  return result
}