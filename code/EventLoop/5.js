// process.nextTick() 是 Node.js 中优先级最高的异步回调，它插队到当前阶段的最后、下一个阶段的最前执行

var flag = false;

Promise.resolve().then(() => {
  console.log('then1');
  flag = true;
});
process.nextTick(() => {
  console.log('nextTick1');
});
new Promise(resolve => {
  console.log('promise');
  resolve();
  setTimeout(() => {
    console.log('timeout2');
  }, 10);
}).then(function () {
  console.log('then2');
});
function f1(f) {
  f();
}
function f2(f) {
  setTimeout(f);
}
f1(() => console.log('f为：', flag ? '异步' : '同步'));
f2(() => {
  console.log('timeout1,', 'f为：', flag ? '异步' : '同步');
});

console.log('本轮宏任务执行完');

// output:
// promise
// f为: 同步
// 本轮宏任务执行完
// nextTick1
// then1
// then2
// timeout1, f为: 异步
// timeout2