/**
 * @Description: https://semver.org/
 * @Author: oceanhhan
 * @Date: 2025-12-18 18:57:50
 */

const getVersion = (v: string) => v.split(".").map((item) => Number(item));

function compareVersion(v1: string, v2: string): 0 | 1 | -1 {
  const arr1 = getVersion(v1);
  const arr2 = getVersion(v2);

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > arr2[i]) {
      return 1;
    } else if (arr1[i] < arr2[i]) {
      return -1;
    }
  }
  return 0;
}

// test
console.log(compareVersion("1.01", "1.001")); // 0
console.log(compareVersion("1.0", "1.0.0")); // 0
console.log(compareVersion("0.1", "1.1")); // -1
console.log(compareVersion("1.0.1", "1")); // 1
