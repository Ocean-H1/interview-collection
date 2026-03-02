setTimeout(() => console.log("A"));

Promise.resolve().then(() => console.log("B"));

console.log("C");

// 输出顺序：C B A