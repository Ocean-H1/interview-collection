- [合并两个有序数组](#合并两个有序数组)
- [移除元素](#移除元素)
- [删除有序数组中的重复项](#删除有序数组中的重复项)
- [删除有序数组中的重复项 II](#删除有序数组中的重复项-ii)

**注：题目均来源于LeetCode，题解思路非标准，仅供参考**

### [合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)
```ts
/**
 * 1. 暴力插入+排序(需要考虑splice和sort的复杂度)
 * 注: 后面的题目将会避免直接使用api暴力解决
 * T(n): O((m+n)log(m+n))
 * S(n): O(m+n)
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    nums1.splice(m, n, ...nums2)
    nums1.sort((a, b) => a - b)
};

/**
 * 2. 双指针从后向前遍历
 * T(n): O(m+n)
 * S(n): O(1)
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1, j = n - 1, k = m + n - 1
    while (j >= 0) {
        nums1[k--] = (i >= 0 && nums1[i] >= nums2[j]) ? nums1[i--] : nums2[j--]
    }
};
```
### [移除元素](https://leetcode.cn/problems/remove-element/)
```ts
/**
 * 遍历:有效值覆盖需移除元素即可
 * T(n): O(n)
 * S(n): O(1)
 */
function removeElement(nums: number[], val: number): number {
    const n = nums.length
    let count = 0
    for (let i = 0; i < n; i++) {
        if (nums[i] !== val) {
            nums[count++] = nums[i]
        }
    }
    return count
};
```
### [删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
```ts
/**
 * 双指针
 * T(n): O(n)
 * S(n): O(1)
 */
function removeDuplicates(nums: number[]): number {
    const n = nums.length
    let l = 1, r = l, count = 1

    while (r < n) {
        if(nums[r] !== nums[r-1]) {
            nums[l] = nums[r]
            ++l
            ++count
        }
        ++r
    }
    return count
};
```
### [删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii)
```ts
/**
 * 双指针
 * 题目要求原地修改并且不使用额外空间
 * T(n): O(n)
 * S(n): O(1)
 */
function removeDuplicates(nums: number[]): number {
    const n = nums.length
    if (n <= 2) return n

    let slow = 2, fast = slow 
    while (fast < n) {
        if (nums[slow - 2] !== nums[fast]) {
            nums[slow] = nums[fast]
            ++slow
        }
        ++fast
    }
    return slow
};
```
