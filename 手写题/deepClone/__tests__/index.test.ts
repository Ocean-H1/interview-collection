import { deepClone } from '../index'

// 1. 基础对象
const obj = { a: 1, b: 'hello' };
const clonedObj = deepClone(obj);
console.log(clonedObj);            // { a: 1, b: 'hello' }
console.log(clonedObj !== obj);    // true

// 2. 数组
const arr = [1, [2, 3], { c: 4 }];
const clonedArr = deepClone(arr);
console.log(clonedArr);            // [1, [2,3], {c:4}]
console.log(clonedArr[1] !== arr[1]); // true

// 3. Date
const date = new Date();
const clonedDate = deepClone(date);
console.log(clonedDate);            // 相同时间的 Date 对象
console.log(clonedDate !== date);   // true

// 4. RegExp
const regex = /test/gi;
const clonedRegex = deepClone(regex);
console.log(clonedRegex);           // /test/gi
console.log(clonedRegex !== regex); // true

// 5. Map
const map = new Map([[1, 'a'], [{ b: 2 }, [3]]]);
const clonedMap = deepClone(map);
console.log(clonedMap);             // 相同内容的 Map
console.log(clonedMap !== map);      // true
console.log(clonedMap.get(1) === 'a'); // true

// 6. Set
const set = new Set([1, { x: 2 }, [3]]);
const clonedSet = deepClone(set);
console.log(clonedSet);             // 相同内容的 Set
console.log(clonedSet !== set);     // true

// 7. 循环引用
const cyclic: any = { a: 1 };
cyclic.self = cyclic;
const clonedCyclic = deepClone(cyclic);
console.log(clonedCyclic.self === clonedCyclic); // true

// 8. Symbol 属性
const symbolKey = Symbol('test');
const symObj = { [symbolKey]: 'symbol value' };
const clonedSymObj = deepClone(symObj);
console.log(clonedSymObj[symbolKey]); // 'symbol value'

// 9. 继承对象
class Animal {
  constructor(public name: string) {}
  speak() {
    return `${this.name} makes a noise`;
  }
}
const dog = new Animal('Rex');
const clonedDog = deepClone(dog);
console.log(clonedDog.name);          // 'Rex'
console.log(clonedDog.speak());       // 'Rex makes a noise'
console.log(clonedDog instanceof Animal); // true

// 10. 函数（注意：函数不会被深拷贝）
function testFunc() {}
const clonedFunc = deepClone(testFunc);
console.log(clonedFunc === testFunc);  // true