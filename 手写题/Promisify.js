/**
 * @Description: 将基于回调的函数转换为基于Promise 的函数
 * @Author: oceanhhan
 * @Date: 2025-12-18 11:23:28
 */
function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      func.apply(this, [...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }]);
    });
  };
}

// 测试代码
function func(a, b, callback) {
  console.log(this.name); // oceanhhan
  setTimeout(() => {
    if (a < 0 || b < 0) {
      callback(new Error('参数不能为负数'));
    } else {
      callback(null, a + b);
    }
  }, 1000);
}
const obj = {
  name: 'oceanhhan',
  promisedFn: promisify(func)
};

obj.promisedFn(1, 2).then(result => {
  console.log('结果:', result); // 结果: 3
}).catch(err => {
  console.error('错误:', err);
});