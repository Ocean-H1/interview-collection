# Tips

## PromiseResolveThenableJob

> [示例1](./3.js) [示例2](./4.js)
> 简单来说当触发PromiseResolveThenableJob后，就会插入一个额外的微任务，主要目的是为了统一 Thenable 的处理逻辑和保证状态传递的异步性。所以在判断输出的时候，需要考虑到这一点。但由于不同环境实现Promise的规范不同，输出结果可能略有差异。以下说明，都是以Promise/A+ 为规范。

### 触发时机：

#### 1. 在 Promise 构造函数的 resolve 函数中，传入了一个 Thenable:

```js
new Promise((resolve) => {
  resolve(myThenable); // 传入 Thenable，触发 Job
});
```

### 2.在 then/catch/finally 的回调函数中，返回了一个 Thenable:

```js
Promise.resolve().then(() => {
  return Promise.resolve(4); // 返回原生 Promise（也是 Thenable），触发 Job
});
```

### 核心流程

> **将当前 Promise 的状态 “托管” 给传入的 Thenable 对象，确保两者状态最终一致**

具体来说，当触发 PromiseResolveThenableJob 时，引擎会：

1. **创建一个微任务**（将 Job 放入微任务队列）；
2. 调用 Thenable 的 then 方法，并传入两个参数：
   1. 第一个参数：resolve 函数（用于让当前 Promise 变为 fulfilled）
   2. 第二个参数：reject 函数（用于让当前 Promise 变为 rejected）
3. 根据 Thenable 的行为决定当前 Promise 的状态:
   1. 如果 Thenable 的 then 调用了 resolve(value)，则当前 Promise 变为 fulfilled，值为 value
   2. 如果 Thenable 的 then 调用了 reject(reason)，则当前 Promise 变为 rejected，原因为 reason
   3. 如果 Thenable 的 then 抛出错误，则当前 Promise 变为 rejected，原因为该错误
