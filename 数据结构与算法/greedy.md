- [贪心算法](#贪心算法)
  - [1.有效的括号字符串](#1有效的括号字符串)

# 贪心算法
## 1.[有效的括号字符串](https://leetcode.cn/problems/valid-parenthesis-string/description/)
```ts
/**
 * T(n): O(n)
 * S(n): O(1)
 */
function checkValidString(s) {
    // 初始化最小和最大左括号数量
    let minLeft = 0;
    let maxLeft = 0;

    for (let char of s) {
        if (char === '(') {
            // 遇到左括号，最小和最大左括号数量都加 1
            minLeft++;
            maxLeft++;
        } else if (char === ')') {
            // 遇到右括号，最小和最大左括号数量都减 1
            minLeft = Math.max(minLeft - 1, 0);
            maxLeft--;
            if (maxLeft < 0) {
                // 最大左括号数量小于 0，说明右括号过多，无效
                return false;
            }
        } else if (char === '*') {
            // 遇到 *，最小左括号数量减 1（当作右括号），最大左括号数量加 1（当作左括号）
            minLeft = Math.max(minLeft - 1, 0);
            maxLeft++;
        }
    }

    // 最终最小左括号数量为 0 时，字符串有效
    return minLeft === 0;
}  
```