/**
 * @Description: 错误处理
 * @Author: oceanhhan
 * @Date: 2026-03-11 23:30:55
 */
import asyncSimulate from '../asyncSimulate.js';

function* errorHandlingExample() {
  console.log('开始执行');

  try {
    const result = yield new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('异步操作失败')), 500);
    });
    console.log('这里不会执行');
  } catch (error) {
    console.log('捕获到错误:', error.message);
    return '错误已处理';
  }
}
asyncSimulate(errorHandlingExample)
  .then(res => console.log('返回值:', res))
  .catch(err => console.error('外部错误:', err));

// output:
// 开始执行
// (0.5秒后)
// 捕获到错误: 异步操作失败
// 返回值: 错误已处理