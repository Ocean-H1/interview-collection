/**
 * @Description:多个异步操作顺序执行
 * @Author: oceanhhan
 * @Date: 2026-03-11 23:28:08
 */
import asyncSimulate from '../asyncSimulate.js';

function* sequentialAsync() {
  console.log('开始顺序执行多个异步操作');

  // 第一个异步操作
  const task1 = yield new Promise(resolve =>
    setTimeout(() => resolve('任务1完成'), 500)
  );
  console.log(task1);

  // 第二个异步操作
  const task2 = yield new Promise(resolve =>
    setTimeout(() => resolve('任务2完成'), 300)
  );
  console.log(task2);

  // 第三个异步操作
  const task3 = yield new Promise(resolve =>
    setTimeout(() => resolve('任务3完成'), 200)
  );
  console.log(task3);

  return '所有任务完成';
}

asyncSimulate(sequentialAsync).then(res => console.log('🎉', res));

// output:
// 开始顺序执行多个异步操作
// (0.5秒后)
// 任务1完成
// (0.3秒后)
// 任务2完成
// (0.2秒后)
// 任务3完成
// 🎉 所有任务完成