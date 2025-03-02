
- [1. 从尾到头打印链表](#1-从尾到头打印链表)
- [2. 反转链表](#2-反转链表)
- [3. 删除链表的倒数第 N 个结点](#3-删除链表的倒数第-n-个结点)

## 1. [从尾到头打印链表](https://www.nowcoder.com/practice/d0267f7f55b3412ba93bd35cfa8e8035)
```ts
/**
 * 1. 递归
 * T(n): O(n)
 * S(n): O(n)
 */
export function printListFromTailToHead(head: ListNode): number[] {
    if(head === null) {
        return []
    }
    const res = printListFromTailToHead(head.next)
    res.push(head.val)
    return res 
}
```
```java

/**
 * 2. 头插法
 * 由于本题要求以数组格式返回，所以构建逆序链表后还要遍历一遍，时间复杂度是O(n²), 不推荐
 * T(n): O(n²)
 * S(n): O(n)
 */

public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {
    // 头插法构建逆序链表
    ListNode head = new ListNode(-1);
    while (listNode != null) {
        ListNode memo = listNode.next;
        listNode.next = head.next;
        head.next = listNode;
        listNode = memo;
    }
    // 构建 ArrayList
    ArrayList<Integer> ret = new ArrayList<>();
    head = head.next;
    while (head != null) {
        ret.add(head.val);
        head = head.next;
    }
    return ret;
}
```
```ts
/**
 * 3. 栈
 * 使用js数组内置api可以轻松模拟栈后进先出的行为(也可以自己实现一个栈)
 * T(n): O(n)
 * S(n): O(n)
 */
export function printListFromTailToHead(head: ListNode): number[] {
    const res = [];
    while (head) {
        res.unshift(head.val);
        head = head.next;
    }
    return res;
}

/**
 * 4. 尾插法+反转数组
 * T(n): O(n)
 * S(n): O(n)
 */
function reversePrintOptimized(head: ListNode | null): number[] {
    const res: number[] = [];
    while (head !== null) {
        res.push(head.val); // 尾插法：O(1)
        head = head.next;
    }
    return res.reverse(); // 反转数组：O(n)
}
```
## 2. [反转链表](https://leetcode.cn/problems/reverse-linked-list/)
```ts
/**
 * 1. 头插法(迭代)
 * T(n): O(n)
 * S(n): O(1)
 */
function reverseList(head: ListNode | null): ListNode | null {
    let prev = null
    let cur = head

    while(cur !== null) {
        const next = cur.next
        cur.next = prev
        prev = cur
        cur= next
    }
    return prev
};
/**
 * 2. 递归
 * T(n): O(n)
 * S(n): O(n)
 */
function reverseList(head: ListNode | null): ListNode | null {
    // 递归终止条件：空链表或单节点
    if (head === null || head.next === null) {
        return head;
    }
    
    // 递归到链表末尾，newHead 最终是原链表的尾节点
    const newHead: ListNode | null = reverseListRecursive(head.next);
    
    // 回溯时反转指针方向
    head.next.next = head; // 将下一节点的 next 指向当前节点
    head.next = null;      // 断开当前节点的原始 next 指针
    
    return newHead;
}
```
## 3. [删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

```ts
/**
 * 1. 双指针
 * 需要注意考虑删除头节点的情况
 * T(n): O(n)
 * S(n): O(1)
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head) //  在头节点前增加一个没有实际值的辅助节点，用来处理需要删除头节点的情况
    let slow = dummy, fast = head

    while (n--) {
        fast = fast.next
    }

    while (fast) {
        slow = slow.next
        fast = fast.next
    }
    slow.next = slow.next.next

    return dummy.next
};
```