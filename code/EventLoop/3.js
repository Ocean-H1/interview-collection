Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 输出顺序：0 1 2 4 3 5 6 (不同环境的Promise实现规范不同，可能略有差异，此处为标准promise/A+规范)
// 解析：触发了PromiseResolveThenableJob，详情见：./tips.md