/**
 * @Description: 模拟链式异步操作
 * @Author: oceanhhan
 * @Date: 2026-03-11 23:44:52
 */
import asyncSimulate from '../asyncSimulate.js';

function* chainAsync() {
  console.log('开始链式操作');

  let value = 10;

  value = yield new Promise(resolve =>
    setTimeout(() => resolve(value * 2), 300)
  );

  value = yield new Promise(resolve =>
    setTimeout(() => resolve(value + 4), 300)
  );

  value = yield new Promise(resolve =>
    setTimeout(() => resolve(value / 3), 300)
  );

  return value;
}
asyncSimulate(chainAsync).then(res => console.log('最终计算结果:', res));

// output:
// 8