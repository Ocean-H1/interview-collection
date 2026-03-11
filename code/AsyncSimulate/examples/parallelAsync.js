/**
 * @Description: 并行异步操作
 * @Author: oceanhhan
 * @Date: 2026-03-11 23:40:55
 */
import asyncSimulate from '../asyncSimulate.js';

function* parallelAsync() {
  console.log('开始执行并行异步操作');

  const [res1, res2, res3] = yield Promise.all([
    new Promise(resolve => setTimeout(() => resolve('任务A'), 500)),
    new Promise(resolve => setTimeout(() => resolve('任务B'), 1000)),
    new Promise(resolve => setTimeout(() => resolve('任务C'), 400))
  ]);
  console.log('并行结果1:', res1);
  console.log('并行结果2:', res2);
  console.log('并行结果3:', res3);

  return '所有并行任务完成';
}

asyncSimulate(parallelAsync)
  .then(res => console.log('✨', res));

// output:
// 开始并行执行异步操作
// (1秒后，最长的时间)
// 并行结果1: 任务A
// 并行结果2: 任务B
// 并行结果3: 任务C
// ✨ 所有并行任务完成