/**
 * @Description: 给定一个整数数组，除一个整数外，所有整数都出现了两次，找到只出现一次的元素
 * @Author: oceanhhan
 * @Date: 2025-12-17 22:51:05
 */
function findSingle(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}
