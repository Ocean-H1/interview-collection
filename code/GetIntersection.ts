/**
 * @Description: 给定两个数组，请返回其共同存在的元素(数组未排序，可能含有重复元素)
 * @Author: oceanhhan
 * @Date: 2025-12-17 22:25:03
 */
function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
  const set1 = new Set(arr1);
  const intersection: T[] = [];

  for (const item of arr2) {
    if (set1.has(item)) {
      intersection.push(item);
      set1.delete(item);
    }
  }
  return intersection;
}
