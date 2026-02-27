- [实现一个简单的链式地址哈希表](#实现一个简单的链式地址哈希表)

## 实现一个简单的链式地址哈希表

```ts
/**
 * 哈希节点类 - 构成链表的基本单元
 * @template K 键类型（限制为 string/number，便于哈希计算）
 * @template V 值类型（任意类型）
 */
class HashNode<K extends string | number, V> {
  key: K;
  value: V;
  next: HashNode<K, V> | null;
  constructor(key: K, value: V, next: HashNode<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

/**
 * 链式地址哈希表类
 * @template K 键类型
 * @template V 值类型
 */
class ChainedHashMap<K extends string | number, V> {
  // 存储链表头节点的桶数组
  private buckets: Array<HashNode<K, V> | null>;
  // 当前哈希表中的元素个数
  private size: number;
  // 默认桶数量（建议取质数，减少哈希冲突）
  private readonly DEFAULT_CAPACITY = 17;
  // 负载因子阈值（超过则扩容，默认 0.75）
  private readonly LOAD_FACTOR = 0.75;

  /**
   * 构造哈希表
   * @param capacity 初始桶数量（可选，默认 17）
   */
  constructor(capacity?: number) {
    const initCapacity =
      capacity && capacity > 0 ? capacity : this.DEFAULT_CAPACITY;
    this.buckets = new Array(initCapacity).fill(null);
    this.size = 0;
  }

  /**
   * 哈希函数 - 将键映射为桶的索引（核心）
   * @param key 要哈希的键
   * @returns 桶的索引（非负整数）
   */
  private hash(key: K): number {
    let hashValue = 0;

    // 处理字符串键：累加字符的 Unicode 编码，减少冲突
    if (typeof key === "string") {
      for (let i = 0; i < key.length; i++) {
        // 混合乘法避免重复字符的哈希值相同（如 "ab" 和 "ba"）
        hashValue = hashValue * 31 + key.charCodeAt(i);
      }
    } else {
      hashValue = Number(key);
    }

    // 确保索引在桶数组范围内
    return Math.abs(hashValue) % this.buckets.length;
  }

  /**
   * 扩容桶数组（当负载因子超过阈值时调用）
   */
  private resize(): void {
    const oldBuckets = this.buckets;
    const newCapacity = oldBuckets.length * 2 + 1;
    this.buckets = new Array(newCapacity).fill(null);
    this.size = 0;

    for (const bucket of oldBuckets) {
      let currentNode = bucket;
      while (currentNode) {
        this.set(currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }

  /**
   * 插入/更新键值对
   * @param key 键
   * @param value 值
   */
  set(key: K, value: V): void {
    if (this.size / this.buckets.length >= this.LOAD_FACTOR) {
      this.resize();
    }

    const index = this.hash(key);
    let currentNode = this.buckets[index];

    // 已存在则更新值
    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }
      currentNode = currentNode.next;
    }

    // 头插法
    const newNode = new HashNode(key, value);
    newNode.next = this.buckets[index];
    this.buckets[index] = newNode;
    this.size++;
  }

  /**
   * 根据 key 查找值
   * @param key 键
   * @returns 对应的值（未找到则返回 undefined）
   */
  get(key: K): V | undefined {
    const index = this.hash(key);
    let currentNode = this.buckets[index];

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }

    return undefined;
  }

  /**
   * 根据 key 删除键值对
   * @param key 键
   * @returns 是否删除成功（true = 成功，false = 未找到）
   */
  delete(key: K): boolean {
    const index = this.hash(key);
    let currentNode = this.buckets[index];
    let prevNode: HashNode<K, V> | null = null;

    while (currentNode) {
      if (currentNode.key === key) {
        // 目标是头节点
        if (!prevNode) {
          this.buckets[index] = currentNode.next;
        } else {
          prevNode.next = currentNode.next;
        }
        this.size--;
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    return false;
  }

  clear(): void {
    this.buckets = new Array(this.buckets.length).fill(null);
    this.size = 0;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  /**
   * 遍历哈希表，执行回调函数
   * @param callback 回调函数（参数：key, value）
   */
  forEach(callback: (key: K, value: V) => void) {
    for (const bucket of this.buckets) {
      let currentNode = bucket;

      while (currentNode) {
        callback(currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }
}

// ----------------------------- test-------------------------------
const hashMap = new ChainedHashMap<string, number>();
hashMap.set("apple", 5);
hashMap.set("banana", 3);
hashMap.set("cherry", 8);
hashMap.set("apple", 10);

// 2. 查找值
console.log("apple 的值：", hashMap.get("apple")); // 输出：10
console.log("banana 的值：", hashMap.get("banana")); // 输出：3
console.log("orange 的值：", hashMap.get("orange")); // 输出：undefined

// 3. 获取大小
console.log("哈希表大小：", hashMap.getSize()); // 输出：3

// 4. 遍历所有键值对
console.log("\n遍历哈希表：");
hashMap.forEach((key, value) => {
  console.log(`${key}: ${value}`);
});

// 5. 删除键值对
console.log("\n删除 banana：", hashMap.delete("banana")); // 输出：true
console.log("删除后大小：", hashMap.getSize()); // 输出：2
console.log("banana 的值：", hashMap.get("banana")); // 输出：undefined

// 6. 清空哈希表
hashMap.clear();
console.log("\n清空后是否为空：", hashMap.isEmpty()); // 输出：true
```
