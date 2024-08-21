/**
 * CSS属性名转驼峰命名
 * @param { string } propertyName css属性名
 */
export const propertyToHump = (propertyName: string) => {
  if (propertyName[0] === "-") {
    // 忽略开头的 - 例如：-webkit-xxx-xxx
    propertyName = propertyName.slice(1, propertyName.length);
  }
  return propertyName.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
};

/**
 * 驼峰转CSS属性名
 * @param { string } humpName 驼峰命名的字符串 e.g: fontSize webkitLineClamp
 * @returns { string} propertyName e.g: font-size -webkit-line-clamp
 */
export const HumpToPropertyName = (humpName: string) => {
  // 处理特殊前缀
  const prefixRegex = /^(webkit|moz|o|ms)/;
  const matches = humpName.match(prefixRegex);
  let prefix = "-";
  if (matches && matches.length > 0) {
    prefix += matches[0];
    humpName = humpName.slice(prefix.length - 1);
  }
  return prefix + humpName.replace(/([A-Z])/g, "-$1").toLowerCase();
};
console.log(HumpToPropertyName("webkitLineClamp")); // -webkit-line-clamp
console.log(HumpToPropertyName("fontSize")); // font-size
