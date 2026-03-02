/**
 * 实现一个 promise.map，进行并发数控制
 */

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pMap(
  list: any[],
  mapper: (item: any, index: number) => any,
  options: { concurrency?: number } = {},
) {
  const { concurrency = Infinity } = options;

  return new Promise((resolve, reject) => {
    const result: any[] = [];
    let currentIndex = 0;
    let running = 0;

    function next() {
      while (running < concurrency && currentIndex < list.length) {
        const index = currentIndex++;
        const item = list[index];

        running++;

        Promise.resolve(item)
          .then((val) => mapper(val, index))
          .then(
            (res) => {
              result[index] = res;
              running--;
              next();
            },
            (err) => reject(err),
          );
      }

      if (currentIndex >= list.length && running === 0) {
        resolve(result);
      }
    }

    next();
  });
}

// 测试用例

// 1. 基本映射
pMap([1, 2, 3], (x) => x * 2).then(console.log); // → [2, 4, 6]

// 2. 空数组
pMap([], (x) => x).then(console.log); // → []

// 3. 数组元素是 Promise
pMap([Promise.resolve(1), Promise.resolve(2)], (x) => x + 1).then(console.log); // → [2, 3]

// 4. 混合数组
pMap([1, Promise.resolve(2), 3], (x) => x + 1).then(console.log); // → [2, 3, 4]

// 5. 顺序保证
pMap([3, 1, 2], (x) => Promise.resolve(x)).then(console.log); // → [3, 1, 2]

// 6. 并发控制测试
const start = Date.now();
pMap(
  [1, 1, 1, 1, 1, 1, 1, 1],
  (x) => sleep(1000),
  { concurrency: 2 },
).then(() => {
  const duration = Date.now() - start;
  console.log(`并发2, 耗时: ${duration}ms (约4000ms)`); // 8个任务，每批2个，每批1秒，共4秒
});
