
- [Easy](#easy)
  - [1. 合并两个有序数组](#1-合并两个有序数组)
  - [2. 移除元素](#2-移除元素)
  - [3. 删除有序数组中的重复项](#3-删除有序数组中的重复项)
  - [4. 删除有序数组中的重复项 II](#4-删除有序数组中的重复项-ii)
  - [5. 验证回文串](#5-验证回文串)
  - [6. 验证回文串 II](#6-验证回文串-ii)
  - [7. 反转字符串中的元音字母](#7-反转字符串中的元音字母)
  - [8. 判断环形链表](#8-判断环形链表)
- [Medium](#medium)
  - [1. 两数之和 II](#1-两数之和-ii)
  - [2. 两数平方和](#2-两数平方和)
  - [3. 最长子序列](#3-最长子序列)
- [Hard](#hard)

## Easy
### 1. [合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)
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
### 2. [移除元素](https://leetcode.cn/problems/remove-element/)
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
### 3. [删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
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
### 4. [删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii)
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
### 5. [验证回文串](https://leetcode.cn/problems/valid-palindrome-ii/)
```ts
/**
 * 双指针
 * 在原字符串上直接遍历，跳过不满足题意的字符，不需要额外空间
 * T(n): O(|s|) |s|为字符串的长度 
 * S(n): O(1)
 */
function isPalindrome(s: string): boolean {
    let p = 0, q = s.length - 1;
    const isalnum = (c) => {
        return /[a-z0-9]/.test(c.toLowerCase())
    }
    while (p < q) {
        while (p < q && !isalnum(s[p])) {
            ++p
        }
        while (p < q && !isalnum(s[q])) {
            --q
        }
        if (s[p].toLowerCase() !== s[q].toLowerCase()) {
            return false
        }
        ++p
        --q
    }
    return true;
};
```
### 6. [验证回文串 II](https://leetcode.cn/problems/RQku0D/description/)
```ts
/**
 * 双指针
 * 思路：此题的关键是需判断 删除一个字符的情况。
 * T(n): O(|s|) |s|为字符串的长度 
 * S(n): O(1)
 */
function validPalindrome(s: string): boolean {
    const isPalindrome = (s: string, i: number, j: number) => {
        while (i < j) {
            if (s[i++] !== s[j--]) {
                return false
            }
        }
        return true
    }
    const len = s.length
    for (let i = 0, j = len - 1; i < j; i++, j--) {
        if (s[i] !== s[j]) {
            // 判断是否为回文字符串时，我们不需要判断整个字符串，因为左指针左边和右指针右边的字符之前已经判断过具有对称性质，所以只需要判断中间的子字符串即可
            return isPalindrome(s, i + 1, j) || isPalindrome(s, i, j - 1)
        }
    }
    return true

};
```
### 7. [反转字符串中的元音字母](https://leetcode.cn/problems/reverse-vowels-of-a-string/)
```ts
/**
 * 双指针
 * T(n): O(n)
 * S(n): O(n)
 */
function reverseVowels(s: string): string {
    const vowels = ['a', 'e', 'i', 'o', 'u','A', 'E', 'I', 'O', 'U']
    let left = 0, right = s.length - 1
    const result = []
    while(left <= right) {
        const charL = s[left]
        const charR = s[right]
        if(!vowels.includes(charL)) {
            result[left++] = charL
        } else if(!vowels.includes(charR)) {
            result[right--] = charR
        } else {
            result[left++] = charR
            result[right--] = charL
        }
    }
    return result.join('')
};
```
### 8. [判断环形链表](https://leetcode.cn/problems/linked-list-cycle/description/)
```ts
/**
 * 快慢指针
 * 类似追逐问题，一快一慢两指针，若能相遇，则说明有环
 * T(n): O(n)
 * S(n): O(1)
 */
function hasCycle(head: ListNode | null): boolean {
    if(head === null) return false
    let l1 = head, l2 = head.next
    while(l1 !== null && l2 !== null && l2.next !== null) {
        if(l1 == l2) {
            return true
        }
        l1 = l1.next
        l2 = l2.next.next
    }
    return false
};
```


## Medium
### 1. [两数之和 II](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)
```ts
/**
 * 双指针
 * T(n): O(n)
 * S(n): O(1)
 */
function twoSum(numbers: number[], target: number): number[] {
    let left = 0, right = numbers.length - 1
    while(left < right) {
        if(numbers[left] + numbers[right] < target) {
            ++left
        } else if(numbers[left] + numbers[right] > target) {
            --right
        } else {
            return [left+1, right+1]
        }
    }
};
```
### 2. [两数平方和](https://leetcode.cn/problems/sum-of-square-numbers/)
```ts
/**
 * 双指针
 * T(n): O(sqrt(n))
 * S(n): O(1)
 */
function judgeSquareSum(c: number): boolean {
    // 重点在于右指针初始化为sqrt(c)，实现剪枝，降低时间复杂度
    let low = 0, high = Math.floor(Math.sqrt(c))
    while (low <= high) {
        const sum = Math.pow(low, 2) + Math.pow(high, 2)
        if (sum > c) {
            --high
        } else if(sum < c) {
            ++low
        } else {
            return true
        }
    }
    return false
};
```
### 3. [最长子序列](https://leetcode.cn/problems/longest-word-in-dictionary-through-deleting/)
```ts
/**
 * 双指针
 * T(n): O(d*(m+n)): d 表示 dictionary 的长度，m 表示 s 的长度，n 表示 dictionary 中字符串的平均长度
 * S(n): O(1)
 */
function findLongestWord(s: string, dictionary: string[]): string {
    // 双指针判断子串
    const isSubStr = (s, target) => {
        let i = 0, j = 0
        while (i < s.length && j < target.length) {
            if (s[i] === target[j]) {
                ++j
            }
            ++i
        }
        return j === target.length
    }
    let longestWord = ''
    for (const word of dictionary) {
        if (isSubStr(s, word)) {
            const len1 = word.length, len2 = longestWord.length
            if (len1 > len2 || (len1 === len2 && word < longestWord)) {
                longestWord = word
            }
        }
    }
    return longestWord
};
```

## Hard