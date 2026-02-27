- [栈](#栈)
  - [1.有效的括号](#1有效的括号)
- [队列](#队列)
# 栈
## 1.[有效的括号](https://leetcode.cn/problems/valid-parentheses/description/)
```ts
/**
 * T(n): O(n)
 * S(n): O(n)
 */
function isValid(s: string): boolean {
    const mapping = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    const stack = []

    for (const c of s) {
        if (Object.keys(mapping).includes(c)) {
            stack.push(c)
        } else if (Object.values(mapping).includes(c)) {
            if (stack.length === 0 || mapping[stack.pop()] !== c) {
                return false
            }
        }
    }

    return stack.length === 0
};
```
# 队列