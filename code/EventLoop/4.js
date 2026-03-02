new Promise((resolve) => {
  let resolvedPromise = Promise.resolve();
  resolve(resolvedPromise);
}).then(() => {
  console.log("resolvePromise resolved");
});

Promise.resolve()
  .then(() => {
    console.log("promise1");
  })
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  });

// 输出结果：promise1 → promise2 → resolvePromise resolved → promise3
// 解析：触发PromiseResolveThenableJob，详情见 ./tips.md