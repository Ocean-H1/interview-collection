/**
 * 1.使用es6提供的 flat 方法 (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
 * @param { Array } arr 
 * @param { Number } depth 指定要提取嵌套数组的结构深度，默认值为 1。
 * @returns 扁平化后的数组
 */
export function esFlat(arr: Array<any>, depth: number = 1) {
  return arr.flat(depth)
}

/**
 * 2.递归
 * @param arr 
 */
export function recurseFlat(arr: Array<any>) {

}