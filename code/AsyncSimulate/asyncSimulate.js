/**
 * @Description: 简单模拟async/await，其本质上是 Generator + 自动执行器的语法糖
 * @Author: oceanhhan
 * @Date: 2026-03-11 19:14:35
 */

export default function asyncSimulate(generatorFunc) {
  return new Promise((resolve, reject) => {
    const generator = generatorFunc();

    function run(result) {
      if (result.done) {
        resolve(result.value);
        return;
      }

      const value = Promise.resolve(result.value);

      value.then(
        (res) => {
          run(generator.next(res));
        },
        (err) => {
          try {
            run(generator.throw(err));
          } catch (e) {
            reject(e);
          }
        });
    }

    try {
      run(generator.next());
    } catch (e) {
      reject(e);
    }
  });
}


// examples: ./examples/*