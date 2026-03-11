/**
 * @Description: 模拟简单的异步操作
 * @Author: oceanhhan
 * @Date: 2026-03-11 23:27:50
 */
import asyncSimulate from '../asyncSimulate.js';

function* basicExample() {
  console.log('开始执行');

  // yield 在这里相当于 await
  const result = yield new Promise((resolve) => {
    setTimeout(() => {
      resolve('异步操作完成');
    }, 1000);
  });

  console.log('结果:', result);
  return '函数结束';
}

asyncSimulate(basicExample)
  .then(res => console.log('最终返回值:', res))
  .catch(err => console.error('错误:', err));

// output:
// 开始执行
// (1秒后)
// 结果: 异步操作完成
// 最终返回值: 函数结束