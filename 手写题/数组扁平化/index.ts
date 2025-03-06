/**
 * 1.使用es6提供的 flat 方法 (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
 * @param { Array } arr 
 * @param { Number } depth 指定要提取嵌套数组的结构深度，默认值为 1。传入Infinity可展开所有层数
 * @returns 返回扁平化后的新数组，对原数据没有影响
 */
export function esFlat(arr: Array<any>, depth: number = Infinity) {
  return arr.flat(depth)
}

/**
 * 2.递归
 * @param arr 
 */
export function recurseFlat(arr: Array<any>) {
  return arr.reduce((acc,cur) => {
    return acc.concat(Array.isArray(cur) ? recurseFlat(cur) : cur)
  }, [])
}

/**
 * 3.Generator 函数（高级场景）
 * 惰性计算，适合超大数组
 */
export function* flatten(arr) {
  for (const item of arr) {
    Array.isArray(item) ? yield* flatten(item) : yield item;
  }
}
// 示例
[...flatten([1, [2, [3]]])]; // [1, 2, 3]
