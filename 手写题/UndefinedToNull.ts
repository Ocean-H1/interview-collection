/**
 * @Description: 实现一个类型`UndefinedToNull<T>`, 它将类型`T`中的所有`undefined`属性转换为`null`。其他属性类型应保持不变。
 * @Author: oceanhhan
 * @Date: 2025-12-17 17:43:45
 */

function UndefinedToNull<T>(value: T): T extends undefined ? null : T {
  if (value === undefined) {
    return null as any;
  }

  if (
    typeof value === "bigint" ||
    typeof value === "number" ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "symbol" ||
    value === null
  ) {
    return value as any;
  }

  if (Array.isArray(value)) {
    // @ts-ignore
    return value.map((item) => UndefinedToNull(item)) as any;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as any;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as any;
  }

  if (typeof value === "object") {
    const newObj: Record<string, any> = Array.isArray(value) ? [] : {};
    // 遍历对象所有自有属性（包括 Symbol 键）
    const keys = [
      ...Object.keys(value),
      ...Object.getOwnPropertySymbols(value),
    ];
    for (const key of keys) {
      // @ts-ignore 兼容 Symbol 键
      newObj[key] = UndefinedToNull(value[key]);
    }
    return newObj as any;
  }

  return value as any;
}
